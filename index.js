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
import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
    onRegister: token => {},
    onNotification: notification => {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onRegistrationError: _err => {},
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
    {
        channelId: 'TutorAI',
        channelName: 'TutorAI Channel',
        channelDescription: 'A channel to categorize TutorAI notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
    },
    created => {},
);

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
