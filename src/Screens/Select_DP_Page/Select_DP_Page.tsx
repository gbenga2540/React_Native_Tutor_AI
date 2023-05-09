import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import {
    sign_up,
    update_display_picture,
} from '../../Configs/Queries/Users/Users';
import { useMutation, useQueryClient } from 'react-query';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_USER_INFO } from '@env';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { observer } from 'mobx-react';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';
import { query_id } from '../../Configs/Queries/Query_ID/Query_ID';

const SelectDPPage: FunctionComponent = observer(() => {
    const queryClient = useQueryClient();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();

    const [displayPicture, setDisplayPicture] = useState<string>('none');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const { mutate: sign_up_mutate } = useMutation(sign_up, {
        onMutate: () => {
            setDisableButton(true);
            setShowSpinner(true);
        },
        onSettled: async data => {
            setDisableButton(false);
            setShowSpinner(false);
            if (data?.error) {
                error_handler({
                    navigation: navigation,
                    error_mssg: data?.data,
                });
            } else {
                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_USER_INFO,
                        JSON.stringify({
                            ...data?.data,
                        }),
                        {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        },
                    )
                        ?.catch(error => {
                            if (error) {
                                UserInfoStore.set_user_info({
                                    data: { ...data?.data },
                                });
                                next_dp_action({ action: 1 });
                            }
                        })
                        ?.then(() => {
                            UserInfoStore.set_user_info({
                                data: { ...data?.data },
                            });
                            next_dp_action({ action: 1 });
                        });
                } catch (err) {
                    UserInfoStore.set_user_info({
                        data: { ...data?.data },
                    });
                    next_dp_action({ action: 1 });
                }
            }
        },
    });

    const { mutate: update_dp_mutate } = useMutation(update_display_picture, {
        onMutate: () => {
            setDisableButton(true);
            setShowSpinner(true);
        },
        onSettled: async data => {
            setDisableButton(false);
            setShowSpinner(false);
            if (data?.error) {
                error_handler({
                    navigation: navigation,
                    error_mssg: data?.data,
                });
            } else {
                queryClient.invalidateQueries([
                    query_id({ id: UserInfoStore?.user_info?.uid })
                        ?.user_with_id,
                ]);
                next_dp_action({ action: 2 });
            }
        },
    });

    const next_dp_action = async ({ action }: { action?: number }) => {
        switch (action) {
            case 1:
                navigation.push(
                    'AuthStack' as never,
                    { screen: 'VerifyOTPPage' } as never,
                );
                break;
            case 2:
                info_handler({
                    navigation: navigation,
                    proceed_type: 3,
                    success_mssg: 'Display Picture Updated!',
                    hide_back_btn: true,
                    hide_header: false,
                });
                break;
            default:
                navigation.push(
                    'AuthStack' as never,
                    { screen: 'VerifyOTPPage' } as never,
                );
                break;
        }
    };

    const upload_data = no_double_clicks({
        execFunc: () => {
            if (route?.params?.is_change_dp) {
                update_dp_mutate({
                    displayPicture: displayPicture,
                    user_token: UserInfoStore?.user_info?.token as string,
                });
            } else {
                sign_up_mutate({
                    email: route?.params?.email,
                    username: route?.params?.username,
                    password: route?.params?.password,
                    displayPicture: displayPicture,
                });
            }
        },
    });

    const clear_image = no_double_clicks({
        execFunc: () => {
            setShowSpinner(false);
            setDisplayPicture('none');
            ImagePicker.clean();
        },
    });

    const select_image_from_gallery = no_double_clicks({
        execFunc: () => {
            setShowSpinner(false);
            try {
                ImagePicker.openPicker({
                    width: 400,
                    height: 400,
                    cropping: true,
                    multiple: false,
                    includeBase64: true,
                    enableRotationGesture: true,
                    forceJpg: true,
                })
                    .catch(err => {
                        setDisplayPicture('none');
                        if (err) {
                            clear_image();
                        }
                    })
                    .then(res => {
                        if (res) {
                            // @ts-ignore
                            const processed_image = `data:${res?.mime};base64,${res?.data}`;
                            setDisplayPicture(processed_image);
                        } else {
                            setDisplayPicture('none');
                            clear_image();
                        }
                    });
            } catch (error) {
                setDisplayPicture('none');
                clear_image();
            }
        },
    });

    const select_image_from_camera = no_double_clicks({
        execFunc: () => {
            setShowSpinner(false);
            try {
                ImagePicker.openCamera({
                    width: 400,
                    height: 400,
                    cropping: true,
                    multiple: false,
                    includeBase64: true,
                    enableRotationGesture: true,
                    forceJpg: true,
                })
                    .catch(err => {
                        setDisplayPicture('none');
                        if (err) {
                            clear_image();
                        }
                    })
                    .then(res => {
                        if (res) {
                            // @ts-ignore
                            const processed_image = `data:${res?.mime};base64,${res?.data}`;
                            setDisplayPicture(processed_image);
                        } else {
                            setDisplayPicture('none');
                            clear_image();
                        }
                    });
            } catch (error) {
                setDisplayPicture('none');
                clear_image();
            }
        },
    });

    useEffect(() => {
        ImagePicker.clean();
    }, []);

    return (
        <View style={styles.select_dp_main}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors().Background}
                backgroundDimColor={Colors().BackgroundDim}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
            <View
                style={{
                    marginLeft: 22,
                    marginTop: navigation?.canGoBack()
                        ? Platform?.OS === 'ios'
                            ? 56
                            : 40
                        : Platform.OS === 'ios'
                        ? 70
                        : 40,
                    marginBottom: 28,
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            <Text style={styles.su_m_wt}>
                Select a Display Picture to Proceed
            </Text>
            <View style={styles.sdp_w_i_c}>
                {displayPicture === 'none' ? (
                    <Image
                        style={styles.sdp_w_i}
                        source={require('../../Images/Logos/Default_User_Logo.jpg')}
                    />
                ) : (
                    <Image
                        style={styles.sdp_w_i}
                        source={{
                            uri: displayPicture,
                            width: 120,
                            height: 120,
                        }}
                    />
                )}
            </View>
            <View style={styles.sdp_sp_w}>
                <TouchableOpacity
                    onPress={select_image_from_camera}
                    style={[
                        styles.sdp_sp_i,
                        { backgroundColor: Colors().Border },
                    ]}>
                    <Feather
                        name="camera"
                        size={28}
                        color={Colors().DarkGrey}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={select_image_from_gallery}
                    style={[
                        styles.sdp_sp_i,
                        { backgroundColor: Colors().Border },
                    ]}>
                    <Feather name="image" size={28} color={Colors().DarkGrey} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={clear_image}
                    style={[
                        styles.sdp_sp_i,
                        { backgroundColor: Colors().Border },
                    ]}>
                    <Feather name="x" size={28} color={Colors().DarkGrey} />
                </TouchableOpacity>
            </View>
            <BasicButton
                buttonText={route?.params?.is_change_dp ? 'Upload' : 'Register'}
                borderRaduis={8}
                marginHorizontal={22}
                execFunc={upload_data}
                buttonHeight={56}
                disabled={disableButton}
            />
        </View>
    );
});

export default SelectDPPage;

const styles = StyleSheet.create({
    select_dp_main: {
        flex: 1,
        backgroundColor: Colors()?.Background,
    },
    su_m_wt: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 30,
        width: 320,
        lineHeight: 39,
        marginLeft: 22,
        color: Colors().Dark,
        marginBottom: 50,
    },
    sdp_w_i_c: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 130,
        padding: 2,
        marginBottom: 40,
        borderColor: Colors().Grey,
        borderWidth: 2,
    },
    sdp_w_i: {
        borderRadius: 230,
        width: 230,
        height: 230,
    },
    sdp_sp_w: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 40,
    },
    sdp_sp_i: {
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
