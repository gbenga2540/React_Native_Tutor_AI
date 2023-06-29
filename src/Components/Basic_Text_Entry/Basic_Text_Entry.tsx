import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import {
    InputModeOptions,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
} from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { INTF_AutoComplete } from '../../Interface/Auto_Complete/Auto_Complete';

interface BasicTextEntryProps {
    inputValue: string;
    placeHolderText?: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginHorizontal?: number | 'auto';
    inputMode?: InputModeOptions;
    onFocus?: () => void;
    onChange?: () => void;
    autoFocus?: boolean;
    editable?: boolean;
    textColor?: string;
    maxLength?: number;
    height?: number;
    textMarginHor?: number;
    autoComplete?: INTF_AutoComplete;
}

const BasicTextEntry: FunctionComponent<BasicTextEntryProps> = ({
    inputValue,
    placeHolderText,
    setInputValue,
    marginTop,
    marginBottom,
    marginHorizontal,
    inputMode,
    onFocus,
    onChange,
    autoFocus,
    editable,
    textColor,
    maxLength,
    height,
    textMarginHor,
    autoComplete,
}) => {
    return (
        <KeyboardAvoidingView
            style={[
                styles.s_t_e_main,
                {
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    marginHorizontal: marginHorizontal || 22,
                    height: height || 56,
                },
            ]}>
            <TextInput
                style={[
                    styles.s_t_e_m_ti,
                    {
                        color: textColor || Colors.Dark,
                        height: height || 56,
                        marginHorizontal: textMarginHor || 18,
                    },
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
                onFocus={() => onFocus !== undefined && (onFocus() as unknown)}
                autoFocus={autoFocus || false}
                editable={editable === false ? false : true}
                maxLength={maxLength}
                autoComplete={autoComplete || undefined}
            />
        </KeyboardAvoidingView>
    );
};

export default BasicTextEntry;

const styles = StyleSheet.create({
    s_t_e_main: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 8,
        borderColor: Colors.Border,
        borderWidth: 1,
        backgroundColor: Colors.InputBackground,
    },
    s_t_e_m_ti: {
        flex: 1,
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
        textAlignVertical: 'center',
        borderWidth: 0,
    },
});
