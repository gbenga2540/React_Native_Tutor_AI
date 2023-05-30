import React, { FunctionComponent, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { regex_email_checker } from '../../Utils/Email_Checker/Email_Checker';

const ForgotPasswordPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [email, setEmail] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const send_mail = no_double_clicks({
        execFunc: () => {
            if (regex_email_checker({ email: email })) {
                navigation.push(
                    'AuthStack' as never,
                    {
                        screen: 'ChangePasswordPage',
                    } as never,
                );
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Email field cannot be empty!',
                });
            }
        },
    });

    return (
        <View style={styles.fp_main}>
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
                    marginLeft: 22,
                    marginTop: navigation?.canGoBack()
                        ? Platform.OS === 'ios'
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
                Enter Your Email to receive reset link.
            </Text>
            <BasicTextEntry
                placeHolderText="Enter your email"
                inputValue={email}
                setInputValue={setEmail}
                marginTop={20}
                marginBottom={18}
                inputMode="email"
            />
            <BasicButton
                buttonText="Send Mail"
                borderRadius={8}
                marginHorizontal={22}
                execFunc={send_mail}
                buttonHeight={56}
                disabled={disableButton}
            />
            <Image
                source={require('../../Images/Extra/Arrow_Curves_2.png')}
                style={{
                    width: 306,
                    height: 262,
                    position: 'absolute',
                    bottom: -65,
                    left: -75,
                    transform: [{ scale: 0.5 }],
                }}
            />
        </View>
    );
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
    fp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    fp_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 30,
        lineHeight: 39,
        marginLeft: 22,
        color: Colors.Dark,
        width: 280,
        marginBottom: 2,
    },
    fp_m_wt2: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        lineHeight: 24,
        marginHorizontal: 22,
        color: Colors.Grey,
    },
    fp_reg_cont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: Platform.OS === 'ios' ? 40 : 30,
    },
});
