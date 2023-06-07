import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInPage from '../../Screens/Sign_In_Page/Sign_In_Page';
import SignUpPage from '../../Screens/Sign_Up_Page/Sign_Up_Page';
import ForgotPasswordPage from '../../Screens/Forgot_Password_Page/Forgot_Password_Page';
import ChangePasswordPage from '../../Screens/Change_Password_Page/Change_Password_Page';
import SelectDPPage from '../../Screens/Select_DP_Page/Select_DP_Page';
import VerifyOTPPage from '../../Screens/Verify_OTP_Page/Verify_OTP_Page';
import AuthSelectPage from '../../Screens/Auth_Select_Page/Auth_Select_Page';
import CongratulationsPage from '../../Screens/Congratulations_Page/Congratulations_Page';
import TCPage from '../../Screens/T_C_Page/T_C_Page';
import OnboardingPage from '../../Screens/Onboarding_Page/Onboarding_Page';
import PreTestPage from '../../Screens/Pre_Test_Page/Pre_Test_Page';
import PreAvatarPage from '../../Screens/Pre_Avatar_Page/Pre_Avatar_Page';

type AuthStackParamList = {
    AuthSelectPage: {};
    SignInPage: {};
    SignUpPage: {};
    ForgotPasswordPage: {};
    ChangePasswordPage: {};
    SelectDPPage: {};
    VerifyOTPPage: {};
    CongratulationsPage: {};
    TCPage: {};
    OnboardingPage: {};
    PreTestPage: {};
    PreAvatarPage: {};
};

const Auth_Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: FunctionComponent = () => {
    return (
        <Auth_Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Auth_Stack.Screen
                name="AuthSelectPage"
                component={AuthSelectPage}
            />
            <Auth_Stack.Screen name="SignInPage" component={SignInPage} />
            <Auth_Stack.Screen name="SignUpPage" component={SignUpPage} />
            <Auth_Stack.Screen name="SelectDPPage" component={SelectDPPage} />
            <Auth_Stack.Screen
                name="ForgotPasswordPage"
                component={ForgotPasswordPage}
            />
            <Auth_Stack.Screen
                name="ChangePasswordPage"
                component={ChangePasswordPage}
            />
            <Auth_Stack.Screen name="VerifyOTPPage" component={VerifyOTPPage} />
            <Auth_Stack.Screen
                name="CongratulationsPage"
                component={CongratulationsPage}
            />
            <Auth_Stack.Screen name="TCPage" component={TCPage} />
            <Auth_Stack.Screen
                name="OnboardingPage"
                component={OnboardingPage}
            />
            <Auth_Stack.Screen name="PreTestPage" component={PreTestPage} />
            <Auth_Stack.Screen name="PreAvatarPage" component={PreAvatarPage} />
        </Auth_Stack.Navigator>
    );
};

export default AuthStack;
