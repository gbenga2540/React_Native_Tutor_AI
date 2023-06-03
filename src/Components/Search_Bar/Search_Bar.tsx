import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { InputModeOptions, View, StyleSheet, TextInput } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import Feather from 'react-native-vector-icons/Feather';

interface SearchBarProps {
    inputValue: string;
    placeHolderText?: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    inputMode?: InputModeOptions;
    onFocus?: () => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
    inputValue,
    placeHolderText,
    setInputValue,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    inputMode,
    onFocus,
}) => {
    return (
        <View
            focusable
            style={[
                styles.s_b_main,
                {
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    marginLeft: marginLeft || 0,
                    marginRight: marginRight || 0,
                },
            ]}>
            <Feather
                name="search"
                color={Colors.DarkGrey}
                size={26}
                style={{
                    marginLeft: 13,
                    marginRight: 7,
                }}
            />
            <TextInput
                style={styles.s_b_m_ti}
                placeholder={placeHolderText || ''}
                placeholderTextColor={Colors.Grey}
                onChangeText={(text: string) => {
                    setInputValue(text);
                }}
                value={inputValue}
                autoCapitalize={'none'}
                autoCorrect={false}
                inputMode={inputMode || 'text'}
                onFocus={() => onFocus !== undefined && (onFocus() as unknown)}
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    s_b_main: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 56,
        borderRadius: 12,
        borderColor: Colors.Border,
        borderWidth: 1,
        marginLeft: 22,
        backgroundColor: Colors.SearchBarBG,
        flex: 1,
    },
    s_b_m_ti: {
        flex: 1,
        fontFamily: fonts.Urbanist_500,
        fontSize: 18,
        height: 56,
        marginRight: 18,
        textAlignVertical: 'center',
        color: Colors.Dark,
    },
});
