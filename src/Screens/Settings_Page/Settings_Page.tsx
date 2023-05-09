import React, { FunctionComponent, useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';
import { useNavigation } from '@react-navigation/native';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { UserDataStore } from '../../MobX/User_Data/User_Data';
import { shorten_text } from '../../Utils/Shorten_Text/Shorten_Text';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { observer } from 'mobx-react';

const SettingsPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const change_password = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'AuthStack' as never,
                { screen: 'ChangePasswordPage' } as never,
            );
        },
    });

    const change_usernmae = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'AuthStack' as never,
                { screen: 'ChangeUsernamePage' } as never,
            );
        },
    });

    const change_display_picture = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'AuthStack' as never,
                {
                    screen: 'SelectDPPage',
                    params: {
                        is_change_dp: true,
                    },
                } as never,
            );
        },
    });

    const verify_email = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'VerifyOTPPage',
                } as never,
            );
        },
    });

    const handle_feedback = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'FeedbackPage',
                } as never,
            );
        },
    });

    const handle_suggest_tags = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'SuggestTagPage',
                } as never,
            );
        },
    });

    const delete_account = no_double_clicks({
        execFunc: () => {
            info_handler({
                navigation: navigation,
                hide_back_btn: false,
                success_mssg: "Are you sure you want to 'Delete' your Account?",
                proceed_type: 4,
                hide_header: true,
            });
        },
    });

    const sign_out = no_double_clicks({
        execFunc: () => {
            info_handler({
                navigation: navigation,
                hide_back_btn: false,
                success_mssg: 'Are you sure you want to Sign Out?',
                proceed_type: 2,
                hide_header: true,
            });
        },
    });

    return (
        <View style={styles.profile_main}>
            <CustomStatusBar
                backgroundColor={Colors()?.Background}
                showSpinner={showSpinner}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.pp_w_i_c}>
                    {UserDataStore?.user_data?.dp_link &&
                    UserDataStore?.user_data?.dp_link !== 'none' ? (
                        <Image
                            style={styles.pp_w_i}
                            source={{
                                uri: UserDataStore?.user_data?.dp_link,
                                width: 170,
                                height: 170,
                            }}
                        />
                    ) : (
                        <Image
                            style={styles.pp_w_i}
                            source={require('../../Images/Extra/default_user_dp_light.jpg')}
                        />
                    )}
                </View>
                <View style={styles.pp_cont}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 30,
                        }}>
                        <Text style={styles.pp_c_n}>
                            {shorten_text({
                                text: UserDataStore?.user_data
                                    ?.username as string,
                                limit: 22,
                            })}
                        </Text>
                        {UserDataStore?.user_data?.verified && (
                            <Image
                                source={require('../../Images/Icons/Verified_Icon.png')}
                                style={{
                                    width: 16,
                                    height: 16,
                                    marginLeft: 3,
                                }}
                            />
                        )}
                    </View>
                    {/* START */}
                    <TouchableOpacity
                        onPress={change_password}
                        style={{
                            margin: 20,
                            marginVertical: 7,
                            marginTop: 30,
                        }}
                        activeOpacity={0.65}>
                        <Text
                            style={{
                                color: Colors().Black,
                                fontSize: 18,
                                fontFamily: fonts.Urbanist_500,
                            }}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={change_usernmae}
                        style={{ margin: 20, marginVertical: 7 }}
                        activeOpacity={0.65}>
                        <Text
                            style={{
                                color: Colors().Black,
                                fontSize: 18,
                                fontFamily: fonts.Urbanist_500,
                            }}>
                            Change Username
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={change_display_picture}
                        style={{ margin: 20, marginVertical: 7 }}
                        activeOpacity={0.65}>
                        <Text
                            style={{
                                color: Colors().Black,
                                fontSize: 18,
                                fontFamily: fonts.Urbanist_500,
                            }}>
                            Change Display Picture
                        </Text>
                    </TouchableOpacity>
                    {!UserInfoStore?.user_info?.email_v && (
                        <TouchableOpacity
                            onPress={verify_email}
                            style={{ margin: 20, marginVertical: 7 }}
                            activeOpacity={0.65}>
                            <Text
                                style={{
                                    color: Colors().Black,
                                    fontSize: 18,
                                    fontFamily: fonts.Urbanist_500,
                                }}>
                                Verify Email
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={handle_feedback}
                        style={{ margin: 20, marginVertical: 7 }}
                        activeOpacity={0.65}>
                        <Text
                            style={{
                                color: Colors().Black,
                                fontSize: 18,
                                fontFamily: fonts.Urbanist_500,
                            }}>
                            Send Feedback
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handle_suggest_tags}
                        style={{ margin: 20, marginVertical: 7 }}
                        activeOpacity={0.65}>
                        <Text
                            style={{
                                color: Colors().Black,
                                fontSize: 18,
                                fontFamily: fonts.Urbanist_500,
                            }}>
                            Suggest Tag
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={delete_account}
                        style={{ margin: 20, marginVertical: 7 }}
                        activeOpacity={0.65}>
                        <Text
                            style={{
                                color: Colors().Black,
                                fontSize: 18,
                                fontFamily: fonts.Urbanist_500,
                            }}>
                            Delete Account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={sign_out}
                        style={{ margin: 20, marginVertical: 7 }}
                        activeOpacity={0.65}>
                        <Text
                            style={{
                                color: Colors().Black,
                                fontSize: 18,
                                fontFamily: fonts.Urbanist_500,
                            }}>
                            Sign Out!
                        </Text>
                    </TouchableOpacity>
                    {/* END */}
                </View>
            </ScrollView>
        </View>
    );
});

export default SettingsPage;

const styles = StyleSheet.create({
    profile_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
    pp_w_i_c: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 170,
        padding: 3,
        marginBottom: 20,
        borderColor: Colors().Primary,
        marginTop: Platform?.OS === 'ios' ? 100 : 75,
        borderWidth: 2,
    },
    pp_w_i: {
        borderRadius: 170,
        width: 170,
        height: 170,
    },
    pp_cont: {
        flex: 1,
        justifyContent: 'center',
    },
    pp_c_n: {
        textAlign: 'center',
        color: Colors()?.Dark,
        fontFamily: fonts?.Urbanist_600,
        fontSize: 20,
    },
});
