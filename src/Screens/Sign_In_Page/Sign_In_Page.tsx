import React, { FunctionComponent, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import TextButton from '../../Components/Text_Button/Text_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import SecureTextEntry from '../../Components/Secure_Text_Entry/Secure_Text_Entry';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';

const SignInPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const proceed = no_double_clicks({
        execFunc: () => {
            console.log('submit');
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
                            : 40
                        : Platform.OS === 'ios'
                        ? 70
                        : 40,
                    marginBottom: 28,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            <Text style={[styles.si_m_wt, { fontSize: 25 }]}>
                Welcome Back Oluwagbemiga
            </Text>
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
            <BasicButton
                buttonText={'Proceed'}
                borderRadius={8}
                marginHorizontal={22}
                execFunc={proceed}
                buttonHeight={56}
            />
            <Image
                source={require('../../Images/Extra/Arrow_Curves_1.png')}
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

export default SignInPage;

const styles = StyleSheet.create({
    sign_in_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    si_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 29,
        marginLeft: 22,
        marginRight: 2,
        color: Colors.Dark,
    },
});
