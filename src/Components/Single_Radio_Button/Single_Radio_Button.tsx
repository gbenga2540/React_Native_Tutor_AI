import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { observer } from 'mobx-react';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicText from '../Basic_Text/Basic_Text';

interface SingleRadioButtonProps {
    option: string;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    index: number;
    answer: number | null;
    setAnswer: Dispatch<SetStateAction<number | null>>;
    buttonHeight?: number;
}
const SingleRadioButton: FunctionComponent<SingleRadioButtonProps> = observer(
    ({
        option,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        answer,
        setAnswer,
        index,
        buttonHeight,
    }) => {
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
                                  borderColor:
                                      answer === index
                                          ? Colors.Primary
                                          : Colors.Grey,
                                  backgroundColor:
                                      answer === index
                                          ? Colors.Primary
                                          : undefined,
                                  minHeight: buttonHeight,
                              }
                            : {
                                  borderColor:
                                      answer === index
                                          ? Colors.Primary
                                          : Colors.Grey,
                                  backgroundColor:
                                      answer === index
                                          ? Colors.Primary
                                          : undefined,
                              },
                    ]}>
                    <BasicText
                        inputText={option}
                        textFamily={fonts.OpenSans_400}
                        marginLeft={8}
                        marginRight={8}
                        marginTop={6}
                        marginBottom={6}
                        textSize={15}
                        textColor={
                            answer === index ? Colors.White : Colors.Dark
                        }
                        textAlign="center"
                    />
                </TouchableOpacity>
            </View>
        );
    },
);

export default SingleRadioButton;

const styles = StyleSheet.create({
    tb_main: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
});
