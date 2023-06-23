/**
 * @format
 */

import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './src/App/App';
import { name as appName } from './app.json';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    // onNotification: function (notification) {
    //     console.log('NOTIFICATION:', notification);

    //     // process the notification

    //     // (required) Called when a remote is received or opened, or local notification is opened
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    // },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)

    onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
});

const Root = () => {
    const queryClient = new QueryClient();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
};

AppRegistry.registerComponent(appName, () => Root);
