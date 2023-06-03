import React, {
    FunctionComponent,
    useState,
    Fragment,
    useCallback,
} from 'react';
import {
    BackHandler,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import ProgressBar from '../../Components/Progress_Bar/Progress_Bar';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { avatars_data } from '../../Data/Avatars/Avatars';
import RNDropDown from '../../Components/RN_Drop_Down/RN_Drop_Down';
import { AvatarVoices } from '../../Data/Voices/Voices';
import VoiceButton from '../../Components/Voice_Button/Voice_Button';
import MiniAvatar from '../../Components/Mini_Avatar/Mini_Avatar';
import SingleRadioButton from '../../Components/Single_Radio_Button/Single_Radio_Button';
import {
    test_1_question,
    test_1_options,
    test_2_question,
    test_2_options,
    test_4_question,
} from '../../Data/Tests/Tests';
import AudioProgressBar from '../../Components/Audio_Progress_Bar/Audio_Progress_Bar';
import Feather from 'react-native-vector-icons/Feather';
import MicrophoneButton from '../../Components/Microphone_Button/Microphone_Button';
import { native_languages } from '../../Data/Languages/Languages';
import { study_target } from '../../Data/Study_Target/Study_Target';
import { topics_interests } from '../../Data/Interests/Interests';
import MultiRadioButton from '../../Components/Multi_Radio_Button/Multi_Radio_Button';
import { INTF_Test2Answers } from '../../Interface/Test_2_Answers/Test_2_Answers';
import TestRadioButton from '../../Components/Test_Radio_Button/Test_Radio_Button';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import BasicButton2 from '../../Components/Basic_Button_2/Basic_Button_2';

const OnboardingPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const total_pages = 8;
    const [question, setQuestion] = useState<number>(1);
    const [isMaleTutor, setIsMaleTutor] = useState<boolean>(false);
    const [maleVoice, setMaleVoice] = useState<string>(
        AvatarVoices?.Male[0]?.value,
    );
    const [femaleVoice, setFemaleVoice] = useState<string>(
        AvatarVoices?.Female[0]?.value,
    );

    const [answer_1, setAnswer_1] = useState<number | null>(null);
    const [test2Answers, setTest2Answers] = useState<INTF_Test2Answers>({
        a: null,
        b: null,
        c: null,
        d: null,
    });
    const [test_3, setTest_3] = useState<string>('');
    const [test_3_PP, setTest_3_PP] = useState<boolean>(false);
    const [nativeLang, setNativeLang] = useState<number | null>(null);
    const [studyTarget, setStudyTarget] = useState<number | null>(null);
    const [userInterests, setUserInterests] = useState<number[]>([]);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const submit_data = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'AuthStack' as never,
                {
                    screen: 'CongratulationsPage',
                    params: {
                        header_txt: 'You did well.',
                        message_txt:
                            'You have been assigned to Confident Class.',
                        nextPage: 3,
                    },
                } as never,
            );
        },
    });

    const handle_go_back = () => {
        if (question === 1) {
            navigation.canGoBack() && navigation.goBack();
        } else {
            prev_question();
        }
    };

    const next_question = no_double_clicks({
        execFunc: () => {
            setQuestion(
                clamp_value({
                    value: question + 1,
                    minValue: 1,
                    maxValue: total_pages,
                }),
            );
        },
    });

    const prev_question = no_double_clicks({
        execFunc: () =>
            setQuestion(
                clamp_value({
                    value: question - 1,
                    minValue: 1,
                    maxValue: total_pages,
                }),
            ),
    });

    useFocusEffect(
        useCallback(() => {
            const handleBackPress = () => {
                if (question === 1) {
                    navigation.canGoBack() && navigation.goBack();
                    return true;
                } else {
                    prev_question();
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
                    marginTop: navigation?.canGoBack()
                        ? Platform.OS === 'ios'
                            ? 60
                            : 25
                        : Platform.OS === 'ios'
                        ? 70
                        : 25,
                    marginBottom: 28,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton execFunc={handle_go_back} />
                <ProgressBar progress={(question / total_pages) * 100} />
            </View>
            {question !== 6 && question !== 7 && question !== 8 && (
                <ScrollView style={{ flex: 1 }}>
                    {question === 1 && (
                        <Fragment>
                            <Text style={styles.onboarding_headers}>
                                Choose Your Desired Teacher
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 30,
                                    justifyContent: 'space-between',
                                    marginHorizontal: 22,
                                    marginBottom: 20,
                                }}>
                                <View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                        }}>
                                        <TouchableOpacity
                                            style={[
                                                styles.avatar_bg,
                                                {
                                                    backgroundColor:
                                                        Colors.LightPink,
                                                },
                                            ]}
                                            onPress={() =>
                                                setIsMaleTutor(false)
                                            }>
                                            <View>
                                                {isMaleTutor && (
                                                    <View
                                                        style={
                                                            styles.avatar_bg_overlay
                                                        }>
                                                        {''}
                                                    </View>
                                                )}
                                                <Image
                                                    source={
                                                        avatars_data[0]?.image
                                                    }
                                                    style={{
                                                        width: 130,
                                                        height: 130,
                                                    }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <VoiceButton
                                            execFunc={no_double_clicks({
                                                execFunc: () =>
                                                    console.log(femaleVoice),
                                            })}
                                            buttonSize={38}
                                            borderRadius={8}
                                            marginLeft={5}
                                            disabled={isMaleTutor}
                                        />
                                    </View>
                                    <RNDropDown
                                        dropdownData={AvatarVoices.Female}
                                        value={femaleVoice}
                                        setValue={setFemaleVoice}
                                        height={42}
                                        disable={false}
                                        paddingHorizontal={7}
                                        marginRight={40}
                                    />
                                </View>
                                <View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                        }}>
                                        <TouchableOpacity
                                            style={styles.avatar_bg}
                                            onPress={() =>
                                                setIsMaleTutor(true)
                                            }>
                                            <View>
                                                {!isMaleTutor && (
                                                    <View
                                                        style={
                                                            styles.avatar_bg_overlay
                                                        }>
                                                        {''}
                                                    </View>
                                                )}
                                                <Image
                                                    source={
                                                        avatars_data[6]?.image
                                                    }
                                                    style={{
                                                        width: 130,
                                                        height: 130,
                                                    }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <VoiceButton
                                            execFunc={no_double_clicks({
                                                execFunc: () =>
                                                    console.log(femaleVoice),
                                            })}
                                            buttonSize={38}
                                            borderRadius={8}
                                            marginLeft={5}
                                            disabled={!isMaleTutor}
                                        />
                                    </View>
                                    <RNDropDown
                                        dropdownData={AvatarVoices.Male}
                                        value={maleVoice}
                                        setValue={setMaleVoice}
                                        height={42}
                                        disable={false}
                                        paddingHorizontal={7}
                                        marginRight={40}
                                    />
                                </View>
                            </View>
                        </Fragment>
                    )}
                    {question === 2 && (
                        <Fragment>
                            <MiniAvatar
                                isMale={isMaleTutor}
                                marginBottom={20}
                                marginHorizontal={22}
                            />
                            <Text style={styles.test_header}>Test 1</Text>
                            <Text style={styles.test_question}>
                                {test_1_question}
                            </Text>
                            <Text
                                style={[
                                    styles.test_question,
                                    {
                                        marginTop: 12,
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.test_question,
                                        {
                                            fontFamily: fonts.OpenSans_700,
                                        },
                                    ]}>
                                    Question:
                                </Text>{' '}
                                Who won the Game?
                            </Text>
                            <View>
                                {test_1_options?.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 10,
                                        }}>
                                        <Text
                                            style={{
                                                marginLeft: 22,
                                                marginRight: 10,
                                                fontFamily: fonts.Urbanist_500,
                                                fontSize: 15,
                                            }}>
                                            {index === 0
                                                ? 'A'
                                                : index === 1
                                                ? 'B'
                                                : index === 2
                                                ? 'C'
                                                : 'D'}
                                        </Text>
                                        <SingleRadioButton
                                            option={item}
                                            index={index}
                                            answer={answer_1}
                                            setAnswer={setAnswer_1}
                                        />
                                    </View>
                                ))}
                            </View>
                        </Fragment>
                    )}
                    {question === 3 && (
                        <Fragment>
                            <MiniAvatar
                                isMale={isMaleTutor}
                                marginBottom={20}
                                marginHorizontal={22}
                            />
                            <Text style={styles.test_header}>Test 2</Text>
                            <Text style={styles.test_question}>
                                {test_2_question}
                            </Text>
                            <Text
                                style={[
                                    styles.test_question,
                                    {
                                        marginTop: 12,
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.test_question,
                                        {
                                            fontFamily: fonts.OpenSans_700,
                                        },
                                    ]}>
                                    Question:
                                </Text>{' '}
                                Fil in the gaps
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginHorizontal: 22,
                                    marginTop: test2Answers.a ? 10 : 0,
                                    marginBottom: test2Answers.a ? 15 : 0,
                                    justifyContent: test2Answers?.d
                                        ? 'space-evenly'
                                        : undefined,
                                }}>
                                {test2Answers.a && (
                                    <TestRadioButton
                                        option={test2Answers.a}
                                        isSelected={true}
                                        marginRight={10}
                                        buttonWidth={80}
                                        buttonHeight={43}
                                    />
                                )}
                                {test2Answers.b && (
                                    <TestRadioButton
                                        option={test2Answers.b}
                                        isSelected={true}
                                        marginRight={10}
                                        buttonWidth={80}
                                        buttonHeight={43}
                                    />
                                )}
                                {test2Answers.c && (
                                    <TestRadioButton
                                        option={test2Answers.c}
                                        isSelected={true}
                                        marginRight={10}
                                        buttonWidth={80}
                                        buttonHeight={43}
                                    />
                                )}
                                {test2Answers.d && (
                                    <TestRadioButton
                                        option={test2Answers.d}
                                        isSelected={true}
                                        marginRight={10}
                                        buttonWidth={80}
                                        buttonHeight={43}
                                    />
                                )}
                            </View>
                            {test2Answers?.a && (
                                <TextDivider singleLine marginHorizontal={22} />
                            )}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    marginHorizontal: 22,
                                    paddingTop: 20,
                                    justifyContent: 'center',
                                }}>
                                {test_2_options?.map((item, index) => (
                                    <TestRadioButton
                                        key={index}
                                        option={item}
                                        isSelected={false}
                                        marginRight={15}
                                        marginBottom={15}
                                        buttonWidth={100}
                                        buttonHeight={43}
                                        answers={test2Answers}
                                        setAnswers={setTest2Answers}
                                    />
                                ))}
                                <BasicButton2
                                    buttonText="Clear Answers"
                                    backgroundColor="red"
                                    textColor="red"
                                    borderRadius={6}
                                    buttonHeight={43}
                                    execFunc={no_double_clicks({
                                        execFunc: () =>
                                            setTest2Answers({
                                                a: null,
                                                b: null,
                                                c: null,
                                                d: null,
                                            }),
                                    })}
                                />
                            </View>
                        </Fragment>
                    )}
                    {question === 4 && (
                        <Fragment>
                            <MiniAvatar
                                isMale={isMaleTutor}
                                marginBottom={20}
                                marginHorizontal={22}
                            />
                            <Text style={styles.test_header}>Test 3</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginHorizontal: 22,
                                    marginTop: 10,
                                    marginBottom: 20,
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    activeOpacity={0.65}
                                    onPress={() => setTest_3_PP(!test_3_PP)}
                                    style={{
                                        width: 35,
                                    }}>
                                    {test_3_PP ? (
                                        <Feather
                                            name="pause"
                                            size={30}
                                            color={Colors.Primary}
                                        />
                                    ) : (
                                        <Feather
                                            name="play"
                                            size={30}
                                            color={Colors.Primary}
                                        />
                                    )}
                                </TouchableOpacity>
                                <View>
                                    <AudioProgressBar
                                        progress={72}
                                        height={8}
                                        progressWidth={250}
                                        marginHorizontal={1}
                                    />
                                </View>
                            </View>
                            <Text
                                style={[
                                    styles.test_question,
                                    {
                                        marginTop: 1,
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.test_question,
                                        {
                                            fontFamily: fonts.OpenSans_700,
                                        },
                                    ]}>
                                    Question:
                                </Text>{' '}
                                What did you hear?
                            </Text>
                            <BasicTextEntry
                                placeHolderText="Enter what you heard here..."
                                inputValue={test_3}
                                setInputValue={setTest_3}
                                marginTop={10}
                                marginBottom={2}
                                inputMode="text"
                            />
                        </Fragment>
                    )}
                    {question === 5 && (
                        <Fragment>
                            <MiniAvatar
                                isMale={isMaleTutor}
                                marginBottom={20}
                                marginHorizontal={22}
                            />
                            <Text style={styles.test_header}>Test 4</Text>
                            <Text style={styles.test_question}>
                                {test_4_question}
                            </Text>
                            <Text
                                style={[
                                    styles.test_question,
                                    {
                                        marginTop: 12,
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.test_question,
                                        {
                                            fontFamily: fonts.OpenSans_700,
                                        },
                                    ]}>
                                    Question:
                                </Text>{' '}
                                Speak the above sentence with the microphone
                                below.
                            </Text>
                            <View
                                style={{
                                    alignItems: 'center',
                                    marginTop: 30,
                                }}>
                                <MicrophoneButton
                                    microphoneSize={80}
                                    animationSpeed={300}
                                />
                            </View>
                            <Text
                                style={{
                                    marginTop: 10,
                                    textAlign: 'center',
                                    fontFamily: fonts.Urbanist_600,
                                    color: Colors.Black,
                                }}>
                                Hold the "Microphone" Button to Speak.
                            </Text>
                        </Fragment>
                    )}
                </ScrollView>
            )}
            {question === 6 && (
                <View style={{ flex: 1 }}>
                    <MiniAvatar
                        isMale={isMaleTutor}
                        marginBottom={20}
                        marginHorizontal={22}
                    />
                    <Text style={styles.test_header}>
                        Your Native Language?
                    </Text>
                    <View
                        style={{
                            marginTop: 10,
                            marginBottom: 15,
                            flex: 1,
                            paddingHorizontal: 4,
                        }}>
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
                    </View>
                </View>
            )}
            {question === 7 && (
                <View style={{ flex: 1 }}>
                    <MiniAvatar
                        isMale={isMaleTutor}
                        marginBottom={20}
                        marginHorizontal={22}
                    />
                    <Text style={styles.test_header}>
                        Your study target per day?
                    </Text>
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
                        />
                    </View>
                </View>
            )}
            {question === 8 && (
                <View style={{ flex: 1 }}>
                    <MiniAvatar
                        isMale={isMaleTutor}
                        marginBottom={20}
                        marginHorizontal={22}
                    />
                    <Text style={styles.test_header}>Your Interests?</Text>
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
                    </View>
                </View>
            )}
            <BasicButton
                buttonText={question === total_pages ? 'Submit' : 'Continue'}
                borderRadius={8}
                marginHorizontal={22}
                execFunc={
                    question === total_pages ? submit_data : next_question
                }
                buttonHeight={56}
                marginBottom={Platform.OS === 'ios' ? 50 : 20}
            />
        </View>
    );
};

export default OnboardingPage;

const styles = StyleSheet.create({
    onboarding_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    onboarding_headers: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 28,
        marginHorizontal: 22,
        color: Colors.Dark,
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
    test_header: {
        fontFamily: fonts.OpenSans_700,
        fontSize: 22,
        marginHorizontal: 22,
        marginTop: 10,
        color: Colors.Black,
        marginBottom: 3,
    },
    test_question: {
        marginHorizontal: 22,
        fontFamily: fonts.OpenSans_400,
        color: Colors.Black,
        fontSize: 16,
    },
});
