import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, View, Platform, Image } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import SimpleBIcon from '../../Images/SVGs/Simple_B_Icon.svg';
import FireIcon from '../../Images/SVGs/Fire_Icon.svg';
import CheckMark from '../../Components/Check_Mark/Check_Mark';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import {
    screen_height_less_than,
    screen_width_less_than,
} from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { get_day_from_date } from '../../Utils/Get_Day_From_Date/Get_Day_From_Date';
import { observer } from 'mobx-react';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { INTF_AssignedClass } from '../../Interface/Assigned_Class/Assigned_Class';

const ReportPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const UserInfo = UserInfoStore?.user_info;

    const ExamsDone =
        UserInfo?.exams?.filter(
            item => item?.score !== null && item?.score !== undefined,
        ) || [];

    const HwrkDone = UserInfo?.lessons?.filter(
        item => item?.score !== null && item?.score !== undefined,
    );

    const get_level_lessons = ({
        level,
    }: {
        level: INTF_AssignedClass;
    }): {
        _id?: string | undefined;
        id?: number | undefined;
        score?: number | null | undefined;
    }[] => {
        if ((UserInfo?.lessons?.length || 0) >= 1) {
            return (
                UserInfo?.lessons?.filter(
                    item =>
                        item?.id?.toString()?.[0] ===
                        (level === 'Confident'
                            ? '5'
                            : level === 'Upper-Intermediate'
                            ? '4'
                            : level === 'Intermediate'
                            ? '3'
                            : level === 'Pre-Intermediate'
                            ? '2'
                            : '1'),
                ) || []
            );
        } else {
            return [];
        }
    };
    const B_LessonsDone = get_level_lessons({ level: 'Beginner' });
    const P_LessonsDone = get_level_lessons({ level: 'Pre-Intermediate' });
    const I_LessonsDone = get_level_lessons({ level: 'Intermediate' });
    const U_LessonsDone = get_level_lessons({ level: 'Upper-Intermediate' });
    const C_LessonsDone = get_level_lessons({ level: 'Confident' });

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

    const get_lessons_done = () => {
        switch (UserInfo?.level) {
            case 'Beginner':
                return [...B_LessonsDone];
            case 'Pre-Intermediate':
                return [...B_LessonsDone, ...P_LessonsDone];
            case 'Intermediate':
                return [...B_LessonsDone, ...P_LessonsDone, ...I_LessonsDone];
            case 'Upper-Intermediate':
                return [
                    ...B_LessonsDone,
                    ...P_LessonsDone,
                    ...I_LessonsDone,
                    ...U_LessonsDone,
                ];
            case 'Confident':
                return [
                    ...B_LessonsDone,
                    ...P_LessonsDone,
                    ...I_LessonsDone,
                    ...U_LessonsDone,
                    ...C_LessonsDone,
                ];
            default:
                return [...B_LessonsDone];
        }
    };
    const lessons: {
        _id?: string | undefined;
        id?: number | undefined;
        score?: number | null | undefined;
    }[] = get_lessons_done();

    return (
        <View style={styles.report_main}>
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
                    inputText="Report"
                    textSize={20}
                    textWeight={700}
                    marginLeft={10}
                />
            </View>
            <ScrollView
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingTop: 30,
                    marginHorizontal: 2,
                    marginBottom:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_false: 25,
                                  if_true: 10,
                              })
                            : 5,
                }}>
                <View
                    style={{
                        height: 150,
                        backgroundColor: Colors.DarkPurple,
                        borderRadius: 20,
                        flexDirection: 'row',
                    }}>
                    <SimpleBIcon
                        width={60}
                        height={60}
                        color={Colors.Primary}
                        style={{
                            marginLeft: 22,
                            marginTop: 25,
                        }}
                    />
                    <View
                        style={{
                            marginLeft: 24,
                            marginTop: 12,
                            alignItems: 'center',
                        }}>
                        <BasicText
                            inputText="You’re on Fire"
                            textAlign="center"
                            textSize={20}
                            textWeight={700}
                            textColor={Colors.White}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 5,
                            }}>
                            <FireIcon width={22} height={22} />
                            <BasicText
                                inputText={get_day_from_date({
                                    input_date: new Date(Date.now()),
                                })?.toString()}
                                textSize={20}
                                textWeight={700}
                                textColor={Colors.White}
                                marginTop={2}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 10,
                            }}>
                            {[...Array(7)]?.map((item, index) => (
                                <CheckMark
                                    key={index}
                                    day_num={index + 1}
                                    isCompleted={
                                        get_day_from_date({
                                            input_date: new Date(Date.now()),
                                        }) >=
                                        index + 1
                                    }
                                />
                            ))}
                        </View>
                        <BasicText
                            inputText="Keep Going!"
                            textSize={12}
                            marginTop={7}
                            textWeight={600}
                            textColor={Colors.White}
                        />
                    </View>
                </View>
                <BasicText
                    inputText="Completed Lessons"
                    textSize={20}
                    marginTop={40}
                    textWeight={700}
                />
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View
                        style={{
                            backgroundColor: Colors.Yellow,
                            borderRadius: 10,
                            padding: 10,
                            flexDirection: 'row',
                            height: 100,
                            flex: 1,
                        }}>
                        <Image
                            source={screen_width_less_than({
                                if_false: require('../../Images/Lessons/Lessons.png'),
                                if_true: require('../../Images/Lessons/Lessons_Single.png'),
                            })}
                            style={{
                                width: screen_height_less_than({
                                    if_false: 155,
                                    if_true: 80,
                                }),
                                height: 80,
                                alignSelf: 'center',
                            }}
                        />
                        <View
                            style={{
                                alignSelf: 'center',
                                marginLeft: 'auto',
                                marginRight: 5,
                            }}>
                            <BasicText
                                inputText={`${lessons?.length} Lesson${
                                    lessons?.length === 1 ? '' : 's'
                                } Done`}
                                textSize={14}
                                textWeight={500}
                            />
                            <BasicText
                                inputText={`Total: ${
                                    lessons?.length *
                                        (UserInfo?.study_target as number) ===
                                    60
                                        ? 60
                                        : 30
                                }mins`}
                                textSize={16}
                                textWeight={700}
                                marginTop={10}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            no_double_clicks({
                                execFunc: () => {
                                    navigation.push(
                                        'HomeStack' as never,
                                        {
                                            screen: 'LessonArchivePage',
                                        } as never,
                                    );
                                },
                            })({})
                        }
                        activeOpacity={0.5}
                        style={{
                            width: 22,
                            height: 50,
                            backgroundColor: Colors.Yellow,
                            marginLeft: 10,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}>
                        <Feather
                            name="chevron-right"
                            color={Colors.Dark}
                            size={23}
                        />
                    </TouchableOpacity>
                </View>
                <BasicText
                    inputText="Completed Homeworks"
                    textSize={20}
                    marginTop={40}
                    textWeight={700}
                />
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View
                        style={{
                            backgroundColor: Colors.Primary,
                            borderRadius: 10,
                            padding: 10,
                            flexDirection: 'row',
                            height: 100,
                            flex: 1,
                        }}>
                        <Image
                            source={screen_width_less_than({
                                if_false: require('../../Images/Lessons/Lessons.png'),
                                if_true: require('../../Images/Lessons/Lessons_Single.png'),
                            })}
                            style={{
                                width: screen_height_less_than({
                                    if_false: 155,
                                    if_true: 80,
                                }),
                                height: 80,
                                alignSelf: 'center',
                            }}
                        />
                        <View
                            style={{
                                alignSelf: 'center',
                                marginLeft: 'auto',
                                marginRight: 5,
                            }}>
                            <BasicText
                                inputText={`${HwrkDone?.length} Homework${
                                    HwrkDone?.length === 1 ? '' : 's'
                                } Done`}
                                textSize={14}
                                textWeight={500}
                                textColor={Colors.White}
                            />
                            <BasicText
                                inputText={`Success Rate: ${calculate_average({
                                    scores_data: HwrkDone || [],
                                })}%`}
                                textSize={16}
                                textWeight={700}
                                marginTop={10}
                                textColor={Colors.Green2}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            no_double_clicks({
                                execFunc: () => {
                                    navigation.push(
                                        'HomeStack' as never,
                                        {
                                            screen: 'HomeWorkArchivePage',
                                        } as never,
                                    );
                                },
                            })({})
                        }
                        activeOpacity={0.5}
                        style={{
                            width: 22,
                            height: 50,
                            backgroundColor: Colors.Primary,
                            marginLeft: 10,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}>
                        <Feather
                            name="chevron-right"
                            color={Colors.White}
                            size={23}
                        />
                    </TouchableOpacity>
                </View>
                <BasicText
                    inputText="Completed Exams"
                    textSize={20}
                    marginTop={40}
                    textWeight={700}
                />
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View
                        style={{
                            backgroundColor: Colors.Orange,
                            borderRadius: 10,
                            padding: 10,
                            flexDirection: 'row',
                            height: 100,
                            flex: 1,
                        }}>
                        <Image
                            source={screen_width_less_than({
                                if_false: require('../../Images/Lessons/Lessons.png'),
                                if_true: require('../../Images/Lessons/Lessons_Single.png'),
                            })}
                            style={{
                                width: screen_height_less_than({
                                    if_false: 155,
                                    if_true: 80,
                                }),
                                height: 80,
                                alignSelf: 'center',
                            }}
                        />
                        <View
                            style={{
                                alignSelf: 'center',
                                marginLeft: 'auto',
                                marginRight: 5,
                            }}>
                            <BasicText
                                inputText={`${ExamsDone?.length} Exam${
                                    ExamsDone?.length === 1 ? '' : 's'
                                } Done`}
                                textSize={14}
                                textWeight={500}
                                textColor={Colors.White}
                            />
                            <BasicText
                                inputText={`Success Rate: ${calculate_average({
                                    scores_data: ExamsDone || [],
                                })}%`}
                                textSize={16}
                                textWeight={700}
                                marginTop={10}
                                textColor={Colors.White}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            no_double_clicks({
                                execFunc: () => {
                                    navigation.push(
                                        'HomeStack' as never,
                                        {
                                            screen: 'ExamArchivePage',
                                        } as never,
                                    );
                                },
                            })({})
                        }
                        activeOpacity={0.5}
                        style={{
                            width: 22,
                            height: 50,
                            backgroundColor: Colors.Orange,
                            marginLeft: 10,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}>
                        <Feather
                            name="chevron-right"
                            color={Colors.White}
                            size={23}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 50 }}>{''}</View>
            </ScrollView>
        </View>
    );
});

export default ReportPage;

const styles = StyleSheet.create({
    report_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
