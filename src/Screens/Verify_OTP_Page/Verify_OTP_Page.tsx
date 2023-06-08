import React, { FunctionComponent, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import OTPTextView from 'react-native-otp-textinput';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import TextButton from '../../Components/Text_Button/Text_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { KeyboardStore } from '../../MobX/Keyboard/Keyboard';
import { Observer } from 'mobx-react';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const VerifyOTPPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [OTP, setOTP] = useState<string>('');
    const [timer, setTimer] = useState<number>(30);
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
                            message_txt:
                                "Your account has been created, Now let's set up your profile.",
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

    const count_down = () => {
        let counter = 30;
        const interval = setInterval(() => {
            counter--;
            // setTimer(counter);
            console.log(counter);
            if (counter <= 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

    return (
        <View style={styles.v_otp_main}>
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
                            : 25
                        : Platform.OS === 'ios'
                        ? 70
                        : 25,
                    marginBottom: 8,
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
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
                    textInputStyle={styles.roundedTextInput}
                />
            </View>
            <BasicText
                inputText={`Didn’t get an OTP? Click Resend in ${timer} seconds`}
                width={330}
                textSize={15}
                textAlign="center"
                marginLeft={'auto'}
                marginRight={'auto'}
                textColor={Colors.DarkGrey}
                textWeight={500}
                marginTop={30}
            />
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
            <Observer>
                {() => (
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <BasicButton
                            buttonText="Verify Email"
                            borderRadius={8}
                            marginHorizontal={22}
                            execFunc={verify_otp}
                            buttonHeight={56}
                            marginBottom={
                                Platform.OS === 'ios'
                                    ? KeyboardStore.keyboard_active
                                        ? 15
                                        : screen_height_less_than({
                                              if_true: 10,
                                              if_false: 40,
                                          })
                                    : 20
                            }
                        />
                    </KeyboardAvoidingView>
                )}
            </Observer>
        </View>
    );
};

export default VerifyOTPPage;

const styles = StyleSheet.create({
    v_otp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    roundedTextInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderBottomWidth: 1,
    },
});
