import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from 'react-query';
import { Platform } from 'react-native';

const OnlineManager = () => {
    useEffect(() => {
        if (Platform.OS !== 'web') {
            return NetInfo.addEventListener(state => {
                onlineManager.setOnline(
                    state.isConnected != null &&
                        state.isConnected &&
                        Boolean(state.isInternetReachable),
                );
            });
        }
    }, []);
};

export { OnlineManager };
