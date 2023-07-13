import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import MiniAvatar from '../../Components/Mini_Avatar/Mini_Avatar';
import { observer } from 'mobx-react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import ProficiencyQuestion from '../../Components/Proficiency_Question/Proficiency_Question';
import {
    proficiency_answers,
    proficiency_test,
} from '../../Data/Tests/Proficiency';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { INTF_ProficiencyTest } from '../../Interface/Tests/Proficiency';
import { INTF_AssignedClass } from '../../Interface/Assigned_Class/Assigned_Class';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';
import { useNavigation } from '@react-navigation/native';
import { compare_array_contents } from '../../Utils/Compare_Array_Content/Compare_Array_Content';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { listening_test } from '../../Data/Tests/Listening';
import { INTF_ListeningTest } from '../../Interface/Tests/Listening';
import ListeningQuestion from '../../Components/Listening_Question/Listening_Question';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';
import { INTF_WritingTest } from '../../Interface/Tests/Writing';
import { writing_test } from '../../Data/Tests/Writing';
import WritingQuestion from '../../Components/Writing_Question/Writing_Question';
import { useMutation } from 'react-query';
import { update_level } from '../../Configs/Queries/Users/Users';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import SInfo from 'react-native-sensitive-info';
import { seconds_to_minutes } from '../../Utils/Seconds_To_Minutes/Seconds_To_Minutes';
import Sound from 'react-native-sound';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import { SpeechControllerStore } from '../../MobX/Speech_Controller/Speech_Controller';

const PreTestPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    Sound.setCategory('Playback');

    const [timer, setTimer] = useState<number>(1200);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [hasNav, setHasNav] = useState<boolean>(false);
    const [canAnswer, setCanAnswer] = useState<boolean>(true);

    const { mutate: update_level_mutate } = useMutation(update_level, {
        onMutate: () => {
            TextToSpeechStore.clear_speech();
            setDisableButton(true);
            setShowSpinner(true);
        },
        onSettled: async data => {
            setShowSpinner(false);
            setDisableButton(false);
            if (data?.error) {
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        "An error occured while trying to save User's Preferences!",
                    svr_error_mssg: data?.data,
                });
            } else {
                const TempUserInfo = UserInfoStore.user_info;

                const proceed = () => {
                    UserInfoStore.set_user_info({
                        user_info: {
                            ...TempUserInfo,
                            level: assignedLevel,
                        },
                    });

                    setHasNav(true);
                    navigation.push(
                        'AuthStack' as never,
                        {
                            screen: 'CongratulationsPage',
                            params: {
                                header_txt: 'You did well.',
                                message_txt: `You have been assigned to ${assignedLevel} Class.`,
                                nextPage: 4,
                                hide_back_btn: true,
                            },
                        } as never,
                    );
                };
                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_USER_INFO,
                        JSON.stringify({
                            user_info: {
                                ...TempUserInfo,
                                level: assignedLevel,
                            },
                        }),
                        {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        },
                    )
                        .catch((error: any) => {
                            error && proceed();
                        })
                        .then(() => {
                            proceed();
                        });
                } catch (err) {
                    proceed();
                }
            }
        },
    });

    // CONTROLS
    const [assignedLevel, setAssignedLevel] =
        useState<INTF_AssignedClass>('Beginner');
    const [stage, setStage] = useState<'Proficiency' | 'Listening' | 'Writing'>(
        'Proficiency',
    );
    const [answerUI, setAnswerUI] = useState<'NoChange' | 'Correct' | 'Wrong'>(
        'NoChange',
    );

    const [pQuestions, setPQuestions] = useState<INTF_ProficiencyTest[]>(
        proficiency_test.filter(item => item.englishLevel === 'A2'),
    );
    const noOfQuestions = pQuestions?.length;
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [pAnswers, setPAnswers] = useState<number[]>([]);
    const [allAnswers, setAllAnswers] = useState<number[]>([]);

    const [lQuestions, setLQuestions] = useState<INTF_ListeningTest>(
        listening_test.filter(item => item.englishLevel === 'A2')[0],
    );
    const [lAnswer, setLAnswer] = useState<number | null>(null);

    const [wQuestions, setWQuestions] = useState<INTF_WritingTest>(
        writing_test.filter(item => item.englishLevel === 'A2')[0],
    );
    const [wAnswer, setWAnswer] = useState<string>('');

    const speak_question = no_double_clicks({
        execFunc: () => {
            if (stage === 'Proficiency') {
                if (currentQuestion < noOfQuestions) {
                    TextToSpeechStore.play_speech({
                        speech: pQuestions[
                            currentQuestion
                        ]?.question?.word?.replace(/____/g, 'dash'),
                        isMale: AvatarVoiceStore.is_avatar_male,
                        femaleVoice: AvatarVoiceStore.avatar_female_voice,
                        maleVoice: AvatarVoiceStore.avatar_male_voice,
                        speechRate: SpeechControllerStore.rate,
                    });
                }
            } else if (stage === 'Listening') {
                TextToSpeechStore.play_speech({
                    speech:
                        'Listen to the following and select the appropraite answer.\n' +
                        lQuestions.question,
                    isMale: AvatarVoiceStore.is_avatar_male,
                    femaleVoice: AvatarVoiceStore.avatar_female_voice,
                    maleVoice: AvatarVoiceStore.avatar_male_voice,
                    speechRate: SpeechControllerStore.rate,
                });
            }
        },
    });

    let writing_audio: number = 0;

    const speak_question_left = no_double_clicks({
        execFunc: () => {
            if (stage === 'Writing') {
                writing_audio = clamp_value({
                    value: writing_audio - 1,
                    minValue: 0,
                    maxValue: wQuestions.question.length - 1,
                });
                TextToSpeechStore.play_speech({
                    speech: wQuestions.question[writing_audio],
                    isMale: AvatarVoiceStore.is_avatar_male,
                    femaleVoice: AvatarVoiceStore.avatar_female_voice,
                    maleVoice: AvatarVoiceStore.avatar_male_voice,
                    speechRate: SpeechControllerStore.rate,
                });
            }
        },
    });

    const speak_question_right = no_double_clicks({
        execFunc: () => {
            if (stage === 'Writing') {
                writing_audio = clamp_value({
                    value: writing_audio + 1,
                    minValue: 0,
                    maxValue: wQuestions.question.length - 1,
                });
                TextToSpeechStore.play_speech({
                    speech: wQuestions.question[writing_audio],
                    isMale: AvatarVoiceStore.is_avatar_male,
                    femaleVoice: AvatarVoiceStore.avatar_female_voice,
                    maleVoice: AvatarVoiceStore.avatar_male_voice,
                    speechRate: SpeechControllerStore.rate,
                });
            }
        },
    });

    const on_press_next = () => {
        if (stage === 'Proficiency') {
            TextToSpeechStore.clear_speech();
            if (currentQuestion < noOfQuestions) {
                const currentQuestionInfo = pQuestions[currentQuestion];
                const answersToQuestion = proficiency_answers.filter(
                    item => item?.id === currentQuestionInfo.id,
                );

                const nextQuestion = () => {
                    setPAnswers([]);
                    setAnswerUI('NoChange');
                    setCurrentQuestion(
                        clamp_value({
                            value: currentQuestion + 1,
                            minValue: 0,
                            maxValue: noOfQuestions,
                        }),
                    );
                    setCanAnswer(true);
                };

                if (canAnswer) {
                    if (currentQuestionInfo.multiple_choice) {
                        if (pAnswers?.length !== 2) {
                            error_handler({
                                navigation: navigation,
                                error_mssg:
                                    'Two Answers are required for this Question!',
                            });
                        } else {
                            setAllAnswers(prev => {
                                const old = prev;
                                old.push(
                                    compare_array_contents({
                                        arr1: answersToQuestion[0].answers,
                                        arr2: pAnswers,
                                    })
                                        ? 1
                                        : 0,
                                );
                                return old;
                            });
                            setCanAnswer(false);
                            if (
                                compare_array_contents({
                                    arr1: answersToQuestion[0].answers,
                                    arr2: pAnswers,
                                })
                            ) {
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
                        }
                    } else {
                        if (pAnswers?.length !== 1) {
                            error_handler({
                                navigation: navigation,
                                error_mssg:
                                    'One Answer is required for this Question!',
                            });
                        } else {
                            setAllAnswers(prev => {
                                const old = prev;
                                old.push(
                                    compare_array_contents({
                                        arr1: answersToQuestion[0].answers,
                                        arr2: pAnswers,
                                    })
                                        ? 1
                                        : 0,
                                );
                                return old;
                            });
                            setCanAnswer(false);
                            if (
                                compare_array_contents({
                                    arr1: answersToQuestion[0].answers,
                                    arr2: pAnswers,
                                })
                            ) {
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
                        }
                    }
                }
            }
        } else if (stage === 'Listening') {
            if (lAnswer !== null) {
                switch (assignedLevel) {
                    case 'Beginner':
                        setWQuestions(
                            writing_test.filter(
                                item => item.englishLevel === 'A2',
                            )[0],
                        );
                        break;
                    case 'Pre-Intermediate':
                        setWQuestions(
                            writing_test.filter(
                                item => item.englishLevel === 'B1',
                            )[0],
                        );
                        break;
                    case 'Intermediate':
                        setWQuestions(
                            writing_test.filter(
                                item => item.englishLevel === 'B2',
                            )[0],
                        );
                        break;
                    case 'Upper-Intermediate':
                        setWQuestions(
                            writing_test.filter(
                                item => item.englishLevel === 'C1',
                            )[0],
                        );
                        break;
                    case 'Confident':
                        setWQuestions(
                            writing_test.filter(
                                item => item.englishLevel === 'C2',
                            )[0],
                        );
                        break;
                    default:
                        setWQuestions(
                            writing_test.filter(
                                item => item.englishLevel === 'A2',
                            )[0],
                        );
                        break;
                }
                setStage('Writing');
                TextToSpeechStore.play_speech({
                    speech:
                        'To begin your Writing Test, press the button at the bottom-left or bottom-right of the Avatar to Listen to the Previous or Next Dictation. \nThe first Dictation is ' +
                        wQuestions.question[0] +
                        '\nPress the bottom-right button to listen to the next Dictation.',
                    isMale: AvatarVoiceStore.is_avatar_male,
                    femaleVoice: AvatarVoiceStore.avatar_female_voice,
                    maleVoice: AvatarVoiceStore.avatar_male_voice,
                    speechRate: SpeechControllerStore.rate,
                });
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'One Answer is required for this Question!',
                });
            }
        } else if (stage === 'Writing') {
            if (
                wAnswer?.length >
                wQuestions.question?.length -
                    (assignedLevel === 'Beginner'
                        ? 35
                        : assignedLevel === 'Pre-Intermediate'
                        ? 70
                        : assignedLevel === 'Intermediate'
                        ? 150
                        : assignedLevel === 'Upper-Intermediate'
                        ? 290
                        : 160)
            ) {
                update_level_mutate({
                    uid: UserInfoStore?.user_info?._id as string,
                    level: assignedLevel,
                });
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        'Please, Attempt the Writing Test to the best of your ability!',
                });
            }
        }
    };

    useEffect(() => {
        if (stage === 'Proficiency') {
            if (currentQuestion >= noOfQuestions) {
                const score = allAnswers?.filter(item => item === 1)?.length;

                if (assignedLevel === 'Beginner' && score >= 7) {
                    setPQuestions(
                        proficiency_test.filter(
                            item => item.englishLevel === 'B1',
                        ),
                    );
                    setAllAnswers([]);
                    setPAnswers([]);
                    setCurrentQuestion(0);
                    setAssignedLevel('Pre-Intermediate');
                } else if (assignedLevel === 'Pre-Intermediate' && score >= 7) {
                    setPQuestions(
                        proficiency_test.filter(
                            item => item.englishLevel === 'B2',
                        ),
                    );
                    setAllAnswers([]);
                    setPAnswers([]);
                    setCurrentQuestion(0);
                    setAssignedLevel('Intermediate');
                } else if (assignedLevel === 'Intermediate' && score >= 6) {
                    setPQuestions(
                        proficiency_test.filter(
                            item => item.englishLevel === 'C1',
                        ),
                    );
                    setAllAnswers([]);
                    setPAnswers([]);
                    setCurrentQuestion(0);
                    setAssignedLevel('Upper-Intermediate');
                } else if (
                    assignedLevel === 'Upper-Intermediate' &&
                    score >= 6
                ) {
                    setAssignedLevel('Confident');
                    setLQuestions(
                        listening_test.filter(
                            item => item.englishLevel === 'C2',
                        )[0],
                    );
                    setStage('Listening');
                    TextToSpeechStore.play_speech({
                        speech: 'To begin your Listening Test, press the button at the bottom-right of the Avatar.\nNote that you can always press the button again to Listen once more.',
                        isMale: AvatarVoiceStore.is_avatar_male,
                        femaleVoice: AvatarVoiceStore.avatar_female_voice,
                        maleVoice: AvatarVoiceStore.avatar_male_voice,
                        speechRate: SpeechControllerStore.rate,
                    });
                } else {
                    switch (assignedLevel) {
                        case 'Beginner':
                            setLQuestions(
                                listening_test.filter(
                                    item => item.englishLevel === 'A2',
                                )[0],
                            );
                            break;
                        case 'Pre-Intermediate':
                            setLQuestions(
                                listening_test.filter(
                                    item => item.englishLevel === 'B1',
                                )[0],
                            );
                            break;
                        case 'Intermediate':
                            setLQuestions(
                                listening_test.filter(
                                    item => item.englishLevel === 'B2',
                                )[0],
                            );
                            break;
                        case 'Upper-Intermediate':
                            setLQuestions(
                                listening_test.filter(
                                    item => item.englishLevel === 'C1',
                                )[0],
                            );
                            break;
                        case 'Confident':
                            setLQuestions(
                                listening_test.filter(
                                    item => item.englishLevel === 'C2',
                                )[0],
                            );
                            break;
                        default:
                            setLQuestions(
                                listening_test.filter(
                                    item => item.englishLevel === 'A2',
                                )[0],
                            );
                            break;
                    }
                    setStage('Listening');
                    TextToSpeechStore.play_speech({
                        speech: 'To begin your Listening Test, press the button at the bottom-right of the Avatar.\nNote that you can always press the button again to Listen once more.',
                        isMale: AvatarVoiceStore.is_avatar_male,
                        femaleVoice: AvatarVoiceStore.avatar_female_voice,
                        maleVoice: AvatarVoiceStore.avatar_male_voice,
                        speechRate: SpeechControllerStore.rate,
                    });
                }
            }
        }
    }, [
        currentQuestion,
        noOfQuestions,
        allAnswers,
        stage,
        assignedLevel,
        lQuestions.question,
    ]);

    useEffect(() => {
        if (stage === 'Proficiency') {
            if (currentQuestion < noOfQuestions) {
                TextToSpeechStore.play_speech({
                    speech: pQuestions[
                        currentQuestion
                    ]?.question?.word?.replace(/____/g, 'dash'),
                    isMale: AvatarVoiceStore.is_avatar_male,
                    femaleVoice: AvatarVoiceStore.avatar_female_voice,
                    maleVoice: AvatarVoiceStore.avatar_male_voice,
                    speechRate: SpeechControllerStore.rate,
                });
            }
        }
    }, [currentQuestion, noOfQuestions, stage, pQuestions]);

    useEffect(() => {
        let intervalId: any;
        if (!hasNav && timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        if (!hasNav && timer === 0) {
            update_level_mutate({
                uid: UserInfoStore?.user_info?._id as string,
                level: assignedLevel,
            });
        }
        return () => clearInterval(intervalId);
    }, [timer, navigation, update_level_mutate, assignedLevel, hasNav]);

    return (
        <View style={styles.pre_test_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
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
                <BasicText
                    inputText="Pre-Test"
                    textSize={20}
                    textWeight={700}
                    marginLeft={10}
                />
                <BasicText
                    inputText={seconds_to_minutes({
                        time: timer,
                    })}
                    marginLeft={'auto'}
                    textWeight={600}
                    textColor={Colors.Primary}
                />
            </View>
            <MiniAvatar
                marginTop={15}
                marginBottom={4}
                marginHorizontal={22}
                isSubtitleIcon
                isWritingTest={stage === 'Writing'}
                onPressVoice={speak_question}
                onPressVoiceLeft={speak_question_left}
                onPressVoiceRight={speak_question_right}
            />
            {stage === 'Proficiency' && (
                <Fragment>
                    {pQuestions[currentQuestion] ? (
                        <ScrollView style={{ flex: 1 }}>
                            <ProficiencyQuestion
                                marginTop={20}
                                marginLeft={22}
                                marginRight={22}
                                question={pQuestions[currentQuestion]}
                                answers={pAnswers}
                                setAnswers={setPAnswers}
                                answerUI={answerUI}
                            />
                            <View style={{ marginBottom: 50 }}>{''}</View>
                        </ScrollView>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <BasicText
                                inputText="Loading..."
                                textWeight={600}
                                textSize={17}
                            />
                        </View>
                    )}
                </Fragment>
            )}
            {stage === 'Listening' && (
                <Fragment>
                    {lQuestions ? (
                        <ScrollView style={{ flex: 1 }}>
                            <ListeningQuestion
                                marginTop={20}
                                marginLeft={22}
                                marginRight={22}
                                question={lQuestions}
                                answer={lAnswer}
                                setAnswer={setLAnswer}
                            />
                            <View style={{ marginBottom: 50 }}>{''}</View>
                        </ScrollView>
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <BasicText
                                inputText="Loading..."
                                textWeight={600}
                                textSize={17}
                            />
                        </View>
                    )}
                </Fragment>
            )}
            {stage === 'Writing' && (
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Fragment>
                        {wQuestions ? (
                            <View style={{ flex: 1 }}>
                                <WritingQuestion
                                    marginTop={20}
                                    marginBottom={10}
                                    marginLeft={22}
                                    marginRight={22}
                                    question={wQuestions}
                                    placeHolderText="Type what you heard here..."
                                    answer={wAnswer}
                                    setAnswer={setWAnswer}
                                />
                            </View>
                        ) : (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <BasicText
                                    inputText="Loading..."
                                    textWeight={600}
                                    textSize={17}
                                />
                            </View>
                        )}
                    </Fragment>
                    <BasicButton
                        buttonText="Next"
                        disabled={disableButton}
                        marginHorizontal={22}
                        marginBottom={screen_height_less_than({
                            if_true: 10,
                            if_false: 35,
                        })}
                        marginTop={3}
                        execFunc={on_press_next}
                        disableDebounce
                    />
                </KeyboardAvoidingView>
            )}
            {stage !== 'Writing' && (
                <BasicButton
                    buttonText="Next"
                    disabled={disableButton}
                    marginHorizontal={22}
                    marginBottom={screen_height_less_than({
                        if_true: 10,
                        if_false: 35,
                    })}
                    marginTop={3}
                    execFunc={on_press_next}
                    disableDebounce
                />
            )}
        </View>
    );
});

export default PreTestPage;

const styles = StyleSheet.create({
    pre_test_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
