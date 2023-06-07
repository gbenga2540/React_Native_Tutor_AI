import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    BackHandler,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetStore } from '../../MobX/Bottom_Sheet/Bottom_Sheet';
import { observer } from 'mobx-react';
import { useFocusEffect } from '@react-navigation/native';
import { assigned_class } from '../../Data/Assigned_Class/Assigned_Class';
import { StudentInfoStore } from '../../MobX/Student_Info/Student_Info';
import BasicText from '../Basic_Text/Basic_Text';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { INTF_AssignedClass } from '../../Interface/Student_Info/Student_Info';
import BasicTextEntry from '../Basic_Text_Entry/Basic_Text_Entry';
import { KeyboardStore } from '../../MobX/Keyboard/Keyboard';
import { mongo_date_converter_4 } from '../../Utils/Mongo_Date_Converter/Mongo_Date_Converter';
import TextButton from '../Text_Button/Text_Button';
import DatePicker from 'react-native-date-picker';
import { date_to_time } from '../../Utils/Date_To_Time/Date_To_Time';
import BasicButton from '../Basic_Button/Basic_Button';
import { ScheduleInfoStore } from '../../MobX/Schedules_Info/Schedules_Info';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_SCHEDULE_INFO } from '@env';
import { sort_schedule } from '../../Utils/Sort_Schedule/Sort_Schedule';
import { INTF_SchedulesInfo } from '../../Interface/Schedules_Info/Schedules_Info';

const BottomOverlay: FunctionComponent = observer(() => {
    const BottomSheetRef = useRef<BottomSheetMethods | null>(null);

    const [reminderTitle, setReminderTitle] = useState<string>('');
    const [reminderDate, setReminderDate] = useState<Date>(
        new Date(Date.now()),
    );
    const [dateTextColor, setDateTextColor] = useState<string>(Colors.Grey);
    const [openDateModal, setOpenDateModal] = useState<boolean>(false);
    const [showAddReminder, setShowAddReminder] = useState<boolean>(false);

    if (BottomSheetRef?.current) {
        if (BottomSheetStore.is_bottom_sheet) {
            BottomSheetRef.current.expand();
        }
        if (!BottomSheetStore.is_bottom_sheet) {
            BottomSheetStore.close_bottom_sheet();
            BottomSheetRef?.current?.close();
        }
    }

    const open_date_picker = no_double_clicks({
        execFunc: () => {
            setOpenDateModal(true);
        },
    });

    const add_to_schedule = no_double_clicks({
        execFunc: async () => {
            if (reminderTitle && dateTextColor !== Colors.Grey) {
                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_SCHEDULE_INFO,
                        JSON.stringify(
                            sort_schedule({
                                schedule: [
                                    ...ScheduleInfoStore?.schedule_info,
                                    {
                                        title: reminderTitle,
                                        time: new Date(reminderDate),
                                    },
                                ],
                            }),
                        ),
                        {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        },
                    )?.then(() => {
                        ScheduleInfoStore.add_to_schedule({
                            schedule: {
                                title: reminderTitle,
                                time: new Date(reminderDate),
                            },
                        });
                        setReminderTitle('');
                        setDateTextColor(Colors.Grey);
                        setReminderDate(new Date(Date.now()));
                        BottomSheetStore.close_bottom_sheet();
                    });
                } catch (error) {}
            }
        },
    });

    const edit_schedule = no_double_clicks({
        execFunc: async () => {
            if (reminderTitle && dateTextColor !== Colors.Grey) {
                const new_schedule: INTF_SchedulesInfo[] = sort_schedule({
                    schedule: [
                        ...ScheduleInfoStore.schedule_info.map(
                            (item, index) => {
                                if (ScheduleInfoStore.edit_index === index) {
                                    return {
                                        title: reminderTitle,
                                        time: new Date(reminderDate),
                                    };
                                }
                                return { ...item };
                            },
                        ),
                    ],
                });

                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_SCHEDULE_INFO,
                        JSON.stringify(new_schedule),
                        {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        },
                    )?.then(() => {
                        ScheduleInfoStore.edit_schedule({
                            schedule: {
                                title: reminderTitle,
                                time: new Date(reminderDate),
                            },
                        });
                        setReminderTitle('');
                        setDateTextColor(Colors.Grey);
                        setReminderDate(new Date(Date.now()));
                        BottomSheetStore.close_bottom_sheet();
                    });
                } catch (error) {}
            }
        },
    });

    const delete_schedule = no_double_clicks({
        execFunc: async () => {
            const new_schedule: INTF_SchedulesInfo[] = sort_schedule({
                schedule: [
                    ...ScheduleInfoStore.schedule_info.filter(
                        (item, index) => ScheduleInfoStore.edit_index !== index,
                    ),
                ],
            });

            try {
                await SInfo.setItem(
                    SECURE_STORAGE_SCHEDULE_INFO,
                    JSON.stringify(new_schedule),
                    {
                        sharedPreferencesName: SECURE_STORAGE_NAME,
                        keychainService: SECURE_STORAGE_NAME,
                    },
                )?.then(() => {
                    ScheduleInfoStore.delete_schedule();
                    setReminderTitle('');
                    setDateTextColor(Colors.Grey);
                    setReminderDate(new Date(Date.now()));
                    BottomSheetStore.close_bottom_sheet();
                });
            } catch (error) {}
        },
    });

    const BS_Snap_Points = () => {
        switch (BottomSheetStore.component_type) {
            case 0:
                return ['50'];
            case 1:
                return Platform.OS === 'ios' ? ['53'] : ['58'];
            case 2:
                return KeyboardStore.keyboard_active ? ['87'] : ['60'];
            case 3:
                return KeyboardStore.keyboard_active ? ['87'] : ['60'];
            case 4:
                return ['50'];
            default:
                return ['50'];
        }
    };

    const current_component = BottomSheetStore.component_type;
    useEffect(() => {
        if (
            BottomSheetStore.is_bottom_sheet &&
            BottomSheetStore.component_type === 2
        ) {
            setReminderTitle('');
            setReminderDate(new Date(Date.now()));
            setDateTextColor(Colors.Grey);
        }
        if (
            BottomSheetStore.is_bottom_sheet &&
            BottomSheetStore.component_type === 3
        ) {
            setReminderTitle(
                ScheduleInfoStore.schedule_info[ScheduleInfoStore.edit_index]
                    ?.title,
            );
            setReminderDate(
                new Date(
                    ScheduleInfoStore.schedule_info[
                        ScheduleInfoStore.edit_index
                    ]?.time,
                ),
            );
        }
    }, [current_component]);

    useEffect(() => {
        if (reminderTitle && dateTextColor !== Colors.Grey) {
            setShowAddReminder(true);
        } else {
            setShowAddReminder(false);
        }
    }, [reminderTitle, dateTextColor]);

    useFocusEffect(
        useCallback(() => {
            const handleBackPress = () => {
                if (BottomSheetStore?.is_bottom_sheet) {
                    BottomSheetStore.close_bottom_sheet();
                    BottomSheetRef?.current?.forceClose();
                    return true;
                } else {
                    return false;
                }
            };

            BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    handleBackPress,
                );
        }, []),
    );

    return (
        <BottomSheet
            ref={BottomSheetRef}
            keyboardBehavior="fillParent"
            snapPoints={BS_Snap_Points()}
            backgroundStyle={{
                shadowColor: Colors.Black,
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 5,
                backgroundColor: Colors.InputBackground,
            }}
            enablePanDownToClose={true}
            containerStyle={{
                zIndex: 6,
            }}
            style={{
                borderRadius: 35,
                overflow: 'hidden',
            }}
            index={-1}
            onClose={() => {
                BottomSheetStore.close_bottom_sheet();
                BottomSheetRef?.current?.close();
            }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                {/* // !To be Updated */}
                {BottomSheetStore.component_type === 1 && (
                    <BottomSheetScrollView
                        style={{
                            flex: 1,
                            paddingHorizontal: 20,
                            paddingTop: 30,
                        }}>
                        {assigned_class.map((item, index) => (
                            <TouchableOpacity
                                onPress={no_double_clicks({
                                    execFunc: () => {
                                        StudentInfoStore.update_assigned_class({
                                            assigned_class: assigned_class[
                                                index
                                            ] as INTF_AssignedClass,
                                        });
                                    },
                                })}
                                activeOpacity={0.5}
                                style={{
                                    backgroundColor:
                                        StudentInfoStore?.student_info
                                            ?.assigned_class ===
                                        assigned_class[index]
                                            ? Colors.Primary
                                            : Colors.LightPrimary,
                                    marginBottom: 15,
                                    height: 60,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                key={item + index}>
                                <BasicText
                                    inputText={item}
                                    textWeight={600}
                                    textSize={16}
                                    textColor={
                                        StudentInfoStore?.student_info
                                            ?.assigned_class ===
                                        assigned_class[index]
                                            ? Colors.White
                                            : Colors.Dark
                                    }
                                />
                            </TouchableOpacity>
                        ))}
                    </BottomSheetScrollView>
                )}
                {BottomSheetStore.component_type === 2 && (
                    <BottomSheetView style={{ marginHorizontal: 28 }}>
                        <BasicText
                            inputText="Add Class Reminder"
                            textWeight={700}
                            marginLeft={'auto'}
                            marginRight={'auto'}
                            marginTop={20}
                            textSize={18}
                            marginBottom={30}
                        />
                        <BasicText
                            inputText="Lesson Title"
                            textWeight={500}
                            textSize={15}
                        />
                        <BasicTextEntry
                            placeHolderText="Enter Reminder Title here..."
                            marginHorizontal={0.2}
                            marginTop={10}
                            inputValue={reminderTitle}
                            setInputValue={setReminderTitle}
                        />
                        <BasicText
                            inputText="Lesson Time"
                            textWeight={500}
                            textSize={15}
                            marginTop={20}
                        />
                        <BasicTextEntry
                            marginHorizontal={0.2}
                            placeHolderText={mongo_date_converter_4({
                                input_date: new Date()?.toString(),
                            })}
                            inputValue={`${mongo_date_converter_4({
                                input_date: reminderDate?.toString(),
                            })} - ${date_to_time({ date: reminderDate })}`}
                            setInputValue={setReminderDate as any}
                            marginBottom={7}
                            marginTop={10}
                            inputMode="text"
                            editable={false}
                            textColor={dateTextColor}
                        />
                        <TextButton
                            buttonText="Select Date"
                            marginLeft={'auto'}
                            marginBottom={10}
                            execFunc={open_date_picker}
                            textColor={Colors.LightPink}
                        />
                        {showAddReminder && (
                            <BasicButton
                                buttonText="Add Reminder"
                                marginTop={15}
                                execFunc={add_to_schedule}
                            />
                        )}
                    </BottomSheetView>
                )}
                {BottomSheetStore.component_type === 3 && (
                    <BottomSheetView style={{ marginHorizontal: 28 }}>
                        <BottomSheetView
                            style={{
                                flexDirection: 'row',
                                marginTop: 20,
                                marginBottom: 30,
                                alignItems: 'center',
                            }}>
                            <BasicText
                                inputText="Edit Class Reminder"
                                textWeight={700}
                                marginLeft={'auto'}
                                marginRight={'auto'}
                                textSize={18}
                            />
                            <BottomSheetView
                                style={{ position: 'absolute', right: 0 }}>
                                <TextButton
                                    buttonText="Delete"
                                    execFunc={delete_schedule}
                                />
                            </BottomSheetView>
                        </BottomSheetView>
                        <BasicText
                            inputText="Lesson Title"
                            textWeight={500}
                            textSize={15}
                        />
                        <BasicTextEntry
                            placeHolderText="Enter Reminder Title here..."
                            marginHorizontal={0.2}
                            marginTop={10}
                            inputValue={reminderTitle}
                            setInputValue={setReminderTitle}
                        />
                        <BasicText
                            inputText="Lesson Time"
                            textWeight={500}
                            textSize={15}
                            marginTop={20}
                        />
                        <BasicTextEntry
                            marginHorizontal={0.2}
                            placeHolderText={mongo_date_converter_4({
                                input_date: new Date()?.toString(),
                            })}
                            inputValue={`${mongo_date_converter_4({
                                input_date: reminderDate?.toString(),
                            })} - ${date_to_time({ date: reminderDate })}`}
                            setInputValue={setReminderDate as any}
                            marginBottom={7}
                            marginTop={10}
                            inputMode="text"
                            editable={false}
                            textColor={dateTextColor}
                        />
                        <TextButton
                            buttonText="Select Date"
                            marginLeft={'auto'}
                            marginBottom={10}
                            execFunc={open_date_picker}
                            textColor={Colors.LightPink}
                        />
                        {showAddReminder && (
                            <BasicButton
                                buttonText="Edit Reminder"
                                marginTop={15}
                                execFunc={edit_schedule}
                            />
                        )}
                    </BottomSheetView>
                )}
                {BottomSheetStore.component_type === 4 && (
                    <BottomSheetView style={{ marginHorizontal: 28 }}>
                        <BasicText
                            inputText="Delete Class Reminder"
                            textWeight={700}
                            marginLeft={'auto'}
                            marginRight={'auto'}
                            marginTop={20}
                            textSize={18}
                            marginBottom={30}
                        />
                        <BottomSheetView
                            style={{
                                maxWidth: 260,
                                alignSelf: 'center',
                                marginTop: 20,
                                marginBottom: 10,
                            }}>
                            <BasicText
                                inputText="Are you sure you want to Delete this Reminder?"
                                textWeight={500}
                                textAlign="center"
                                textSize={15}
                            />
                        </BottomSheetView>
                        <BottomSheetView
                            style={{ flexDirection: 'row', marginTop: 15 }}>
                            <BottomSheetView
                                style={{ flex: 1, marginRight: 6 }}>
                                <BasicButton
                                    buttonText="Yes"
                                    textSize={17}
                                    execFunc={delete_schedule}
                                />
                            </BottomSheetView>
                            <BottomSheetView style={{ flex: 1, marginLeft: 6 }}>
                                <BasicButton
                                    buttonText="No"
                                    textSize={17}
                                    execFunc={no_double_clicks({
                                        execFunc: () =>
                                            BottomSheetStore.close_bottom_sheet(),
                                    })}
                                />
                            </BottomSheetView>
                        </BottomSheetView>
                    </BottomSheetView>
                )}
            </KeyboardAvoidingView>
            <DatePicker
                modal
                mode="datetime"
                open={openDateModal}
                date={reminderDate}
                minimumDate={
                    current_component === 3 ? undefined : new Date(Date.now())
                }
                onConfirm={new_date => {
                    setDateTextColor(Colors.Dark);
                    setOpenDateModal(false);
                    setReminderDate(new_date);
                }}
                onCancel={() => {
                    setOpenDateModal(false);
                }}
            />
        </BottomSheet>
    );
});

export default BottomOverlay;
