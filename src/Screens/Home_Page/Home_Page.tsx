import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import StarIcon from '../../Images/SVGs/Star_Icon.svg';
import ProgressBar from '../../Components/Progress_Bar/Progress_Bar';
import SimpleBIcon from '../../Images/SVGs/Simple_B_Icon.svg';
import FireIcon from '../../Images/SVGs/Fire_Icon.svg';
import CheckMark from '../../Components/Check_Mark/Check_Mark';
import Feather from 'react-native-vector-icons/Feather';
import VocabularyIcon from '../../Images/SVGs/Vocabulary_Icon.svg';
import StatsReportIcon from '../../Images/SVGs/Stats_Report_Icon.svg';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { http_link_fix } from '../../Utils/HTTP_Link_Fix/HTTP_Link_Fix';
import { get_day_from_date } from '../../Utils/Get_Day_From_Date/Get_Day_From_Date';
import {
    BeginnerL,
    ConfidentL,
    IntermediateL,
    PreIntermediateL,
    UpperIntermediateL,
} from '../../Data/Lessons_Topics/Lessons_Topics';
import { INTF_AssignedClass } from '../../Interface/Assigned_Class/Assigned_Class';
import BasicButton from '../../Components/Basic_Button/Basic_Button';

const HomePage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const UserLevel = UserInfoStore?.user_info?.level || 'Beginner';

    const [examTShow, setExamTShow] = useState<INTF_AssignedClass>(null);

    const noOfLessons =
        UserLevel === 'Confident'
            ? ConfidentL
            : UserLevel === 'Upper-Intermediate'
            ? UpperIntermediateL
            : UserLevel === 'Intermediate'
            ? IntermediateL
            : UserLevel === 'Pre-Intermediate'
            ? PreIntermediateL
            : BeginnerL;

    const noOfHWDone = UserInfoStore?.user_info?.lessons?.filter(
        obj =>
            obj?.score !== null &&
            obj?.score !== undefined &&
            obj?.id?.toString()?.[0] ===
                (UserLevel === 'Confident'
                    ? '5'
                    : UserLevel === 'Upper-Intermediate'
                    ? '4'
                    : UserLevel === 'Intermediate'
                    ? '3'
                    : UserLevel === 'Pre-Intermediate'
                    ? '2'
                    : '1'),
    );

    const take_exam = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'ExamQPage',
                    params: { CurrentLevel: examTShow },
                } as never,
            );
        },
    });

    const get_level_number = () => {
        switch (UserInfoStore?.user_info?.level) {
            case 'Beginner':
                return '1';
            case 'Pre-Intermediate':
                return '2';
            case 'Intermediate':
                return '3';
            case 'Upper-Intermediate':
                return '4';
            case 'Confident':
                return '5';
            default:
                return '1';
        }
    };

    useEffect(() => {
        const calculate_hw_avg = () => {
            if (
                noOfHWDone !== undefined &&
                noOfHWDone?.length === noOfLessons
            ) {
                const calculateAverage = ({
                    scores,
                }: {
                    scores: { _id: string; id: number; score: number }[];
                }) => {
                    if (scores.length === 0) {
                        return 0;
                    }
                    const sum = scores.reduce(
                        (total, score) => total + (score.score || 0),
                        0,
                    );
                    const average = sum / scores.length;
                    return Math.floor(average);
                };
                return calculateAverage({
                    scores: noOfHWDone as {
                        _id: string;
                        id: number;
                        score: number;
                    }[],
                });
            }
        };

        if (
            (UserInfoStore?.user_info?.lessons?.filter(
                obj => obj?.score !== null && obj?.score !== undefined,
            )?.length || 0) === noOfLessons &&
            (calculate_hw_avg() || 0) >= 70
        ) {
            if (
                UserInfoStore?.user_info?.level ===
                UserInfoStore?.user_info?.initialLevel
            ) {
                if (
                    UserInfoStore?.user_info?.level === 'Confident' &&
                    (UserInfoStore?.user_info?.exams?.filter(
                        item => item?.level === 'Confident',
                    )?.[0]?.score || 0) >= 70
                ) {
                    setExamTShow(null);
                } else {
                    setExamTShow(
                        UserInfoStore.user_info?.level as INTF_AssignedClass,
                    );
                }
            } else {
                const return_prev_level = (): INTF_AssignedClass => {
                    switch (UserInfoStore?.user_info?.level) {
                        case 'Pre-Intermediate':
                            return 'Beginner';
                        case 'Intermediate':
                            return 'Pre-Intermediate';
                        case 'Upper-Intermediate':
                            return 'Intermediate';
                        case 'Confident':
                            return 'Upper-Intermediate';
                        default:
                            return 'Beginner';
                    }
                };

                if (
                    UserInfoStore?.user_info?.level === 'Confident' &&
                    (UserInfoStore?.user_info?.exams?.filter(
                        item => item?.level === 'Confident',
                    )?.[0]?.score || 0) >= 70
                ) {
                    setExamTShow(null);
                } else {
                    if (
                        (UserInfoStore?.user_info?.exams?.filter(
                            item => item?.level === return_prev_level(),
                        )?.[0]?.score || 0) >= 70
                    ) {
                        setExamTShow(UserInfoStore.user_info?.level || null);
                    }
                }
            }
        } else {
            setExamTShow(null);
        }
    }, [examTShow, noOfHWDone, noOfLessons]);

    return (
        <View style={styles.home_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View style={styles.h_header_cont}>
                <View style={styles.h_header_txt_c}>
                    <BasicText
                        inputText={`Hello, ${
                            UserInfoStore?.user_info?.fullname?.split(' ')?.[0]
                        }`}
                        textSize={22}
                        textWeight={700}
                    />
                    <BasicText
                        inputText={`${
                            noOfHWDone?.length !==
                            UserInfoStore?.user_info?.lessons?.filter(
                                item =>
                                    item?.id?.toString()?.[0] ===
                                    (UserLevel === 'Confident'
                                        ? '5'
                                        : UserLevel === 'Upper-Intermediate'
                                        ? '4'
                                        : UserLevel === 'Intermediate'
                                        ? '3'
                                        : UserLevel === 'Pre-Intermediate'
                                        ? '2'
                                        : '1'),
                            )?.length
                                ? '1'
                                : 'No'
                        } Pending Homework`}
                        textSize={14}
                        textFamily={fonts.OpenSans_400}
                    />
                </View>
                <Image
                    source={
                        UserInfoStore?.user_info?.dp?.url
                            ? {
                                  uri: http_link_fix({
                                      http_link: UserInfoStore?.user_info?.dp
                                          ?.url as string,
                                  }),
                              }
                            : require('../../Images/Extra/default_user_dp_light.jpg')
                    }
                    style={styles.h_header_img}
                />
            </View>
            <ScrollView
                style={{
                    flex: 1,
                    paddingHorizontal: 18,
                    paddingTop: 22,
                    marginHorizontal: 2,
                }}>
                <View
                    style={{
                        height: 140,
                        backgroundColor: Colors.DarkPurple,
                        borderRadius: 20,
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            marginLeft: 25,
                            marginTop: 30,
                            zIndex: 1,
                        }}>
                        <BasicText
                            inputText="Assigned Class"
                            textColor={Colors.White}
                            textWeight={700}
                            textSize={20}
                        />
                        <View
                            style={{
                                backgroundColor: Colors.Primary,
                                minWidth: 133,
                                height: 42,
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 11,
                                flexDirection: 'row',
                                paddingLeft: 10,
                                paddingRight: 4,
                            }}>
                            <BasicText
                                inputText={UserLevel}
                                textColor={Colors.White}
                                textWeight={600}
                                textSize={17}
                                marginRight={3}
                            />
                        </View>
                    </View>
                    <Image
                        source={require('../../Images/Home/HPA_1.png')}
                        style={{
                            width: 180,
                            height: 133,
                            resizeMode: 'contain',
                            marginLeft: 'auto',
                            marginRight: 20,
                            marginTop: 'auto',
                        }}
                    />
                </View>
                {examTShow !== null && (
                    <>
                        <BasicText
                            inputText={`${examTShow} Exam`}
                            textColor={Colors.Black}
                            textWeight={700}
                            textSize={20}
                            marginTop={24}
                            marginBottom={10}
                        />
                        <BasicButton
                            buttonText="Take Exam"
                            execFunc={() => take_exam({})}
                        />
                    </>
                )}
                <BasicText
                    inputText="Access Classroom"
                    textColor={Colors.Black}
                    textWeight={700}
                    textSize={20}
                    marginTop={24}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 14,
                        marginBottom: 30,
                    }}>
                    <View
                        style={{
                            flex: 1,
                            marginRight: 11,
                        }}>
                        <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    navigation.navigate(
                                        'HomeTab' as never,
                                        {
                                            screen: 'LessonPage',
                                        } as never,
                                    );
                                },
                            })}
                            activeOpacity={0.55}
                            style={{
                                backgroundColor: Colors.Primary,
                                height: 145,
                                borderRadius: 15,
                            }}>
                            <BasicText
                                inputText="Lessons"
                                textWeight={700}
                                textColor={Colors.White}
                                marginTop={17}
                                marginLeft={17}
                                textSize={19}
                            />
                            <ProgressBar
                                marginTop={15}
                                progress={
                                    ((UserInfoStore?.user_info?.lessons?.filter(
                                        obj =>
                                            obj?.id
                                                ?.toString()
                                                .startsWith(get_level_number()),
                                    )?.length || 0) /
                                        noOfLessons) *
                                    100
                                }
                                height={4}
                                backgroundColor={Colors.White}
                                progressBackgroundColor={Colors.DeepBlue}
                                marginHorizontal={17}
                            />
                            <BasicText
                                inputText={`${
                                    UserInfoStore?.user_info?.lessons?.filter(
                                        obj =>
                                            obj?.id
                                                ?.toString()
                                                .startsWith(get_level_number()),
                                    )?.length
                                }/${noOfLessons}`}
                                textWeight={700}
                                textColor={Colors.White}
                                marginTop={5}
                                marginLeft={17}
                                textSize={15}
                            />
                            <Image
                                source={require('../../Images/Home/HPA_3.png')}
                                style={{
                                    width: 100,
                                    height: 80,
                                    resizeMode: 'contain',
                                    position: 'absolute',
                                    bottom: -3.5,
                                    right: 10,
                                }}
                            />
                            <StarIcon
                                width={35}
                                height={35}
                                color={Colors.White}
                                style={{
                                    position: 'absolute',
                                    bottom: 11,
                                    left: 20,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    navigation.navigate(
                                        'HomeTab' as never,
                                        {
                                            screen: 'HomeWorkPage',
                                        } as never,
                                    );
                                },
                            })}
                            activeOpacity={0.55}
                            style={{
                                backgroundColor: Colors.LightPrimary,
                                marginTop: 25,
                                height: 145,
                                borderRadius: 15,
                            }}>
                            <BasicText
                                inputText="Homework"
                                textWeight={700}
                                textColor={Colors.Primary}
                                marginTop={17}
                                marginLeft={17}
                                textSize={19}
                            />
                            <ProgressBar
                                marginTop={15}
                                progress={Math.floor(
                                    ((noOfHWDone?.length || 0) / noOfLessons) *
                                        100,
                                )}
                                height={4}
                                backgroundColor={Colors.White}
                                progressBackgroundColor={Colors.DeepBlue}
                                marginHorizontal={17}
                            />
                            <BasicText
                                inputText={
                                    Math.floor(
                                        ((noOfHWDone?.length || 0) /
                                            noOfLessons) *
                                            100,
                                    )?.toString() + '%'
                                }
                                textColor={Colors.Primary}
                                marginTop={5}
                                marginLeft={17}
                                textSize={15}
                                textFamily={fonts.OpenSans_700}
                            />
                            <Image
                                source={require('../../Images/Home/HPA_4.png')}
                                style={{
                                    width: 100,
                                    height: 72,
                                    resizeMode: 'contain',
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 10,
                                }}
                            />
                            <StarIcon
                                width={35}
                                height={35}
                                color={Colors.Primary}
                                style={{
                                    position: 'absolute',
                                    bottom: 11,
                                    left: 20,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 11,
                        }}>
                        <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    navigation.push(
                                        'HomeStack' as never,
                                        {
                                            screen: 'VocabularyPage',
                                        } as never,
                                    );
                                },
                            })}
                            activeOpacity={0.55}
                            style={{
                                backgroundColor: Colors.Pink,
                                height: 206,
                                borderRadius: 15,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 15,
                                    marginLeft: 17,
                                    marginRight: 17,
                                }}>
                                <BasicText
                                    inputText="Vocabulary"
                                    textWeight={700}
                                    textColor={Colors.White}
                                    textSize={19}
                                />
                                <Feather
                                    name="chevron-right"
                                    color={Colors.White}
                                    size={25}
                                    style={{
                                        marginTop: 2,
                                    }}
                                />
                            </View>
                            <BasicText
                                inputText="Learn new English Words"
                                textColor={Colors.White}
                                textSize={12}
                                textWeight={700}
                                marginTop={5}
                                marginLeft={17}
                                marginRight={17}
                                width={135}
                            />
                            <VocabularyIcon
                                style={{
                                    width: 100,
                                    height: 100,
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    bottom: -3,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.55}
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    navigation.push(
                                        'HomeStack' as never,
                                        {
                                            screen: 'ReportPage',
                                        } as never,
                                    );
                                },
                            })}
                            style={{
                                backgroundColor: Colors.LightPrimary,
                                marginTop: 25,
                                height: 84,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <BasicText
                                    inputText="View Report"
                                    textColor={Colors.Primary}
                                    textSize={20}
                                    textWeight={700}
                                    marginLeft={'auto'}
                                    marginRight={'auto'}
                                />
                                <StatsReportIcon
                                    color={Colors.Primary}
                                    width={22}
                                    height={22}
                                    style={{
                                        marginLeft: 3,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        height: 140,
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
                            textWeight={700}
                            textColor={Colors.White}
                            textSize={20}
                            textAlign="center"
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
                                textFamily={fonts.OpenSans_700}
                                textColor={Colors.White}
                                textSize={20}
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
                    </View>
                </View>
                <View style={{ marginBottom: 50 }}>{''}</View>
            </ScrollView>
        </View>
    );
});

export default HomePage;

const styles = StyleSheet.create({
    home_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    h_header_cont: {
        height:
            Platform.OS === 'ios'
                ? screen_height_less_than({
                      if_true: 90,
                      if_false: 120,
                  })
                : 75,
        paddingLeft: 22,
        backgroundColor: Colors.Background,
        shadowColor:
            Platform.OS === 'ios'
                ? 'rgba(0 ,0 ,0 , 0.35)'
                : 'rgba(0 ,0 ,0 , 0.9)',
        shadowOffset: {
            width: 1,
            height: Platform.OS === 'ios' ? 1 : 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3.27,
        elevation: 3,
        flexDirection: 'row',
    },
    h_header_txt_c: {
        marginTop: 'auto',
        marginBottom: 12,
    },
    h_header_img: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
        marginRight: 22,
        marginTop: 'auto',
        marginBottom: 12,
        borderRadius: 50,
    },
});
