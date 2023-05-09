import React, { FunctionComponent, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../Auth_Stack/Auth_Stack';
import ErrorPage from '../../Screens/Error_Page/Error_Page';
import InfoPage from '../../Screens/Info_Page/Info_Page';
import HomeStack from '../Home_Stack/Home_Stack';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { useQuery } from 'react-query';
import { query_id } from '../../Configs/Queries/Query_ID/Query_ID';
import { get_author_info } from '../../Configs/Queries/Users/Users';
import { UserDataStore } from '../../MobX/User_Data/User_Data';
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
    const [userToken, setUserToken] = useState<string>('');

    const { data: userData } = useQuery(
        query_id({ id: UserInfoStore?.user_info?.uid as string }).user_with_id,
        () =>
            get_author_info({
                user_token: UserInfoStore?.user_info?.token as string,
                authorID: UserInfoStore?.user_info?.uid as string,
            }),
        {
            enabled:
                (UserInfoStore?.user_info?.token as string)?.length > 0 &&
                (UserInfoStore?.user_info?.uid as string)?.length > 0,
            cacheTime: 300000,
            staleTime: 300000,
            retry: 4,
        },
    );

    useEffect(() => {
        if (!userData?.error) {
            UserDataStore.set_user_data({ data: userData?.data });
        }
    }, [userData]);

    useEffect(() => {
        setRender(false);
        const get_token = async () => {
            try {
                await SInfo.getItem(SECURE_STORAGE_USER_INFO, {
                    sharedPreferencesName: SECURE_STORAGE_NAME,
                    keychainService: SECURE_STORAGE_NAME,
                })
                    ?.catch(err => {
                        setRender(true);
                        if (err) {
                            setUserToken('');
                            UserInfoStore.set_user_info({
                                data: {
                                    email_v: false,
                                    token: '',
                                    uid: '',
                                },
                            });
                        }
                    })
                    ?.then(async res => {
                        if (res) {
                            const json_res = JSON.parse(res);
                            UserInfoStore.set_user_info({
                                data: json_res,
                            });
                            setUserToken(json_res?.token);
                            setRender(true);
                        } else {
                            setUserToken('');
                            UserInfoStore.set_user_info({
                                data: {
                                    email_v: false,
                                    token: '',
                                    uid: '',
                                },
                            });
                            setRender(true);
                        }
                    });
            } catch (error) {
                setUserToken('');
                UserInfoStore.set_user_info({
                    data: {
                        email_v: false,
                        token: '',
                        uid: '',
                    },
                });
                setRender(true);
            }
        };
        get_token();
    }, []);

    if (render) {
        return (
            <Main_Stack.Navigator
                initialRouteName={userToken ? 'HomeStack' : 'AuthStack'}
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
