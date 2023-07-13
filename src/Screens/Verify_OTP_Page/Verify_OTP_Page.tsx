import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    View,
    Keyboard,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import OTPTextView from 'react-native-otp-textinput';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextButton from '../../Components/Text_Button/Text_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { MutationCache, QueryCache, useMutation } from 'react-query';
import { delete_account } from '../../Configs/Queries/Users/Users';
import SInfo from 'react-native-sensitive-info';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { ScheduleInfoStore } from '../../MobX/Schedules_Info/Schedules_Info';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import {
    SECURE_STORAGE_CREDIT_CARD_INFO,
    SECURE_STORAGE_NAME,
    SECURE_STORAGE_SCHEDULE_INFO,
    SECURE_STORAGE_SPEECH_CONTROLLER,
    SECURE_STORAGE_USER_INFO,
    SECURE_STORAGE_VOICE_INFO,
} from '@env';
import BackButton from '../../Components/Back_Button/Back_Button';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { resend_del_pin } from '../../Configs/Queries/Auth/Auth';
import { observer } from 'mobx-react';

const VerifyOTPPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const queryCache = new QueryCache();
    const mutationCache = new MutationCache();

    const [OTP, setOTP] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [clickedResend, setClickedResend] = useState<boolean>(false);

    const [pinText, setPinText] = useState<string>(
        "A PIN has been sent to your Account. Please check your Email for the PIN or click the 'Resend PIN' to generate a new PIN.",
    );

    const { mutate: delete_account_mutate } = useMutation(delete_account, {
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
                        'Something went wrong! Unable to delete Account.',
                    svr_error_mssg: data?.data,
                });
            } else {
                sign_out();
            }
        },
    });

    const { mutate: resend_del_pin_mutate } = useMutation(resend_del_pin, {
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
                    error_mssg: 'An error occured while trying to resend PIN!',
                    svr_error_mssg: data?.data,
                });
            } else {
                if (clickedResend) {
                    setPinText('A New PIN has been sent your Email Address!');
                }

                const prevUserInfo = UserInfoStore?.user_info;

                const update_info = () => {
                    UserInfoStore.set_user_info({
                        user_info: {
                            ...prevUserInfo,
                            delete_otp: data?.data?.del_PIN,
                        },
                    });
                };

                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_USER_INFO,
                        JSON.stringify({
                            user_info: {
                                ...prevUserInfo,
                                delete_otp: data?.data?.del_PIN,
                            },
                        }),
                        {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        },
                    )
                        .catch(err => {
                            err && update_info();
                        })
                        .then(() => {
                            update_info();
                        });
                } catch (error) {
                    update_info();
                }
            }
        },
    });

    const sign_out = async () => {
        const reset_data = () => {
            queryCache.clear();
            mutationCache.clear();
            UserInfoStore.clear_user_info();
            ScheduleInfoStore.clear_schedule_info();
            AvatarVoiceStore.clear_avatar_voice_info();
            setDisableButton(false);
            setShowSpinner(false);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }],
                }),
            );
        };
        try {
            setDisableButton(true);
            setShowSpinner(true);
            await SInfo.deleteItem(SECURE_STORAGE_USER_INFO, {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            });
            await SInfo.deleteItem(SECURE_STORAGE_SCHEDULE_INFO, {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            });
            await SInfo.deleteItem(SECURE_STORAGE_VOICE_INFO, {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            });
            await SInfo.deleteItem(SECURE_STORAGE_CREDIT_CARD_INFO, {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            });
            await SInfo.deleteItem(SECURE_STORAGE_SPEECH_CONTROLLER, {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            });
            reset_data();
        } catch (error) {
            reset_data();
        }
    };

    const verify_otp = no_double_clicks({
        execFunc: () => {
            if (
                OTP?.length > 3 &&
                OTP?.split('').join(' ') ===
                    UserInfoStore?.user_info?.delete_otp
            ) {
                delete_account_mutate({
                    userAuth: UserInfoStore.user_info.accessToken as string,
                });
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Invalid One-Time-Password (OTP).',
                });
            }
        },
    });

    const resend_mail = no_double_clicks({
        execFunc: async () => {
            setClickedResend(true);
            resend_del_pin_mutate({
                userAuth: UserInfoStore?.user_info?.accessToken as string,
            });
        },
    });

    useEffect(() => {
        const send_otp = setTimeout(() => {
            resend_del_pin_mutate({
                userAuth: UserInfoStore?.user_info?.accessToken as string,
            });
        }, 80);
        return () => clearTimeout(send_otp);
    }, [resend_del_pin_mutate]);

    const [timer, setTimer] = useState<number>(30);
    useEffect(() => {
        let intervalId: any;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [timer]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.Background,
            }}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors.Background}
                backgroundDimColor={Colors.BackgroundDim}
            />
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
                    marginBottom: 20,
                }}>
                <BackButton />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <BasicText
                    inputText="Let's Confirm your Request"
                    marginBottom={50}
                    marginLeft={22}
                    width={320}
                    textSize={30}
                    textWeight={700}
                />
                <BasicText
                    inputText={pinText}
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
                        disabled={disableButton}
                        textColor={Colors.LightPink}
                        isFontLight={true}
                        fontSize={17}
                        marginTop={5}
                        marginLeft={'auto'}
                        marginRight={'auto'}
                        buttonText={'Resend OTP'}
                        marginBottom={'auto'}
                        execFunc={resend_mail}
                    />
                )}
            </ScrollView>
            <KeyboardAvoidingView
                style={{ zIndex: 2 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <BasicButton
                    buttonText={'DELETE ACCOUNT'}
                    borderRadius={8}
                    marginHorizontal={22}
                    execFunc={() => verify_otp({})}
                    buttonHeight={56}
                    disabled={disableButton}
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

export default VerifyOTPPage;
