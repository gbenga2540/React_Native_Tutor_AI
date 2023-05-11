import React, { FunctionComponent } from 'react';
import {
    FlexAlignType,
    Keyboard,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { DebouncedFuncLeading } from 'lodash';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

interface TextButtonProps {
    buttonText: string;
    textColor?: string;
    marginLeft?: number | string;
    marginRight?: number | string;
    marginTop?: number | string;
    marginBottom?: number | string;
    isFontLight?: boolean;
    execFunc: DebouncedFuncLeading<() => void>;
    disabled?: boolean;
    fontSize?: number;
    alignItems?: FlexAlignType;
}

const TextButton: FunctionComponent<TextButtonProps> = ({
    buttonText,
    textColor,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    isFontLight,
    execFunc,
    disabled,
    fontSize,
    alignItems,
}) => {
    const exec_func = no_double_clicks({
        execFunc: () => {
            Keyboard.dismiss();
            execFunc();
        },
    });

    return (
        <TouchableOpacity
            disabled={disabled || false}
            activeOpacity={0.65}
            onPress={exec_func}
            style={[
                styles.t_b_main,
                {
                    marginLeft: marginLeft || 0,
                    marginRight: marginRight || 0,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    alignItems: alignItems || 'center',
                },
            ]}>
            <Text
                style={[
                    styles.t_b_m_txt,
                    {
                        color: textColor || Colors().Primary,
                        fontFamily: isFontLight
                            ? fonts.Urbanist_600
                            : fonts.Urbanist_700,
                        fontSize: fontSize || 15,
                    },
                ]}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

export default TextButton;

const styles = StyleSheet.create({
    t_b_main: {
        // alignItems: 'center',
    },
    t_b_m_txt: {
        fontSize: 16,
    },
});
