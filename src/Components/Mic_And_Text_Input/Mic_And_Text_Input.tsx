import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useState,
} from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    InputModeOptions,
    View,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { DebouncedFuncLeading } from 'lodash';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import Feather from 'react-native-vector-icons/Feather';
import { fonts } from '../../Configs/Fonts/Fonts';
import MicrophoneButton from '../Microphone_Button/Microphone_Button';

interface MicAndTextInputProps {
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    paddingTop?: number | string;
    paddingBottom?: number | string;
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    marginHorizontal?: number | 'auto';
    inputValue: string;
    placeHolderText?: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    inputMode?: InputModeOptions;
    onFocus?: DebouncedFuncLeading<() => void>;
    onChange?: DebouncedFuncLeading<() => void>;
    onSend?: DebouncedFuncLeading<() => void>;
    autoFocus?: boolean;
    editable?: boolean;
    textColor?: string;
}

const MicAndTextInput: FunctionComponent<MicAndTextInputProps> = ({
    marginTop,
    marginBottom,
    paddingTop,
    paddingBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    inputValue,
    placeHolderText,
    setInputValue,
    inputMode,
    onFocus,
    onChange,
    onSend,
    autoFocus,
    editable,
    textColor,
}) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    marginLeft: marginLeft || 0,
                    marginRight: marginRight || 0,
                    marginHorizontal: marginHorizontal || 0,
                    backgroundColor: Colors.Background,
                    paddingTop: paddingTop || 0,
                    paddingBottom: paddingBottom || 0,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        minHeight: 56,
                        maxHeight: 110,
                        borderRadius: 8,
                        borderColor: Colors.Border,
                        borderWidth: 1,
                        backgroundColor: Colors.InputBackground,
                        flex: 1,
                        marginRight: 10,
                        marginBottom: 2,
                    }}>
                    <TextInput
                        style={[
                            styles.s_t_e_m_ti,
                            { color: textColor || Colors.Dark },
                        ]}
                        placeholder={placeHolderText || ''}
                        placeholderTextColor={Colors.Grey}
                        onChangeText={(text: string) => {
                            setInputValue(text);
                            onChange !== undefined && (onChange() as unknown);
                        }}
                        value={inputValue}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        inputMode={inputMode || 'text'}
                        onFocus={() =>
                            onFocus !== undefined && (onFocus() as unknown)
                        }
                        autoFocus={autoFocus || false}
                        editable={editable === false ? false : true}
                        multiline
                    />
                </View>
                <View
                    style={{
                        justifyContent: 'flex-end',
                    }}>
                    {!isRecording && inputValue ? (
                        <TouchableOpacity
                            onPress={() => onSend !== undefined && onSend()}
                            activeOpacity={0.55}
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 56,
                                backgroundColor: Colors.Primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Feather
                                name="send"
                                size={24}
                                color={Colors.White}
                            />
                        </TouchableOpacity>
                    ) : (
                        <MicrophoneButton
                            microphoneSize={56}
                            onMicSend={no_double_clicks({
                                execFunc: () =>
                                    onSend !== undefined && onSend(),
                            })}
                            setMicText={setInputValue}
                            isRecording={isRecording}
                            setIsRecording={setIsRecording}
                        />
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default MicAndTextInput;

const styles = StyleSheet.create({
    pressable: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.LightPrimary,
    },
    background: {
        backgroundColor: Colors.Primary,
        position: 'absolute',
    },
    s_t_e_m_ti: {
        flex: 1,
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        marginHorizontal: 18,
        borderWidth: 0,
        marginVertical: 2,
    },
});
