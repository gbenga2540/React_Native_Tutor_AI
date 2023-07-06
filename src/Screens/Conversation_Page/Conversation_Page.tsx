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
import { INTF_Conversation } from '../../Interface/Conversation/Conversation';
import ChatCard from '../../Components/Chat_Card/Chat_Card';
import { observer } from 'mobx-react';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import MicrophoneButton from '../../Components/Microphone_Button/Microphone_Button';
import { socketIO } from '../../Configs/Socket_IO/Socket_IO';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { seconds_to_minutes } from '../../Utils/Seconds_To_Minutes/Seconds_To_Minutes';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';

const ConversationPage: FunctionComponent = observer(() => {
    const [chats, setChats] = useState<INTF_Conversation[]>([]);
    const [chat, setChat] = useState<string>('');
    const flatListRef = useRef<FlatList<any> | null>(null);
    const [timer, setTimer] = useState<number>(1800);
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const send_message = no_double_clicks({
        execFunc: () => {
            if (chat) {
                socketIO.emit('conversation', chat);
                setChats(prevChat => [
                    ...prevChat,
                    { isAI: false, chat: chat },
                ]);
                // setChat('');
            }
        },
    });

    const speak_info = no_double_clicks({
        execFunc: () => {
            TextToSpeechStore.clear_speech();
            TextToSpeechStore.play_speech({
                speech: 'Press the Microphone Button to start or continue a conversation.',
            });
        },
    });

    useEffect(() => {
        socketIO.on('conversation', reply => {
            setChats(prevChat => [...prevChat, { isAI: true, chat: reply }]);
            TextToSpeechStore.play_speech({
                speech: reply,
            });
        });
        return () => {
            socketIO.disconnect();
        };
    }, []);

    useEffect(() => {
        let intervalId: any;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [timer]);

    useEffect(() => {
        const first_timer = setTimeout(() => {
            flatListRef.current !== null && flatListRef.current?.scrollToEnd();
            if (Keyboard.isVisible()) {
                Keyboard.dismiss();
            }
        }, 100);
        return () => clearTimeout(first_timer);
    }, [chats]);

    return (
        <View style={styles.conversation_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View style={styles.c_header_cont}>
                <BasicText
                    inputText="Conversation"
                    textWeight={700}
                    textSize={25}
                    marginTop={'auto'}
                    marginBottom={18}
                />
                <BasicText
                    inputText={seconds_to_minutes({
                        time: timer,
                    })}
                    marginLeft={'auto'}
                    marginTop={'auto'}
                    marginBottom={25}
                    marginRight={22}
                    textWeight={600}
                    textColor={Colors.Primary}
                />
            </View>
            <MiniAvatar
                marginTop={15}
                marginBottom={4}
                marginHorizontal={22}
                isSubtitleIcon
                onPressVoice={speak_info}
            />
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                {chats?.length > 0 ? (
                    <FlatList
                        ref={flatListRef}
                        ListHeaderComponent={() =>
                            (
                                <View style={{ marginTop: 16 }}>{''}</View>
                            ) as ReactElement<any>
                        }
                        data={chats}
                        keyExtractor={(item, index) =>
                            item?.chat?.slice(0, 6) + index
                        }
                        renderItem={({ item, index }) => (
                            <ChatCard
                                key={index}
                                chat={item}
                                index={index}
                                last_index={chats?.length - 1}
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
                        <BasicText
                            inputText="Press the Microphone Button to start a Conversation."
                            textSize={16}
                            width={250}
                            textAlign="center"
                        />
                    </View>
                )}
                <MicrophoneButton
                    microphoneSize={60}
                    marginBottom={10}
                    marginTop={2}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    onMicSend={send_message}
                    setMicText={setChat}
                    isRecording={isRecording}
                    setIsRecording={setIsRecording}
                />
            </KeyboardAvoidingView>
        </View>
    );
});

export default ConversationPage;

const styles = StyleSheet.create({
    conversation_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    c_header_cont: {
        height:
            Platform.OS === 'ios'
                ? screen_height_less_than({
                      if_true: 90,
                      if_false: 120,
                  })
                : 70,
        paddingLeft: 22,
        backgroundColor: Colors.Background,
        shadowColor:
            Platform.OS === 'ios'
                ? 'rgba(0 ,0 ,0 , 0.35)'
                : 'rgba(0 ,0 ,0 , 0.9)',
        shadowOffset: {
            width: 1,
            height: Platform.OS === 'ios' ? 1 : 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3.27,
        elevation: 3,
        flexDirection: 'row',
    },
});
