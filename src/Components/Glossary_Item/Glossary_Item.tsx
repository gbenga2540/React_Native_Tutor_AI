import React, { FunctionComponent, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BasicText from '../Basic_Text/Basic_Text';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import TextDivider from '../Text_Divider/Text_Divider';

interface GlossaryItemProps {
    word: string;
    meaning: string;
    lastWordInit?: string;
    index: number | null;
}
const GlossaryItem: FunctionComponent<GlossaryItemProps> = ({
    word,
    meaning,
    lastWordInit,
    index,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                                marginTop: 7,
                            }}>
                            <BasicText
                                inputText={'Meaning: '}
                                textSize={15}
                                textWeight={600}
                            />
                            <View style={{ flex: 1 }}>
                                <BasicText inputText={meaning} textSize={14} />
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 7,
                            }}>
                            <BasicText
                                inputText={'Translated: '}
                                textSize={15}
                                textWeight={600}
                            />
                            <View style={{ flex: 1 }}>
                                <BasicText inputText={meaning} textSize={14} />
                            </View>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default GlossaryItem;
