import React, { FunctionComponent, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import TextButton from '../../Components/Text_Button/Text_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { regex_email_checker } from '../../Utils/Email_Checker/Email_Checker';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

const SignUpPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cPassword, setCPassword] = useState<string>('');

    const proceed = no_double_clicks({
        execFunc: () => {
            if (username && email && password && cPassword) {
                if (regex_email_checker({ email: email })) {
                    if (password?.length >= 6) {
                        if (password === cPassword) {
                            navigation.push(
                                'AuthStack' as never,
                                {
                                    screen: 'SelectDPPage',
                                    params: {
                                        username: username,
                                        email: email,
                                        password: password,
                                    },
                                } as never,
                            );
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
                        error_mssg:
                            'Invalid Email. Please input a valid Email Address!',
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

    const nav_To_sign_in = no_double_clicks({
        execFunc: () =>
            navigation.navigate(
                'AuthStack' as never,
                {
                    screen: 'SignInPage',
                } as never,
            ),
    });

    return (
        <View style={styles.sign_up_main}>
            <CustomStatusBar backgroundColor={Colors().Background} />
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
            <Text style={styles.su_m_wt}>Hello! Register to get started</Text>
            <BasicTextEntry
                placeHolderText="Username"
                inputValue={username}
                setInputValue={setUsername}
                marginTop={32}
                marginBottom={15}
                inputMode="text"
            />
            <BasicTextEntry
                placeHolderText="Email"
                inputValue={email}
                setInputValue={setEmail}
                marginBottom={15}
                inputMode="email"
            />
            <SecureTextEntry
                placeHolderText="Password"
                inputValue={password}
                setInputValue={setPassword}
                marginBottom={15}
            />
            <SecureTextEntry
                placeHolderText="Confirm Password"
                inputValue={cPassword}
                setInputValue={setCPassword}
                marginBottom={30}
            />
            <BasicButton
                buttonText="Proceed"
                borderRaduis={8}
                marginHorizontal={22}
                execFunc={proceed}
                buttonHeight={56}
            />
            <View style={styles.su_reg_cont}>
                <Text
                    style={{
                        color: Colors().Dark,
                        fontFamily: fonts.Urbanist_500,
                        fontSize: 16,
                    }}>
                    Already have an account?
                </Text>
                <TextButton
                    buttonText="Login Now"
                    isFontLight={true}
                    execFunc={nav_To_sign_in}
                    marginLeft={5}
                    fontSize={16}
                />
            </View>
        </View>
    );
};

export default SignUpPage;

const styles = StyleSheet.create({
    sign_up_main: {
        flex: 1,
        backgroundColor: Colors()?.Background,
    },
    su_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 30,
        width: 280,
        lineHeight: 39,
        marginLeft: 22,
        color: Colors().Dark,
    },
    su_reg_cont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: Platform.OS === 'ios' ? 40 : 30,
    },
});
