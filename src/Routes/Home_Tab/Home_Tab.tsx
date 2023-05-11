import React, { FunctionComponent } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { observer } from 'mobx-react';
import HomePage from '../../Screens/Home_Page/Home_Page';
import SettingsPage from '../../Screens/Settings_Page/Settings_Page';

type HomeTabParamList = {
    HomePage: {};
    SettingsPage: {};
};

const Home_Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTab: FunctionComponent = observer(() => {
    return (
        <Home_Tab.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors().Primary,
                tabBarInactiveTintColor: Colors().DarkGrey,
                tabBarStyle: styles.tabBar_main,
                tabBarLabelStyle: styles.tabBar_label,
                tabBarIconStyle: styles.tabBar_icon,
                tabBarShowLabel: true,
            }}>
            <Home_Tab.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={25} color={color} />
                    ),
                    tabBarLabel: 'Home',
                }}
            />
            <Home_Tab.Screen
                name="SettingsPage"
                component={SettingsPage}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="settings" size={25} color={color} />
                    ),
                    tabBarLabel: 'Settings',
                }}
            />
        </Home_Tab.Navigator>
    );
});

export default HomeTab;

const styles = StyleSheet.create({
    tabBar_main: {
        height: Platform.OS === 'ios' ? 92 : 75,
        paddingBottom: Platform.OS === 'ios' ? 30 : 13,
        backgroundColor: Colors().Background,
        shadowColor: Colors().Black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    tabBar_label: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 12,
    },
    tabBar_icon: {
        marginTop: 7,
    },
    tb_i_c: {
        borderRadius: 28,
    },
    tb_i: {
        borderRadius: 28,
        width: 28,
        height: 28,
    },
});
