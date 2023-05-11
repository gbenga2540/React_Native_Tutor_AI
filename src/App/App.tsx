/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import CustomStatusBar from '../Components/Custom_Status_Bar/Custom_Status_Bar';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import MainStack from '../Routes/Main_Stack/Main_Stack';
import { OnlineManager } from '../Hooks/Online_Manager/Online_Manager';
import { OnAppFocus } from '../Hooks/On_App_Focus/On_App_Focus';
import { KeyboardManager } from '../Hooks/Keyboard_Manager/Keyboard_Manager';

const App: FunctionComponent = () => {
    useEffect(() => {
        if (Platform.OS === 'android') {
            const time_out = setTimeout(() => {
                SplashScreen.hide();
            }, 1000);
            return () => {
                clearTimeout(time_out);
            };
        }
    }, []);

    OnlineManager();
    OnAppFocus();
    KeyboardManager();

    return (
        <View style={styles.app_main}>
            <NavigationContainer>
                <CustomStatusBar />
                <MainStack />
            </NavigationContainer>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    app_main: {
        flex: 1,
        backgroundColor: 'white',
    },
});
