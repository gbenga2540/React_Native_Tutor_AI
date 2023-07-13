import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Platform,
    Text,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import TextButton from '../../Components/Text_Button/Text_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import TranslateIcon from '../../Images/SVGs/Translate_Icon.svg';
import TranscribeIcon from '../../Images/SVGs/Transcribe_Icon.svg';
import { fonts } from '../../Configs/Fonts/Fonts';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import Feather from 'react-native-vector-icons/Feather';
import { useMutation } from 'react-query';
import { gpt_request } from '../../Configs/Queries/Chat/Chat';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { INTF_Glossary } from '../../Interface/Glossary/Glossary';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';
import SInfo from 'react-native-sensitive-info';
import { SECURE_STORAGE_GLOSSARY, SECURE_STORAGE_NAME } from '@env';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import { SpeechControllerStore } from '../../MobX/Speech_Controller/Speech_Controller';

const VocabularyPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [showTranslated, setShowTranslated] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [vocabulary, setVocabulary] = useState<INTF_Glossary[]>([]);
    const [vocIndex, setVocIndex] = useState<number>(0);

    const GPT_PROMPT = `
    Act as a Dictionary such as an Oxford Dictionary:

    To generate a list of 10 words with definitions and translations, please use the following format for each word:

    %w0% [Word in English] %w0%
    %m0% [Meaning of the word in English] %m0%
    %e0% [Example of the Usage of the Word in English] %e0%
    %t0% [Translation of the word in ${UserInfoStore?.user_info?.language}] %t0%

    ...

    %w9% [Word in English] %w9%
    %m9% [Meaning of the word in English] %m9%
    %e9% [Example of the Usage of the Word in English] %e9%
    %t9% [Translation of the word in ${UserInfoStore?.user_info?.language}] %t9%

    Please ensure that you replace the placeholders [Word in English], [Meaning of the word in English], [Example of the Usage of the Word in English], and [Translation of the word in ${UserInfoStore?.user_info?.language}] with the actual word, its meaning, and its translation, respectively. Also, make sure that the IDs %w0%, %m0%, %e0%, %t0%, %w1%, %m1%, %e1%, %t1%, etc. are correctly incremented for each word.
    `;

    const text_to_array_1 = ({
        text_data,
    }: {
        text_data: string;
    }): INTF_Glossary[] => {
        const regex =
            /^%w\d+% [^\n]+ %w\d+%[\r\n]+%m\d+% [^\n]+ %m\d+%[\r\n]+%e\d+% [^\n]+ %e\d+%[\r\n]+%t\d+% [^\n]+ %t\d+%$/gm;

        if (regex.test(text_data)) {
            const lines = text_data.trim().split('\n');
            const result = [];

            for (let i = 0; i < lines.length; i += 5) {
                const word = lines[i].replace(/%w\d+%/g, '').trim();
                const meaning = lines[i + 1].replace(/%m\d+%/g, '').trim();
                const example = lines[i + 2].replace(/%e\d+%/g, '').trim();
                const translation = lines[i + 3].replace(/%t\d+%/g, '').trim();
                const entry = {
                    word,
                    meaning,
                    example,
                    translation,
                };
                result.push(entry);
            }
            return result || [];
        } else {
            return [];
        }
    };

    const text_to_array_2 = ({
        text_data,
    }: {
        text_data: string;
    }): INTF_Glossary[] => {
        const regex_form =
            /%w\d%\s(.*?)\s%w\d%\n%m\d%\s(.*?)\s%m\d%\n%e\d%\s(.*?)\s%e\d%\n%t\d%\s(.*?)\s%t\d%/g;
        const data = [];
        let match;
        while ((match = regex_form.exec(text_data)) !== null) {
            const word = match[1];
            const meaning = match[2];
            const example = match[3];
            const translation = match[4];
            data.push({ word, meaning, example, translation });
        }
        return data || [];
    };

    const update_glossary = ({
        glossary,
        all_glossary,
    }: {
        glossary: INTF_Glossary[];
        all_glossary: INTF_Glossary[];
    }): INTF_Glossary[] => {
        const updated_glossary: INTF_Glossary[] = [...all_glossary];

        for (const obj of glossary) {
            if (!all_glossary.find(item => item.word === obj.word)) {
                updated_glossary.push(obj);
            }
        }

        return updated_glossary;
    };

    const save_glossary_data = async ({
        s_g_data,
    }: {
        s_g_data: INTF_Glossary[];
    }) => {
        try {
            await SInfo.setItem(
                SECURE_STORAGE_GLOSSARY,
                JSON.stringify([...s_g_data]),
                {
                    sharedPreferencesName: SECURE_STORAGE_NAME,
                    keychainService: SECURE_STORAGE_NAME,
                },
            );
        } catch (error) {}
    };

    const save_glossary = async ({ data }: { data: INTF_Glossary[] }) => {
        try {
            await SInfo.getItem(SECURE_STORAGE_GLOSSARY, {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            })
                .catch(() => {
                    save_glossary_data({ s_g_data: [...data] });
                })
                .then(async res => {
                    if (res) {
                        const json_res: INTF_Glossary[] = JSON.parse(res);
                        if (json_res?.length > 0) {
                            const new_glossary = update_glossary({
                                glossary: data,
                                all_glossary: json_res,
                            });
                            save_glossary_data({ s_g_data: [...new_glossary] });
                        } else {
                            save_glossary_data({ s_g_data: [...data] });
                        }
                    } else {
                        save_glossary_data({ s_g_data: [...data] });
                    }
                });
        } catch (error) {
            save_glossary_data({ s_g_data: [...data] });
        }
    };

    const { mutate: gpt_req_mutate } = useMutation(gpt_request, {
        onMutate: () => {
            setShowSpinner(true);
        },
        onSettled: async data => {
            if (data?.error) {
                setShowSpinner(false);
                error_handler({
                    navigation: navigation,
                    error_mssg:
                        'An error occured while trying generate Vocabulary Data!',
                });
            } else {
                setShowSpinner(false);
                const gpt_res: string = data?.data?.chat_res;

                try {
                    const convert_1 =
                        text_to_array_1({ text_data: gpt_res }) || [];
                    if (convert_1?.length > 0) {
                        setVocabulary(convert_1);
                        save_glossary({ data: convert_1 });
                    } else {
                        const convert_2 =
                            text_to_array_2({ text_data: gpt_res }) || [];
                        if (convert_2?.length > 0) {
                            setVocabulary(convert_2);
                            save_glossary({ data: convert_2 });
                        }
                    }
                } catch (err) {}
            }
        },
    });

    const prev_vocabulary = no_double_clicks({
        execFunc: () => {
            setVocIndex(
                clamp_value({
                    value: vocIndex - 1,
                    minValue: 0,
                    maxValue: vocabulary?.length - 1,
                }),
            );
        },
    });

    const next_vocabulary = no_double_clicks({
        execFunc: () => {
            setVocIndex(
                clamp_value({
                    value: vocIndex + 1,
                    minValue: 0,
                    maxValue: vocabulary?.length - 1,
                }),
            );
        },
    });

    const translate_text = no_double_clicks({
        execFunc: () => {
            setShowTranslated(!showTranslated);
        },
    });

    const transcribe_text = no_double_clicks({
        execFunc: () => {
            TextToSpeechStore.play_speech({
                speech: `
                Word:
                ${vocabulary[vocIndex]?.word}

                Meaning:
                ${vocabulary[vocIndex]?.meaning}

                Example:
                ${vocabulary[vocIndex]?.example}
                `,
                isMale: AvatarVoiceStore.is_avatar_male,
                femaleVoice: AvatarVoiceStore.avatar_female_voice,
                maleVoice: AvatarVoiceStore.avatar_male_voice,
                speechRate: SpeechControllerStore.rate,
            });
        },
    });

    const regenerate_voc = no_double_clicks({
        execFunc: () => {
            gpt_req_mutate({
                messages: [
                    {
                        role: 'user',
                        content: GPT_PROMPT,
                    },
                ],
            });
        },
    });

    useEffect(() => {
        gpt_req_mutate({
            messages: [
                {
                    role: 'user',
                    content: GPT_PROMPT,
                },
            ],
        });
    }, [gpt_req_mutate, GPT_PROMPT]);

    return (
        <View style={styles.report_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
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
                <BackButton
                    execFunc={() => {
                        TextToSpeechStore.clear_speech();
                        navigation.goBack();
                    }}
                />
                <BasicText
                    inputText="Vocabulary"
                    textSize={20}
                    marginLeft={15}
                    textWeight={700}
                />
            </View>
            <ScrollView
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingTop: 30,
                    marginHorizontal: 2,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <BasicText inputText="Learn New Words" textSize={15} />
                    <TextButton
                        buttonText="View Glossary"
                        execFunc={no_double_clicks({
                            execFunc: () => {
                                navigation.push(
                                    'HomeStack' as never,
                                    { screen: 'GlossaryPage' } as never,
                                );
                            },
                        })}
                    />
                </View>
                {vocabulary?.length > 0 ? (
                    <View
                        style={{
                            marginTop: 22,
                            backgroundColor: Colors.Primary,
                            borderRadius: 20,
                            minHeight: 360,
                            padding: 10,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <BasicText
                                inputText="Translate"
                                textSize={15}
                                textColor={Colors.White}
                            />
                            <BasicText
                                inputText="Transcript"
                                textSize={15}
                                textColor={Colors.White}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 16,
                                marginRight: 16,
                                marginTop: 5,
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={translate_text}>
                                <TranslateIcon width={30} height={30} />
                            </TouchableOpacity>
                            <View
                                style={{
                                    backgroundColor: Colors.White,
                                    width: 70,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 7,
                                    borderWidth: 3,
                                    borderColor: Colors.DarkBorder,
                                }}>
                                <BasicText
                                    inputText={
                                        vocabulary?.length === 0
                                            ? '0'
                                            : `${vocIndex + 1} of ${
                                                  vocabulary?.length
                                              }`
                                    }
                                    textWeight={600}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={transcribe_text}>
                                <TranscribeIcon width={30} height={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <TouchableOpacity
                                onPress={prev_vocabulary}
                                activeOpacity={0.55}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                }}>
                                <Feather
                                    name="chevron-left"
                                    size={30}
                                    color={Colors.White}
                                />
                            </TouchableOpacity>
                            {vocabulary?.length > 0 ? (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                    }}>
                                    <BasicText
                                        inputText={
                                            vocabulary[
                                                vocIndex
                                            ]?.word?.toUpperCase() || ''
                                        }
                                        textSize={18}
                                        marginTop={showTranslated ? 20 : 0.1}
                                        textColor={Colors.White}
                                        textWeight={700}
                                        textAlign="center"
                                    />
                                    {showTranslated && (
                                        <View>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        fonts.Urbanist_600,
                                                    fontSize: 15,
                                                    color: Colors.White,
                                                    textAlign: 'center',
                                                    marginTop: 20,
                                                    marginBottom: 10,
                                                    marginHorizontal: 20,
                                                }}>
                                                {'Meaning: '}
                                                <BasicText
                                                    inputText={
                                                        vocabulary[vocIndex]
                                                            ?.meaning || ''
                                                    }
                                                    textColor={Colors.White}
                                                    textSize={14}
                                                    textWeight={500}
                                                />
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        fonts.Urbanist_600,
                                                    fontSize: 15,
                                                    color: Colors.White,
                                                    textAlign: 'center',
                                                    marginHorizontal: 20,
                                                }}>
                                                {'Example: '}
                                                <BasicText
                                                    inputText={
                                                        vocabulary[vocIndex]
                                                            ?.example || ''
                                                    }
                                                    textColor={Colors.White}
                                                    textSize={14}
                                                    textWeight={500}
                                                />
                                            </Text>
                                            <TextDivider
                                                singleLine
                                                marginTop={20}
                                                marginBottom={20}
                                                marginHorizontal={10}
                                            />
                                            <BasicText
                                                inputText={
                                                    vocabulary[vocIndex]
                                                        ?.translation || ''
                                                }
                                                textSize={18}
                                                textColor={Colors.White}
                                                textWeight={700}
                                                textAlign="center"
                                                marginBottom={20}
                                            />
                                        </View>
                                    )}
                                </View>
                            ) : (
                                <View style={{ flex: 1 }}>{''}</View>
                            )}
                            <TouchableOpacity
                                onPress={next_vocabulary}
                                activeOpacity={0.55}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                }}>
                                <Feather
                                    name="chevron-right"
                                    size={30}
                                    color={Colors.White}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <BasicText
                            inputText="Loading..."
                            marginTop={200}
                            textWeight={600}
                        />
                    </View>
                )}
                <View style={{ marginBottom: 50 }}>{''}</View>
            </ScrollView>
            <BasicButton
                execFunc={() => regenerate_voc({})}
                buttonText="Re-Generate"
                borderRadius={8}
                marginHorizontal={22}
                buttonHeight={56}
                marginTop={30}
                marginBottom={
                    Platform.OS === 'ios'
                        ? screen_height_less_than({
                              if_false: 35,
                              if_true: 10,
                          })
                        : 20
                }
            />
        </View>
    );
};

export default VocabularyPage;

const styles = StyleSheet.create({
    report_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
