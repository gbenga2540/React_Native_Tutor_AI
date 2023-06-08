import React, { FunctionComponent } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    CommonActions,
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const CongratulationsPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();

    const proceed = no_double_clicks({
        execFunc: () => {
            switch (route?.params?.nextPage) {
                case 1:
                    navigation.push(
                        'AuthStack' as never,
                        {
                            screen: 'PreAvatarPage',
                        } as never,
                    );
                    break;
                case 2:
                    navigation.push(
                        'HomeStack' as never,
                        { screen: 'HomePage' } as never,
                    );
                    break;
                case 3:
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'HomeStack',
                                },
                            ],
                        }),
                    );
                    break;
                default:
                    navigation.push(
                        'AuthStack' as never,
                        {
                            screen: 'OnboardingPage',
                        } as never,
                    );
                    break;
            }
        },
    });

    return (
        <View style={{ flex: 1 }}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: Colors.Background,
                }}>
                <View style={styles.error_main}>
                    <View
                        style={{
                            marginLeft: 22,
                            marginTop: navigation?.canGoBack()
                                ? Platform.OS === 'ios'
                                    ? 56
                                    : 25
                                : Platform.OS === 'ios'
                                ? 70
                                : 25,
                            marginBottom: 15,
                        }}>
                        {navigation.canGoBack() && <BackButton />}
                    </View>
                    <LottieView
                        style={{
                            transform: [{ scale: 1 }],
                            width: 280,
                            minWidth: 280,
                            maxWidth: 280,
                            // height: 190,
                            // minHeight: 190,
                            // maxHeight: 190,
                            position: 'relative',
                            alignSelf: 'center',
                        }}
                        source={require('../../Animations/Congratulations.json')}
                        autoPlay
                        loop={true}
                        resizeMode="cover"
                        speed={1.7}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 30,
                        }}>
                        <Text
                            style={[
                                styles.e_m_err_txt,
                                styles.e_m_err_txt_h,
                                {
                                    fontSize: 28,
                                },
                            ]}>
                            {route?.params?.header_txt || ''}
                        </Text>
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                marginLeft: 4,
                            }}
                            source={require('../../Images/Icons/Congratulations.png')}
                        />
                    </View>
                    <Text
                        style={[
                            styles.e_m_err_txt,
                            {
                                marginTop: 10,
                                maxWidth: 280,
                            },
                        ]}>
                        {route?.params?.message_txt || ''}
                    </Text>
                </View>
            </ScrollView>
            <BasicButton
                buttonText="Continue"
                marginHorizontal={22}
                execFunc={proceed}
                marginBottom={
                    Platform.OS === 'ios'
                        ? screen_height_less_than({
                              if_true: 10,
                              if_false: 40,
                          })
                        : 20
                }
            />
        </View>
    );
};

export default CongratulationsPage;

const styles = StyleSheet.create({
    error_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    e_m_bb: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        marginTop: 30,
        marginLeft: 5,
        marginBottom: 20,
    },
    e_m_err_txt: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        color: Colors.DarkGrey,
    },
    e_m_err_txt_h: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 19,
        color: Colors.Primary,
    },
});
