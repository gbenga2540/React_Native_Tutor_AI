import React, { FunctionComponent, useEffect, useState } from 'react';
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
import DatePicker from 'react-native-date-picker';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import PhoneNumberInput from '../../Components/Phone_Number_Input/Phone_Number_Input';
import { mongo_date_converter_4 } from '../../Utils/Mongo_Date_Converter/Mongo_Date_Converter';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '../../Components/Check_Box/Check_Box';

const SignUpPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const total_pages = 7;
    const [question, setQuestion] = useState<number>(1);

    const [name, setName] = useState<string>('');
    const [dob, setDOB] = useState<Date>(new Date());
    const [openDateModal, setOpenDateModal] = useState<boolean>(false);
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [phoneNoValid, setPhoneNoValid] = useState<boolean>(false);
    const [p_PhoneNo, setP_PhoneNo] = useState<string>('');
    const [p_PhoneNoValid, setP_PhoneNoValid] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [displayPicture, setDisplayPicture] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cPassword, setCPassword] = useState<string>('');
    const [checkBoxActive, setCheckBoxActive] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    console.log(phoneNo, phoneNoValid, p_PhoneNo, p_PhoneNoValid);

    const submit_data = no_double_clicks({
        execFunc: () => {
            navigation.navigate(
                'AuthStack' as never,
                { screen: 'CongratulationsPage' } as never,
            );
        },
    });

    const nav_to_tc_page = no_double_clicks({
        execFunc: () => {
            navigation.navigate(
                'AuthStack' as never,
                { screen: 'TCPage' } as never,
            );
        },
    });

    const open_dob = no_double_clicks({
        execFunc: () => {
            setOpenDateModal(true);
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

    const clear_image = no_double_clicks({
        execFunc: () => {
            setDisplayPicture('');
            ImagePicker.clean();
        },
    });

    const select_image_from_gallery = no_double_clicks({
        execFunc: () => {
            try {
                ImagePicker.openPicker({
                    width: 400,
                    height: 400,
                    cropping: true,
                    multiple: false,
                    includeBase64: true,
                    enableRotationGesture: true,
                    forceJpg: true,
                })
                    .catch(err => {
                        setDisplayPicture('');
                        if (err) {
                            clear_image();
                        }
                    })
                    .then(res => {
                        if (res) {
                            // @ts-ignore
                            const processed_image = `data:${res?.mime};base64,${res?.data}`;
                            setDisplayPicture(processed_image);
                        } else {
                            setDisplayPicture('');
                            clear_image();
                        }
                    });
            } catch (error) {
                setDisplayPicture('');
                clear_image();
            }
        },
    });

    const select_image_from_camera = no_double_clicks({
        execFunc: () => {
            try {
                ImagePicker.openCamera({
                    width: 400,
                    height: 400,
                    cropping: true,
                    multiple: false,
                    includeBase64: true,
                    enableRotationGesture: true,
                    forceJpg: true,
                })
                    .catch(err => {
                        setDisplayPicture('');
                        if (err) {
                            clear_image();
                        }
                    })
                    .then(res => {
                        if (res) {
                            // @ts-ignore
                            const processed_image = `data:${res?.mime};base64,${res?.data}`;
                            setDisplayPicture(processed_image);
                        } else {
                            setDisplayPicture('');
                            clear_image();
                        }
                    });
            } catch (error) {
                setDisplayPicture('');
                clear_image();
            }
        },
    });

    useEffect(() => {
        ImagePicker.clean();
    }, []);

    return (
        <View style={styles.sign_up_main}>
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
                        <Text style={styles.su_m_wt}>What is your Name?</Text>
                        <BasicTextEntry
                            placeHolderText="John Doe"
                            inputValue={name}
                            setInputValue={setName}
                            marginTop={32}
                            marginBottom={12}
                            inputMode="text"
                        />
                    </>
                )}
                {question === 2 && (
                    <>
                        <Text style={styles.su_m_wt}>Your Date of Birth?</Text>
                        <BasicTextEntry
                            placeHolderText={mongo_date_converter_4({
                                input_mongo_date: new Date()?.toString(),
                            })}
                            inputValue={mongo_date_converter_4({
                                input_mongo_date: dob?.toString(),
                            })}
                            setInputValue={setDOB as any}
                            marginTop={32}
                            marginBottom={12}
                            inputMode="text"
                            editable={false}
                        />
                        <TextButton
                            buttonText="Select Date"
                            marginLeft={22}
                            marginRight={'auto'}
                            marginBottom={10}
                            execFunc={open_dob}
                            textColor={Colors.LightPink}
                        />
                    </>
                )}
                {question === 3 && (
                    <>
                        <Text style={styles.su_m_wt}>
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
                        <Text style={styles.su_m_wt}>
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
                        <Text style={styles.su_m_wt}>
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
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 20,
                            }}>
                            <Text style={styles.su_m_wt}>
                                Add a Profile Picture
                            </Text>
                            <TextButton
                                buttonText="skip"
                                marginLeft={'auto'}
                                marginRight={22}
                                execFunc={no_double_clicks({
                                    execFunc: () => setQuestion(7),
                                })}
                                fontSize={16}
                            />
                        </View>
                        <View style={styles.sdp_w_i_c}>
                            {displayPicture ? (
                                <Image
                                    style={styles.sdp_w_i}
                                    source={{
                                        uri: displayPicture,
                                        width: 120,
                                        height: 120,
                                    }}
                                />
                            ) : (
                                <Image
                                    style={styles.sdp_w_i}
                                    source={require('../../Images/Logos/Default_User_Logo.jpg')}
                                />
                            )}
                        </View>
                        <View style={styles.sdp_sp_w}>
                            <TouchableOpacity
                                onPress={select_image_from_camera}
                                style={[
                                    styles.sdp_sp_i,
                                    { backgroundColor: Colors.Border },
                                ]}>
                                <Feather
                                    name="camera"
                                    size={28}
                                    color={Colors.DarkGrey}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={select_image_from_gallery}
                                style={[
                                    styles.sdp_sp_i,
                                    { backgroundColor: Colors.Border },
                                ]}>
                                <Feather
                                    name="image"
                                    size={28}
                                    color={Colors.DarkGrey}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={clear_image}
                                style={[
                                    styles.sdp_sp_i,
                                    { backgroundColor: Colors.Border },
                                ]}>
                                <Feather
                                    name="x"
                                    size={28}
                                    color={Colors.DarkGrey}
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                {question === 7 && (
                    <>
                        <Text style={styles.su_m_wt}>Create a Password</Text>
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
                    marginTop={question === 1 ? 10 : 0}
                />
                {question === total_pages && (
                    <View
                        style={{
                            marginHorizontal: 22,
                            marginTop: 40,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <CheckBox
                            size={23}
                            padding={2}
                            active={checkBoxActive}
                            setActive={setCheckBoxActive}
                        />
                        <Text
                            style={[
                                styles.su_m_wt,
                                {
                                    fontSize: 16,
                                    fontFamily: fonts.OpenSans_400,
                                    marginHorizontal: 5,
                                },
                            ]}>
                            Accept the
                        </Text>
                        <TextButton
                            buttonText="Terms and Conditions"
                            execFunc={nav_to_tc_page}
                        />
                    </View>
                )}
            </ScrollView>
            <DatePicker
                modal
                mode="date"
                open={openDateModal}
                date={dob}
                onConfirm={new_date => {
                    setOpenDateModal(false);
                    setDOB(new_date);
                }}
                onCancel={() => {
                    setOpenDateModal(false);
                }}
            />
        </View>
    );
};

export default SignUpPage;

const styles = StyleSheet.create({
    sign_up_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    su_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 29,
        marginHorizontal: 22,
        color: Colors.Dark,
    },
    sdp_w_i_c: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 130,
        padding: 2,
        marginBottom: 40,
        borderColor: Colors.Grey,
        borderWidth: 2,
    },
    sdp_w_i: {
        borderRadius: 230,
        width: 230,
        height: 230,
    },
    sdp_sp_w: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 40,
    },
    sdp_sp_i: {
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
