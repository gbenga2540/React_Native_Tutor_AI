import React, { FunctionComponent, useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../Auth_Stack/Auth_Stack';
import ErrorPage from '../../Screens/Error_Page/Error_Page';
import InfoPage from '../../Screens/Info_Page/Info_Page';
import HomeStack from '../Home_Stack/Home_Stack';
import { INTF_AppInfo } from '../../Interface/App_Info/App_Info';
import { AppInfoStore } from '../../MobX/App_Info/App_Info';
import { sort_apps_by_name } from '../../Utils/Sort_Apps_By_Name/Sort_Apps_By_Name';
// import SInfo from 'react-native-sensitive-info';
// import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';

type MainStackParamList = {
    AuthStack: {};
    HomeStack: {};
    ErrorPage: {
        error_mssg: string;
        svr_error_mssg: string;
    };
    InfoPage: {
        success_mssg: string;
        svr_success_mssg: string;
    };
};

const Main_Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: FunctionComponent = () => {
    const [render, setRender] = useState<boolean>(false);
    // const [userToken, setUserToken] = useState<string>('');

    useEffect(() => {
        // setRender(false);
        setRender(true);
        // const get_token = async () => {
        //     try {
        //         await SInfo.getItem(SECURE_STORAGE_USER_INFO, {
        //             sharedPreferencesName: SECURE_STORAGE_NAME,
        //             keychainService: SECURE_STORAGE_NAME,
        //         })
        //             ?.catch(err => {
        //                 setRender(true);
        //                 if (err) {
        //                     setUserToken('');
        //                     // UserInfoStore.set_user_info({
        //                     //     data: {
        //                     //         email_v: false,
        //                     //         token: '',
        //                     //         uid: '',
        //                     //     },
        //                     // });
        //                 }
        //             })
        //             ?.then(async res => {
        //                 if (res) {
        //                     const json_res = JSON.parse(res);
        //                     // UserInfoStore.set_user_info({
        //                     //     data: json_res,
        //                     // });
        //                     setUserToken(json_res?.token);
        //                     setRender(true);
        //                 } else {
        //                     setUserToken('');
        //                     // UserInfoStore.set_user_info({
        //                     //     data: {
        //                     //         email_v: false,
        //                     //         token: '',
        //                     //         uid: '',
        //                     //     },
        //                     // });
        //                     setRender(true);
        //                 }
        //             });
        //     } catch (error) {
        //         setUserToken('');
        //         // UserInfoStore.set_user_info({
        //         //     data: {
        //         //         email_v: false,
        //         //         token: '',
        //         //         uid: '',
        //         //     },
        //         // });
        //         setRender(true);
        //     }
        // };
        // get_token();
    }, []);

    useEffect(() => {
        const get_installed_apps = async () => {
            const all_installed_apps: INTF_AppInfo[] =
                await NativeModules.MyAppInfoModule.getAllInstalledApps();
            if (all_installed_apps?.length > 0) {
                const sorted_apps = sort_apps_by_name({
                    app_list: all_installed_apps,
                });
                AppInfoStore.set_app_list({
                    app_list: sorted_apps,
                });
            }
        };
        get_installed_apps();
    }, []);

    if (render) {
        return (
            <Main_Stack.Navigator
                initialRouteName={'AuthStack'}
                // initialRouteName={'HomeStack'}
                screenOptions={{
                    headerShown: false,
                }}>
                <Main_Stack.Screen name="AuthStack" component={AuthStack} />
                <Main_Stack.Screen name="HomeStack" component={HomeStack} />
                <Main_Stack.Screen
                    name="ErrorPage"
                    component={ErrorPage}
                    options={{
                        headerShown: false,
                    }}
                />
                <Main_Stack.Screen
                    name="InfoPage"
                    component={InfoPage}
                    options={{
                        headerShown: false,
                    }}
                />
            </Main_Stack.Navigator>
        );
    } else {
        return null;
    }
};

export default MainStack;
