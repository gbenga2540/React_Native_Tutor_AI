/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomStatusBar from '../Components/Custom_Status_Bar/Custom_Status_Bar';
import { NavigationContainer } from '@react-navigation/native';
import { OnlineManager } from '../Hooks/Online_Manager/Online_Manager';
import { OnAppFocus } from '../Hooks/On_App_Focus/On_App_Focus';
import { KeyboardManager } from '../Hooks/Keyboard_Manager/Keyboard_Manager';
import MainStack from '../Routes/Main_Stack/Main_Stack';
import { observer } from 'mobx-react';
import OverlaySheet from '../Components/Overlay_Sheet/Overlay_Sheet';
import { BottomSheetStore } from '../MobX/Bottom_Sheet/Bottom_Sheet';
import BottomOverlay from '../Components/Bottom_Overlay/Bottom_Overlay';
import Colors from '../Configs/Colors/Colors';
import { HideSplashScreen } from '../Hooks/Hide_Splash_Screen/Hide_Splash_Screen';
import { SetClassSchedule } from '../Hooks/Set_Class_Schedule/Set_Class_Schedule';
import { LoadAvatarVoice } from '../Hooks/Load_Avatar_Voice/Load_Avatar_Voice';
// import { TextToSpeech } from '../Hooks/Text_To_Speech/Text_To_Speech';

const App: FunctionComponent = observer(() => {
    useEffect(() => {
        HideSplashScreen();
        SetClassSchedule();
        LoadAvatarVoice();
        // TextToSpeech();
    }, []);

    OnlineManager();
    OnAppFocus();
    KeyboardManager();

    return (
        <View style={styles.app_main}>
            <NavigationContainer>
                <CustomStatusBar />
                <MainStack />
                <OverlaySheet showOverlay={BottomSheetStore.is_bottom_sheet} />
                <BottomOverlay />
            </NavigationContainer>
        </View>
    );
});

export default App;

const styles = StyleSheet.create({
    app_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
