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
import BackButton from '../../Components/Back_Button/Back_Button';
import TextButton from '../../Components/Text_Button/Text_Button';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';
import { seconds_to_minutes } from '../../Utils/Seconds_To_Minutes/Seconds_To_Minutes';
import { INTF_ChatGPT } from '../../Interface/Chat_GPT/Chat_GPT';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { useMutation } from 'react-query';
import { gpt_request } from '../../Configs/Queries/Chat/Chat';

const InitConvPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [micText, setMicText] = useState<string>('');
    const flatListRef = useRef<FlatList<any> | null>(null);

    const [hasSkipped, setHasSkipped] = useState<boolean>(false);
    const [messages, setMessages] = useState<INTF_ChatGPT[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(120);

    const UserInfo = UserInfoStore?.user_info;
    const GPT_PROMPT = `My name is ${UserInfo?.fullname}, let's talk about this English Tutor application called TutorAI and also talk about the features it has to offer. Note: keep your replies short!`;

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

    const send_reply = no_double_clicks({
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
        let intervalId: any;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        if (!hasSkipped && timer === 0) {
            navigation.push(
                'AuthStack' as never,
                {
                    screen: 'PreTestPage',
                } as never,
            );
        }
        return () => clearInterval(intervalId);
    }, [timer, navigation, hasSkipped]);

    useEffect(() => {
        const first_timer = setTimeout(() => {
            flatListRef.current !== null && flatListRef.current?.scrollToEnd();
        }, 100);
        if (Keyboard.isVisible()) {
            Keyboard.dismiss();
        }
        return () => clearTimeout(first_timer);
    }, [messages?.length]);

    return (
        <View style={styles.init_conv_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 40,
                                  if_false: 65,
                              })
                            : 20,
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton show_back_button />
                <View
                    style={{
                        position: 'absolute',
                        right: 0,
                        left: 0,
                    }}>
                    <BasicText
                        inputText={seconds_to_minutes({ time: timer })}
                        marginLeft={'auto'}
                        marginRight={'auto'}
                        textColor={Colors.Primary}
                        textWeight={600}
                        textSize={15}
                    />
                </View>
                <TextButton
                    buttonText="Skip"
                    marginLeft={'auto'}
                    marginRight={5}
                    isFontLight
                    execFunc={no_double_clicks({
                        execFunc: () => {
                            setHasSkipped(true);
                            navigation.push(
                                'AuthStack' as never,
                                {
                                    screen: 'PreTestPage',
                                } as never,
                            );
                        },
                    })}
                />
            </View>
            <MiniAvatar
                marginTop={15}
                marginBottom={4}
                marginHorizontal={22}
                isSubtitleIcon
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
                            : 15,
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
                        data={messages.slice(1)}
                        keyExtractor={(item, index) => item?.role + index}
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
                                last_index={messages.slice(1)?.length - 1}
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
                        marginLeft={12}
                        marginRight={12}
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
                        onSend={send_reply}
                    />
                )}
            </KeyboardAvoidingView>
        </View>
    );
});

export default InitConvPage;

const styles = StyleSheet.create({
    init_conv_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
