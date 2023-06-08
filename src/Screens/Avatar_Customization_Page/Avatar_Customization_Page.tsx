import React, { FunctionComponent, useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import DisplayAvatar from '../../Components/Display_Avatar/Display_Avatar';
import BasicButton2 from '../../Components/Basic_Button_2/Basic_Button_2';
import { avatars_data } from '../../Data/Avatars/Avatars';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_VOICE_INFO } from '@env';
import { INTF_VoiceInfo } from '../../Interface/Voice_Info/Voice_Info';
import SInfo from 'react-native-sensitive-info';
import { observer } from 'mobx-react';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const AvatarCustomizationPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const isMaleTutor = AvatarVoiceStore?.is_avatar_male || false;

    const proceed_to_home_page = no_double_clicks({
        execFunc: () => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeStack' }],
                }),
            );
        },
    });

    const nav_to_customize_voice = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'CustomizeVoicePage',
                } as never,
            );
        },
    });

    const update_avatar = ({ isMale }: { isMale: boolean }) => {
        const update_data = no_double_clicks({
            execFunc: async () => {
                const run_no_saved_info = async () => {
                    const new_avatar_info: INTF_VoiceInfo = {
                        is_avatar_male: isMale,
                        avatar_male_voice: AvatarVoiceStore?.avatar_male_voice,
                        avatar_female_voice:
                            AvatarVoiceStore?.avatar_female_voice,
                    };

                    try {
                        await SInfo.setItem(
                            SECURE_STORAGE_VOICE_INFO,
                            JSON.stringify(new_avatar_info),
                            {
                                sharedPreferencesName: SECURE_STORAGE_NAME,
                                keychainService: SECURE_STORAGE_NAME,
                            },
                        ).then(() => {
                            AvatarVoiceStore?.set_is_avatar_male({
                                isMale: isMale,
                            });
                        });
                    } catch (error) {}
                };

                try {
                    await SInfo.getItem(SECURE_STORAGE_VOICE_INFO, {
                        sharedPreferencesName: SECURE_STORAGE_NAME,
                        keychainService: SECURE_STORAGE_NAME,
                    })
                        .catch(() => {
                            run_no_saved_info();
                        })
                        .then(async res => {
                            if (res) {
                                const avatar_info: INTF_VoiceInfo =
                                    JSON.parse(res);
                                const new_avatar_info: INTF_VoiceInfo = {
                                    ...avatar_info,
                                    is_avatar_male: isMale,
                                };
                                try {
                                    await SInfo.setItem(
                                        SECURE_STORAGE_VOICE_INFO,
                                        JSON.stringify(new_avatar_info),
                                        {
                                            sharedPreferencesName:
                                                SECURE_STORAGE_NAME,
                                            keychainService:
                                                SECURE_STORAGE_NAME,
                                        },
                                    ).then(() => {
                                        AvatarVoiceStore?.set_is_avatar_male({
                                            isMale: isMale,
                                        });
                                    });
                                } catch (error) {}
                            } else {
                                run_no_saved_info();
                            }
                        });
                } catch (error) {
                    run_no_saved_info();
                }
            },
        });
        update_data();
    };

    return (
        <View style={styles.acp_main}>
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
                    marginTop:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 45,
                                  if_false: 65,
                              })
                            : 25,
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton />
                <BasicText
                    inputText="Avatar Customization"
                    textSize={20}
                    textWeight={700}
                    marginLeft={10}
                />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <DisplayAvatar
                    marginBottom={20}
                    marginTop={30}
                    marginHorizontal={22}
                />
                <BasicButton2
                    buttonText="Customize"
                    borderRadius={8}
                    marginHorizontal={22}
                    buttonHeight={56}
                    backgroundColor={Colors.Primary}
                    textColor={Colors.Primary}
                    marginBottom={40}
                    execFunc={nav_to_customize_voice}
                />
                <BasicText
                    inputText="Select New Avatar"
                    textSize={16}
                    textWeight={500}
                    marginLeft={22}
                    marginRight={22}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginHorizontal: 22,
                        marginBottom: 20,
                    }}>
                    <TouchableOpacity
                        style={[
                            styles.avatar_bg,
                            {
                                backgroundColor: Colors.LightPink,
                                marginRight: 20,
                            },
                        ]}
                        onPress={() => update_avatar({ isMale: false })}>
                        <View>
                            {isMaleTutor && (
                                <View style={styles.avatar_bg_overlay}>
                                    {''}
                                </View>
                            )}
                            <Image
                                source={avatars_data[0]?.image}
                                style={{
                                    width: 130,
                                    height: 130,
                                }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.avatar_bg}
                        onPress={() => update_avatar({ isMale: true })}>
                        <View>
                            {!isMaleTutor && (
                                <View style={styles.avatar_bg_overlay}>
                                    {''}
                                </View>
                            )}
                            <Image
                                source={avatars_data[6]?.image}
                                style={{
                                    width: 130,
                                    height: 130,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <BasicButton
                buttonText="Continue"
                borderRadius={8}
                marginHorizontal={22}
                buttonHeight={56}
                marginTop={2}
                marginBottom={
                    Platform.OS === 'ios'
                        ? screen_height_less_than({
                              if_true: 1,
                              if_false: 30,
                          })
                        : 5
                }
                execFunc={proceed_to_home_page}
            />
        </View>
    );
});

export default AvatarCustomizationPage;

const styles = StyleSheet.create({
    acp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
        paddingBottom: Platform.OS === 'ios' ? 15 : 5,
    },
    acp_m_wt2: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        lineHeight: 24,
        marginHorizontal: 22,
        color: Colors.Grey,
    },
    avatar_bg: {
        backgroundColor: Colors.Primary,
        borderRadius: 20,
        marginBottom: 10,
    },
    avatar_bg_overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(220, 220, 220, 0.7)',
        width: '100%',
        height: '100%',
        zIndex: 2,
        borderRadius: 20,
    },
});
