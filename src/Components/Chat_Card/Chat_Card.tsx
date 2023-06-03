import React, { FunctionComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { INTF_Conversation } from '../../Interface/Conversation/Conversation';
import TutorAIIcon from '../../Images/SVGs/Tutor_AI_Icon.svg';
import TranscribeIcon from '../../Images/SVGs/Transcribe_Icon.svg';
import Colors from '../../Configs/Colors/Colors';
import BasicText from '../Basic_Text/Basic_Text';
import { KeyboardStore } from '../../MobX/Keyboard/Keyboard';
import { observer } from 'mobx-react';

interface ChatCardProps {
    chat: INTF_Conversation;
    index: number;
    last_index: number;
}
const ChatCard: FunctionComponent<ChatCardProps> = observer(
    ({ chat, index, last_index }) => {
        return (
            <View
                style={{
                    marginBottom:
                        index === last_index && KeyboardStore.keyboard_active
                            ? 1
                            : 0,
                }}>
                {chat.isAI ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            marginBottom: 20,
                        }}>
                        <TutorAIIcon width={31} height={31} />
                        <TouchableOpacity
                            activeOpacity={0.55}
                            style={{
                                width: 200,
                                maxWidth: 200,
                                backgroundColor: Colors.ChatBG,
                                marginLeft: 7,
                                marginRight: 7,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
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
                            }}>
                            <BasicText inputText={chat?.chat} textSize={15} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}>
                            <TranscribeIcon width={30} height={30} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            alignSelf: 'flex-end',
                            marginBottom: 20,
                        }}>
                        <Image
                            source={require('../../../test/Images/Test_DP.png')}
                            style={{
                                width: 31,
                                height: 31,
                                resizeMode: 'contain',
                                borderRadius: 31,
                            }}
                        />
                        <TouchableOpacity
                            activeOpacity={0.55}
                            style={{
                                width: 200,
                                maxWidth: 200,
                                backgroundColor: Colors.Primary,
                                marginLeft: 7,
                                marginRight: 7,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
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
                            }}>
                            <BasicText
                                inputText={chat?.chat}
                                textColor={Colors.White}
                                textSize={15}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}>
                            <TranscribeIcon width={30} height={30} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    },
);

export default ChatCard;
