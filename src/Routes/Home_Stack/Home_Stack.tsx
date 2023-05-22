import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from '../Home_Tab/Home_Tab';
import SubscriptionPage from '../../Screens/Subscription_Page/Subscription_Page';
import SelectPaymentPage from '../../Screens/Select_Payment_Page/Select_Payment_Page';
import AddPaymentPage from '../../Screens/Add_Payment_Page/Add_Payment_Page';
import ParentalControlPage from '../../Screens/Parental_Control_Page/Parental_Control_Page';

type HomeStackParamList = {
    HomeTab: {};
    SubscriptionPage: {};
    SelectPaymentPage: {};
    AddPaymentPage: {};
    ParentalControlPage: {};
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
            <Home_Stack.Screen
                name="SubscriptionPage"
                component={SubscriptionPage}
            />
            <Home_Stack.Screen
                name="SelectPaymentPage"
                component={SelectPaymentPage}
            />
            <Home_Stack.Screen
                name="AddPaymentPage"
                component={AddPaymentPage}
            />
            <Home_Stack.Screen
                name="ParentalControlPage"
                component={ParentalControlPage}
            />
        </Home_Stack.Navigator>
    );
};

export default HomeStack;
