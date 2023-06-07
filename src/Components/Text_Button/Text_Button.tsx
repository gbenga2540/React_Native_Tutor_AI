import React, { FunctionComponent } from 'react';
import { FlexAlignType, Keyboard, TouchableOpacity } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { DebouncedFuncLeading } from 'lodash';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicText from '../Basic_Text/Basic_Text';

interface TextButtonProps {
    buttonText: string;
    textColor?: string;
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
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
            activeOpacity={0.65}
            onPress={exec_func}
            style={{
                marginLeft: marginLeft || 0,
                marginRight: marginRight || 0,
                marginTop: marginTop || 0,
                marginBottom: marginBottom || 0,
                alignItems: alignItems || 'center',
            }}>
            <BasicText
                inputText={buttonText}
                textFamily={
                    isFontLight ? fonts.Urbanist_600 : fonts.Urbanist_700
                }
                textSize={fontSize || 15}
                textColor={textColor || Colors.Primary}
            />
        </TouchableOpacity>
    );
};

export default TextButton;
