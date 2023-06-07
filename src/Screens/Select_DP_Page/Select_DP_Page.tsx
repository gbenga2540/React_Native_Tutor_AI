import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';
import BasicText from '../../Components/Basic_Text/Basic_Text';

const SelectDPPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();

    const [displayPicture, setDisplayPicture] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(false);

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
            } else {
            }
        },
    });

    const clear_image = no_double_clicks({
        execFunc: () => {
            setShowSpinner(false);
            setDisplayPicture('');
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
                        setDisplayPicture('');
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
                            setDisplayPicture('');
                            clear_image();
                        }
                    });
            } catch (error) {
                setDisplayPicture('');
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
                        setDisplayPicture('');
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
                            setDisplayPicture('');
                            clear_image();
                        }
                    });
            } catch (error) {
                setDisplayPicture('');
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
                backgroundColor={Colors.Background}
                backgroundDimColor={Colors.BackgroundDim}
            />
            <OverlaySpinner
                showSpinner={showSpinner}
                setShowSpinner={setShowSpinner}
            />
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
            <BasicText
                inputText="Select a Display Picture to Proceed"
                marginBottom={50}
                marginLeft={22}
                width={320}
                textWeight={700}
                textSize={30}
            />
            <View style={styles.sdp_w_i_c}>
                {displayPicture === '' ? (
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
                        {
                            backgroundColor: Colors.Border,
                        },
                    ]}>
                    <Feather name="camera" size={28} color={Colors.DarkGrey} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={select_image_from_gallery}
                    style={[
                        styles.sdp_sp_i,
                        {
                            backgroundColor: Colors.Border,
                        },
                    ]}>
                    <Feather name="image" size={28} color={Colors.DarkGrey} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={clear_image}
                    style={[
                        styles.sdp_sp_i,
                        {
                            backgroundColor: Colors.Border,
                        },
                    ]}>
                    <Feather name="x" size={28} color={Colors.DarkGrey} />
                </TouchableOpacity>
            </View>
            <BasicButton
                buttonText={route?.params?.is_change_dp ? 'Upload' : 'Register'}
                borderRadius={8}
                marginHorizontal={22}
                execFunc={upload_data}
                buttonHeight={56}
                disabled={disableButton}
            />
        </View>
    );
};

export default SelectDPPage;

const styles = StyleSheet.create({
    select_dp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    sdp_w_i_c: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 130,
        padding: 2,
        marginBottom: 40,
        borderColor: Colors.Grey,
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
