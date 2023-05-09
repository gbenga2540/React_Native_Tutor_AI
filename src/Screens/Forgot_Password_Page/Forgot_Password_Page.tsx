import React, { FunctionComponent, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import TextButton from '../../Components/Text_Button/Text_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { useMutation } from 'react-query';
import { forgot_password } from '../../Configs/Queries/Users/Users';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

const ForgotPasswordPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [email, setEmail] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { mutate: forgot_password_mutate } = useMutation(forgot_password, {
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
                    error_mssg: data?.data,
                });
            } else {
                info_handler({
                    navigation: navigation,
                    success_mssg:
                        'A New Password has been sent to your Email Address. Please check your Email for your new password and be sure to change your password once you are Signed In.',
                    proceed_type: 1,
                    hide_back_btn: true,
                    hide_header: false,
                });
            }
        },
    });

    const nav_to_sign_in_page = no_double_clicks({
        execFunc: () =>
            navigation.navigate(
                'AuthStack' as never,
                {
                    screen: 'SignInPage',
                } as never,
            ),
    });

    const send_mail = no_double_clicks({
        execFunc: () =>
            forgot_password_mutate({
                email: email,
            }),
    });

    return (
        <View style={styles.fp_main}>
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
            <Text style={styles.fp_m_wt}>Forgot Password?</Text>
            <Text style={styles.fp_m_wt2}>
                Don't worry! It occurs. Please enter the email address linked
                with your account.
            </Text>
            <BasicTextEntry
                placeHolderText="Enter your email"
                inputValue={email}
                setInputValue={setEmail}
                marginTop={32}
                marginBottom={38}
                inputMode="email"
            />
            <BasicButton
                buttonText="Send Mail"
                borderRaduis={8}
                marginHorizontal={22}
                execFunc={send_mail}
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
                    Remember Password?
                </Text>
                <TextButton
                    buttonText="Login"
                    isFontLight={true}
                    execFunc={nav_to_sign_in_page}
                    marginLeft={5}
                    fontSize={16}
                />
            </View>
        </View>
    );
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
    fp_main: {
        flex: 1,
        backgroundColor: Colors()?.Background,
    },
    fp_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 30,
        lineHeight: 39,
        marginLeft: 22,
        color: Colors().Dark,
        width: 280,
        marginBottom: 2,
    },
    fp_m_wt2: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        lineHeight: 24,
        marginLeft: 22,
        marginRight: 22,
        color: Colors().Grey,
    },
    si_reg_cont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: Platform.OS === 'ios' ? 40 : 30,
    },
});
