import React, { FunctionComponent } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import { DebouncedFuncLeading } from 'lodash';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

interface BasicButton2Props {
    buttonHeight?: number | string;
    buttonText: string;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    borderRadius?: number;
    marginHorizontal?: number | 'auto';
    paddingHorizontal?: number;
    execFunc: DebouncedFuncLeading<() => void>;
    disabled?: boolean;
    backgroundColor?: string;
    textColor?: string;
}

const BasicButton2: FunctionComponent<BasicButton2Props> = ({
    buttonHeight,
    buttonText,
    marginTop,
    marginBottom,
    borderRadius,
    marginHorizontal,
    paddingHorizontal,
    execFunc,
    disabled,
    backgroundColor,
    textColor,
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
                    height: buttonHeight || 40,
                    minHeight: buttonHeight || 40,
                    maxHeight: buttonHeight || 40,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    borderRadius: borderRadius || 10,
                    marginHorizontal: marginHorizontal || 0,
                    paddingHorizontal: paddingHorizontal || 10,
                    borderColor: backgroundColor || Colors.Dark,
                    borderWidth: 1,
                },
            ]}
            activeOpacity={0.65}>
            <Text
                style={[styles.b_b_m_txt, { color: textColor || Colors.Dark }]}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

export default BasicButton2;

const styles = StyleSheet.create({
    b_b_main: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    b_b_m_txt: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 16,
    },
});
