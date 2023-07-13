import React, { FunctionComponent, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import TutorAIIcon from '../../Images/SVGs/Tutor_AI_Icon.svg';
import TranscribeIcon from '../../Images/SVGs/Transcribe_Icon.svg';
import Colors from '../../Configs/Colors/Colors';
import BasicText from '../Basic_Text/Basic_Text';
import { KeyboardStore } from '../../MobX/Keyboard/Keyboard';
import { observer } from 'mobx-react';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { http_link_fix } from '../../Utils/HTTP_Link_Fix/HTTP_Link_Fix';
import { INTF_ChatGPT } from '../../Interface/Chat_GPT/Chat_GPT';
import { useMutation } from 'react-query';
import { gpt_request } from '../../Configs/Queries/Chat/Chat';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import { SpeechControllerStore } from '../../MobX/Speech_Controller/Speech_Controller';

interface ChatCardProps {
    chat: INTF_ChatGPT;
    index: number;
    last_index: number;
}
const ChatCard: FunctionComponent<ChatCardProps> = observer(
    ({ chat, index, last_index }) => {
        const [isError, setIsError] = useState<boolean>(true);
        const [translation, setTranslation] = useState<string>('');
        const [showT, setShowT] = useState<boolean>(false);

        const { mutate: gpt_req_mutate } = useMutation(gpt_request, {
            onMutate: () => {
                setIsError(false);
            },
            onSettled: async data => {
                if (data?.error) {
                    setIsError(true);
                } else {
                    if (data?.data?.chat_res) {
                        setTranslation(data?.data?.chat_res);
                        setIsError(false);
                    } else {
                        setIsError(true);
                    }
                }
            },
        });

        useEffect(() => {
            if (
                isError &&
                UserInfoStore?.user_info?.language !== null &&
                UserInfoStore?.user_info?.language !== undefined &&
                !(UserInfoStore?.user_info?.language as string)?.includes(
                    'English',
                )
            ) {
                gpt_req_mutate({
                    messages: [
                        {
                            role: 'user',
                            content: `Translate "${chat.content}" to ${UserInfoStore?.user_info?.language}. Note: your response should only be the translated text.`,
                        },
                    ],
                });
            }
        }, [isError, gpt_req_mutate, chat.content]);

        return (
            <View
                style={{
                    marginBottom:
                        index === last_index && KeyboardStore.keyboard_active
                            ? 1
                            : 0,
                }}>
                {chat.role === 'assistant' && (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            marginBottom: 20,
                        }}>
                        <TutorAIIcon width={31} height={31} />
                        <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    setShowT(!showT);
                                },
                            })}
                            activeOpacity={0.55}
                            style={styles.container}>
                            <BasicText
                                inputText={
                                    !isError &&
                                    showT &&
                                    translation &&
                                    UserInfoStore?.user_info?.language
                                        ? translation
                                        : chat?.content
                                }
                                textSize={15}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    TextToSpeechStore.play_speech({
                                        speech: chat?.content,
                                        isMale: AvatarVoiceStore.is_avatar_male,
                                        femaleVoice:
                                            AvatarVoiceStore.avatar_female_voice,
                                        maleVoice:
                                            AvatarVoiceStore.avatar_male_voice,
                                        speechRate: SpeechControllerStore.rate,
                                    });
                                },
                            })}
                            activeOpacity={0.5}>
                            <TranscribeIcon width={30} height={30} />
                        </TouchableOpacity>
                    </View>
                )}
                {chat.role === 'user' && (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            alignSelf: 'flex-end',
                            marginBottom: 20,
                        }}>
                        <Image
                            source={
                                UserInfoStore?.user_info?.dp?.url
                                    ? {
                                          uri: http_link_fix({
                                              http_link: UserInfoStore
                                                  ?.user_info?.dp
                                                  ?.url as string,
                                          }),
                                      }
                                    : require('../../Images/Extra/default_user_dp_light.jpg')
                            }
                            style={{
                                width: 31,
                                height: 31,
                                resizeMode: 'contain',
                                borderRadius: 31,
                            }}
                        />
                        <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    setShowT(!showT);
                                },
                            })}
                            activeOpacity={0.55}
                            style={[
                                styles.container,
                                {
                                    backgroundColor: Colors.Primary,
                                    borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 0,
                                },
                            ]}>
                            <BasicText
                                inputText={
                                    !isError &&
                                    showT &&
                                    translation &&
                                    UserInfoStore?.user_info?.language
                                        ? translation
                                        : chat?.content
                                }
                                textColor={Colors.White}
                                textSize={15}
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    TextToSpeechStore.play_speech({
                                        speech: chat?.content,
                                        isMale: AvatarVoiceStore.is_avatar_male,
                                        femaleVoice:
                                            AvatarVoiceStore.avatar_female_voice,
                                        maleVoice:
                                            AvatarVoiceStore.avatar_male_voice,
                                        speechRate: SpeechControllerStore.rate,
                                    });
                                },
                            })}
                            activeOpacity={0.5}>
                            <TranscribeIcon width={30} height={30} />
                        </TouchableOpacity> */}
                    </View>
                )}
            </View>
        );
    },
);

export default ChatCard;

const styles = StyleSheet.create({
    container: {
        width: 240,
        maxWidth: 240,
        backgroundColor: Colors.ChatBG,
        marginLeft: 7,
        marginRight: 7,
        paddingTop: 10,
        paddingHorizontal: 12,
        paddingBottom: 8,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        shadowColor: 'rgba(0 ,0 ,0 , 0.35)',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3.27,
        elevation: 3,
        minHeight: 55,
    },
});
