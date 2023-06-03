import React, { FunctionComponent } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { DebouncedFuncLeading } from 'lodash';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import Feather from 'react-native-vector-icons/Feather';

interface VoiceButtonProps {
    buttonSize?: number | string;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    marginHorizontal?: number | 'auto';
    borderRadius?: number;
    borderColor?: string;
    borderWidth?: number;
    execFunc: DebouncedFuncLeading<() => void>;
    disabled?: boolean;
    backgroundColor?: string;
    iconColor?: string;
}

const VoiceButton: FunctionComponent<VoiceButtonProps> = ({
    buttonSize,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    borderRadius,
    borderColor,
    borderWidth,
    execFunc,
    disabled,
    backgroundColor,
    iconColor,
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
                styles.v_b_main,
                {
                    height: buttonSize || 56,
                    minHeight: buttonSize || 56,
                    maxHeight: buttonSize || 56,
                    width: buttonSize || 56,
                    minWidth: buttonSize || 56,
                    maxWidth: buttonSize || 56,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    marginLeft: marginLeft || 0,
                    marginRight: marginRight || 0,
                    borderRadius: borderRadius || 10,
                    marginHorizontal: marginHorizontal || 0,
                    backgroundColor: backgroundColor || Colors.Background,
                    borderColor: borderColor || Colors.Grey,
                    borderWidth: borderWidth || 1,
                },
            ]}
            activeOpacity={0.65}>
            <Feather
                name="volume-2"
                color={iconColor || Colors.DarkGrey}
                size={22}
            />
        </TouchableOpacity>
    );
};

export default VoiceButton;

const styles = StyleSheet.create({
    v_b_main: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
