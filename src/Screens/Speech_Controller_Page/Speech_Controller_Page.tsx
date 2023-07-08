import React, { FunctionComponent, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicTextEntry from '../../Components/Basic_Text_Entry/Basic_Text_Entry';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { observer } from 'mobx-react';
import { SpeechControllerStore } from '../../MobX/Speech_Controller/Speech_Controller';
import { error_handler } from '../../Utils/Error_Handler/Error_Handler';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';

const SpeechControllerPage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [rate, setRate] = useState<string>('');
    const [pitch, setPitch] = useState<string>('');
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const save_speech_data = no_double_clicks({
        execFunc: () => {
            if (rate && pitch) {
                const p_rate = clamp_value({
                    value: parseInt(rate, 10),
                    minValue: 30,
                    maxValue: 130,
                });
                const p_pitch = clamp_value({
                    value: parseInt(pitch, 10),
                    minValue: 30,
                    maxValue: 130,
                });
                SpeechControllerStore.save_rate_pitch({
                    rate: p_rate,
                    pitch: p_pitch,
                });

                info_handler({
                    navigation: navigation,
                    success_mssg: `Speech Rate and Pitch set to ${p_rate} and ${p_pitch} respectively!.`,
                    proceed_type: 4,
                });
            } else {
                error_handler({
                    navigation: navigation,
                    error_mssg: 'Fields cannot be Empty!',
                });
            }
        },
    });

    return (
        <View style={styles.sc_main}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors.Background}
                backgroundDimColor={Colors.BackgroundDim}
            />
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
                    inputText="Speech Controller"
                    textSize={20}
                    textWeight={700}
                    marginLeft={10}
                />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <BasicText
                    inputText="Customize your Speech Settings"
                    textWeight={700}
                    textSize={30}
                    marginLeft={22}
                    marginBottom={20}
                    marginTop={30}
                />
                <BasicText
                    inputText="Speech Rate"
                    textWeight={500}
                    textSize={16}
                    marginLeft={22}
                    marginRight={22}
                    textColor={Colors.Grey}
                />
                <BasicTextEntry
                    placeHolderText={`Current Speech Rate: ${SpeechControllerStore.rate}`}
                    inputValue={rate}
                    setInputValue={setRate}
                    marginTop={6}
                    inputMode="text"
                    marginBottom={23}
                    autoComplete="off"
                />
                <BasicText
                    inputText="Speech Pitch"
                    textWeight={500}
                    textSize={16}
                    marginLeft={22}
                    marginRight={22}
                    textColor={Colors.Grey}
                />
                <BasicTextEntry
                    placeHolderText={`Current Speech Pitch: ${SpeechControllerStore.pitch}`}
                    inputValue={pitch}
                    setInputValue={setPitch}
                    marginTop={6}
                    inputMode="text"
                    marginBottom={18}
                    autoComplete="off"
                />
            </ScrollView>
            <KeyboardAvoidingView
                style={{ zIndex: 2 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <BasicButton
                    buttonText="Save Data"
                    borderRadius={8}
                    marginHorizontal={22}
                    execFunc={() => save_speech_data({})}
                    buttonHeight={56}
                    marginBottom={
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 10,
                                  if_false: 40,
                              })
                            : 20
                    }
                />
            </KeyboardAvoidingView>
            <Image
                source={require('../../Images/Extra/Arrow_Curves_2.png')}
                style={{
                    width: 306,
                    height: 262,
                    position: 'absolute',
                    bottom: -65,
                    left: -75,
                    transform: [{ scale: 0.5 }],
                    opacity: 0.25,
                }}
            />
        </View>
    );
});

export default SpeechControllerPage;

const styles = StyleSheet.create({
    sc_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
