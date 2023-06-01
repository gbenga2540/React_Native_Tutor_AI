import React, { FunctionComponent, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import BasicText from '../Basic_Text/Basic_Text';
import { number_to_day_short } from '../../Utils/Number_To_Day_Short/Number_To_Day_Short';
import Colors from '../../Configs/Colors/Colors';
import { mongo_date_converter_1 } from '../../Utils/Mongo_Date_Converter/Mongo_Date_Converter';
import { INTF_SchedulesInfo } from '../../Interface/Schedules_Info/Schedules_Info';
import { date_to_time } from '../../Utils/Date_To_Time/Date_To_Time';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { ScheduleInfoStore } from '../../MobX/Schedules_Info/Schedules_Info';
import { BottomSheetStore } from '../../MobX/Bottom_Sheet/Bottom_Sheet';

interface ScheduleItemProps {
    schedule: INTF_SchedulesInfo;
    index: number;
}
const ScheduleItem: FunctionComponent<ScheduleItemProps> = ({
    schedule,
    index,
}) => {
    const [timedOut, setTimedOut] = useState<boolean>(false);

    useEffect(() => {
        setTimedOut(
            new Date(Date.now())?.getTime() -
                new Date(new Date(schedule?.time))?.getTime() >=
                0,
        );
    }, [schedule]);

    return (
        <TouchableOpacity
            onPress={no_double_clicks({
                execFunc: () => {
                    ScheduleInfoStore.set_edit_index({ index: index });
                    BottomSheetStore.open_bottom_sheet({
                        component_type: timedOut ? 4 : 3,
                    });
                },
            })}
            activeOpacity={0.55}
            style={{ minHeight: 180, flexDirection: 'row' }}>
            <View>
                <BasicText
                    inputText={number_to_day_short({
                        day_number: new Date(schedule?.time)?.getDay() + 1,
                    })}
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
                        inputText={new Date(schedule?.time)
                            ?.getDate()
                            ?.toString()}
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
                        inputText={schedule?.title}
                        textColor={timedOut ? Colors.White : Colors.Dark}
                        textSize={15}
                    />
                </View>
                <BasicText
                    inputText={mongo_date_converter_1({
                        input_date: new Date(
                            schedule?.time,
                        ) as unknown as string,
                    })}
                    marginTop={10}
                    marginLeft={3}
                />
                <BasicText
                    inputText={date_to_time({ date: new Date(schedule?.time) })}
                    marginTop={3}
                    marginLeft={3}
                    textSize={15}
                    textWeight={700}
                />
            </View>
        </TouchableOpacity>
    );
};

export default ScheduleItem;
