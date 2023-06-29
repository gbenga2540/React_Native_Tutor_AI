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
    Keyboard,
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
import OTPTextView from 'react-native-otp-textinput';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { useMutation } from 'react-query';
import {
    register,
    resend_otp,
    set_password,
    verify_otp,
} from '../../Configs/Queries/Auth/Auth';
import { regex_email_checker } from '../../Utils/Email_Checker/Email_Checker';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { observer } from 'mobx-react';

const IMAGE_SIZE = screen_height_less_than({
    if_true: 180,
    if_false: 220,
});
const TOTAL_PAGES = 4;

const SignUpPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [question, setQuestion] = useState<number>(
        UserInfoStore.user_info?._id &&
            UserInfoStore?.user_info?.verified === false
            ? 3
            : UserInfoStore.user_info?._id &&
              !UserInfoStore?.user_info?.password
            ? 4
            : 1,
    );

    const [name, setName] = useState<string>('');
    const [dob, setDOB] = useState<Date>(() => {
        const _date = new Date();
        _date.setFullYear(_date.getFullYear() - 15);
        return _date;
    });
    const [openDateModal, setOpenDateModal] = useState<boolean>(false);
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [phoneNoValid, setPhoneNoValid] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [displayPicture, setDisplayPicture] = useState<string>('');
    const [OTP, setOTP] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cPassword, setCPassword] = useState<string>('');
    const [acceptedTC, setAcceptedTC] = useState<boolean>(false);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [agePHColor, setAgePHColor] = useState<string>(Colors.Grey);

    const { mutate: register_mutate } = useMutation(register, {
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
                        'An error occured while trying to Register User!',
                    svr_error_mssg: data?.data,
                });
            } else {
                const proceed = () => {
                    UserInfoStore.set_user_info({
                        user_info: { ...data?.data },
                    });
                    setQuestion(
                        clamp_value({
                            value: question + 1,
                            minValue: 1,
                            maxValue: TOTAL_PAGES,
                        }),
                    );
                };
                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_USER_INFO,
                        JSON.stringify({
                            user_info: { ...data?.data },
                        }),
                        {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        },
                    )
                        .catch(error => {
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

    const { mutate: verify_otp_mutate } = useMutation(verify_otp, {
        onMutate: () => {
            setDisableButton(true);
            setShowSpinner(true);
        },
        onSettled: async data => {
            if (data?.error) {
                setShowSpinner(false);
                setDisableButton(false);
                error_handler({
                    navigation: navigation,
                    error_mssg: 'An error occured while trying to Verify OTP!',
                    svr_error_mssg: data?.data,
                });
            } else {
                const TempUserInfo = { ...UserInfoStore?.user_info };
                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_USER_INFO,
                        JSON.stringify({
                            user_info: { ...TempUserInfo, verified: true },
                        }),
                        {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        },
                    )
                        .catch(error => {
                            if (error) {
                                setShowSpinner(false);
                                setDisableButton(false);
                                UserInfoStore.set_user_info({
                                    user_info: {
                                        ...TempUserInfo,
                                        verified: true,
                                    },
                                });
                                setQuestion(
                                    clamp_value({
                                        value: question + 1,
                                        minValue: 1,
                                        maxValue: TOTAL_PAGES,
                                    }),
                                );
                            }
                        })
                        .then(() => {
                            setShowSpinner(false);
                            setDisableButton(false);
                            UserInfoStore.set_user_info({
                                user_info: { ...TempUserInfo, verified: true },
                            });
                            setQuestion(
                                clamp_value({
                                    value: question + 1,
                                    minValue: 1,
                                    maxValue: TOTAL_PAGES,
                                }),
                            );
                        });
                } catch (err) {
                    setShowSpinner(false);
                    setDisableButton(false);
                    UserInfoStore.set_user_info({
                        user_info: { ...TempUserInfo, verified: true },
                    });
                    setQuestion(
                        clamp_value({
                            value: question + 1,
                            minValue: 1,
                            maxValue: TOTAL_PAGES,
                        }),
                    );
                }
            }
        },
    });

    const { mutate: set_password_mutate } = useMutation(set_password, {
        onMutate: () => {
            setDisableButton(true);
            setShowSpinner(true);
        },
        onSettled: async data => {
            if (data?.error) {
                setShowSpinner(false);
                setDisableButton(false);
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        'An error occured while trying to Set Password!',
                    svr_error_mssg: data?.data,
                });
            } else {
                const proceed = () => {
                    setShowSpinner(false);
                    setDisableButton(false);
                    UserInfoStore.set_user_info({
                        user_info: {
                            ...TempUserInfo,
                            password: data?.data?.password,
                            accessToken: data?.data?.accessToken,
                        },
                    });
                    setPassword('');
                    setCPassword('');
                    navigation.push(
                        'AuthStack' as never,
                        {
                            screen: 'CongratulationsPage',
                            params: {
                                header_txt: 'Congratulations',
                                message_txt:
                                    "Your account has been created, Now let's set up your profile.",
                                nextPage: 1,
                            },
                        } as never,
                    );
                };

                const TempUserInfo = { ...UserInfoStore?.user_info };
                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_USER_INFO,
                        JSON.stringify({
                            user_info: {
                                ...TempUserInfo,
                                password: data?.data?.password,
                                accessToken: data?.data?.accessToken,
                            },
                        }),
                        {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        },
                    )
                        .catch(error => {
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

    const { mutate: resend_otp_mutate } = useMutation(resend_otp, {
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
                    error_mssg: 'An error occured while trying to resend OTP!',
                    svr_error_mssg: data?.data,
                });
            } else {
                setTimer(30);
            }
        },
    });

    const resend_mail = no_double_clicks({
        execFunc: () => {
            if (timer === 0 && UserInfoStore?.user_info?._id) {
                resend_otp_mutate({
                    uid: UserInfoStore?.user_info?._id,
                });
            }
        },
    });

    const submit_data = no_double_clicks({
        execFunc: () => {
            if (password?.length >= 6) {
                if (password === cPassword) {
                    if (acceptedTC) {
                        set_password_mutate({
                            uid: UserInfoStore?.user_info?._id as string,
                            password: password,
                        });
                    } else {
                        error_handler({
                            navigation: navigation,
                            error_mssg:
                                'You have not accepted the Terms and Condition!',
                        });
                    }
                } else {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Passwords do not match!',
                    });
                }
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Password field cannot be less than six!',
                });
            }
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
            if (question === 1) {
                if (
                    regex_email_checker({ email: email?.trim() }) &&
                    name &&
                    dob
                ) {
                    setQuestion(
                        clamp_value({
                            value: question + 1,
                            minValue: 1,
                            maxValue: TOTAL_PAGES,
                        }),
                    );
                } else {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Some fields are missing / incorrect!',
                    });
                }
            } else if (question === 2) {
                if (phoneNoValid && phoneNo) {
                    if (displayPicture) {
                        register_mutate({
                            email: email?.trim(),
                            displayPicture: displayPicture || '',
                            fullname: name,
                            mobile: phoneNo,
                            dob: dob?.toString(),
                        });
                    } else {
                        error_handler({
                            navigation: navigation,
                            error_mssg: 'No Profile Picture Added!',
                        });
                    }
                } else {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Invalid Mobile Number!',
                    });
                }
            } else if (question === 3) {
                if (OTP?.length === 4) {
                    if (true && UserInfoStore?.user_info?._id) {
                        verify_otp_mutate({
                            uid: UserInfoStore?.user_info?._id,
                            otp: OTP?.split('').join(' '),
                        });
                    }
                } else {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Incorrect One-Time-Password (OTP).',
                    });
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
                        clear_image({});
                        if (err?.code !== 'E_PICKER_CANCELLED') {
                            if (err?.code !== 'E_NO_LIBRARY_PERMISSION') {
                                error_handler({
                                    navigation: navigation,
                                    error_mssg: err?.message,
                                });
                            }
                        }
                    })
                    .then(res => {
                        if (res) {
                            // @ts-ignore
                            const processed_image = `data:${res?.mime};base64,${res?.data}`;
                            setDisplayPicture(processed_image);
                        } else {
                            setDisplayPicture('');
                            clear_image({});
                        }
                    });
            } catch (error) {
                setDisplayPicture('');
                clear_image({});
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
                        clear_image({});
                        if (err?.code !== 'E_PICKER_CANCELLED') {
                            if (err?.code !== 'E_NO_CAMERA_PERMISSION') {
                                error_handler({
                                    navigation: navigation,
                                    error_mssg: err?.message,
                                });
                            }
                        }
                    })
                    .then(res => {
                        if (res) {
                            // @ts-ignore
                            const processed_image = `data:${res?.mime};base64,${res?.data}`;
                            setDisplayPicture(processed_image);
                        } else {
                            setDisplayPicture('');
                            clear_image({});
                        }
                    });
            } catch (error) {
                setDisplayPicture('');
                clear_image({});
            }
        },
    });

    useEffect(() => {
        ImagePicker.clean();
        setDisplayPicture('');
    }, [question]);

    const handle_go_back = () => {
        if (question === 1) {
            navigation.canGoBack() && navigation.goBack();
        } else if (question === 3) {
            if (
                (UserInfoStore.user_info?._id &&
                    UserInfoStore?.user_info?.verified === false) === false
            ) {
                navigation.canGoBack() && navigation.goBack();
            }
        } else if (question === 4) {
            if (
                (UserInfoStore.user_info?._id &&
                    UserInfoStore?.user_info?.password === '') === false
            ) {
                navigation.canGoBack() && navigation.goBack();
            }
        } else {
            prev_question({});
        }
    };

    const [timer, setTimer] = useState<number>(30);
    useEffect(() => {
        let intervalId: any;
        if (question === 3 && timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [timer, question]);

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
        <View style={styles.sign_up_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <View
                style={{
                    marginLeft: 22,
                    marginTop: Platform.OS === 'ios' ? 60 : 20,
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton show_back_button execFunc={handle_go_back} />
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
                            inputMode="text"
                            marginBottom={12}
                            autoFocus={false}
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
                        <Fragment>
                            <BasicText
                                inputText={
                                    (get_age({
                                        input_date: dob?.toString(),
                                    }) as number) >= 15
                                        ? 'What is your Email Address?'
                                        : "Your Parent's Email Address?"
                                }
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
                                inputMode="email"
                                marginBottom={12}
                                autoComplete="off"
                            />
                        </Fragment>
                    </Fragment>
                )}
                {question === 2 && (
                    <Fragment>
                        <BasicText
                            inputText={
                                (get_age({
                                    input_date: dob?.toString(),
                                }) as number) >= 15
                                    ? 'What is your Mobile Number?'
                                    : "Your Parent's WhatsApp Number?"
                            }
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
                            inputText="Let's Verify your Email Address"
                            marginBottom={50}
                            marginLeft={22}
                            width={320}
                            textSize={30}
                            textWeight={700}
                        />
                        <BasicText
                            inputText="We have sent you your OTP code to change your Password. Please, check your Email."
                            width={330}
                            textSize={15}
                            marginBottom={12}
                            textAlign="center"
                            marginLeft={'auto'}
                            marginRight={'auto'}
                            textColor={Colors.DarkGrey}
                            textWeight={500}
                        />
                        <View
                            style={{
                                maxWidth: 240,
                                alignSelf: 'center',
                            }}>
                            <OTPTextView
                                inputCount={4}
                                handleTextChange={(text: string) => {
                                    setOTP(text);
                                    if (text?.length >= 4) {
                                        if (Keyboard.isVisible()) {
                                            Keyboard.dismiss();
                                        }
                                    }
                                }}
                                offTintColor={Colors.DarkBorder}
                                tintColor={Colors.Primary}
                                textInputStyle={{
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderBottomWidth: 1,
                                }}
                            />
                        </View>
                        <BasicText
                            inputText={`Didn’t get an OTP? Click Resend in ${timer} ${
                                timer === 1 ? 'second' : 'seconds'
                            }`}
                            width={330}
                            textSize={15}
                            textAlign="center"
                            marginLeft={'auto'}
                            marginRight={'auto'}
                            textColor={Colors.DarkGrey}
                            textWeight={500}
                            marginTop={30}
                        />
                        {timer === 0 && (
                            <TextButton
                                textColor={Colors.LightPink}
                                isFontLight={true}
                                fontSize={17}
                                marginTop={5}
                                marginLeft={'auto'}
                                marginRight={'auto'}
                                buttonText={'Resend Mail'}
                                marginBottom={'auto'}
                                execFunc={resend_mail}
                            />
                        )}
                    </Fragment>
                )}
                {question === 4 && (
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
});

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
