import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { observer } from 'mobx-react';
import { INTF_HomeWork } from '../../Interface/HomeWork/HomeWork';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { alphabets } from '../../Data/Alphabets/Alphabets';
import {
    Beginner,
    Intermediate,
    PreIntermediate,
    UpperIntermediate,
    Confident,
} from '../../Data/HomeWork/Homework';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../../Components/Back_Button/Back_Button';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import MiniAvatar from '../../Components/Mini_Avatar/Mini_Avatar';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import Sound from 'react-native-sound';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';

const HomeWorkQPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();
    Sound.setCategory('Playback');
    const CurrentLevel = route.params?.user_level || 'Beginner';

    const [userScore, setUserScore] = useState<number>(0);
    const [questions, setQuestions] = useState<INTF_HomeWork[]>([]);
    const noOfQuestions = questions?.length;
    const [currentQ, setCurrentQ] = useState<number>(0);
    const [answer, setAnswer] = useState<string>('');
    const [canAnswer, setCanAnswer] = useState<boolean>(true);
    const [answerUI, setAnswerUI] = useState<'NoChange' | 'Correct' | 'Wrong'>(
        'NoChange',
    );

    const select_answers = no_double_clicks({
        execFunc: ({ selected }: { selected: string }) => {
            if (answer === selected) {
                setAnswer('');
            } else {
                setAnswer(selected);
            }
        },
    });

    const speak_question = no_double_clicks({
        execFunc: () => {
            TextToSpeechStore.clear_speech();
            if (currentQ < noOfQuestions) {
                TextToSpeechStore.play_speech({
                    speech: questions[currentQ]?.question?.replace(
                        /____/g,
                        'dash',
                    ),
                });
            }
        },
    });

    const on_press_next = no_double_clicks({
        execFunc: () => {
            if (currentQ < noOfQuestions) {
                const nextQuestion = () => {
                    setAnswer('');
                    setAnswerUI('NoChange');
                    setCurrentQ(
                        clamp_value({
                            value: currentQ + 1,
                            minValue: 0,
                            maxValue: noOfQuestions,
                        }),
                    );
                    setCanAnswer(true);
                };

                if (canAnswer) {
                    if (answer) {
                        setCanAnswer(false);
                        if (answer === questions[currentQ].answer) {
                            setUserScore(userScore + 1);
                            setAnswerUI('Correct');
                            const correct_sound = new Sound(
                                'correct.mp3',
                                Sound.MAIN_BUNDLE,
                                error => {
                                    if (error) {
                                        nextQuestion();
                                    } else {
                                        correct_sound.play(success => {
                                            if (success) {
                                                nextQuestion();
                                            } else {
                                                nextQuestion();
                                            }
                                        });
                                    }
                                },
                            );
                        } else {
                            setAnswerUI('Wrong');
                            const wrong_sound = new Sound(
                                'incorrect.mp3',
                                Sound.MAIN_BUNDLE,
                                error => {
                                    if (error) {
                                        nextQuestion();
                                    } else {
                                        wrong_sound.play(success => {
                                            if (success) {
                                                nextQuestion();
                                            } else {
                                                nextQuestion();
                                            }
                                        });
                                    }
                                },
                            );
                        }
                    } else {
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'One Answer is required for this Question!',
                        });
                    }
                }
            } else {
                if (noOfQuestions > 1) {
                    if (route.params?.retake) {
                        if (
                            Math.floor((userScore / noOfQuestions) * 100) >
                            (UserInfoStore?.user_info?.lessons?.filter(
                                item => item?.id === route.params?.lesson_id,
                            )?.[0]?.score || 0)
                        ) {
                            navigation.push(
                                'HomeStack' as never,
                                {
                                    screen: 'CongratulationsPage',
                                    params: {
                                        header_txt: 'Homework Completed.',
                                        message_txt: `You scored ${Math.floor(
                                            (userScore / noOfQuestions) * 100,
                                        )}%`,
                                        nextPage: 6,
                                        hide_back_btn: true,
                                        lesson_id: route.params?.lesson_id,
                                        lesson_score: Math.floor(
                                            (userScore / noOfQuestions) * 100,
                                        ),
                                    },
                                } as never,
                            );
                        } else {
                            navigation.push(
                                'HomeStack' as never,
                                {
                                    screen: 'CongratulationsPage',
                                    params: {
                                        header_txt: 'Homework Completed.',
                                        message_txt: `You scored ${Math.floor(
                                            (userScore / noOfQuestions) * 100,
                                        )}% which is less than or the same as your previous score.`,
                                        nextPage: 3,
                                        hide_back_btn: true,
                                        hide_emoji: true,
                                        disable_sound: true,
                                    },
                                } as never,
                            );
                        }
                    } else {
                        navigation.push(
                            'HomeStack' as never,
                            {
                                screen: 'CongratulationsPage',
                                params: {
                                    header_txt: 'Homework Completed.',
                                    message_txt: `You scored ${Math.floor(
                                        (userScore / noOfQuestions) * 100,
                                    )}%`,
                                    nextPage: 6,
                                    hide_back_btn: true,
                                    lesson_id: route.params?.lesson_id,
                                    lesson_score: Math.floor(
                                        (userScore / noOfQuestions) * 100,
                                    ),
                                },
                            } as never,
                        );
                    }
                }
            }
        },
        debounceTime: 1200,
    });

    useEffect(() => {
        TextToSpeechStore.clear_speech();
        if (currentQ < noOfQuestions) {
            TextToSpeechStore.play_speech({
                speech: questions[currentQ]?.question?.replace(/____/g, 'dash'),
            });
        } else {
            if (noOfQuestions > 1) {
                if (route.params?.retake) {
                    if (
                        Math.floor((userScore / noOfQuestions) * 100) >
                        (UserInfoStore?.user_info?.lessons?.filter(
                            item => item?.id === route.params?.lesson_id,
                        )?.[0]?.score || 0)
                    ) {
                        navigation.push(
                            'HomeStack' as never,
                            {
                                screen: 'CongratulationsPage',
                                params: {
                                    header_txt: 'Homework Completed.',
                                    message_txt: `You scored ${Math.floor(
                                        (userScore / noOfQuestions) * 100,
                                    )}%`,
                                    nextPage: 6,
                                    hide_back_btn: true,
                                    lesson_id: route.params?.lesson_id,
                                    lesson_score: Math.floor(
                                        (userScore / noOfQuestions) * 100,
                                    ),
                                },
                            } as never,
                        );
                    } else {
                        navigation.push(
                            'HomeStack' as never,
                            {
                                screen: 'CongratulationsPage',
                                params: {
                                    header_txt: 'Homework Completed.',
                                    message_txt: `You scored ${Math.floor(
                                        (userScore / noOfQuestions) * 100,
                                    )}% which is less than or the same as your previous score.`,
                                    nextPage: 3,
                                    hide_back_btn: true,
                                    hide_emoji: true,
                                    disable_sound: true,
                                },
                            } as never,
                        );
                    }
                } else {
                    navigation.push(
                        'HomeStack' as never,
                        {
                            screen: 'CongratulationsPage',
                            params: {
                                header_txt: 'Homework Completed.',
                                message_txt: `You scored ${Math.floor(
                                    (userScore / noOfQuestions) * 100,
                                )}%`,
                                nextPage: 6,
                                hide_back_btn: true,
                                lesson_id: route.params?.lesson_id,
                                lesson_score: Math.floor(
                                    (userScore / noOfQuestions) * 100,
                                ),
                            },
                        } as never,
                    );
                }
            }
        }
    }, [
        currentQ,
        questions,
        noOfQuestions,
        userScore,
        navigation,
        route.params,
    ]);

    useEffect(() => {
        switch (CurrentLevel) {
            case 'Beginner':
                setQuestions(
                    Beginner.filter(
                        item => item.lesson_id === route.params?.lesson_id,
                    ),
                );
                break;
            case 'Pre-Intermediate':
                setQuestions(
                    PreIntermediate.filter(
                        item => item.lesson_id === route.params?.lesson_id,
                    ),
                );
                break;
            case 'Intermediate':
                setQuestions(
                    Intermediate.filter(
                        item => item.lesson_id === route.params?.lesson_id,
                    ),
                );
                break;
            case 'Upper-Intermediate':
                setQuestions(
                    UpperIntermediate.filter(
                        item => item.lesson_id === route.params?.lesson_id,
                    ),
                );
                break;
            case 'Confident':
                setQuestions(
                    Confident.filter(
                        item => item.lesson_id === route.params?.lesson_id,
                    ),
                );
                break;
            default:
                setQuestions(
                    Beginner.filter(
                        item => item.lesson_id === route.params?.lesson_id,
                    ),
                );
                break;
        }
    }, [CurrentLevel, route.params?.lesson_id]);

    return (
        <View style={styles.hw_main}>
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
                    inputText="HomeWork"
                    textSize={20}
                    textWeight={700}
                    marginLeft={10}
                />
            </View>
            <MiniAvatar
                marginTop={15}
                marginBottom={4}
                marginHorizontal={22}
                isSubtitleIcon
                onPressVoice={speak_question}
                isHomeWork
            />
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        marginTop: 30,
                        marginBottom: 40,
                        marginHorizontal: 22,
                    }}>
                    {questions[currentQ]?.question ? (
                        <View
                            style={{
                                marginTop: 0,
                                marginBottom: 0,
                            }}>
                            <BasicText
                                inputText={questions[currentQ].question}
                                textSize={18}
                                marginTop={4}
                                marginBottom={40}
                            />
                            {questions[currentQ].options?.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        select_answers({ selected: item })
                                    }
                                    style={{
                                        flexDirection: 'row',
                                        borderWidth: 1,
                                        marginBottom: 8,
                                        padding: 5,
                                        borderColor:
                                            answer === item
                                                ? answerUI === 'Wrong'
                                                    ? Colors.TestRed
                                                    : answerUI === 'Correct'
                                                    ? Colors.Green3
                                                    : Colors.Primary
                                                : Colors.Grey,
                                        borderRadius: 10,
                                        backgroundColor:
                                            answer === item
                                                ? answerUI === 'Wrong'
                                                    ? Colors.TestRed
                                                    : answerUI === 'Correct'
                                                    ? Colors.Green3
                                                    : Colors.Primary
                                                : undefined,
                                        paddingVertical: 5,
                                        minHeight: 51,
                                        alignItems: 'center',
                                    }}>
                                    <BasicText
                                        inputText={alphabets[index]}
                                        marginRight={10}
                                        marginLeft={3}
                                        textWeight={700}
                                        textSize={20}
                                        textColor={
                                            answer === item
                                                ? Colors.White
                                                : Colors.Dark
                                        }
                                    />
                                    <View style={{ flex: 1 }}>
                                        <BasicText
                                            inputText={item}
                                            textSize={17}
                                            textColor={
                                                answer === item
                                                    ? Colors.White
                                                    : Colors.Dark
                                            }
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <BasicText inputText="Loading..." />
                        </View>
                    )}
                </View>
            </ScrollView>
            <BasicButton
                buttonText="Next"
                marginHorizontal={22}
                marginBottom={screen_height_less_than({
                    if_true: 10,
                    if_false: 35,
                })}
                marginTop={3}
                execFunc={() => on_press_next({})}
                disableDebounce={false}
            />
        </View>
    );
});

export default HomeWorkQPage;

const styles = StyleSheet.create({
    hw_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
