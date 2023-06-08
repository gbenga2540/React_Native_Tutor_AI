import React, {
    Fragment,
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    BackHandler,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import { get_age } from '../../Utils/Get_Age/Get_Age';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const IMAGE_SIZE = screen_height_less_than({
    if_true: 180,
    if_false: 220,
});
const TOTAL_PAGES = 3;

const SignUpPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [question, setQuestion] = useState<number>(1);

    const [name, setName] = useState<string>('');
    const [dob, setDOB] = useState<Date>(() => {
        const _date = new Date();
        _date.setFullYear(_date.getFullYear() - 15);
        return _date;
    });
    const [openDateModal, setOpenDateModal] = useState<boolean>(false);
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [phoneNoValid, setPhoneNoValid] = useState<boolean>(false);
    const [parentPhoneNo, setParentPhoneNo] = useState<string>('');
    const [parentPhoneNoValid, setParentPhoneNoValid] =
        useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [displayPicture, setDisplayPicture] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cPassword, setCPassword] = useState<string>('');
    const [acceptedTC, setAcceptedTC] = useState<boolean>(false);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [agePHColor, setAgePHColor] = useState<string>(Colors.Grey);

    console.log(phoneNo, phoneNoValid, parentPhoneNo, parentPhoneNoValid);

    const submit_data = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'AuthStack' as never,
                {
                    screen: 'VerifyOTPPage',
                } as never,
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

    const handle_go_back = () => {
        if (question === 1) {
            navigation.canGoBack() && navigation.goBack();
        } else {
            prev_question();
        }
    };

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
                        ? Platform.OS === 'ios'
                            ? 60
                            : 20
                        : Platform.OS === 'ios'
                        ? 70
                        : 20,
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton execFunc={handle_go_back} />
                <ProgressBar progress={(question / TOTAL_PAGES) * 100} />
            </View>
            <ScrollView style={{ flex: 1 }}>
                {question === 1 && (
                    <Fragment>
                        <BasicText
                            inputText="What is your Name?"
                            marginTop={20}
                            textWeight={700}
                            textSize={24}
                            marginLeft={22}
                            marginRight={22}
                        />
                        <BasicTextEntry
                            placeHolderText="John Doe"
                            inputValue={name}
                            setInputValue={setName}
                            marginTop={15}
                            marginBottom={12}
                            inputMode="text"
                        />
                        <BasicText
                            inputText="Your Date of Birth?"
                            marginTop={25}
                            textWeight={700}
                            textSize={24}
                            marginLeft={22}
                            marginRight={22}
                        />
                        <BasicTextEntry
                            placeHolderText={mongo_date_converter_4({
                                input_date: new Date()?.toString(),
                            })}
                            inputValue={`${mongo_date_converter_4({
                                input_date: dob?.toString(),
                            })} - ${
                                get_age({
                                    input_date: dob?.toString(),
                                }) === 0
                                    ? ''
                                    : get_age({
                                          input_date: dob?.toString(),
                                      })
                            } ${
                                get_age({
                                    input_date: dob?.toString(),
                                }) === 1
                                    ? 'year old'
                                    : get_age({
                                          input_date: dob?.toString(),
                                      }) === 0
                                    ? 'Select your Date of Birth'
                                    : 'years old'
                            }`}
                            setInputValue={setDOB as any}
                            marginTop={15}
                            marginBottom={7}
                            inputMode="text"
                            editable={false}
                            textColor={agePHColor}
                        />
                        <TextButton
                            buttonText="Select Date"
                            marginLeft={'auto'}
                            marginRight={22}
                            marginBottom={10}
                            execFunc={open_dob}
                            textColor={Colors.LightPink}
                        />
                        {(get_age({
                            input_date: dob?.toString(),
                        }) as number) >= 15 && (
                            <Fragment>
                                <BasicText
                                    inputText="What is your Email Address?"
                                    marginTop={25}
                                    textWeight={700}
                                    textSize={24}
                                    marginLeft={22}
                                    marginRight={22}
                                />
                                <BasicTextEntry
                                    placeHolderText="johndoe@gmail.com"
                                    inputValue={email}
                                    setInputValue={setEmail}
                                    marginTop={15}
                                    marginBottom={12}
                                    inputMode="text"
                                />
                            </Fragment>
                        )}
                    </Fragment>
                )}
                {question === 2 && (
                    <Fragment>
                        <BasicText
                            inputText="What is your Mobile Number?"
                            marginTop={20}
                            textWeight={700}
                            textSize={24}
                            marginLeft={22}
                            marginRight={22}
                        />
                        <PhoneNumberInput
                            setInputValue={setPhoneNo}
                            setIsValid={setPhoneNoValid}
                            defaultCode="US"
                            marginTop={15}
                        />
                        {(get_age({
                            input_date: dob?.toString(),
                        }) as number) < 15 && (
                            <Fragment>
                                <BasicText
                                    inputText="Your Parent's WhatsApp Number?"
                                    marginTop={25}
                                    textWeight={700}
                                    textSize={24}
                                    marginLeft={22}
                                    marginRight={22}
                                />
                                <PhoneNumberInput
                                    setInputValue={setParentPhoneNo}
                                    setIsValid={setParentPhoneNoValid}
                                    defaultCode="US"
                                    marginTop={15}
                                />
                            </Fragment>
                        )}
                        <BasicText
                            inputText="Add a Profile Picture"
                            marginTop={25}
                            textWeight={700}
                            textSize={24}
                            marginLeft={22}
                            marginRight={22}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 15,
                                marginBottom: 40,
                            }}>
                            <View
                                style={{
                                    width: '75%',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                }}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        borderWidth: 2,
                                        padding: 3,
                                        borderRadius: IMAGE_SIZE,
                                        borderColor: Colors.Grey,
                                    }}>
                                    {displayPicture ? (
                                        <Image
                                            style={{
                                                borderRadius: IMAGE_SIZE,
                                                width: IMAGE_SIZE,
                                                height: IMAGE_SIZE,
                                            }}
                                            source={{
                                                uri: displayPicture,
                                                width: IMAGE_SIZE,
                                                height: IMAGE_SIZE,
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            style={{
                                                borderRadius: IMAGE_SIZE,
                                                width: IMAGE_SIZE,
                                                height: IMAGE_SIZE,
                                            }}
                                            source={require('../../Images/Logos/Default_User_Logo.jpg')}
                                        />
                                    )}
                                </View>
                            </View>
                            <View style={styles.sdp_sp_w}>
                                <TouchableOpacity
                                    onPress={select_image_from_camera}
                                    style={[
                                        styles.sdp_sp_i,
                                        {
                                            backgroundColor: Colors.Border,
                                        },
                                    ]}>
                                    <Feather
                                        name="camera"
                                        size={screen_height_less_than({
                                            if_true: 25,
                                            if_false: 28,
                                        })}
                                        color={Colors.DarkGrey}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={select_image_from_gallery}
                                    style={[
                                        styles.sdp_sp_i,
                                        {
                                            backgroundColor: Colors.Border,
                                        },
                                    ]}>
                                    <Feather
                                        name="image"
                                        size={screen_height_less_than({
                                            if_true: 25,
                                            if_false: 28,
                                        })}
                                        color={Colors.DarkGrey}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={clear_image}
                                    style={[
                                        styles.sdp_sp_i,
                                        {
                                            backgroundColor: Colors.Border,
                                        },
                                    ]}>
                                    <Feather
                                        name="x"
                                        size={screen_height_less_than({
                                            if_true: 25,
                                            if_false: 28,
                                        })}
                                        color={Colors.DarkGrey}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Fragment>
                )}
                {question === 3 && (
                    <Fragment>
                        <BasicText
                            inputText="Create a Password"
                            marginTop={20}
                            textWeight={700}
                            textSize={24}
                            marginLeft={22}
                            marginRight={22}
                        />
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
                        <View
                            style={{
                                marginHorizontal: 24,
                                marginTop: 4,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <CheckBox
                                size={23}
                                padding={2}
                                active={acceptedTC}
                                setActive={setAcceptedTC}
                            />
                            <BasicText
                                inputText="Accept the"
                                textSize={16}
                                textFamily={fonts.OpenSans_400}
                                marginLeft={7}
                                marginRight={5}
                                textColor={Colors.Black}
                            />
                            <TextButton
                                buttonText="Terms and Conditions"
                                execFunc={nav_to_tc_page}
                            />
                        </View>
                    </Fragment>
                )}
            </ScrollView>
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
                    marginTop={10}
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
            <DatePicker
                modal
                mode="date"
                open={openDateModal}
                date={dob}
                maximumDate={new Date()}
                onConfirm={new_date => {
                    setAgePHColor(Colors.Dark);
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
    sdp_sp_w: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    sdp_sp_i: {
        width: screen_height_less_than({ if_true: 52, if_false: 60 }),
        height: screen_height_less_than({ if_true: 52, if_false: 60 }),
        borderRadius: screen_height_less_than({ if_true: 52, if_false: 60 }),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
