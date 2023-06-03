import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import Colors from '../../Configs/Colors/Colors';
import BasicText from '../Basic_Text/Basic_Text';

interface HeaderTabProps {
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginHorizontal?: number | 'auto';
    marginBetween?: number;
    execFunc_Header_1?: () => void;
    execFunc_Header_2?: () => void;
    header_1: string;
    header_2: string;
    show_numbers?: boolean;
    number_1?: number;
    number_2?: number;
    secondIsInitialTab?: boolean;
}
const HeaderTab: FunctionComponent<HeaderTabProps> = ({
    marginTop,
    marginBottom,
    marginHorizontal,
    marginBetween,
    execFunc_Header_1,
    execFunc_Header_2,
    header_1,
    header_2,
    show_numbers,
    number_1,
    number_2,
    secondIsInitialTab,
}) => {
    const [isFirstTab, setIsFirstTab] = useState<boolean>(
        secondIsInitialTab ? false : true,
    );

    const exec_func_1 = no_double_clicks({
        execFunc: () => {
            setIsFirstTab(true);
            execFunc_Header_1 !== undefined && execFunc_Header_1();
        },
    });

    const exec_func_2 = no_double_clicks({
        execFunc: () => {
            setIsFirstTab(false);
            execFunc_Header_2 !== undefined && execFunc_Header_2();
        },
    });

    return (
        <View
            style={[
                styles.ht_main,
                {
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                    marginLeft: marginHorizontal || 0,
                    marginRight: marginHorizontal || 0,
                },
            ]}>
            <TouchableOpacity
                activeOpacity={0.55}
                onPress={exec_func_1}
                style={[
                    styles.ht_m_btn,
                    {
                        borderBottomColor: isFirstTab
                            ? Colors.Primary
                            : Colors.DarkGrey,
                        marginRight: (marginBetween || 0) / 2 || 0,
                    },
                ]}>
                <BasicText
                    inputText={header_1 || 'Header 1'}
                    textColor={isFirstTab ? Colors.Primary : Colors?.Dark}
                    textSize={18}
                    textWeight={700}
                />
                {show_numbers && (
                    <BasicText
                        inputText={`(${number_1 || 0})`}
                        textWeight={500}
                        marginLeft={5}
                        textSize={16}
                        textColor={Colors.DarkGrey}
                    />
                )}
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.55}
                onPress={exec_func_2}
                style={[
                    styles.ht_m_btn,
                    {
                        borderBottomColor: !isFirstTab
                            ? Colors.Primary
                            : Colors.DarkGrey,
                        marginLeft: (marginBetween || 0) / 2 || 0,
                    },
                ]}>
                <BasicText
                    inputText={header_2 || 'Header 2'}
                    textColor={!isFirstTab ? Colors.Primary : Colors?.Dark}
                    textSize={18}
                    textWeight={700}
                />
                {show_numbers && (
                    <BasicText
                        inputText={`(${number_2 || 0})`}
                        textWeight={500}
                        marginLeft={5}
                        textSize={16}
                        textColor={Colors.DarkGrey}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default HeaderTab;

const styles = StyleSheet.create({
    ht_main: {
        flex: 1,
        flexDirection: 'row',
    },
    ht_m_btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        paddingBottom: 10,
    },
});
