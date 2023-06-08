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
import { KeyboardStore } from '../../MobX/Keyboard/Keyboard';
import BackButton from '../../Components/Back_Button/Back_Button';
import TextButton from '../../Components/Text_Button/Text_Button';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const PreTestPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
        ]);
    }, []);

    useEffect(() => {
        const first_timer = setTimeout(() => {
            flatListRef.current !== null && flatListRef.current?.scrollToEnd();
        }, 100);
        if (Keyboard.isVisible()) {
            Keyboard.dismiss();
        }
        return () => clearTimeout(first_timer);
    }, [chats]);

    return (
        <View style={styles.pre_test_main}>
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
                <BackButton />
                <TextButton
                    buttonText="Skip"
                    marginLeft={'auto'}
                    marginRight={5}
                    isFontLight
                    execFunc={no_double_clicks({
                        execFunc: () => {
                            navigation.push(
                                'AuthStack' as never,
                                {
                                    screen: 'OnboardingPage',
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
                    marginLeft={12}
                    marginRight={12}
                    paddingBottom={7}
                    // marginBottom={
                    //     Platform.OS === 'ios'
                    //         ? KeyboardStore.keyboard_active
                    //             ? 1
                    //             : screen_height_less_than({
                    //                   if_false: 35,
                    //                   if_true: 20,
                    //               })
                    //         : KeyboardStore.keyboard_active
                    //         ? screen_height_less_than({
                    //               if_true: 7,
                    //               if_false: 30,
                    //           })
                    //         : 8
                    // }
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
                            setMicText('');
                            Keyboard.isVisible() && Keyboard.dismiss();
                        },
                    })}
                />
            </KeyboardAvoidingView>
        </View>
    );
});

export default PreTestPage;

const styles = StyleSheet.create({
    pre_test_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
