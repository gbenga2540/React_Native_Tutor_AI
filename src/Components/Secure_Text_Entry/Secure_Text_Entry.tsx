import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useState,
} from 'react';
import {
    InputModeOptions,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import Feather from 'react-native-vector-icons/Feather';

interface SecureTextEntryProps {
    inputValue: string;
    placeHolderText?: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginHorizontal?: number | 'auto';
    onFocus?: () => void;
    onChange?: () => void;
    inputMode?: InputModeOptions;
    autoFocus?: boolean;
    maxLength?: number;
}

const SecureTextEntry: FunctionComponent<SecureTextEntryProps> = ({
    inputValue,
    placeHolderText,
    setInputValue,
    marginTop,
    marginBottom,
    marginHorizontal,
    onFocus,
    onChange,
    inputMode,
    autoFocus,
    maxLength,
}) => {
    const [hidePswd, setHidePswd] = useState<boolean>(true);

    return (
        <KeyboardAvoidingView
            style={[
                styles.b_t_e_main,
                {
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    marginHorizontal: marginHorizontal || 22,
                },
            ]}>
            <TextInput
                style={[
                    styles.b_t_e_m_ti,
                    {
                        fontSize:
                            Platform.OS === 'ios'
                                ? 16
                                : hidePswd && inputValue?.length > 0
                                ? 20
                                : 16,
                    },
                ]}
                placeholder={placeHolderText || 'password'}
                inputMode={inputMode || 'text'}
                placeholderTextColor={Colors.Grey}
                onChangeText={(text: string) => {
                    setInputValue(text?.trim());
                    onChange !== undefined && (onChange() as unknown);
                }}
                value={inputValue}
                secureTextEntry={hidePswd}
                keyboardType="default"
                onFocus={() => onFocus !== undefined && (onFocus() as unknown)}
                autoFocus={autoFocus || false}
                maxLength={maxLength}
            />
            {hidePswd ? (
                <TouchableOpacity
                    activeOpacity={0.65}
                    onPress={() => setHidePswd(!hidePswd)}
                    style={{
                        marginRight: 18,
                        marginLeft: 5,
                    }}>
                    <Feather name="eye" size={25} color={Colors.DarkGrey} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.65}
                    onPress={() => setHidePswd(!hidePswd)}
                    style={{
                        marginRight: 18,
                        marginLeft: 5,
                    }}>
                    <Feather name="eye-off" size={25} color={Colors.DarkGrey} />
                </TouchableOpacity>
            )}
        </KeyboardAvoidingView>
    );
};

export default SecureTextEntry;

const styles = StyleSheet.create({
    b_t_e_main: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 56,
        borderRadius: 8,
        borderColor: Colors.Border,
        borderWidth: 1,
        backgroundColor: Colors.InputBackground,
    },
    b_t_e_m_ti: {
        flex: 1,
        maxWidth: '100%',
        fontFamily: fonts.Urbanist_500,
        height: 56,
        marginLeft: 18,
        textAlignVertical: 'center',
        letterSpacing: 0.2,
        color: Colors.Dark,
        borderWidth: 0,
    },
});
