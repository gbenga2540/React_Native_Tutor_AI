import React, { FunctionComponent, useState } from 'react';
import {
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
import TextButton from '../../Components/Text_Button/Text_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import ProgressBar from '../../Components/Progress_Bar/Progress_Bar';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import PhoneNumberInput from '../../Components/Phone_Number_Input/Phone_Number_Input';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { ScrollView } from 'react-native-gesture-handler';
import { avatars_data } from '../../Data/Avatars/Avatars';
import RNDropDown from '../../Components/RN_Drop_Down/RN_Drop_Down';
import { AvatarVoices } from '../../Data/Voices/Voices';
import VoiceButton from '../../Components/Voice_Button/Voice_Button';
import MiniAvatar from '../../Components/Mini_Avatar/Mini_Avatar';

const OnboardingPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const total_pages = 9;
    const [question, setQuestion] = useState<number>(1);

    const [phoneNo, setPhoneNo] = useState<string>('');
    const [phoneNoValid, setPhoneNoValid] = useState<boolean>(false);
    const [p_PhoneNo, setP_PhoneNo] = useState<string>('');
    const [p_PhoneNoValid, setP_PhoneNoValid] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cPassword, setCPassword] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    console.log(phoneNo, phoneNoValid, p_PhoneNo, p_PhoneNoValid);

    const [isMaleTutor, setIsMaleTutor] = useState<boolean>(false);
    const [maleVoice, setMaleVoice] = useState<string>(
        AvatarVoices?.Male[0]?.value,
    );
    const [femaleVoice, setFemaleVoice] = useState<string>(
        AvatarVoices?.Female[0]?.value,
    );

    const submit_data = no_double_clicks({
        execFunc: () => {
            navigation.navigate(
                'AuthStack' as never,
                { screen: 'CongratulationsPage' } as never,
            );
        },
    });

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
                        ? Platform?.OS === 'ios'
                            ? 56
                            : 40
                        : Platform.OS === 'ios'
                        ? 70
                        : 40,
                    marginBottom: 28,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            <ScrollView style={{ flex: 1 }}>
                <ProgressBar
                    progress={(question / total_pages) * 100}
                    marginTop={10}
                    marginBottom={40}
                />
                {question === 1 && (
                    <>
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
                                        onPress={() => setIsMaleTutor(false)}>
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
                                                source={avatars_data[0]?.image}
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
                                        buttonSize={40}
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
                                    disable={isMaleTutor}
                                    paddingHorizontal={7}
                                    marginRight={44}
                                />
                            </View>
                            <View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                    }}>
                                    <TouchableOpacity
                                        style={styles.avatar_bg}
                                        onPress={() => setIsMaleTutor(true)}>
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
                                                source={avatars_data[6]?.image}
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
                                        buttonSize={40}
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
                                    disable={!isMaleTutor}
                                    paddingHorizontal={7}
                                    marginRight={44}
                                />
                            </View>
                        </View>
                    </>
                )}
                {question === 2 && (
                    <>
                        <Text style={styles.onboarding_headers}>
                            How well can you read English?
                        </Text>
                        <View style={styles.avatar_q_cont}>
                            <MiniAvatar isMale={isMaleTutor} />
                            <Text style={styles.avatar_g_txt}>
                                We will create a study class for you depending
                                on how you answer the following questions.
                            </Text>
                        </View>
                        <Text>Test 1</Text>
                        <Text>
                            Two Boys named Jack and Jill were playing World Cup
                            at home. Jack won Jill 4-2.
                        </Text>
                    </>
                )}
                {question === 3 && (
                    <>
                        <Text style={styles.onboarding_headers}>
                            What is your Mobile Number?
                        </Text>
                        <PhoneNumberInput
                            setInputValue={setPhoneNo}
                            setIsValid={setPhoneNoValid}
                            defaultCode="US"
                        />
                    </>
                )}
                {question === 4 && (
                    <>
                        <Text style={styles.onboarding_headers}>
                            Your Parent's WhatsApp Number?
                        </Text>
                        <PhoneNumberInput
                            setInputValue={setP_PhoneNo}
                            setIsValid={setP_PhoneNoValid}
                            defaultCode="US"
                        />
                    </>
                )}
                {question === 5 && (
                    <>
                        <Text style={styles.onboarding_headers}>
                            What is your Email Address?
                        </Text>
                        <BasicTextEntry
                            placeHolderText="johndoe@gmail.com"
                            inputValue={email}
                            setInputValue={setEmail}
                            marginTop={32}
                            marginBottom={12}
                            inputMode="text"
                        />
                    </>
                )}
                {question === 6 && (
                    <>
                        <Text style={styles.onboarding_headers}>
                            Add a Profile Picture
                        </Text>
                    </>
                )}
                {question === 7 && (
                    <>
                        <Text style={styles.onboarding_headers}>
                            Create a Password
                        </Text>
                        <SecureTextEntry
                            inputValue={password}
                            setInputValue={setPassword}
                            placeHolderText="Enter a Password here..."
                            marginTop={32}
                            marginBottom={12}
                        />
                        <SecureTextEntry
                            inputValue={cPassword}
                            setInputValue={setCPassword}
                            placeHolderText="Re-Enter your Password"
                            marginTop={2}
                            marginBottom={12}
                        />
                    </>
                )}
                {question !== 1 && (
                    <TextButton
                        buttonText="Go Back"
                        marginLeft={'auto'}
                        marginRight={22}
                        marginBottom={40}
                        execFunc={prev_question}
                    />
                )}
                <BasicButton
                    buttonText={
                        question === total_pages && password?.length >= 6
                            ? 'Submit'
                            : 'Continue'
                    }
                    borderRadius={8}
                    marginHorizontal={22}
                    execFunc={
                        question === total_pages ? submit_data : next_question
                    }
                    buttonHeight={56}
                    marginTop={40}
                />
            </ScrollView>
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
});
