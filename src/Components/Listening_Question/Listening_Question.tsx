import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { TouchableOpacity, View } from 'react-native';
import BasicText from '../Basic_Text/Basic_Text';
import { alphabets } from '../../Data/Alphabets/Alphabets';
import Colors from '../../Configs/Colors/Colors';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { INTF_ListeningTest } from '../../Interface/Tests/Listening';

interface ListeningQuestionProps {
    question: INTF_ListeningTest;
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    marginLeft?: number | 'auto';
    marginRight?: number | 'auto';
    answer: number | null;
    setAnswer: Dispatch<SetStateAction<number | null>>;
}
const ListeningQuestion: FunctionComponent<ListeningQuestionProps> = ({
    question,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    answer,
    setAnswer,
}) => {
    const select_answers = no_double_clicks({
        execFunc: ({ index }: { index: number }) => {
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
                marginLeft: marginLeft || 0,
                marginRight: marginRight || 0,
                marginTop: marginTop || 0,
                marginBottom: marginBottom || 0,
            }}>
            <BasicText
                inputText={question.instruction}
                textSize={16}
                marginTop={10}
                marginBottom={10}
            />
            {question?.options?.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => select_answers({ index: index })}
                    style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        marginBottom: 8,
                        padding: 5,
                        borderColor:
                            answer === index ? Colors.Primary : Colors.Grey,
                        borderRadius: 10,
                        backgroundColor:
                            answer === index ? Colors.Primary : undefined,
                        paddingVertical: 7,
                        minHeight: 51,
                        alignItems: 'center',
                    }}>
                    <BasicText
                        inputText={alphabets[index]}
                        marginRight={10}
                        marginLeft={3}
                        textWeight={700}
                        textSize={20}
                        textColor={
                            answer === index ? Colors.White : Colors.Dark
                        }
                    />
                    <View style={{ flex: 1 }}>
                        <BasicText
                            inputText={item}
                            textSize={17}
                            textColor={
                                answer === index ? Colors.White : Colors.Dark
                            }
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ListeningQuestion;
