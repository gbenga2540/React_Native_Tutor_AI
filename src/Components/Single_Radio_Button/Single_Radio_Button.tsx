import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { observer } from 'mobx-react';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

interface SingleRadioButtonProps {
        option: string;
        marginTop?: number | string;
        marginBottom?: number | string;
        marginLeft?: number | string;
        marginRight?: number | string;
        index: number;
        answer: number | null;
        setAnswer: Dispatch<SetStateAction<number | null>>;
        buttonHeight?: number;
}
const SingleRadioButton: FunctionComponent<SingleRadioButtonProps> = observer(({ option, marginTop, marginBottom, marginLeft, marginRight, answer, setAnswer, index, buttonHeight }) => {
        const exec_func = no_double_clicks({
                execFunc: () => {
                        if (answer === index) {
                                setAnswer(null);
                        } else {
                                setAnswer(index);
                        }
                },
        });

        return (
                <View
                        style={{
                                marginTop: marginTop || 0,
                                marginBottom: marginBottom || 0,
                                marginLeft: marginLeft || 0,
                                marginRight: marginRight || 0,
                        }}>
                        <TouchableOpacity
                                onPress={exec_func}
                                style={[
                                        styles.tb_main,
                                        buttonHeight
                                                ? {
                                                          borderColor: answer === index ? Colors.Primary : Colors.Grey,
                                                          backgroundColor: answer === index ? Colors.Primary : undefined,
                                                          height: buttonHeight,
                                                  }
                                                : {
                                                          borderColor: answer === index ? Colors.Primary : Colors.Grey,
                                                          backgroundColor: answer === index ? Colors.Primary : undefined,
                                                  },
                                ]}>
                                <Text
                                        style={[
                                                styles.tb_m_txt,
                                                {
                                                        color: answer === index ? Colors.White : Colors.Dark,
                                                },
                                        ]}>
                                        {option}
                                </Text>
                        </TouchableOpacity>
                </View>
        );
});

export default SingleRadioButton;

const styles = StyleSheet.create({
        tb_main: {
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
        },
        tb_m_txt: {
                fontFamily: fonts.OpenSans_400,
                marginHorizontal: 8,
                marginVertical: 6,
                fontSize: 15,
        },
});
