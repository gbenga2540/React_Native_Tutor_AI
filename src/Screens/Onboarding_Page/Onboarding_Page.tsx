import React, {
    FunctionComponent,
    useState,
    useCallback,
    Suspense,
    useEffect,
} from 'react';
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import ProgressBar from '../../Components/Progress_Bar/Progress_Bar';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { FlatList } from 'react-native-gesture-handler';
import MiniAvatar from '../../Components/Mini_Avatar/Mini_Avatar';
import SingleRadioButton from '../../Components/Single_Radio_Button/Single_Radio_Button';
import { native_languages } from '../../Data/Languages/Languages';
import { study_target } from '../../Data/Study_Target/Study_Target';
import { topics_interests } from '../../Data/Interests/Interests';
import MultiRadioButton from '../../Components/Multi_Radio_Button/Multi_Radio_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { useMutation } from 'react-query';
import { update_misc } from '../../Configs/Queries/Users/Users';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { observer } from 'mobx-react';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import SInfo from 'react-native-sensitive-info';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';

const TOTAL_PAGES = 3;

const OnboardingPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [question, setQuestion] = useState<number>(1);
    const [nativeLang, setNativeLang] = useState<number | null>(null);
    const [studyTarget, setStudyTarget] = useState<number | null>(null);
    const [userInterests, setUserInterests] = useState<number[]>([]);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { mutate: update_misc_mutate } = useMutation(update_misc, {
        onMutate: () => {
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
                const user_Interests: string[] = [];
                userInterests?.map(item =>
                    user_Interests.push(topics_interests[item]),
                );

                const proceed = () => {
                    UserInfoStore.set_user_info({
                        user_info: {
                            ...TempUserInfo,
                            language: `${
                                native_languages[nativeLang || 0]?.name
                            } - ${native_languages[nativeLang || 0]?.code}`,
                            study_target: studyTarget === 1 ? 60 : 30,
                            interests: user_Interests,
                        },
                    });

                    navigation.push(
                        'AuthStack' as never,
                        {
                            screen: 'CongratulationsPage',
                            params: {
                                header_txt: 'You did well.',
                                message_txt:
                                    'You have successfully completed your Registration. Welcome to Tutor AI',
                                nextPage: 3,
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
                                language: `${
                                    native_languages[nativeLang || 0]?.name
                                } - ${native_languages[nativeLang || 0]?.code}`,
                                study_target: studyTarget === 1 ? 60 : 30,
                                interests: user_Interests,
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

    const submit_data = no_double_clicks({
        execFunc: () => {
            const user_Interests: string[] = [];
            userInterests?.map(item =>
                user_Interests.push(topics_interests[item]),
            );

            if (userInterests?.length > 0) {
                update_misc_mutate({
                    uid: UserInfoStore?.user_info?._id as string,
                    language: `${native_languages[nativeLang || 0]?.name} - ${
                        native_languages[nativeLang || 0]?.code
                    }`,
                    study_target: studyTarget === 1 ? 60 : 30,
                    interests: user_Interests,
                });
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Please, Select atleast One Interest Topic!',
                });
            }
        },
    });

    const prev_question = no_double_clicks({
        execFunc: () => {
            TextToSpeechStore.clear_speech();
            setQuestion(
                clamp_value({
                    value: question - 1,
                    minValue: 1,
                    maxValue: TOTAL_PAGES,
                }),
            );
        },
    });

    const next_question = no_double_clicks({
        execFunc: async () => {
            TextToSpeechStore.clear_speech();
            if (question === 1) {
                if (nativeLang === null) {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Please, Select a Language!',
                    });
                } else {
                    setQuestion(
                        clamp_value({
                            value: question + 1,
                            minValue: 1,
                            maxValue: TOTAL_PAGES,
                        }),
                    );
                }
            } else if (question === 2) {
                if (studyTarget === null) {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Please, Select a Study Target!',
                    });
                } else {
                    setQuestion(
                        clamp_value({
                            value: question + 1,
                            minValue: 1,
                            maxValue: TOTAL_PAGES,
                        }),
                    );
                }
            } else {
                setQuestion(
                    clamp_value({
                        value: question + 1,
                        minValue: 1,
                        maxValue: TOTAL_PAGES,
                    }),
                );
            }
        },
    });

    const handle_go_back = () => {
        if (question === 1) {
            navigation.canGoBack() && navigation.goBack();
        } else {
            prev_question({});
        }
    };

    const speak_question = no_double_clicks({
        execFunc: () => {
            TextToSpeechStore.clear_speech();
            if (question === 1) {
                TextToSpeechStore.play_speech({
                    speech: 'Select your Native Language.',
                });
            } else if (question === 2) {
                TextToSpeechStore.play_speech({
                    speech: 'Select the number of minutes you wish to study per day.',
                });
            } else {
                TextToSpeechStore.play_speech({
                    speech: 'Select the topics you find interesting.',
                });
            }
        },
    });

    useEffect(() => {
        TextToSpeechStore.clear_speech();
        if (question === 1) {
            TextToSpeechStore.play_speech({
                speech: 'Select your Native Language.',
            });
        } else if (question === 2) {
            TextToSpeechStore.play_speech({
                speech: 'Select the number of minutes you wish to study per day.',
            });
        } else {
            TextToSpeechStore.play_speech({
                speech: 'Select the topics you find interesting.',
            });
        }
    }, [question]);

    useFocusEffect(
        useCallback(() => {
            const handleBackPress = () => {
                if (question === 1) {
                    navigation.canGoBack() && navigation.goBack();
                    return true;
                } else {
                    prev_question({});
                    return true;
                }
            };

            BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    handleBackPress,
                );
        }, [navigation, prev_question, question]),
    );

    return (
        <View style={styles.onboarding_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <View
                style={{
                    marginLeft: 22,
                    marginTop: Platform.OS === 'ios' ? 60 : 40,
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton show_back_button execFunc={handle_go_back} />
                <ProgressBar progress={(question / TOTAL_PAGES) * 100} />
            </View>

            <MiniAvatar
                marginBottom={20}
                marginHorizontal={22}
                onPressVoice={speak_question}
            />

            {question === 1 && (
                <View style={{ flex: 1 }}>
                    <BasicText
                        inputText="Your Native Language?"
                        marginBottom={3}
                        marginTop={10}
                        textColor={Colors.Black}
                        marginLeft={22}
                        marginRight={22}
                        textWeight={700}
                        textSize={22}
                    />
                    <View
                        style={{
                            marginTop: 10,
                            marginBottom: 15,
                            flex: 1,
                            paddingHorizontal: 4,
                        }}>
                        <Suspense fallback={null}>
                            <FlatList
                                style={{
                                    paddingHorizontal: 18,
                                }}
                                keyExtractor={item => item?.name}
                                data={native_languages}
                                windowSize={3}
                                renderItem={({ item, index }) => {
                                    return (
                                        <SingleRadioButton
                                            answer={nativeLang}
                                            setAnswer={setNativeLang}
                                            index={index}
                                            option={item?.name}
                                            marginBottom={10}
                                            buttonHeight={43}
                                        />
                                    );
                                }}
                            />
                        </Suspense>
                    </View>
                </View>
            )}
            {question === 2 && (
                <View style={{ flex: 1 }}>
                    <BasicText
                        inputText="Your study target per day?"
                        marginBottom={3}
                        marginTop={10}
                        textColor={Colors.Black}
                        marginLeft={22}
                        marginRight={22}
                        textWeight={700}
                        textSize={22}
                    />
                    <View
                        style={{
                            marginTop: 15,
                            marginBottom: 15,
                            flex: 1,
                            paddingHorizontal: 4,
                        }}>
                        <FlatList
                            style={{
                                paddingHorizontal: 18,
                            }}
                            keyExtractor={item => item}
                            data={study_target}
                            renderItem={({ item, index }) => {
                                return (
                                    <SingleRadioButton
                                        answer={studyTarget}
                                        setAnswer={setStudyTarget}
                                        index={index}
                                        option={item}
                                        marginBottom={10}
                                        buttonHeight={43}
                                    />
                                );
                            }}
                            initialNumToRender={5}
                            maxToRenderPerBatch={5}
                            windowSize={5}
                        />
                    </View>
                </View>
            )}
            {question === 3 && (
                <View style={{ flex: 1 }}>
                    <BasicText
                        inputText="Your Interests?"
                        marginBottom={3}
                        marginTop={10}
                        textColor={Colors.Black}
                        marginLeft={22}
                        marginRight={22}
                        textWeight={700}
                        textSize={22}
                    />
                    <View
                        style={{
                            marginTop: 15,
                            marginBottom: 15,
                            flex: 1,
                            paddingHorizontal: 4,
                        }}>
                        <Suspense fallback={null}>
                            <FlatList
                                style={{
                                    paddingHorizontal: 18,
                                }}
                                keyExtractor={item => item}
                                data={topics_interests}
                                windowSize={3}
                                renderItem={({ item, index }) => {
                                    return (
                                        <MultiRadioButton
                                            answers={userInterests}
                                            setAnswers={setUserInterests}
                                            index={index}
                                            option={item}
                                            marginBottom={10}
                                            buttonHeight={43}
                                            borderRadius={8}
                                        />
                                    );
                                }}
                            />
                        </Suspense>
                    </View>
                </View>
            )}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <BasicButton
                    disabled={disableButton}
                    buttonText={
                        question === TOTAL_PAGES ? 'Submit' : 'Continue'
                    }
                    borderRadius={8}
                    marginHorizontal={22}
                    execFunc={
                        question === TOTAL_PAGES
                            ? () => submit_data({})
                            : () => next_question({})
                    }
                    buttonHeight={56}
                    marginTop={2}
                    marginBottom={
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 10,
                                  if_false: 40,
                              })
                            : 20
                    }
                />
            </KeyboardAvoidingView>
        </View>
    );
});

export default OnboardingPage;

const styles = StyleSheet.create({
    onboarding_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    avatar_bg: {
        backgroundColor: Colors.Primary,
        borderRadius: 20,
        marginBottom: 10,
    },
    avatar_bg_overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(220, 220, 220, 0.7)',
        width: '100%',
        height: '100%',
        zIndex: 2,
        borderRadius: 20,
    },
    avatar_q_cont: {
        marginHorizontal: 22,
        marginTop: 30,
        marginBottom: 10,
        flexDirection: 'row',
    },
    avatar_g_txt: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
});
