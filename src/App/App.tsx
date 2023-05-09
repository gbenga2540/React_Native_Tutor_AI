/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent, useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import CustomStatusBar from '../Components/Custom_Status_Bar/Custom_Status_Bar';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

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

    return (
        <NavigationContainer>
            <CustomStatusBar />
            <View style={styles.app_main}>
                <Text
                    style={{
                        color: 'black',
                    }}>
                    App
                </Text>
            </View>
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({
    app_main: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
