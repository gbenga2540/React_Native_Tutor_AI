import React, { FunctionComponent, useEffect, useRef } from 'react';
import {
    FlatList,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import ScheduleItem from '../../Components/Schedule_Item/Schedule_Item';
import { ScheduleInfoStore } from '../../MobX/Schedules_Info/Schedules_Info';
import { Observer } from 'mobx-react';
import Feather from 'react-native-vector-icons/Feather';
import { BottomSheetStore } from '../../MobX/Bottom_Sheet/Bottom_Sheet';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const ScheduleClassPage: FunctionComponent = () => {
    const flatListRef = useRef<FlatList<any> | null>(null);

    useEffect(() => {
        const first_timer = setTimeout(() => {
            flatListRef.current !== null && flatListRef.current?.scrollToEnd();
        }, 500);
        return () => clearTimeout(first_timer);
    }, []);

    return (
        <View style={styles.sc_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 45,
                                  if_false: 65,
                              })
                            : 25,
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton />
                <BasicText
                    inputText="Schedule Class"
                    textWeight={700}
                    textSize={20}
                    marginLeft={15}
                />
            </View>
            <Observer>
                {() =>
                    ScheduleInfoStore?.schedule_info?.length > 0 ? (
                        <FlatList
                            ref={flatListRef}
                            data={ScheduleInfoStore?.schedule_info}
                            renderItem={({ item, index }) => (
                                <ScheduleItem
                                    key={index}
                                    schedule={item}
                                    index={index}
                                />
                            )}
                            keyExtractor={(item, index) =>
                                `${item.time} + ${index}`
                            }
                            style={{
                                marginHorizontal: 2,
                                paddingHorizontal: 20,
                                paddingTop: 10,
                                flex: 1,
                            }}
                        />
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <BasicText
                                inputText="No Schedules Found!"
                                textWeight={600}
                                textSize={16}
                            />
                        </View>
                    )
                }
            </Observer>
            <TouchableOpacity
                onPress={no_double_clicks({
                    execFunc: () =>
                        BottomSheetStore.open_bottom_sheet({
                            component_type: 2,
                        }),
                })}
                activeOpacity={0.55}
                style={{
                    backgroundColor: Colors.Primary,
                    alignSelf: 'flex-end',
                    marginRight: Platform.OS === 'ios' ? 18 : 14,
                    marginBottom: Platform.OS === 'ios' ? 25 : 15,
                    marginTop: 8,
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Feather name="plus" size={30} color={Colors.White} />
            </TouchableOpacity>
        </View>
    );
};

export default ScheduleClassPage;

const styles = StyleSheet.create({
    sc_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
