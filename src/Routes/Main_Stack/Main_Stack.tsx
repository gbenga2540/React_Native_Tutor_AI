import React, { FunctionComponent, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../Auth_Stack/Auth_Stack';
import ErrorPage from '../../Screens/Error_Page/Error_Page';
import InfoPage from '../../Screens/Info_Page/Info_Page';
import HomeStack from '../Home_Stack/Home_Stack';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { INTF_UserInfo } from '../../Interface/User_Info/User_Info';
import { observer } from 'mobx-react';

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

const MainStack: FunctionComponent = observer(() => {
    const [render, setRender] = useState<boolean>(false);

    useEffect(() => {
        setRender(false);
        const get_user_info = async () => {
            try {
                await SInfo.getItem(SECURE_STORAGE_USER_INFO, {
                    sharedPreferencesName: SECURE_STORAGE_NAME,
                    keychainService: SECURE_STORAGE_NAME,
                })
                    .catch(err => {
                        err &&
                            UserInfoStore.set_user_info({
                                user_info: {},
                            });

                        setRender(true);
                    })
                    .then(async res => {
                        if (res) {
                            const json_res: { user_info: INTF_UserInfo } =
                                JSON.parse(res);
                            UserInfoStore.set_user_info({
                                user_info: json_res?.user_info || {},
                            });
                            setRender(true);
                        } else {
                            UserInfoStore.set_user_info({
                                user_info: {},
                            });
                            setRender(true);
                        }
                    });
            } catch (error) {
                UserInfoStore.set_user_info({
                    user_info: {},
                });
                setRender(true);
            }
        };
        get_user_info();
    }, []);

    if (render) {
        return (
            <Main_Stack.Navigator
                initialRouteName={
                    UserInfoStore?.user_info?._id
                        ? UserInfoStore?.user_info?.verified &&
                          UserInfoStore?.user_info?.password
                            ? UserInfoStore?.user_info?.level
                                ? UserInfoStore?.user_info?.language
                                    ? 'HomeStack'
                                    : 'AuthStack'
                                : 'AuthStack'
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
});

export default MainStack;
