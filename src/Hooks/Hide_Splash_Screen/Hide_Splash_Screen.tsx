import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const HideSplashScreen = () => {
    if (Platform.OS === 'android') {
        const time_out = setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
        return () => {
            clearTimeout(time_out);
        };
    }
};

export { HideSplashScreen };
