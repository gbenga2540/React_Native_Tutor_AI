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
import { useMutation } from 'react-query';
import { change_password } from '../../Configs/Queries/Users/Users';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';
import { observer } from 'mobx-react';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';

const ChangePasswordPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newCPassword, setNewCPassword] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { mutate: change_password_mutate } = useMutation(change_password, {
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
                        "An error occured while trying to change User's Password!",
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
                        },
                    });
                    setOldPassword('');
                    setNewPassword('');
                    setNewCPassword('');
                    info_handler({
                        navigation: navigation,
                        proceed_type: 4,
                        success_mssg:
                            'Your password has been updated successfully!',
                        svr_success_mssg: '',
                        hide_back_btn: false,
                        hide_header: false,
                    });
                };

                const TempUserInfo = { ...UserInfoStore?.user_info };
                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_USER_INFO,
                        JSON.stringify({
                            user_info: {
                                ...TempUserInfo,
                                password: data?.data?.password,
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

    const change_password_func = no_double_clicks({
        execFunc: async () => {
            if (oldPassword && newPassword && newCPassword) {
                if (newPassword?.length >= 6) {
                    if (newPassword === newCPassword) {
                        change_password_mutate({
                            uid: UserInfoStore?.user_info?._id as string,
                            oldPassword: oldPassword,
                            newPassword: newPassword,
                        });
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
});

export default ChangePasswordPage;

const styles = StyleSheet.create({
    cp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
