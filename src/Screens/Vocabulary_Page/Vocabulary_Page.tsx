import React, { FunctionComponent, useState } from 'react';
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

const VocabularyPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [showTranslated, setShowTranslated] = useState<boolean>(false);

    const next_vocabulary = no_double_clicks({
        execFunc: () => {},
    });

    const translate_text = no_double_clicks({
        execFunc: () => {
            setShowTranslated(!showTranslated);
        },
    });

    const transcribe_text = no_double_clicks({
        execFunc: () => {},
    });

    return (
        <View style={styles.report_main}>
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
                <View
                    style={{
                        marginTop: 22,
                        backgroundColor: Colors.Primary,
                        borderRadius: 20,
                        minHeight: 400,
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
                        }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={translate_text}>
                            <TranslateIcon width={30} height={30} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={transcribe_text}>
                            <TranscribeIcon width={30} height={30} />
                        </TouchableOpacity>
                    </View>
                    <BasicText
                        inputText="Accord"
                        textSize={18}
                        marginTop={20}
                        textColor={Colors.White}
                        textWeight={700}
                        textAlign="center"
                    />
                    <Text
                        style={{
                            fontFamily: fonts.Urbanist_600,
                            fontSize: 15,
                            color: Colors.White,
                            textAlign: 'center',
                            marginTop: 20,
                            marginBottom: 10,
                            marginHorizontal: 20,
                        }}>
                        {'Meaning: '}
                        <BasicText
                            inputText="concurrence of opinion"
                            textColor={Colors.White}
                            textSize={14}
                            textWeight={500}
                        />
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.Urbanist_600,
                            fontSize: 15,
                            color: Colors.White,
                            textAlign: 'center',
                            marginHorizontal: 20,
                        }}>
                        {'Example: '}
                        <BasicText
                            inputText="The committee worked in accord on the bill, and it
                            eventually passed."
                            textColor={Colors.White}
                            textSize={14}
                            textWeight={500}
                        />
                    </Text>
                    {showTranslated && (
                        <View>
                            <TextDivider
                                singleLine
                                marginTop={20}
                                marginBottom={20}
                                marginHorizontal={10}
                            />
                            <BasicText
                                inputText="Translated Text"
                                textSize={18}
                                textColor={Colors.White}
                                textWeight={700}
                                textAlign="center"
                                marginBottom={20}
                            />
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_600,
                                    fontSize: 15,
                                    color: Colors.White,
                                    textAlign: 'center',
                                    marginHorizontal: 20,
                                }}>
                                {'Meaning: '}
                                <BasicText
                                    inputText="concurrence of opinion"
                                    textColor={Colors.White}
                                    textSize={14}
                                    textWeight={500}
                                />
                            </Text>
                            <BasicText
                                inputText="Translated Text"
                                textSize={14}
                                textColor={Colors.White}
                                textWeight={500}
                                marginTop={10}
                                marginBottom={20}
                                textAlign="center"
                            />
                        </View>
                    )}
                </View>
                <View style={{ marginBottom: 50 }}>{''}</View>
            </ScrollView>
            <BasicButton
                execFunc={next_vocabulary}
                buttonText="Next"
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
