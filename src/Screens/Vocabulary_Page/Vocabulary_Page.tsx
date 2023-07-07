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
import Feather from 'react-native-vector-icons/Feather';
import { useMutation } from 'react-query';
import { gpt_request } from '../../Configs/Queries/Chat/Chat';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { INTF_Glossary } from '../../Interface/Glossary/Glossary';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';

const VocabularyPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [showTranslated, setShowTranslated] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [vocabulary, setVocabulary] = useState<INTF_Glossary[]>([]);
    const [vocIndex, setVocIndex] = useState<number>(0);

    // const res = JSON.parse(
    //     '[{"word":"abandon","meaning":"to leave or give up completely","translation":"ይቅር"},{"word": "harmony","meaning":"agreement or concord", "translation": "ምርጫ" }]',
    // );
    // console.log(res);

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
                        'An error occured while trying get Vocabulary Data!',
                    svr_error_mssg: data?.data,
                });
            } else {
                setShowSpinner(false);
                const gpt_res: string = data?.data?.chat_res;
                const startIndex = gpt_res.indexOf('[');
                const endIndex = gpt_res.indexOf(']');

                if (startIndex !== -1 && endIndex !== -1) {
                    const trimmedString: string = gpt_res.substring(
                        startIndex,
                        endIndex + 1,
                    );

                    // console.log(JSON.stringify(gpt_res));
                }
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
        execFunc: () => {},
    });

    const generate_voc = no_double_clicks({
        execFunc: () => {
            gpt_req_mutate({
                messages: [
                    {
                        role: 'user',
                        content: `To enhance the learning experience for students studying English Language through your Tutor Application, you want to generate 10 random words from the English dictionary. Each word should be accompanied by its meaning and translation of the word only in ${
                            UserInfoStore?.user_info?.language || 'English - en'
                        } for example if we have 'abandon' as a word and 'to leave or give up completely' as the meaning of the word, the translation to be added will now be the translation of only the word 'abandon' .The desired format for each word in the Javascript array is as follows: { word: string; meaning: string; translation: string; }. Additionally, you mentioned that you would like to select the words randomly using Math.random and generate an ID for each word, you then use this ID to select the word from the English Dictionary.

                To achieve this, You will utilize the English Dictionary to randomly select 10 words. I will then assign a unique ID to each word using the ID to select the word from the English Dictionary. The final result will be returned in a JavaScript array format, adhering strictly to your requirements. No additional text or code will be included, only the array of words is expected.
                
                Please note that the translation from English to ${
                    UserInfoStore?.user_info?.language || 'English - en'
                } may not be available for all words in the dictionary, but I will include it whenever possible. Lastly, this is the most important rule. All 10 words must be generated fully by you and assign the array to a constant called vocabularies and there is no need to add the id to each objects of the array.`,
                    },
                ],
            });
        },
    });

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
                                    inputText="Accord"
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
                                        <TextDivider
                                            singleLine
                                            marginTop={20}
                                            marginBottom={20}
                                            marginHorizontal={10}
                                        />
                                        <BasicText
                                            inputText="Translated Version of (Accord)"
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
                <View style={{ marginBottom: 50 }}>{''}</View>
            </ScrollView>
            <BasicButton
                execFunc={() => generate_voc({})}
                buttonText="Generate"
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
