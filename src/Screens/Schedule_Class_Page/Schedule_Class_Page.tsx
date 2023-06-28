import React, {
    FunctionComponent,
    ReactElement,
    useEffect,
    useRef,
} from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { ScheduleInfoStore } from '../../MobX/Schedules_Info/Schedules_Info';
import { observer } from 'mobx-react';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import ScheduleCard from '../../Components/Schedule_Card/Schedule_Card';

const ScheduleClassPage: FunctionComponent = observer(() => {
    const flatListRef = useRef<FlatList<any> | null>(null);

    const ScheduleInfo = ScheduleInfoStore?.schedule_info;
    useEffect(() => {
        if (ScheduleInfo?.length <= 0) {
            ScheduleInfoStore.clear_schedule_info();
        }
    }, [ScheduleInfo]);

    // useEffect(() => {
    //     const first_timer = setTimeout(() => {
    //         flatListRef.current !== null && flatListRef.current?.scrollToEnd();
    //     }, 100);
    //     return () => clearTimeout(first_timer);
    // }, []);

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
            {ScheduleInfo?.length > 0 && (
                <FlatList
                    ref={flatListRef}
                    data={ScheduleInfo}
                    renderItem={({ item, index }) => (
                        <ScheduleCard key={index} schedule={item} />
                    )}
                    keyExtractor={(item, index) => `${item.day} + ${index}`}
                    style={{
                        marginHorizontal: 2,
                        paddingHorizontal: 20,
                        paddingTop: 10,
                        flex: 1,
                        marginBottom:
                            Platform?.OS === 'ios'
                                ? screen_height_less_than({
                                      if_true: 12,
                                      if_false: 35,
                                  })
                                : 10,
                    }}
                    ListFooterComponent={() =>
                        (
                            <View
                                style={{
                                    marginBottom: 280,
                                }}>
                                {''}
                            </View>
                        ) as ReactElement<any>
                    }
                />
            )}
        </View>
    );
});

export default ScheduleClassPage;

const styles = StyleSheet.create({
    sc_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
