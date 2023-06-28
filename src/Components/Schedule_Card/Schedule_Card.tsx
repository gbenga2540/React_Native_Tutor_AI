import React, { FunctionComponent, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import BasicText from '../Basic_Text/Basic_Text';
import Colors from '../../Configs/Colors/Colors';
import { INTF_SchedulesInfo } from '../../Interface/Schedules_Info/Schedules_Info';
import { date_to_time } from '../../Utils/Date_To_Time/Date_To_Time';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { ScheduleInfoStore } from '../../MobX/Schedules_Info/Schedules_Info';
import { get_next_date_of_week } from '../../Utils/Get_Next_Date_Of_Week/Get_Next_Date_Of_Week';
import TextButton from '../Text_Button/Text_Button';
import BasicTextEntry from '../Basic_Text_Entry/Basic_Text_Entry';
import DatePicker from 'react-native-date-picker';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';

interface ScheduleCardProps {
    schedule: INTF_SchedulesInfo;
}
const ScheduleCard: FunctionComponent<ScheduleCardProps> = ({ schedule }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const next_day = get_next_date_of_week({ day: schedule.day });
    const [timedOut, setTimedOut] = useState<boolean>(false);

    const [openDateModal, setOpenDateModal] = useState<boolean>(false);
    const [scheduleTitle, setScheduleTitle] = useState<string>('');
    const [scheduleTime, setScheduleTime] = useState<Date>(
        new Date(new Date(Date.now()).getTime() + 1 * 60 * 60 * 1000),
    );

    const enable_disable_repeat = no_double_clicks({
        execFunc: () => {
            ScheduleInfoStore.enable_or_disable_repeat({
                day: schedule.day,
                repeat: !schedule.repeat,
            });
        },
    });

    const add_or_delete_schedule = no_double_clicks({
        execFunc: () => {
            if (schedule?.title) {
                ScheduleInfoStore.delete_schedule({
                    day: schedule.day,
                });
            } else {
                if (scheduleTitle) {
                    ScheduleInfoStore.add_to_schedule({
                        day: schedule.day,
                        title: scheduleTitle,
                        time: scheduleTime,
                    });
                    setScheduleTitle('');
                } else {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Title field cannot be empty!',
                    });
                }
            }
        },
    });

    const select_date = no_double_clicks({
        execFunc: () => {
            setOpenDateModal(true);
        },
    });

    useEffect(() => {
        // const get_day_num = () => {
        //     switch (schedule.day) {
        //         case 'Sunday':
        //             return 0;
        //         case 'Monday':
        //             return 1;
        //         case 'Tuesday':
        //             return 2;
        //         case 'Wednesday':
        //             return 3;
        //         case 'Thursday':
        //             return 4;
        //         case 'Friday':
        //             return 5;
        //         case 'Saturday':
        //             return 6;
        //         default:
        //             return 0;
        //     }
        // };
        // setTimedOut(new Date(Date.now())?.getDay() - get_day_num() >= 0);

        setTimedOut(schedule?.title ? true : false);
    }, [schedule]);

    return (
        <View style={{ minHeight: 230, flexDirection: 'row' }}>
            <View>
                <BasicText
                    inputText={schedule.day?.slice(0, 3)}
                    textColor={timedOut ? Colors.Primary : Colors.Dark}
                    textSize={15}
                />
                <View
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: timedOut
                            ? Colors.Primary
                            : Colors.LightGrey,
                        marginTop: 5,
                    }}>
                    <BasicText
                        inputText={next_day.day}
                        textSize={13}
                        textColor={timedOut ? Colors.White : Colors.Dark}
                        textWeight={700}
                    />
                </View>
            </View>
            <View
                style={{
                    marginHorizontal: 20,
                    borderWidth: 1,
                    borderColor: timedOut ? Colors.Primary : Colors.LightGrey,
                }}>
                <View
                    style={{
                        position: 'absolute',
                        width: 8,
                        height: 8,
                        backgroundColor: timedOut
                            ? Colors.Primary
                            : Colors.LightGrey,
                        left: -4,
                        top: -1,
                        borderRadius: 8,
                    }}>
                    {''}
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: timedOut
                            ? Colors.Primary
                            : Colors.LightGrey,
                        minHeight: 44,
                        borderRadius: 10,
                        justifyContent: 'center',
                        padding: 10,
                    }}>
                    <BasicText
                        inputText={
                            schedule?.title
                                ? `${schedule.day} Class Set!`
                                : `Setup your ${schedule.day} Class`
                        }
                        textColor={timedOut ? Colors.White : Colors.Dark}
                        textSize={15}
                    />
                </View>
                {schedule?.title ? (
                    <BasicText
                        inputText={schedule?.title || ''}
                        marginTop={14}
                        marginLeft={3}
                        textWeight={600}
                        textSize={17}
                    />
                ) : (
                    <BasicTextEntry
                        marginHorizontal={0.01}
                        height={50}
                        marginTop={10}
                        placeHolderText={`Schedule Title for ${schedule.day}...`}
                        textMarginHor={10}
                        inputValue={scheduleTitle}
                        setInputValue={setScheduleTitle}
                    />
                )}

                {!schedule?.title && (
                    <BasicText
                        inputText={
                            scheduleTime
                                ? `${date_to_time({
                                      date: new Date(scheduleTime),
                                  })} - ${date_to_time({
                                      date: new Date(
                                          new Date(scheduleTime).getTime() +
                                              ((UserInfoStore?.user_info
                                                  ?.study_target || 60) === 60
                                                  ? 60 * 60 * 1000
                                                  : 30 * 60 * 1000),
                                      ),
                                  })}`
                                : ''
                        }
                        marginLeft={3}
                        textSize={15}
                        textWeight={500}
                        marginTop={14}
                    />
                )}

                {schedule?.time ? (
                    <BasicText
                        inputText={
                            schedule?.time
                                ? `${date_to_time({
                                      date: new Date(schedule?.time),
                                  })} - ${date_to_time({
                                      date: new Date(
                                          new Date(schedule?.time).getTime() +
                                              ((UserInfoStore?.user_info
                                                  ?.study_target || 60) === 60
                                                  ? 60 * 60 * 1000
                                                  : 30 * 60 * 1000),
                                      ),
                                  })}`
                                : ''
                        }
                        marginLeft={3}
                        textSize={15}
                        textWeight={500}
                        marginTop={3}
                    />
                ) : (
                    <TextButton
                        buttonText="Select Date"
                        textColor={Colors.Pink}
                        execFunc={select_date}
                        marginTop={3}
                        marginRight={'auto'}
                    />
                )}
                {schedule?.title && (
                    <TouchableOpacity
                        onPress={enable_disable_repeat}
                        activeOpacity={0.55}
                        style={{
                            marginLeft: 'auto',
                            marginTop: 10,
                        }}>
                        <Feather
                            name="refresh-ccw"
                            size={25}
                            color={
                                schedule?.repeat ? Colors.Primary : Colors.Grey
                            }
                        />
                    </TouchableOpacity>
                )}
                <TextButton
                    buttonText={schedule?.title ? 'Delete' : 'Add'}
                    execFunc={add_or_delete_schedule}
                    textColor={
                        schedule?.title ? Colors.TestRed : Colors.Primary
                    }
                    marginTop={'auto'}
                    marginBottom={20}
                    marginLeft={'auto'}
                />
            </View>
            <DatePicker
                modal
                mode="time"
                open={openDateModal}
                date={scheduleTime}
                onConfirm={new_date => {
                    setOpenDateModal(false);
                    const next_time: Date = new Date(new_date.getTime());
                    setScheduleTime(
                        new Date(
                            next_day.date.getFullYear(),
                            next_day.date.getMonth(),
                            next_day.date.getDate(),
                            next_time.getHours(),
                            next_time.getMinutes(),
                            next_time.getSeconds(),
                            next_time.getMilliseconds(),
                        ),
                    );
                }}
                onCancel={() => {
                    setOpenDateModal(false);
                }}
            />
        </View>
    );
};

export default ScheduleCard;
