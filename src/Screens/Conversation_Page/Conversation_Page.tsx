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
import MicAndTextInput from '../../Components/Mic_And_Text_Input/Mic_And_Text_Input';
import { observer } from 'mobx-react';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const ConversationPage: FunctionComponent = observer(() => {
    const [chats, setChats] = useState<INTF_Conversation[]>([]);
    const [micText, setMicText] = useState<string>('');
    const flatListRef = useRef<FlatList<any> | null>(null);

    useEffect(() => {
        setChats([
            {
                isAI: true,
                chat: 'Hello Oluwagbemiga, How’s life going?',
            },
            {
                isAI: false,
                chat: 'I am fine.',
            },
            {
                isAI: true,
                chat: 'Have you been paying close attention to your lectures both online and offline?',
            },
            {
                isAI: false,
                chat: 'I am fine.',
            },
            {
                isAI: true,
                chat: 'Hello, Dominion How’s life going?',
            },
            {
                isAI: false,
                chat: 'I am fine.',
            },
            {
                isAI: true,
                chat: 'Hello, Dominion How’s life going?',
            },
            {
                isAI: false,
                chat: 'I am fine.',
            },
            {
                isAI: true,
                chat: 'Hello, Dominion How’s life going?',
            },
            {
                isAI: false,
                chat: 'I am fine.',
            },
            {
                isAI: true,
                chat: 'Hello, Dominion How’s life going?',
            },
            {
                isAI: false,
                chat: 'I am fine.',
            },
        ]);
    }, []);

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
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
                    onSend={no_double_clicks({
                        execFunc: () => {
                            if (micText) {
                                setChats(prev_chats => [
                                    ...prev_chats,
                                    { isAI: false, chat: micText },
                                ]);
                            }
                            Keyboard.isVisible() && Keyboard.dismiss();
                            setMicText('');
                        },
                    })}
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
    },
});
