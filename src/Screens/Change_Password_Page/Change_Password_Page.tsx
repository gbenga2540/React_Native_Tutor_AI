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
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const ChangePasswordPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newCPassword, setNewCPassword] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const change_password_func = no_double_clicks({
        execFunc: async () => {
            if (oldPassword && newPassword && newCPassword) {
                if (newPassword?.length >= 6) {
                    if (newPassword === newCPassword) {
                    } else {
                        error_handler({
                            navigation: navigation,
                            error_mssg: 'Passwords do not match!',
                        });
                    }
                } else {
                    error_handler({
                        navigation: navigation,
                        error_mssg: 'Password cannot be less than six!',
                    });
                }
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Fields cannot be empty!',
                });
            }
        },
    });

    return (
        <View style={styles.cp_main}>
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
                    inputText="Create New Password"
                    marginLeft={22}
                    marginRight={22}
                    textSize={30}
                    textWeight={700}
                />
                <BasicText
                    inputText="Create a new, safe and secured password for your account"
                    textWeight={500}
                    textSize={16}
                    marginLeft={22}
                    marginRight={22}
                    textColor={Colors.Grey}
                    marginBottom={32}
                />
                <SecureTextEntry
                    placeHolderText="Enter your old password"
                    inputValue={oldPassword}
                    setInputValue={setOldPassword}
                    marginBottom={15}
                />
                <SecureTextEntry
                    placeHolderText="Enter a new password"
                    inputValue={newPassword}
                    setInputValue={setNewPassword}
                    marginBottom={15}
                />
                <SecureTextEntry
                    placeHolderText="Confirm your new password"
                    inputValue={newCPassword}
                    setInputValue={setNewCPassword}
                    marginBottom={38}
                />
            </ScrollView>
            <KeyboardAvoidingView
                style={{ zIndex: 2 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <BasicButton
                    buttonText="Reset Password"
                    borderRadius={8}
                    marginHorizontal={22}
                    execFunc={change_password_func}
                    buttonHeight={56}
                    disabled={disableButton}
                    marginTop={'auto'}
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
                source={require('../../Images/Extra/Arrow_Curves_4.png')}
                style={{
                    width: 306,
                    height: 262,
                    position: 'absolute',
                    bottom: -65,
                    right: -70,
                    transform: [{ scale: 0.5 }],
                }}
            />
        </View>
    );
};

export default ChangePasswordPage;

const styles = StyleSheet.create({
    cp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
