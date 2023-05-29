import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { observer } from 'mobx-react';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { INTF_Test2Answers } from '../../Interface/Test_2_Answers/Test_2_Answers';

interface TestRadioButtonProps {
        option: string;
        marginTop?: number | string;
        marginBottom?: number | string;
        marginLeft?: number | string;
        marginRight?: number | string;
        buttonHeight?: number;
        buttonWidth?: number;
        isSelected: boolean;
        answers?: INTF_Test2Answers;
        setAnswers?: Dispatch<SetStateAction<INTF_Test2Answers>>;
}
const TestRadioButton: FunctionComponent<TestRadioButtonProps> = observer(({ option, marginTop, marginBottom, marginLeft, marginRight, buttonHeight, buttonWidth, isSelected, answers, setAnswers }) => {
        const exec_func = no_double_clicks({
                execFunc: () => {
                        if (!isSelected) {
                                if (!answers?.a) {
                                        setAnswers &&
                                                setAnswers({
                                                        a: option,
                                                        b: null,
                                                        c: null,
                                                        d: null,
                                                });
                                } else if (answers?.a && !answers?.b) {
                                        setAnswers &&
                                                setAnswers({
                                                        ...answers,
                                                        b: option,
                                                });
                                } else if (answers?.a && answers?.b && !answers?.c) {
                                        setAnswers &&
                                                setAnswers({
                                                        ...answers,
                                                        c: option,
                                                });
                                } else if (answers?.a && answers?.b && answers?.c && !answers?.d) {
                                        setAnswers &&
                                                setAnswers({
                                                        ...answers,
                                                        d: option,
                                                });
                                } else if (answers?.a && answers?.b && answers?.c && answers?.d) {
                                }
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
                                        {
                                                borderColor: isSelected ? Colors.Primary : Colors.Grey,
                                                backgroundColor: isSelected ? Colors.Primary : undefined,
                                        },
                                        buttonHeight
                                                ? {
                                                          height: buttonHeight,
                                                  }
                                                : {},
                                        buttonWidth ? { width: buttonWidth } : {},
                                ]}>
                                <Text
                                        style={[
                                                styles.tb_m_txt,
                                                {
                                                        color: isSelected ? Colors.White : Colors.Dark,
                                                },
                                        ]}>
                                        {option}
                                </Text>
                        </TouchableOpacity>
                </View>
        );
});

export default TestRadioButton;

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
                fontSize: 17,
        },
});
