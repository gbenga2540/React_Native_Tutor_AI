import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import { DebouncedFuncLeading } from 'lodash';

interface BasicButton2Props {
    buttonHeight?: number | string;
    buttonText: string;
    marginTop?: number | string;
    marginBottom?: number | string;
    borderRaduis?: number;
    marginHorizontal?: number;
    paddingHorizontal?: number;
    execFunc: DebouncedFuncLeading<() => void>;
    disabled?: boolean;
    backgroundColor?: string;
}

const BasicButton2: FunctionComponent<BasicButton2Props> = ({
    buttonHeight,
    buttonText,
    marginTop,
    marginBottom,
    borderRaduis,
    marginHorizontal,
    paddingHorizontal,
    execFunc,
    disabled,
    backgroundColor,
}) => {
    return (
        <TouchableOpacity
            disabled={disabled || false}
            onPress={execFunc}
            style={[
                styles.b_b_main,
                {
                    height: buttonHeight || 40,
                    minHeight: buttonHeight || 40,
                    maxHeight: buttonHeight || 40,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    borderRadius: borderRaduis || 10,
                    marginHorizontal: marginHorizontal || 0,
                    paddingHorizontal: paddingHorizontal || 10,
                    borderColor: backgroundColor || Colors().Dark,
                    borderWidth: 1,
                },
            ]}
            activeOpacity={0.65}>
            <Text style={[styles.b_b_m_txt, { color: Colors().Dark }]}>
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
