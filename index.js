/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App/App';
import { name as appName } from './app.json';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

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
