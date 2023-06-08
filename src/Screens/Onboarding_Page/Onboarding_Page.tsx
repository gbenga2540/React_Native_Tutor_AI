import React, {
    FunctionComponent,
    useState,
    Fragment,
    useCallback,
} from 'react';
import {
    BackHandler,
    KeyboardAvoidingView,
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
import BasicText from '../../Components/Basic_Text/Basic_Text';
import {
    screen_height_less_than,
    screen_width_less_than,
} from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const TOTAL_PAGES = 7;

const OnboardingPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [question, setQuestion] = useState<number>(1);
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
        execFunc: async () => {
            setQuestion(
                clamp_value({
                    value: question + 1,
                    minValue: 1,
                    maxValue: TOTAL_PAGES,
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
                    maxValue: TOTAL_PAGES,
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
                            ? screen_height_less_than({
                                  if_false: 60,
                                  if_true: 40,
                              })
                            : 20
                        : Platform.OS === 'ios'
                        ? screen_height_less_than({
                              if_false: 70,
                              if_true: 45,
                          })
                        : 20,
                    marginBottom: 28,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton execFunc={handle_go_back} />
                <ProgressBar progress={(question / TOTAL_PAGES) * 100} />
            </View>
            {question !== 5 && question !== 6 && question !== 7 && (
                <ScrollView style={{ flex: 1 }}>
                    {question === 1 && (
                        <Fragment>
                            <MiniAvatar
                                marginBottom={20}
                                marginHorizontal={22}
                            />
                            <BasicText
                                inputText="Test 1"
                                marginBottom={3}
                                marginTop={10}
                                textColor={Colors.Black}
                                marginLeft={22}
                                marginRight={22}
                                textWeight={700}
                                textSize={22}
                            />
                            <BasicText
                                inputText={test_1_question}
                                textFamily={fonts.OpenSans_400}
                                textColor={Colors.Black}
                                textSize={16}
                                marginLeft={22}
                                marginRight={22}
                            />
                            <Text
                                style={{
                                    marginTop: 12,
                                    marginHorizontal: 22,
                                    fontSize: 16,
                                    fontFamily: fonts.OpenSans_400,
                                    color: Colors.Black,
                                }}>
                                <BasicText
                                    inputText="Question:"
                                    textFamily={fonts.OpenSans_700}
                                    textColor={Colors.Black}
                                    textSize={16}
                                    marginLeft={22}
                                    marginRight={22}
                                />{' '}
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
                                        <BasicText
                                            inputText={
                                                index === 0
                                                    ? 'A'
                                                    : index === 1
                                                    ? 'B'
                                                    : index === 2
                                                    ? 'C'
                                                    : 'D'
                                            }
                                            marginLeft={22}
                                            marginRight={10}
                                            textSize={15}
                                            textWeight={500}
                                        />
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
                    {question === 2 && (
                        <Fragment>
                            <MiniAvatar
                                marginBottom={20}
                                marginHorizontal={22}
                            />
                            <BasicText
                                inputText="Test 2"
                                marginBottom={3}
                                marginTop={10}
                                textColor={Colors.Black}
                                marginLeft={22}
                                marginRight={22}
                                textWeight={700}
                                textSize={22}
                            />
                            <BasicText
                                inputText={test_2_question}
                                textFamily={fonts.OpenSans_400}
                                textColor={Colors.Black}
                                textSize={16}
                                marginLeft={22}
                                marginRight={22}
                            />
                            <Text
                                style={{
                                    marginTop: 12,
                                    fontSize: 16,
                                    marginHorizontal: 22,
                                    color: Colors.Black,
                                    fontFamily: fonts.OpenSans_400,
                                }}>
                                <BasicText
                                    inputText="Question:"
                                    textFamily={fonts.OpenSans_700}
                                    textColor={Colors.Black}
                                    textSize={16}
                                    marginLeft={22}
                                    marginRight={22}
                                />{' '}
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
                                        buttonWidth={screen_width_less_than({
                                            if_true: 90,
                                            if_false: 100,
                                        })}
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
                    {question === 3 && (
                        <Fragment>
                            <MiniAvatar
                                marginBottom={20}
                                marginHorizontal={22}
                            />
                            <BasicText
                                inputText="Test 3"
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
                                style={{
                                    marginHorizontal: 22,
                                    fontFamily: fonts.OpenSans_400,
                                    color: Colors.Black,
                                    fontSize: 16,
                                    marginTop: 1,
                                }}>
                                <BasicText
                                    inputText="Question:"
                                    textFamily={fonts.OpenSans_700}
                                    textColor={Colors.Black}
                                    textSize={16}
                                    marginLeft={22}
                                    marginRight={22}
                                />{' '}
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
                    {question === 4 && (
                        <Fragment>
                            <MiniAvatar
                                marginBottom={20}
                                marginHorizontal={22}
                            />
                            <BasicText
                                inputText="Test 4"
                                marginBottom={3}
                                marginTop={10}
                                textColor={Colors.Black}
                                marginLeft={22}
                                marginRight={22}
                                textWeight={700}
                                textSize={22}
                            />
                            <BasicText
                                inputText={test_4_question}
                                textFamily={fonts.OpenSans_400}
                                textColor={Colors.Black}
                                textSize={16}
                                marginLeft={22}
                                marginRight={22}
                            />
                            <Text
                                style={{
                                    marginTop: 12,
                                    fontSize: 16,
                                    marginHorizontal: 22,
                                    color: Colors.Black,
                                }}>
                                <BasicText
                                    inputText="Question:"
                                    textFamily={fonts.OpenSans_700}
                                    textColor={Colors.Black}
                                    textSize={16}
                                    marginLeft={22}
                                    marginRight={22}
                                />{' '}
                                Speak the above sentence with the microphone
                                below.
                            </Text>
                            <View
                                style={{
                                    alignItems: 'center',
                                    marginTop: screen_height_less_than({
                                        if_true: 25,
                                        if_false: 30,
                                    }),
                                }}>
                                <MicrophoneButton
                                    microphoneSize={screen_height_less_than({
                                        if_true: 60,
                                        if_false: 75,
                                    })}
                                    animationSpeed={300}
                                />
                            </View>
                            <BasicText
                                inputText='Hold the "Microphone" Button to Speak.'
                                textAlign="center"
                                textColor={Colors.Black}
                                textWeight={600}
                                marginTop={10}
                            />
                        </Fragment>
                    )}
                </ScrollView>
            )}
            {question === 5 && (
                <View style={{ flex: 1 }}>
                    <MiniAvatar marginBottom={20} marginHorizontal={22} />
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
            {question === 6 && (
                <View style={{ flex: 1 }}>
                    <MiniAvatar marginBottom={20} marginHorizontal={22} />
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
            {question === 7 && (
                <View style={{ flex: 1 }}>
                    <MiniAvatar marginBottom={20} marginHorizontal={22} />
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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <BasicButton
                    buttonText={
                        question === TOTAL_PAGES ? 'Submit' : 'Continue'
                    }
                    borderRadius={8}
                    marginHorizontal={22}
                    execFunc={
                        question === TOTAL_PAGES ? submit_data : next_question
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
};

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
