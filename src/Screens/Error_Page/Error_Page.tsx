import React, { FunctionComponent } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../../Components/Back_Button/Back_Button';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';

const ErrorPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();

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
                        source={require('../../Animations/An_Error_Occured.json')}
                        autoPlay
                        loop={true}
                        resizeMode="cover"
                        speed={1.7}
                    />
                    <Text style={[styles.e_m_err_txt, styles.e_m_err_txt_h]}>
                        Error!
                    </Text>
                    <Text style={styles.e_m_err_txt}>
                        {route?.params?.error_mssg || ''}
                    </Text>
                    <Text
                        style={[
                            styles.e_m_err_txt,
                            {
                                fontSize: 14,
                                color: Colors.LightPink,
                                marginTop: 50,
                            },
                        ]}>
                        {route?.params?.svr_error_mssg || ''}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default ErrorPage;

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
        marginTop: 20,
        width: 260,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        color: Colors.DarkGrey,
    },
    e_m_err_txt_h: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 19,
        marginTop: 20,
        color: 'red',
    },
});
