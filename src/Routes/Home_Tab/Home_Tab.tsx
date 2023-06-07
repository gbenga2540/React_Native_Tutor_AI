import React, { FunctionComponent } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import HomePage from '../../Screens/Home_Page/Home_Page';
import LessonPage from '../../Screens/Lesson_Page/Lesson_Page';
import HomeWorkPage from '../../Screens/Home_Work_Page/Home_Work_Page';
import ConversationPage from '../../Screens/Conversation_Page/Conversation_Page';
import ProfilePage from '../../Screens/Profile_Page/Profile_Page';
import HomeIcon from '../../Images/SVGs/Home_Icon.svg';
import LessonIcon from '../../Images/SVGs/Lesson_Icon.svg';
import HomeWorkIcon from '../../Images/SVGs/Home_Work_Icon.svg';
import ConversationIcon from '../../Images/SVGs/Conversation_Icon.svg';
import ProfileIcon from '../../Images/SVGs/Profile_Icon.svg';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

type HomeTabParamList = {
    HomePage: {};
    LessonPage: {};
    HomeWorkPage: {};
    ConversationPage: {};
    ProfilePage: {};
};

const Home_Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTab: FunctionComponent = () => {
    return (
        <Home_Tab.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.Primary,
                tabBarInactiveTintColor: Colors.DarkGrey,
                tabBarStyle: styles.tabBar_main,
                tabBarLabelStyle: styles.tabBar_label,
                tabBarIconStyle: styles.tabBar_icon,
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: Platform.OS === 'ios' ? false : true,
            }}>
            <Home_Tab.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <HomeIcon width={26} height={26} color={color} />
                    ),
                    tabBarLabel: 'Home',
                }}
            />
            <Home_Tab.Screen
                name="LessonPage"
                component={LessonPage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <LessonIcon width={26} height={26} color={color} />
                    ),
                    tabBarLabel: 'Lesson',
                }}
            />
            <Home_Tab.Screen
                name="HomeWorkPage"
                component={HomeWorkPage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <HomeWorkIcon width={26} height={26} color={color} />
                    ),
                    tabBarLabel: 'HomeWork',
                }}
            />
            <Home_Tab.Screen
                name="ConversationPage"
                component={ConversationPage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <ConversationIcon
                            width={26}
                            height={26}
                            color={color}
                        />
                    ),
                    tabBarLabel: 'Conversation',
                }}
            />
            <Home_Tab.Screen
                name="ProfilePage"
                component={ProfilePage}
                options={{
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color }) => (
                        <ProfileIcon width={26} height={26} color={color} />
                    ),
                    tabBarLabel: 'Profile',
                }}
            />
        </Home_Tab.Navigator>
    );
};

export default HomeTab;

const styles = StyleSheet.create({
    tabBar_main: {
        height:
            Platform.OS === 'ios'
                ? screen_height_less_than({
                      if_false: 92,
                      if_true: 75,
                  })
                : 75,
        paddingBottom:
            Platform.OS === 'ios'
                ? screen_height_less_than({
                      if_false: 30,
                      if_true: 15,
                  })
                : 13,
        backgroundColor: Colors.Background,
        shadowColor: Colors.Black,
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
    icons_cont: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
});
