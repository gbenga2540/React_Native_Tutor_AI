import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { screen_width_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

interface BasicTextProps {
    inputText: string;
    textWeight?: 300 | 400 | 500 | 600 | 700;
    textFamily?: string;
    textSize?: number;
    textColor?: string;
    backgroundColor?: string;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    textAlign?: 'auto' | 'center' | 'left' | 'right' | 'justify';
    width?: number;
}
const BasicText: FunctionComponent<BasicTextProps> = ({
    inputText,
    textWeight,
    textFamily,
    textSize,
    textColor,
    backgroundColor,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    textAlign,
    width,
}) => {
    return (
        <Text
            style={
                textFamily
                    ? {
                          fontFamily: textFamily,
                          color: textColor || Colors.Dark,
                          marginLeft: marginLeft || 0,
                          marginRight: marginRight || 0,
                          marginTop: marginTop || 0,
                          marginBottom: marginBottom || 0,
                          fontSize: screen_width_less_than({
                              if_true: (textSize || 14) - 2,
                              if_false: textSize || 14,
                          }),
                          backgroundColor: backgroundColor || undefined,
                          textAlign: textAlign || 'auto',
                          width: width || undefined,
                          maxWidth: width || undefined,
                      }
                    : {
                          fontFamily:
                              textWeight === 700
                                  ? fonts.Urbanist_700
                                  : textWeight === 600
                                  ? fonts.Urbanist_600
                                  : fonts.Urbanist_500,
                          color: textColor || Colors.Dark,
                          marginLeft: marginLeft || 0,
                          marginRight: marginRight || 0,
                          marginTop: marginTop || 0,
                          marginBottom: marginBottom || 0,
                          fontSize: screen_width_less_than({
                              if_true: (textSize || 14) - 2,
                              if_false: textSize || 14,
                          }),
                          backgroundColor: backgroundColor || undefined,
                          textAlign: textAlign || 'auto',
                          width: width || undefined,
                          maxWidth: width || undefined,
                      }
            }>
            {inputText || ''}
        </Text>
    );
};

export default BasicText;
