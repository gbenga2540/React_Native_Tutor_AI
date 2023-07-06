import React, { FunctionComponent, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { INTF_LessonTopics } from '../../Interface/Lesson/Lesson';
import {
    Beginner,
    BeginnerL,
    Confident,
    ConfidentL,
    Intermediate,
    IntermediateL,
    PreIntermediate,
    PreIntermediateL,
    UpperIntermediate,
    UpperIntermediateL,
} from '../../Data/Lessons_Topics/Lessons_Topics';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { observer } from 'mobx-react';
import HomeWorkIcon from '../../Components/Home_Work_Icon/Home_Work_Icon';

const HomeWorkPage: FunctionComponent = observer(() => {
    const CurrentLevel = UserInfoStore?.user_info?.level || 'Beginner';
    const [currentLessons, setCurrentLessons] =
        useState<INTF_LessonTopics[]>(Beginner);

    const UserLessonsScore = UserInfoStore?.user_info?.lessons || [];
    const UserLevel = UserInfoStore?.user_info?.level || 'Beginner';

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

    const show_homework_icon = ({ lesson_id }: { lesson_id: number }) => {
        const currentLesson = UserLessonsScore?.filter(
            l_score => l_score?.id === lesson_id,
        );
        if (currentLesson?.length > 0) {
            if (
                currentLesson[0]?.id === 101 ||
                currentLesson[0]?.id === 201 ||
                currentLesson[0]?.id === 301 ||
                currentLesson[0]?.id === 401 ||
                currentLesson[0]?.id === 501
            ) {
                return true;
            } else {
                if (
                    UserLessonsScore?.filter(
                        item => item?.id === lesson_id - 1,
                    )?.[0]?.score === null ||
                    UserLessonsScore?.filter(
                        item => item?.id === lesson_id - 1,
                    )?.[0]?.score === undefined
                ) {
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            return false;
        }
    };

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
        switch (CurrentLevel) {
            case 'Beginner':
                setCurrentLessons(Beginner);
                break;
            case 'Pre-Intermediate':
                setCurrentLessons(PreIntermediate);
                break;
            case 'Intermediate':
                setCurrentLessons(Intermediate);
                break;
            case 'Upper-Intermediate':
                setCurrentLessons(UpperIntermediate);
                break;
            case 'Confident':
                setCurrentLessons(Confident);
                break;
            default:
                setCurrentLessons(Beginner);
                break;
        }
    }, [CurrentLevel]);

    return (
        <View style={styles.hw_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View style={styles.l_header_cont}>
                <BasicText
                    inputText="Homework"
                    marginBottom={18}
                    marginTop={'auto'}
                    textSize={25}
                    textWeight={700}
                />
            </View>
            <View
                style={{
                    alignSelf: 'center',
                    width: 250,
                    height: 100,
                    backgroundColor: Colors.LightPrimary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    borderRadius: 15,
                    marginBottom: 3,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            backgroundColor: Colors.Primary,
                            minWidth: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 3,
                            borderRadius: 5,
                        }}>
                        <BasicText
                            inputText={(
                                UserInfoStore?.user_info?.lessons?.filter(
                                    obj =>
                                        obj?.score !== null &&
                                        obj?.score !== undefined &&
                                        obj?.id?.toString()?.[0] ===
                                            get_level_number(),
                                )?.length || 0
                            )?.toString()}
                            textWeight={700}
                            textSize={16}
                            marginTop={3}
                            textColor={Colors.White}
                        />
                    </View>
                    <BasicText
                        inputText=" / "
                        textWeight={700}
                        textSize={20}
                        marginTop={3}
                        textColor={Colors.Primary}
                    />
                    <View
                        style={{
                            backgroundColor: Colors.Primary,
                            minWidth: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 3,
                            borderRadius: 5,
                        }}>
                        <BasicText
                            inputText={noOfLessons?.toString()}
                            textWeight={700}
                            textSize={16}
                            marginTop={3}
                            textColor={Colors.White}
                        />
                    </View>
                </View>
                <BasicText
                    inputText={
                        (UserInfoStore?.user_info?.lessons?.filter(
                            obj =>
                                obj?.score !== null &&
                                obj?.score !== undefined &&
                                obj?.id?.toString()?.[0] === get_level_number(),
                        )?.length || 0) === noOfLessons
                            ? 'Completed'
                            : 'Ongoing'
                    }
                    textWeight={700}
                    textSize={20}
                    marginTop={5}
                    textColor={Colors.Primary}
                />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        marginTop: 30,
                        marginBottom: 40,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                    {currentLessons?.length > 0 &&
                        currentLessons?.map((item, index) => (
                            <HomeWorkIcon
                                homework_index={item?.lesson_id}
                                key={index}
                                is_completed={
                                    !(
                                        UserLessonsScore?.filter(
                                            l_score =>
                                                l_score.id === item?.lesson_id,
                                        )?.[0]?.score === null ||
                                        UserLessonsScore?.filter(
                                            l_score =>
                                                l_score.id === item?.lesson_id,
                                        )?.[0]?.score === undefined
                                    )
                                }
                                marginLeft={7}
                                marginRight={7}
                                marginBottom={14}
                                show_icon={show_homework_icon({
                                    lesson_id: item?.lesson_id,
                                })}
                                userLevel={CurrentLevel}
                            />
                        ))}
                </View>
                {(UserInfoStore?.user_info?.lessons?.filter(
                    obj =>
                        obj?.score !== null &&
                        obj?.score !== undefined &&
                        obj?.id?.toString()?.[0] === get_level_number(),
                )?.length || 0) !== noOfLessons && (
                    <BasicText
                        inputText="Learn more Lessons to Unlock more Homeworks"
                        textAlign="center"
                        width={230}
                        marginLeft={'auto'}
                        marginRight={'auto'}
                    />
                )}
            </ScrollView>
        </View>
    );
});

export default HomeWorkPage;

const styles = StyleSheet.create({
    hw_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    l_header_cont: {
        height:
            Platform.OS === 'ios'
                ? screen_height_less_than({
                      if_true: 90,
                      if_false: 120,
                  })
                : 70,
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
    },
});
