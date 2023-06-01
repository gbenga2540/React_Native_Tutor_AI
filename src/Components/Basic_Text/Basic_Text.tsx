import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';

interface BasicTextProps {
    inputText: string;
    textWeight?: 300 | 400 | 500 | 600 | 700;
    textFamily?: string;
    textSize?: number;
    textColor?: string;
    backgroundColor?: string;
    marginTop?: number | string;
    marginBottom?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    textAlign?: 'auto' | 'center' | 'left' | 'right' | 'justify';
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
                          fontSize: textSize || 14,
                          backgroundColor: backgroundColor || undefined,
                          textAlign: textAlign || 'auto',
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
                          fontSize: textSize || 14,
                          backgroundColor: backgroundColor || undefined,
                          textAlign: textAlign || 'auto',
                      }
            }>
            {inputText || ''}
        </Text>
    );
};

export default BasicText;
