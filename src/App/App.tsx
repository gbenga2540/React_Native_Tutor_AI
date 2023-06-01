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
import { OnlineManager } from '../Hooks/Online_Manager/Online_Manager';
import { OnAppFocus } from '../Hooks/On_App_Focus/On_App_Focus';
import { KeyboardManager } from '../Hooks/Keyboard_Manager/Keyboard_Manager';
import MainStack from '../Routes/Main_Stack/Main_Stack';
import { observer } from 'mobx-react';
import OverlaySheet from '../Components/Overlay_Sheet/Overlay_Sheet';
import { BottomSheetStore } from '../MobX/Bottom_Sheet/Bottom_Sheet';
import BottomOverlay from '../Components/Bottom_Overlay/Bottom_Overlay';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_SCHEDULE_INFO } from '@env';
import { INTF_SchedulesInfo } from '../Interface/Schedules_Info/Schedules_Info';
import { ScheduleInfoStore } from '../MobX/Schedules_Info/Schedules_Info';
import { sort_schedule } from '../Utils/Sort_Schedule/Sort_Schedule';
import Colors from '../Configs/Colors/Colors';

const App: FunctionComponent = observer(() => {
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

    useEffect(() => {
        const get_class_schedule = async () => {
            try {
                await SInfo.getItem(SECURE_STORAGE_SCHEDULE_INFO, {
                    sharedPreferencesName: SECURE_STORAGE_NAME,
                    keychainService: SECURE_STORAGE_NAME,
                })?.then(async res => {
                    if (res) {
                        const json_res: INTF_SchedulesInfo[] = JSON.parse(res);
                        ScheduleInfoStore.set_schedule_info({
                            schedule: sort_schedule({ schedule: json_res }),
                        });
                    }
                });
            } catch (error) {}
        };
        get_class_schedule();
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
