import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from '../Home_Tab/Home_Tab';
import SubscriptionPage from '../../Screens/Subscription_Page/Subscription_Page';
import SelectPaymentPage from '../../Screens/Select_Payment_Page/Select_Payment_Page';
import AddPaymentPage from '../../Screens/Add_Payment_Page/Add_Payment_Page';
import ParentalControlPage from '../../Screens/Parental_Control_Page/Parental_Control_Page';
import PersonalDetailsPage from '../../Screens/Personal_Details_Page/Personal_Details_Page';
import AvatarCustomizationPage from '../../Screens/Avatar_Customization_Page/Avatar_Customization_Page';
import CustomizeVoicePage from '../../Screens/Customize_Voice_Page/Customize_Voice_Page';
import BlockAppsPage from '../../Screens/Block_Apps_Page/Block_Apps_Page';
import HelpCenterPage from '../../Screens/Help_Center_Page/Help_Center_Page';

type HomeStackParamList = {
        HomeTab: {};
        SubscriptionPage: {};
        SelectPaymentPage: {};
        AddPaymentPage: {};
        ParentalControlPage: {};
        PersonalDetailsPage: {};
        AvatarCustomizationPage: {};
        CustomizeVoicePage: {};
        BlockAppsPage: {};
        HelpCenterPage: {};
};

const Home_Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: FunctionComponent = () => {
        return (
                <Home_Stack.Navigator
                        initialRouteName={'HomeTab'}
                        screenOptions={{
                                headerShown: false,
                        }}>
                        <Home_Stack.Screen name="HomeTab" component={HomeTab} />
                        <Home_Stack.Screen name="SubscriptionPage" component={SubscriptionPage} />
                        <Home_Stack.Screen name="SelectPaymentPage" component={SelectPaymentPage} />
                        <Home_Stack.Screen name="AddPaymentPage" component={AddPaymentPage} />
                        <Home_Stack.Screen name="ParentalControlPage" component={ParentalControlPage} />
                        <Home_Stack.Screen name="PersonalDetailsPage" component={PersonalDetailsPage} />
                        <Home_Stack.Screen name="AvatarCustomizationPage" component={AvatarCustomizationPage} />
                        <Home_Stack.Screen name="CustomizeVoicePage" component={CustomizeVoicePage} />
                        <Home_Stack.Screen name="BlockAppsPage" component={BlockAppsPage} />
                        <Home_Stack.Screen name="HelpCenterPage" component={HelpCenterPage} />
                </Home_Stack.Navigator>
        );
};

export default HomeStack;
