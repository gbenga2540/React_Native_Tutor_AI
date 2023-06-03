import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';

interface TextDividerProps {
    text?: string;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginHorizontal?: number | 'auto';
    singleLine?: boolean;
    lineColor?: string;
    textColor?: string;
}

const TextDivider: FunctionComponent<TextDividerProps> = ({
    text,
    marginTop,
    marginBottom,
    marginHorizontal,
    singleLine,
    lineColor,
    textColor,
}) => {
    return (
        <View
            style={[
                styles.t_d_main,
                {
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    marginHorizontal: marginHorizontal || 0,
                    maxHeight: 10,
                },
            ]}>
            <View
                style={[
                    styles.t_d_lines,
                    {
                        borderColor: lineColor || Colors.TextDivider,
                    },
                ]}>
                {''}
            </View>
            {!singleLine && (
                <Text
                    style={[
                        styles.t_d_text,
                        {
                            color: textColor || Colors.TextDivider,
                        },
                    ]}>
                    {text || 'or'}
                </Text>
            )}
            {!singleLine && (
                <View
                    style={[
                        styles.t_d_lines,
                        {
                            borderColor: lineColor || Colors.TextDivider,
                        },
                    ]}>
                    {''}
                </View>
            )}
        </View>
    );
};

export default TextDivider;

const styles = StyleSheet.create({
    t_d_main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    t_d_lines: {
        flex: 1,
        borderBottomWidth: 1,
    },
    t_d_text: {
        marginHorizontal: 15,
        fontFamily: fonts.Urbanist_700,
        fontSize: 16,
        lineHeight: 32,
    },
});
