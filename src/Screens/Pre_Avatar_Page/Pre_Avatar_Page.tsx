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
import BasicText from '../../Components/Basic_Text/Basic_Text';
import {
    INTF_AvatarFemaleVoice,
    INTF_AvatarMaleVoice,
} from '../../Interface/Avatar_Voice/Avatar_Voice';
import { AvatarVoices } from '../../Data/Voices/Voices';
import { avatars_data } from '../../Data/Avatars/Avatars';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import VoiceButton from '../../Components/Voice_Button/Voice_Button';
import RNDropDown from '../../Components/RN_Drop_Down/RN_Drop_Down';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import BackButton from '../../Components/Back_Button/Back_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { INTF_VoiceInfo } from '../../Interface/Voice_Info/Voice_Info';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_NAME, SECURE_STORAGE_VOICE_INFO } from '@env';
import { observer } from 'mobx-react';
import {
    screen_height_less_than,
    screen_width_less_than,
} from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const AVATAR_SIZE = screen_width_less_than({ if_false: 130, if_true: 120 });

const PreAvatarPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [isMaleTutor, setIsMaleTutor] = useState<boolean>(false);
    const [maleVoice, setMaleVoice] = useState<INTF_AvatarMaleVoice>(
        AvatarVoices?.Male[0]?.value as INTF_AvatarMaleVoice,
    );
    const [femaleVoice, setFemaleVoice] = useState<INTF_AvatarFemaleVoice>(
        AvatarVoices?.Female[0]?.value as INTF_AvatarFemaleVoice,
    );

    const nav_to_pre_test_page = no_double_clicks({
        execFunc: async () => {
            if (
                maleVoice === ('Choose Voice' as INTF_AvatarMaleVoice) ||
                femaleVoice === ('Choose Voice' as INTF_AvatarFemaleVoice)
            ) {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Please select a Voice for each Avatar.',
                });
            } else {
                const voice_info: INTF_VoiceInfo = {
                    is_avatar_male: isMaleTutor,
                    avatar_male_voice: maleVoice,
                    avatar_female_voice: femaleVoice,
                };

                const next_step = () => {
                    AvatarVoiceStore.set_is_avatar_male({
                        isMale: isMaleTutor,
                    });
                    AvatarVoiceStore.set_avatar_male_voice({
                        voice: maleVoice,
                    });
                    AvatarVoiceStore.set_avatar_female_voice({
                        voice: femaleVoice,
                    });
                    navigation.push(
                        'AuthStack' as never,
                        {
                            screen: 'PreTestPage',
                        } as never,
                    );
                };
                try {
                    await SInfo.setItem(
                        SECURE_STORAGE_VOICE_INFO,
                        JSON.stringify(voice_info),
                        {
                            sharedPreferencesName: SECURE_STORAGE_NAME,
                            keychainService: SECURE_STORAGE_NAME,
                        },
                    )
                        .catch(() => {
                            next_step();
                        })
                        .then(() => {
                            next_step();
                        });
                } catch (error) {
                    next_step();
                }
            }
        },
    });

    return (
        <View style={styles.sap_main}>
            <View
                style={{
                    marginTop:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 40,
                                  if_false: 65,
                              })
                            : 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <BasicText
                    inputText="Choose Your Desired Teacher"
                    textSize={28}
                    textWeight={700}
                    marginTop={20}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        justifyContent: 'space-between',
                        marginBottom: 20,
                    }}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={[
                                    styles.avatar_bg,
                                    {
                                        backgroundColor: Colors.LightPink,
                                    },
                                ]}
                                onPress={() => setIsMaleTutor(false)}>
                                <View>
                                    {isMaleTutor && (
                                        <View style={styles.avatar_bg_overlay}>
                                            {''}
                                        </View>
                                    )}
                                    <Image
                                        source={avatars_data[0]?.image}
                                        style={{
                                            width: AVATAR_SIZE,
                                            height: AVATAR_SIZE,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                            <VoiceButton
                                execFunc={no_double_clicks({
                                    execFunc: () => console.log(femaleVoice),
                                })}
                                buttonSize={38}
                                borderRadius={8}
                                marginLeft={5}
                            />
                        </View>
                        <RNDropDown
                            dropdownData={AvatarVoices.Female}
                            value={femaleVoice}
                            setValue={setFemaleVoice}
                            height={42}
                            disable={false}
                            paddingHorizontal={5}
                            width={132}
                            marginRight={40}
                        />
                    </View>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={styles.avatar_bg}
                                onPress={() => setIsMaleTutor(true)}>
                                <View>
                                    {!isMaleTutor && (
                                        <View style={styles.avatar_bg_overlay}>
                                            {''}
                                        </View>
                                    )}
                                    <Image
                                        source={avatars_data[6]?.image}
                                        style={{
                                            width: AVATAR_SIZE,
                                            height: AVATAR_SIZE,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                            <VoiceButton
                                execFunc={no_double_clicks({
                                    execFunc: () => console.log(maleVoice),
                                })}
                                buttonSize={38}
                                borderRadius={8}
                                marginLeft={5}
                            />
                        </View>
                        <RNDropDown
                            dropdownData={AvatarVoices.Male}
                            value={maleVoice}
                            setValue={setMaleVoice}
                            height={42}
                            disable={false}
                            marginRight={40}
                            paddingHorizontal={5}
                            width={132}
                        />
                    </View>
                </View>
                <BasicText
                    inputText="Select an Avatar and a Voice for each Avatar."
                    marginTop={50}
                    width={200}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    textAlign="center"
                />
            </ScrollView>
            <BasicButton
                buttonText={'Continue'}
                borderRadius={8}
                buttonHeight={56}
                marginTop={'auto'}
                marginBottom={
                    Platform.OS === 'ios'
                        ? screen_height_less_than({
                              if_true: 10,
                              if_false: 40,
                          })
                        : 20
                }
                execFunc={nav_to_pre_test_page}
            />
        </View>
    );
});

export default PreAvatarPage;

const styles = StyleSheet.create({
    sap_main: {
        flex: 1,
        backgroundColor: Colors.Background,
        paddingHorizontal: screen_width_less_than({
            if_false: 22,
            if_true: 16,
        }),
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
