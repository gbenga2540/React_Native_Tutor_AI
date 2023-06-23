import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { InputModeOptions, TextInput, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { INTF_WritingTest } from '../../Interface/Tests/Writing';
import { fonts } from '../../Configs/Fonts/Fonts';

interface WritingQuestionProps {
    question: INTF_WritingTest;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    answer: string;
    setAnswer: Dispatch<SetStateAction<string>>;
    onChange?: () => void;
    onFocus?: () => void;
    inputMode?: InputModeOptions;
    textColor?: string;
    autoFocus?: boolean;
    editable?: boolean;
    placeHolderText?: string;
}
const WritingQuestion: FunctionComponent<WritingQuestionProps> = ({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    answer,
    setAnswer,
    onChange,
    onFocus,
    inputMode,
    textColor,
    autoFocus,
    editable,
    placeHolderText,
}) => {
    return (
        <View
            style={{
                marginLeft: marginLeft || 0,
                marginRight: marginRight || 0,
                marginTop: marginTop || 0,
                marginBottom: marginBottom || 0,
                flex: 1,
                minHeight: 56,
                borderRadius: 8,
                borderColor: Colors.Border,
                borderWidth: 1,
                backgroundColor: Colors.InputBackground,
            }}>
            <TextInput
                style={{
                    flex: 1,
                    fontFamily: fonts.Urbanist_500,
                    fontSize: 16,
                    marginHorizontal: 10,
                    borderWidth: 0,
                    marginVertical: 2,
                    color: textColor || Colors.Dark,
                    textAlignVertical: 'top',
                }}
                placeholder={placeHolderText || ''}
                placeholderTextColor={Colors.Grey}
                onChangeText={(text: string) => {
                    setAnswer(text);
                    onChange !== undefined && (onChange() as unknown);
                }}
                value={answer}
                autoCapitalize={'none'}
                autoCorrect={false}
                inputMode={inputMode || 'text'}
                onFocus={() => onFocus !== undefined && (onFocus() as unknown)}
                autoFocus={autoFocus || false}
                editable={editable === false ? false : true}
                multiline
            />
        </View>
    );
};

export default WritingQuestion;
