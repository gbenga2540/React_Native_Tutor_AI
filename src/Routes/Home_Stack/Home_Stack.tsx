import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import HomeTab from '../Home_Tab/Home_Tab';
import DetailsPage from '../../Screens/Details_Page/Details_Page';
import AuthorsPage from '../../Screens/Authors_Page/Authors_Page';
import LikesPage from '../../Screens/Likes_Page/Likes_Page';
import VerifyOTPPage from '../../Screens/Verify_OTP_Page/Verify_OTP_Page';
import FeedbackPage from '../../Screens/Feedback_Page/Feedback_Page';
import SuggestTagPage from '../../Screens/Suggest_Tag_Page/Suggest_Tag_Page';
import FollowersPage from '../../Screens/Followers_Page/Followers_Page';

type HomeStackParamList = {
    HomeTab: {};
    DetailsPage: {};
    AuthorsPage: {};
    LikesPage: {};
    VerifyOTPPage: {};
    FeedbackPage: {};
    SuggestTagPage: {};
    FollowersPage: {};
};

const Home_Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: FunctionComponent = observer(() => {
    return (
        <Home_Stack.Navigator
            initialRouteName={
                UserInfoStore?.user_info?.email_v ? 'HomeTab' : 'VerifyOTPPage'
            }
            screenOptions={{
                headerShown: false,
            }}>
            <Home_Stack.Screen name="HomeTab" component={HomeTab} />
            <Home_Stack.Screen name="DetailsPage" component={DetailsPage} />
            <Home_Stack.Screen name="AuthorsPage" component={AuthorsPage} />
            <Home_Stack.Screen name="LikesPage" component={LikesPage} />
            <Home_Stack.Screen name="VerifyOTPPage" component={VerifyOTPPage} />
            <Home_Stack.Screen name="FeedbackPage" component={FeedbackPage} />
            <Home_Stack.Screen
                name="SuggestTagPage"
                component={SuggestTagPage}
            />
            <Home_Stack.Screen name="FollowersPage" component={FollowersPage} />
        </Home_Stack.Navigator>
    );
});

export default HomeStack;
