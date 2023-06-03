import React, { FunctionComponent } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import { DebouncedFuncLeading } from 'lodash';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

interface BasicButtonProps {
    buttonHeight?: number | string;
    buttonText: string;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginHorizontal?: number | 'auto';
    borderRadius?: number;
    execFunc: DebouncedFuncLeading<() => void>;
    disabled?: boolean;
    backgroundColor?: string;
    textColor?: string;
    textSize?: number;
}

const BasicButton: FunctionComponent<BasicButtonProps> = ({
    buttonHeight,
    buttonText,
    marginTop,
    marginBottom,
    marginHorizontal,
    borderRadius,
    execFunc,
    disabled,
    backgroundColor,
    textColor,
    textSize,
}) => {
    const exec_func = no_double_clicks({
        execFunc: () => {
            if (Keyboard.isVisible()) {
                Keyboard.dismiss();
            }
            if (execFunc !== undefined) {
                execFunc();
            }
        },
    });

    return (
        <TouchableOpacity
            disabled={disabled || false}
            onPress={exec_func}
            style={[
                styles.b_b_main,
                {
                    height: buttonHeight || 56,
                    minHeight: buttonHeight || 56,
                    maxHeight: buttonHeight || 56,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    borderRadius: borderRadius || 10,
                    marginHorizontal: marginHorizontal || 0,
                    backgroundColor: backgroundColor || Colors.Primary,
                },
            ]}
            activeOpacity={0.65}>
            <Text
                style={[
                    styles.b_b_m_txt,
                    {
                        color: textColor || Colors.White,
                        fontSize: textSize || 14,
                    },
                ]}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

export default BasicButton;

const styles = StyleSheet.create({
    b_b_main: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    b_b_m_txt: {
        fontFamily: fonts.Urbanist_600,
        fontSize: 16,
    },
});
