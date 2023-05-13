import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from '../Home_Tab/Home_Tab';

type HomeStackParamList = {
    HomeTab: {};
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
        </Home_Stack.Navigator>
    );
};

export default HomeStack;
