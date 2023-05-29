import React, { FunctionComponent, useState } from 'react';
import { Image, Keyboard, Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import OTPTextView from 'react-native-otp-textinput';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../../Components/Back_Button/Back_Button';
// import TextButton from '../../Components/Text_Button/Text_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import TextButton from '../../Components/Text_Button/Text_Button';

const VerifyOTPPage: FunctionComponent = () => {
        const navigation = useNavigation<NativeStackNavigationProp<any>>();

        const [OTP, setOTP] = useState<string>('');
        // const [token, setToken] = useState<string>('');
        const [showSpinner, setShowSpinner] = useState<boolean>(false);

        const resend_mail = no_double_clicks({
                execFunc: () => {},
        });

        const verify_otp = no_double_clicks({
                execFunc: () => {
                        if (OTP?.length === 4) {
                                navigation.push(
                                        'AuthStack' as never,
                                        {
                                                screen: 'CongratulationsPage',
                                                params: {
                                                        header_txt: 'Congratulations',
                                                        message_txt: "Your account has been created, Now let's set up your profile.",
                                                        nextPage: 1,
                                                },
                                        } as never,
                                );
                        } else {
                                error_handler({
                                        navigation: navigation,
                                        error_mssg: 'Incorrect One-Time-Password (OTP).',
                                });
                        }
                },
        });

        return (
                <View style={styles.v_otp_main}>
                        <CustomStatusBar showSpinner={showSpinner} backgroundColor={Colors.Background} backgroundDimColor={Colors.BackgroundDim} />
                        <OverlaySpinner showSpinner={showSpinner} setShowSpinner={setShowSpinner} />
                        <View
                                style={{
                                        marginLeft: 22,
                                        marginTop: navigation?.canGoBack() ? (Platform.OS === 'ios' ? 56 : 40) : Platform.OS === 'ios' ? 70 : 40,
                                        marginBottom: 28,
                                }}>
                                {navigation.canGoBack() && <BackButton />}
                        </View>
                        <Text style={styles.vo_m_wt}>Let's Verify your Email Address</Text>
                        <Text style={styles.v_o_m_info}>{'We have sent you your OTP code to change your Password. Check your mail or Spam Folder'}</Text>
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
                                        textInputStyle={styles.roundedTextInput}
                                />
                        </View>
                        <Text style={[styles.v_o_m_info, { marginTop: 30, marginBottom: 0 }]}>{'Didn’t get an OTP? Click Resend in 30 seconds'}</Text>
                        <TextButton textColor={Colors.LightPink} isFontLight={true} fontSize={17} marginTop={5} marginLeft={'auto'} marginRight={'auto'} buttonText={'Resend Mail'} marginBottom={'auto'} execFunc={resend_mail} />
                        <BasicButton buttonText="Verify Email" borderRadius={8} marginHorizontal={22} execFunc={verify_otp} buttonHeight={56} marginBottom={Platform.OS === 'ios' ? 50 : 20} />
                </View>
        );
};

export default VerifyOTPPage;

const styles = StyleSheet.create({
        v_otp_main: {
                flex: 1,
                backgroundColor: Colors.Background,
        },
        vo_m_wt: {
                fontFamily: fonts.Urbanist_700,
                fontSize: 30,
                width: 320,
                lineHeight: 39,
                marginLeft: 22,
                color: Colors.Dark,
                marginBottom: 50,
        },
        roundedTextInput: {
                borderRadius: 5,
                borderWidth: 1,
                borderBottomWidth: 1,
        },
        v_o_m_info: {
                fontFamily: fonts.Urbanist_500,
                color: Colors.DarkGrey,
                textAlign: 'center',
                width: 330,
                alignSelf: 'center',
                marginBottom: 12,
                fontSize: 15,
        },
});
