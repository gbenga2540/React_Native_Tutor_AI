import React, { FunctionComponent, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import TextButton from '../../Components/Text_Button/Text_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { regex_email_checker } from '../../Utils/Email_Checker/Email_Checker';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { useMutation } from 'react-query';
import { login } from '../../Configs/Queries/Auth/Auth';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { observer } from 'mobx-react';

const SignInPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { mutate: login_mutate } = useMutation(login, {
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
                    error_mssg: 'An error occured while trying to Sign In!',
                    svr_error_mssg: data?.data,
                });
            } else {
                const proceed = () => {
                    setShowSpinner(false);
                    setDisableButton(false);
                    UserInfoStore.set_user_info({
                        user_info: {
                            ...data?.data?.user,
                            accessToken: data?.data?.accessToken,
                        },
                    });
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'HomeStack' }],
                        }),
                    );
                };
                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_USER_INFO,
                        JSON.stringify({
                            user_info: {
                                ...data?.data?.user,
                                accessToken: data?.data?.accessToken,
                            },
                        }),
                        {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        },
                    )
                        .catch(err => {
                            err && proceed();
                        })
                        .then(() => {
                            proceed();
                        });
                } catch (error) {
                    proceed();
                }
            }
        },
    });

    const sign_in_user = no_double_clicks({
        execFunc: () => {
            if (regex_email_checker({ email: email?.trim() })) {
                if (password) {
                    login_mutate({
                        email: email?.trim(),
                        password: password,
                    });
                } else {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Invalid Password!',
                    });
                }
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Invalid Email!',
                });
            }
        },
    });

    const nav_to_fp = no_double_clicks({
        execFunc: () => {
            navigation.navigate(
                'AuthStack' as never,
                { screen: 'ForgotPasswordPage' } as never,
            );
        },
    });

    return (
        <View style={styles.sign_in_main}>
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
                            ? 56
                            : 25
                        : Platform.OS === 'ios'
                        ? 70
                        : 25,
                    marginBottom: 15,
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            <ScrollView style={{ flex: 1 }}>
                <BasicText
                    inputText="Welcome Back!"
                    textSize={25}
                    marginRight={2}
                    marginLeft={22}
                    textWeight={700}
                />
                <BasicTextEntry
                    placeHolderText="johndoe@gmail.com"
                    inputValue={email}
                    setInputValue={setEmail}
                    marginTop={32}
                    marginBottom={12}
                    inputMode="text"
                />
                <SecureTextEntry
                    inputValue={password}
                    setInputValue={setPassword}
                    placeHolderText="password"
                    marginBottom={14}
                />
                <TextButton
                    buttonText="Forgot Password?"
                    marginLeft={'auto'}
                    marginRight={22}
                    marginBottom={30}
                    execFunc={nav_to_fp}
                />
            </ScrollView>
            <KeyboardAvoidingView
                style={{ zIndex: 2 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <BasicButton
                    buttonText={'Proceed'}
                    borderRadius={8}
                    marginHorizontal={22}
                    execFunc={sign_in_user}
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
            <Image
                source={require('../../Images/Extra/Arrow_Curves_1.png')}
                style={{
                    width: 306,
                    height: 262,
                    position: 'absolute',
                    bottom: -65,
                    left: -75,
                    transform: [{ scale: 0.5 }],
                    opacity: 0.25,
                }}
            />
        </View>
    );
});

export default SignInPage;

const styles = StyleSheet.create({
    sign_in_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
