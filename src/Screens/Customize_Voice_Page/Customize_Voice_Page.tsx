import React, { FunctionComponent, useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import DisplayAvatar from '../../Components/Display_Avatar/Display_Avatar';
import Feather from 'react-native-vector-icons/Feather';
import VoiceOverIcon from '../../Images/SVGs/Voice_Over_Icon.svg';
import { Avatars } from '../../Data/Voices/Voices';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_VOICE_INFO } from '@env';
import { INTF_VoiceInfo } from '../../Interface/Voice_Info/Voice_Info';
import {
    INTF_AvatarFemaleVoice,
    INTF_AvatarMaleVoice,
} from '../../Interface/Avatar_Voice/Avatar_Voice';
import { observer } from 'mobx-react';
import {
    screen_height_less_than,
    screen_width_less_than,
} from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const CustomizeVoicePage: FunctionComponent = observer(() => {
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
                    inputText="Customize Voice"
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
                <View
                    style={{
                        marginHorizontal: 22,
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        activeOpacity={0.65}
                        style={{
                            borderWidth: 1,
                            alignItems: 'center',
                            width: 70,
                            height: 90,
                            borderRadius: 8,
                            borderColor: Colors.LightPurple,
                        }}>
                        <View
                            style={{
                                padding: 9,
                                marginTop: 10,
                                backgroundColor: Colors.LightPurple,
                                borderRadius: 20,
                                marginBottom: 4,
                            }}>
                            <Feather
                                name="volume-2"
                                color={Colors.DarkGrey}
                                size={20}
                            />
                        </View>
                        <BasicText
                            inputText="Listen"
                            textSize={15}
                            textWeight={500}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            backgroundColor: Colors.LightPurple4,
                            marginLeft: 10,
                            borderRadius: 8,
                            flex: 1,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginHorizontal: 20,
                                marginTop: 10,
                                marginBottom: 15,
                                alignItems: 'center',
                            }}>
                            <VoiceOverIcon
                                color={Colors.Primary}
                                width={25}
                                height={25}
                            />
                            <BasicText
                                inputText="Select Voice"
                                textSize={17}
                                marginLeft={10}
                                textWeight={600}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexWrap: 'wrap',
                                marginHorizontal: screen_width_less_than({
                                    if_true: 16,
                                    if_false: 22,
                                }),
                                flexDirection: 'row',
                                marginBottom: 10,
                            }}>
                            {(isMaleTutor
                                ? Avatars?.Male
                                : Avatars?.Female
                            )?.map((item, index) => (
                                <TouchableOpacity
                                    style={{
                                        width: screen_width_less_than({
                                            if_true: 90,
                                            if_false: 105,
                                        }),
                                        height: 60,
                                        backgroundColor: Colors.White,
                                        marginRight: 15,
                                        marginBottom: 10,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth:
                                            item?.name ===
                                            (isMaleTutor
                                                ? AvatarVoiceStore.avatar_male_voice
                                                : AvatarVoiceStore.avatar_female_voice)
                                                ? 1
                                                : 0,
                                        borderColor:
                                            item?.name ===
                                            (isMaleTutor
                                                ? AvatarVoiceStore.avatar_male_voice
                                                : AvatarVoiceStore.avatar_female_voice)
                                                ? Colors.Primary
                                                : undefined,
                                    }}
                                    activeOpacity={0.55}
                                    onPress={no_double_clicks({
                                        execFunc: async () => {
                                            const run_no_saved_info =
                                                async () => {
                                                    const new_avatar_info: INTF_VoiceInfo =
                                                        isMaleTutor
                                                            ? {
                                                                  is_avatar_male:
                                                                      true,
                                                                  avatar_male_voice:
                                                                      item?.name as INTF_AvatarMaleVoice,
                                                                  avatar_female_voice:
                                                                      AvatarVoiceStore.avatar_female_voice,
                                                              }
                                                            : {
                                                                  is_avatar_male:
                                                                      false,
                                                                  avatar_female_voice:
                                                                      item?.name as INTF_AvatarFemaleVoice,
                                                                  avatar_male_voice:
                                                                      AvatarVoiceStore.avatar_male_voice,
                                                              };

                                                    try {
                                                        await SInfo.setItem(
                                                            SECURE_STORAGE_VOICE_INFO,
                                                            JSON.stringify(
                                                                new_avatar_info,
                                                            ),
                                                            {
                                                                sharedPreferencesName:
                                                                    SECURE_STORAGE_NAME,
                                                                keychainService:
                                                                    SECURE_STORAGE_NAME,
                                                            },
                                                        ).then(() => {
                                                            if (isMaleTutor) {
                                                                AvatarVoiceStore.set_avatar_male_voice(
                                                                    {
                                                                        voice: item?.name as INTF_AvatarMaleVoice,
                                                                    },
                                                                );
                                                            } else {
                                                                AvatarVoiceStore.set_avatar_female_voice(
                                                                    {
                                                                        voice: item?.name as INTF_AvatarFemaleVoice,
                                                                    },
                                                                );
                                                            }
                                                        });
                                                    } catch (error) {}
                                                };

                                            try {
                                                await SInfo.getItem(
                                                    SECURE_STORAGE_VOICE_INFO,
                                                    {
                                                        sharedPreferencesName:
                                                            SECURE_STORAGE_NAME,
                                                        keychainService:
                                                            SECURE_STORAGE_NAME,
                                                    },
                                                )
                                                    .catch(() => {
                                                        run_no_saved_info();
                                                    })
                                                    .then(async res => {
                                                        if (res) {
                                                            const avatar_info: INTF_VoiceInfo =
                                                                JSON.parse(res);

                                                            const new_avatar_info: INTF_VoiceInfo =
                                                                isMaleTutor
                                                                    ? {
                                                                          ...avatar_info,
                                                                          avatar_male_voice:
                                                                              item?.name as INTF_AvatarMaleVoice,
                                                                      }
                                                                    : {
                                                                          ...avatar_info,
                                                                          avatar_female_voice:
                                                                              item?.name as INTF_AvatarFemaleVoice,
                                                                      };

                                                            try {
                                                                await SInfo.setItem(
                                                                    SECURE_STORAGE_VOICE_INFO,
                                                                    JSON.stringify(
                                                                        new_avatar_info,
                                                                    ),
                                                                    {
                                                                        sharedPreferencesName:
                                                                            SECURE_STORAGE_NAME,
                                                                        keychainService:
                                                                            SECURE_STORAGE_NAME,
                                                                    },
                                                                ).then(() => {
                                                                    if (
                                                                        isMaleTutor
                                                                    ) {
                                                                        AvatarVoiceStore.set_avatar_male_voice(
                                                                            {
                                                                                voice: item?.name as INTF_AvatarMaleVoice,
                                                                            },
                                                                        );
                                                                    } else {
                                                                        AvatarVoiceStore.set_avatar_female_voice(
                                                                            {
                                                                                voice: item?.name as INTF_AvatarFemaleVoice,
                                                                            },
                                                                        );
                                                                    }
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
                                    })}
                                    key={index}>
                                    <BasicText
                                        inputText={item?.name}
                                        textSize={15}
                                        textWeight={700}
                                    />
                                    <BasicText
                                        inputText={`${item?.type} ${
                                            isMaleTutor ? 'Male' : 'Female'
                                        }`}
                                        textSize={12}
                                        textWeight={500}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
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

export default CustomizeVoicePage;

const styles = StyleSheet.create({
    acp_main: {
        flex: 1,
        backgroundColor: Colors.Background,
        paddingBottom: Platform.OS === 'ios' ? 15 : 5,
    },
});
