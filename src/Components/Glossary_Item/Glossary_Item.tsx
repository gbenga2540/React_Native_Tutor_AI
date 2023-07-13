import React, { FunctionComponent, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BasicText from '../Basic_Text/Basic_Text';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import TextDivider from '../Text_Divider/Text_Divider';
import TranscribeIcon from '../../Images/SVGs/Transcribe_Icon.svg';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import { SpeechControllerStore } from '../../MobX/Speech_Controller/Speech_Controller';
import { observer } from 'mobx-react';

interface GlossaryItemProps {
    word: string;
    meaning: string;
    translation: string;
    example: string;
    lastWordInit?: string;
    index: number | null;
}
const GlossaryItem: FunctionComponent<GlossaryItemProps> = observer(
    ({ word, meaning, translation, example, lastWordInit, index }) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);

        const transcribe_text = no_double_clicks({
            execFunc: () => {
                TextToSpeechStore.play_speech({
                    speech: `
                Word:
                ${word}

                Meaning:
                ${meaning}

                Example:
                ${example}
                `,
                    isMale: AvatarVoiceStore.is_avatar_male,
                    femaleVoice: AvatarVoiceStore.avatar_female_voice,
                    maleVoice: AvatarVoiceStore.avatar_male_voice,
                    speechRate: SpeechControllerStore.rate,
                });
            },
        });

        return (
            <View>
                {(index === 0 || word?.[0] !== lastWordInit) && (
                    <View
                        style={{
                            backgroundColor: Colors.Primary,
                            height: 53,
                            justifyContent: 'center',
                            borderRadius: 10,
                            marginBottom: 20,
                            marginTop: index !== 0 ? 10 : 0,
                        }}>
                        <BasicText
                            inputText={word?.[0]?.toUpperCase()}
                            textColor={Colors.White}
                            marginLeft={20}
                            textSize={28}
                            textWeight={700}
                        />
                    </View>
                )}
                <TouchableOpacity
                    onPress={no_double_clicks({
                        execFunc: () => {
                            setIsOpen(!isOpen);
                        },
                    })}
                    activeOpacity={0.5}>
                    {!isOpen && (
                        <BasicText
                            inputText={word}
                            marginBottom={20}
                            marginLeft={10}
                        />
                    )}
                    {isOpen && (
                        <View
                            style={{
                                marginHorizontal: 10,
                                marginBottom: 30,
                                marginTop: 10,
                            }}>
                            <BasicText inputText={word} />
                            <TextDivider singleLine marginTop={1} />
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <View style={{ flex: 1 }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 7,
                                        }}>
                                        <BasicText
                                            inputText={'Translation: '}
                                            textSize={15}
                                            textWeight={600}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <BasicText
                                                inputText={translation}
                                                textSize={14}
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 7,
                                        }}>
                                        <BasicText
                                            inputText={'Meaning: '}
                                            textSize={15}
                                            textWeight={600}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <BasicText
                                                inputText={meaning}
                                                textSize={14}
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 7,
                                        }}>
                                        <BasicText
                                            inputText={'Example: '}
                                            textSize={15}
                                            textWeight={600}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <BasicText
                                                inputText={example}
                                                textSize={14}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{ marginTop: 7 }}
                                    activeOpacity={0.5}
                                    onPress={transcribe_text}>
                                    <TranscribeIcon width={30} height={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        );
    },
);

export default GlossaryItem;
