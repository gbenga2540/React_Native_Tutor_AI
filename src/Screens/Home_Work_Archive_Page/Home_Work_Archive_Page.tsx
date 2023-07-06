import React, { FunctionComponent } from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { observer } from 'mobx-react';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import HomeWorkIcon from '../../Components/Home_Work_Icon/Home_Work_Icon';

const HomeWorkArchivePage: FunctionComponent = observer(() => {
    const UserInfo = UserInfoStore?.user_info;

    const HwrkDone = UserInfo?.lessons?.filter(
        item => item?.score !== null && item?.score !== undefined,
    );

    const calculate_average = ({ scores_data }: { scores_data: any[] }) => {
        if ((scores_data || []).length === 0) {
            return 0;
        }
        const sum = (scores_data || []).reduce(
            (total, score) => total + (score.score || 0),
            0,
        );
        const average = sum / (scores_data || []).length;
        return Math.floor(average);
    };

    const B_HW_D = HwrkDone?.filter(item => item?.id?.toString()?.[0] === '1');
    const P_HW_D = HwrkDone?.filter(item => item?.id?.toString()?.[0] === '2');
    const I_HW_D = HwrkDone?.filter(item => item?.id?.toString()?.[0] === '3');
    const U_HW_D = HwrkDone?.filter(item => item?.id?.toString()?.[0] === '4');
    const C_HW_D = HwrkDone?.filter(item => item?.id?.toString()?.[0] === '5');

    return (
        <View style={styles.lesson_main}>
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
                    inputText="Homework Archives"
                    textWeight={700}
                    textSize={20}
                    marginLeft={15}
                />
            </View>
            <Image
                source={require('../../Images/Lessons/Lessons.png')}
                style={{
                    width: 155,
                    height: 80,
                    marginTop: 10,
                    marginBottom: 10,
                    alignSelf: 'center',
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: 6,
                    justifyContent: 'center',
                }}>
                <View
                    style={{
                        marginRight: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 9,
                        backgroundColor: Colors.LightPurple2,
                        borderRadius: 10,
                    }}>
                    <BasicText
                        inputText={`${calculate_average({
                            scores_data: HwrkDone || [],
                        })}% Pass`}
                    />
                </View>
                <View
                    style={{
                        marginLeft: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 9,
                        backgroundColor: Colors.LightPurple2,
                        borderRadius: 10,
                    }}>
                    <BasicText inputText={`${HwrkDone?.length} Homework`} />
                </View>
            </View>
            <ScrollView
                style={{
                    flex: 1,
                    paddingTop: 14,
                    marginBottom:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 10,
                                  if_false: 25,
                              })
                            : 10,
                }}>
                {(B_HW_D || [])?.length > 0 && (
                    <>
                        <BasicText
                            inputText="Beginner"
                            textWeight={600}
                            marginTop={30}
                            marginBottom={10}
                            textSize={20}
                            marginLeft={'auto'}
                            marginRight={'auto'}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flex: 1,
                                justifyContent: 'center',
                            }}>
                            {B_HW_D?.map((item, index) => (
                                <HomeWorkIcon
                                    homework_index={item?.id as number}
                                    key={index}
                                    is_completed
                                    marginLeft={7}
                                    marginRight={7}
                                    marginBottom={14}
                                    show_icon
                                    userLevel={'Beginner'}
                                />
                            ))}
                        </View>
                    </>
                )}
                {(P_HW_D || [])?.length > 0 && (
                    <>
                        <BasicText
                            inputText="Pre-Intermediate"
                            textWeight={600}
                            marginTop={20}
                            marginBottom={10}
                            textSize={20}
                            marginLeft={'auto'}
                            marginRight={'auto'}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flex: 1,
                                justifyContent: 'center',
                            }}>
                            {P_HW_D?.map((item, index) => (
                                <HomeWorkIcon
                                    homework_index={item?.id as number}
                                    key={index}
                                    is_completed
                                    marginLeft={7}
                                    marginRight={7}
                                    marginBottom={14}
                                    show_icon
                                    userLevel={'Pre-Intermediate'}
                                />
                            ))}
                        </View>
                    </>
                )}
                {(I_HW_D || [])?.length > 0 && (
                    <>
                        <BasicText
                            inputText="Intermediate"
                            textWeight={600}
                            marginTop={20}
                            marginBottom={10}
                            textSize={20}
                            marginLeft={'auto'}
                            marginRight={'auto'}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flex: 1,
                                justifyContent: 'center',
                            }}>
                            {I_HW_D?.map((item, index) => (
                                <HomeWorkIcon
                                    homework_index={item?.id as number}
                                    key={index}
                                    is_completed
                                    marginLeft={7}
                                    marginRight={7}
                                    marginBottom={14}
                                    show_icon
                                    userLevel={'Intermediate'}
                                />
                            ))}
                        </View>
                    </>
                )}
                {(U_HW_D || [])?.length > 0 && (
                    <>
                        <BasicText
                            inputText="Upper-Intermediate"
                            textWeight={600}
                            marginTop={20}
                            marginBottom={10}
                            textSize={20}
                            marginLeft={'auto'}
                            marginRight={'auto'}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flex: 1,
                                justifyContent: 'center',
                            }}>
                            {U_HW_D?.map((item, index) => (
                                <HomeWorkIcon
                                    homework_index={item?.id as number}
                                    key={index}
                                    is_completed
                                    marginLeft={7}
                                    marginRight={7}
                                    marginBottom={14}
                                    show_icon
                                    userLevel={'Upper-Intermediate'}
                                />
                            ))}
                        </View>
                    </>
                )}
                {(C_HW_D || [])?.length > 0 && (
                    <>
                        <BasicText
                            inputText="Confident"
                            textWeight={600}
                            marginTop={10}
                            marginBottom={10}
                            textSize={20}
                            marginLeft={'auto'}
                            marginRight={'auto'}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                flex: 1,
                                justifyContent: 'center',
                            }}>
                            {C_HW_D?.map((item, index) => (
                                <HomeWorkIcon
                                    homework_index={item?.id as number}
                                    key={index}
                                    is_completed
                                    marginLeft={7}
                                    marginRight={7}
                                    marginBottom={14}
                                    show_icon
                                    userLevel={'Confident'}
                                />
                            ))}
                        </View>
                    </>
                )}
                <View
                    style={{
                        marginBottom: 50,
                    }}>
                    {''}
                </View>
            </ScrollView>
        </View>
    );
});

export default HomeWorkArchivePage;

const styles = StyleSheet.create({
    lesson_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
