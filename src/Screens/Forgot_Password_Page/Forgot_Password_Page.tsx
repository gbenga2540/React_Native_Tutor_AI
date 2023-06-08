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
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { regex_email_checker } from '../../Utils/Email_Checker/Email_Checker';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

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
                    inputText="Forgot Password?"
                    textWeight={700}
                    textSize={30}
                    marginLeft={22}
                    width={280}
                    marginBottom={2}
                />
                <BasicText
                    inputText="Enter Your Email to receive reset link."
                    textWeight={500}
                    textSize={16}
                    marginLeft={22}
                    marginRight={22}
                    textColor={Colors.Grey}
                />
                <BasicTextEntry
                    placeHolderText="Enter your email"
                    inputValue={email}
                    setInputValue={setEmail}
                    marginTop={20}
                    marginBottom={18}
                    inputMode="email"
                />
            </ScrollView>
            <KeyboardAvoidingView
                style={{ zIndex: 2 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <BasicButton
                    buttonText="Send Mail"
                    borderRadius={8}
                    marginHorizontal={22}
                    execFunc={send_mail}
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
                source={require('../../Images/Extra/Arrow_Curves_2.png')}
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
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
    fp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    fp_reg_cont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: Platform.OS === 'ios' ? 40 : 30,
    },
});
