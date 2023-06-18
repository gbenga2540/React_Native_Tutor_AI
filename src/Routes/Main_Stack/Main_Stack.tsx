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
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { INTF_UserInfo } from '../../Interface/User_Info/User_Info';

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
    const [userID, setUserID] = useState<string>('');
    const [userVerified, setUserVerified] = useState<boolean>(false);
    const [userPWD, setUserPWD] = useState<string>('');

    useEffect(() => {
        setRender(false);
        setUserID('');
        setUserVerified(false);
        setUserPWD('');
        const get_user_info = async () => {
            try {
                await SInfo.getItem(SECURE_STORAGE_USER_INFO, {
                    sharedPreferencesName: SECURE_STORAGE_NAME,
                    keychainService: SECURE_STORAGE_NAME,
                })
                    .catch(err => {
                        if (err) {
                            setUserID('');
                            setUserVerified(false);
                            setUserPWD('');
                            UserInfoStore.set_user_info({
                                user_info: {},
                            });
                        }
                        setRender(true);
                    })
                    .then(async res => {
                        if (res) {
                            const json_res: { user_info: INTF_UserInfo } =
                                JSON.parse(res);
                            setUserID(json_res?.user_info?._id || '');
                            setUserVerified(
                                json_res?.user_info?.verified || false,
                            );
                            setUserPWD(json_res?.user_info?.password || '');
                            UserInfoStore.set_user_info({
                                user_info: json_res?.user_info || {},
                            });
                            setRender(true);
                        } else {
                            setUserID('');
                            setUserVerified(false);
                            setUserPWD('');
                            UserInfoStore.set_user_info({
                                user_info: {},
                            });
                            setRender(true);
                        }
                    });
            } catch (error) {
                setUserID('');
                setUserVerified(false);
                setUserPWD('');
                UserInfoStore.set_user_info({
                    user_info: {},
                });
                setRender(true);
            }
        };
        get_user_info();
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
                initialRouteName={
                    userID
                        ? userVerified && userPWD
                            ? 'HomeStack'
                            : 'AuthStack'
                        : 'AuthStack'
                }
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
