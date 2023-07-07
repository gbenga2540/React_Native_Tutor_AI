import React, {
    FunctionComponent,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import MiniAvatar from '../../Components/Mini_Avatar/Mini_Avatar';
import ChatCard from '../../Components/Chat_Card/Chat_Card';
import MicAndTextInput from '../../Components/Mic_And_Text_Input/Mic_And_Text_Input';
import { observer } from 'mobx-react';
import { RouteProp, useRoute } from '@react-navigation/native';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { shorten_text } from '../../Utils/Shorten_Text/Shorten_Text';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';
import { useMutation } from 'react-query';
import { gpt_request } from '../../Configs/Queries/Chat/Chat';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { INTF_ChatGPT } from '../../Interface/Chat_GPT/Chat_GPT';

const LessonConvPage: FunctionComponent = observer(() => {
    const route = useRoute<RouteProp<any>>();
    const [micText, setMicText] = useState<string>('');
    const [timer, setTimer] = useState<number>(1800);
    const flatListRef = useRef<FlatList<any> | null>(null);

    const [messages, setMessages] = useState<INTF_ChatGPT[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const UserLevel = UserInfoStore?.user_info?.level;
    const UserLevelID =
        UserLevel === 'Confident'
            ? 5
            : UserLevel === 'Upper-Intermediate'
            ? 4
            : UserLevel === 'Intermediate'
            ? 3
            : UserLevel === 'Pre-Intermediate'
            ? 2
            : 1;

    const GPT_PROMPT = `Act as a English language Tutor: Hi, there, my name is ${UserInfoStore?.user_info?.fullname}. I am on level ${UserLevelID}/5. The higher the level, the tougher you teach me. Let's have a conversation on ${route.params?.topic}. Note: Keep your replies short!`;

    const { mutate: gpt_req_mutate } = useMutation(gpt_request, {
        onMutate: () => {
            setIsLoading(true);
            setMessages(prev => [
                ...prev,
                {
                    role: 'user',
                    content: messages?.length === 0 ? GPT_PROMPT : micText,
                },
            ]);
        },
        onSettled: async data => {
            if (data?.error) {
                setIsLoading(false);
                if (messages.length === 1) {
                    setMessages([]);
                } else {
                    messages !== undefined &&
                        setMessages(messages?.splice(messages.length - 1, 1));
                }
            } else {
                setIsLoading(false);
                if (data?.data?.chat_res) {
                    setMessages(prev => [
                        ...prev,
                        { role: 'assistant', content: data?.data?.chat_res },
                    ]);
                    TextToSpeechStore.clear_speech();
                    TextToSpeechStore?.play_speech({
                        speech: data?.data?.chat_res,
                    });
                }
                setMicText('');
            }
        },
    });

    const send_message = no_double_clicks({
        execFunc: () => {
            if (micText) {
                gpt_req_mutate({
                    messages: [...messages, { role: 'user', content: micText }],
                });
            }
            Keyboard.isVisible() && Keyboard.dismiss();
        },
    });

    useEffect(() => {
        if (messages?.length === 0) {
            gpt_req_mutate({
                messages: [...messages, { role: 'user', content: GPT_PROMPT }],
            });
        }
    }, [gpt_req_mutate, GPT_PROMPT, messages]);

    useEffect(() => {
        const first_timer = setTimeout(() => {
            flatListRef.current !== null && flatListRef.current?.scrollToEnd();
            if (Keyboard.isVisible()) {
                Keyboard.dismiss();
            }
        }, 100);
        return () => clearTimeout(first_timer);
    }, [messages?.length]);

    useEffect(() => {
        let intervalId: any;
        if (messages?.length > 0 && timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [timer, messages?.length]);

    return (
        <View style={styles.conversation_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
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
                    inputText={
                        shorten_text({
                            text: route.params?.topic,
                            limit: 33,
                        }) || ''
                    }
                    textWeight={700}
                    textSize={20}
                    marginLeft={15}
                />
                {/* <BasicText
                    inputText={seconds_to_minutes({
                        time: timer,
                    })}
                    marginLeft={'auto'}
                    textWeight={600}
                    textColor={Colors.Primary}
                /> */}
            </View>
            <MiniAvatar
                marginTop={15}
                marginBottom={4}
                marginHorizontal={22}
                hideIcons
            />
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    marginBottom:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_false: 35,
                                  if_true: 10,
                              })
                            : 8,
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                {messages?.slice(1)?.length > 0 ? (
                    <FlatList
                        ref={flatListRef}
                        ListHeaderComponent={() =>
                            (
                                <View style={{ marginTop: 16 }}>{''}</View>
                            ) as ReactElement<any>
                        }
                        data={messages?.slice(1)}
                        keyExtractor={(item: INTF_ChatGPT, index) =>
                            item.role + index
                        }
                        renderItem={({
                            item,
                            index,
                        }: {
                            item: INTF_ChatGPT;
                            index: number;
                        }) => (
                            <ChatCard
                                key={index}
                                chat={item}
                                index={index}
                                last_index={messages?.slice(1)?.length - 1}
                            />
                        )}
                        style={{
                            paddingHorizontal: 22,
                        }}
                        ListFooterComponent={() =>
                            (
                                <View
                                    style={{
                                        marginBottom: 1,
                                    }}>
                                    {''}
                                </View>
                            ) as ReactElement<any>
                        }
                    />
                ) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {!isLoading && (
                            <BasicText
                                inputText="Press the Microphone Button to start a Conversation."
                                textSize={16}
                                width={250}
                                textAlign="center"
                            />
                        )}
                    </View>
                )}
                {isLoading ? (
                    <View
                        style={{
                            marginHorizontal: 10,
                            height: 56,
                            minHeight: 56,
                            maxHeight: 56,
                            borderRadius: 8,
                            borderColor: Colors.Border,
                            borderWidth: 1,
                            backgroundColor: Colors.InputBackground,
                            flex: 1,
                            justifyContent: 'center',
                            paddingLeft: 12,
                        }}>
                        <BasicText
                            inputText="Loading..."
                            textSize={17}
                            textColor={Colors.DarkGrey}
                        />
                    </View>
                ) : (
                    <MicAndTextInput
                        inputMode="text"
                        marginTop={3}
                        marginLeft={10}
                        marginRight={10}
                        paddingBottom={7}
                        paddingTop={3}
                        placeHolderText="Type here.."
                        inputValue={micText}
                        setInputValue={setMicText}
                        onChange={no_double_clicks({
                            execFunc: () => {
                                flatListRef?.current?.scrollToEnd();
                            },
                        })}
                        onFocus={no_double_clicks({
                            execFunc: () => {
                                flatListRef?.current?.scrollToEnd();
                            },
                        })}
                        onSend={send_message}
                    />
                )}
            </KeyboardAvoidingView>
        </View>
    );
});

export default LessonConvPage;

const styles = StyleSheet.create({
    conversation_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
