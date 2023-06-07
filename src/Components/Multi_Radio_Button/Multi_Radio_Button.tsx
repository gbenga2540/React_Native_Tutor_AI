import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { observer } from 'mobx-react';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicText from '../Basic_Text/Basic_Text';

interface MultiRadioButtonProps {
    option: string;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    index: number;
    answers: number[];
    setAnswers: Dispatch<SetStateAction<number[]>>;
    buttonHeight?: number;
    borderRadius?: number;
}
const MultiRadioButton: FunctionComponent<MultiRadioButtonProps> = observer(
    ({
        option,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        answers,
        setAnswers,
        index,
        buttonHeight,
        borderRadius,
    }) => {
        const [active, setActive] = useState<boolean>(false);

        const exec_func = no_double_clicks({
            execFunc: () => {
                const prev_data = [...answers];
                if (prev_data?.includes(index)) {
                    const element_index = prev_data.indexOf(index);
                    prev_data?.splice(element_index, 1);
                } else {
                    prev_data.push(index);
                }
                setAnswers([...prev_data]);
            },
        });

        useEffect(() => {
            if (answers?.includes(index)) {
                setActive(true);
            } else {
                setActive(false);
            }
        }, [answers, index]);

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
                            borderColor: active ? Colors.Primary : Colors.Grey,
                            backgroundColor: active
                                ? Colors.Primary
                                : undefined,
                            borderRadius: borderRadius || 6,
                        },
                        buttonHeight
                            ? {
                                  height: buttonHeight,
                              }
                            : {},
                    ]}>
                    <BasicText
                        inputText={option}
                        textFamily={fonts.OpenSans_400}
                        marginLeft={8}
                        marginRight={8}
                        marginTop={6}
                        marginBottom={6}
                        textSize={15}
                        textColor={active ? Colors.White : Colors.Dark}
                    />
                </TouchableOpacity>
            </View>
        );
    },
);

export default MultiRadioButton;

const styles = StyleSheet.create({
    tb_main: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tb_m_txt: {
        fontFamily: fonts.OpenSans_400,
        marginHorizontal: 8,
        marginVertical: 6,
        fontSize: 15,
    },
});
