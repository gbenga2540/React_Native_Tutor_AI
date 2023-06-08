import React, { FunctionComponent, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
    CommonActions,
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import BackButton from '../../Components/Back_Button/Back_Button';
import LottieView from 'lottie-react-native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { MutationCache, QueryCache } from 'react-query';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const InfoPage: FunctionComponent = () => {
    const queryCache = new QueryCache();
    const mutationCache = new MutationCache();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();

    const hide_header: boolean = route?.params?.hide_header || false;
    const hide_back_btn: boolean = route?.params?.hide_back_btn || false;

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const sign_out = async () => {
        const reset_data = () => {
            queryCache.clear();
            mutationCache.clear();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }],
                }),
            );
        };
        try {
            await SInfo.deleteItem(SECURE_STORAGE_USER_INFO, {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            })
                ?.catch(() => {
                    reset_data();
                })
                ?.then(() => {
                    reset_data();
                });
        } catch (error) {
            reset_data();
        }
    };

    const proceed = no_double_clicks({
        execFunc: async () => {
            switch (route?.params?.proceed_type) {
                case 1:
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'AuthStack',
                                },
                            ],
                        }),
                    );
                    break;
                default:
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'AuthStack',
                                },
                            ],
                        }),
                    );
                    break;
            }
        },
    });

    return (
        <View style={{ flex: 1 }}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors.Background}
                backgroundDimColor={Colors.BackgroundDim}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <View style={styles.info_main}>
                {hide_back_btn ? (
                    <BasicText
                        inputText=""
                        marginLeft={22}
                        marginBottom={28}
                        marginTop={
                            Platform.OS === 'ios'
                                ? screen_height_less_than({
                                      if_false: 56,
                                      if_true: 45,
                                  })
                                : 25
                        }
                    />
                ) : (
                    <View
                        style={{
                            marginLeft: 22,
                            marginTop: navigation?.canGoBack()
                                ? Platform.OS === 'ios'
                                    ? screen_height_less_than({
                                          if_false: 56,
                                          if_true: 45,
                                      })
                                    : 25
                                : Platform.OS === 'ios'
                                ? screen_height_less_than({
                                      if_false: 70,
                                      if_true: 60,
                                  })
                                : 25,
                            marginBottom: 15,
                        }}>
                        {navigation.canGoBack() && <BackButton />}
                    </View>
                )}
                <LottieView
                    style={{
                        transform: [{ scale: 1 }],
                        width: 280,
                        minWidth: 280,
                        maxWidth: 280,
                        position: 'relative',
                        alignSelf: 'center',
                    }}
                    source={require('../../Animations/On_Success.json')}
                    autoPlay
                    loop={true}
                    resizeMode="cover"
                    speed={1.7}
                />
                {!hide_header && (
                    <Text style={[styles.i_m_err_txt, styles.i_m_err_txt_h]}>
                        Successful!
                    </Text>
                )}
                <Text style={styles.i_m_err_txt}>
                    {route?.params?.success_mssg || ''}
                </Text>
                <Text
                    style={[
                        styles.i_m_err_txt,
                        {
                            fontSize: 14,
                            color: Colors.Primary,
                            marginTop: 50,
                        },
                    ]}>
                    {route?.params?.svr_success_mssg || ''}
                </Text>
                <View
                    style={{
                        marginHorizontal: 20,
                        marginBottom:
                            Platform.OS === 'ios'
                                ? screen_height_less_than({
                                      if_false: 40,
                                      if_true: 10,
                                  })
                                : 20,
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}>
                    <BasicButton
                        buttonText="PROCEED"
                        buttonHeight={52}
                        marginTop={0}
                        marginBottom={0}
                        execFunc={proceed}
                        disabled={disableButton}
                    />
                </View>
            </View>
        </View>
    );
};

export default InfoPage;

const styles = StyleSheet.create({
    info_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    i_m_err_txt: {
        marginTop: 20,
        width: 260,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        color: Colors.Grey,
    },
    i_m_err_txt_h: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 19,
        marginTop: 20,
        color: 'green',
    },
});
