import React, { FunctionComponent, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import TextButton from '../../Components/Text_Button/Text_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { regex_email_checker } from '../../Utils/Email_Checker/Email_Checker';

const SignInPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const sign_in_user = no_double_clicks({
        execFunc: () => {
            if (regex_email_checker({ email: email }) && password) {
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Fields cannot be empty!',
                });
            }
        },
    });

    const nav_to_sign_up = no_double_clicks({
        execFunc: () =>
            navigation.navigate(
                'AuthStack' as never,
                { screen: 'SignUpPage' } as never,
            ),
    });

    const nav_to_forgot_password = no_double_clicks({
        execFunc: () =>
            navigation.navigate(
                'AuthStack' as never,
                {
                    screen: 'ForgotPasswordPage',
                } as never,
            ),
    });

    return (
        <View style={styles.sign_in_main}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors().Background}
                backgroundDimColor={Colors().BackgroundDim}
            />
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
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            <Text style={styles.si_m_wt}>
                Welcome back! Glad to see you, Again!
            </Text>
            <BasicTextEntry
                placeHolderText="Enter your email"
                inputValue={email}
                setInputValue={setEmail}
                marginTop={32}
                marginBottom={15}
                inputMode="email"
            />
            <SecureTextEntry
                placeHolderText="Enter your password"
                inputValue={password}
                setInputValue={setPassword}
                marginBottom={15}
            />
            <TextButton
                buttonText="Forgot Password?"
                isFontLight={true}
                fontSize={14}
                textColor={Colors().DarkGrey}
                execFunc={nav_to_forgot_password}
                alignItems="flex-end"
                marginRight={22}
                marginBottom={30}
            />
            <BasicButton
                buttonText="Login"
                borderRaduis={8}
                marginHorizontal={22}
                execFunc={sign_in_user}
                buttonHeight={56}
                disabled={disableButton}
            />
            <View style={styles.si_reg_cont}>
                <Text
                    style={{
                        color: Colors().Dark,
                        fontFamily: fonts.Urbanist_500,
                        fontSize: 16,
                    }}>
                    Don't have an account?
                </Text>
                <TextButton
                    buttonText="Register Now"
                    isFontLight={true}
                    execFunc={nav_to_sign_up}
                    marginLeft={5}
                    fontSize={16}
                />
            </View>
        </View>
    );
};

export default SignInPage;

const styles = StyleSheet.create({
    sign_in_main: {
        flex: 1,
        backgroundColor: Colors()?.Background,
    },
    si_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 30,
        width: 280,
        lineHeight: 39,
        marginLeft: 22,
        color: Colors().Dark,
    },
    si_reg_cont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: Platform.OS === 'ios' ? 40 : 30,
    },
});
