import React, { FunctionComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import ArcInnerIcon from '../../Images/SVGs/Arc_Inner_Icon.svg';
import ArcOuterIcon from '../../Images/SVGs/Arc_Outer_Icon.svg';
import { fonts } from '../../Configs/Fonts/Fonts';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicText from '../Basic_Text/Basic_Text';
import { INTF_Exam } from '../../Interface/Exams/Exams';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ExamCardProps {
    exam: INTF_Exam;
    index: number;
    last_index: number;
    disabled?: boolean;
}
const ExamCard: FunctionComponent<ExamCardProps> = ({
    exam,
    index,
    last_index,
    disabled,
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const take_exam = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'ExamQPage',
                    params: { CurrentLevel: exam?.level, retake: true },
                } as never,
            );
        },
    });

    return (
        <TouchableOpacity
            onPress={take_exam}
            disabled={disabled || false}
            activeOpacity={0.5}
            style={[
                styles.lesson_main,
                {
                    backgroundColor:
                        exam?.score === 100
                            ? Colors.Primary
                            : Colors.LightPurple3,
                    marginBottom:
                        index === last_index
                            ? Platform.OS === 'ios'
                                ? 67
                                : 22
                            : 17,
                },
            ]}>
            <ArcInnerIcon
                style={{ position: 'absolute', right: 0 }}
                color={
                    exam?.score === 100 ? Colors.ArcInner_A : Colors.ArcInner_I
                }
            />
            <ArcOuterIcon
                style={{ position: 'absolute', right: 0 }}
                color={
                    exam?.score === 100 ? Colors.ArcOuter_A : Colors.ArcOuter_I
                }
            />
            <Text
                style={{
                    color: exam?.score === 100 ? Colors.White : Colors.Black,
                    fontFamily: fonts.Urbanist_600,
                    fontSize: 15,
                    position: 'absolute',
                    right: 10,
                    top: 10,
                }}>{`${exam?.score}%`}</Text>
            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{
                        marginLeft: 12,
                        marginTop: 10,
                        marginRight: 4,
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor:
                            exam?.score === 100
                                ? Colors.ArcInner_A
                                : Colors.ArcInner_I,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={require('../../Images/Logos/Tutor_AI_Logo.png')}
                        style={{
                            borderRadius: 90,
                            width: 90,
                            height: 90,
                        }}
                    />
                </View>

                <View
                    style={{
                        width: 200,
                        paddingTop: 26,
                        paddingBottom: 12,
                    }}>
                    <BasicText
                        inputText={`Exam ${index + 1}`}
                        textWeight={500}
                        textSize={15}
                        textColor={
                            exam?.score === 100 ? Colors.White : Colors.Black
                        }
                    />
                    <BasicText
                        inputText={exam?.level as string}
                        textWeight={600}
                        textSize={18}
                        textColor={
                            exam?.score === 100 ? Colors.White : Colors.Black
                        }
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ExamCard;

const styles = StyleSheet.create({
    lesson_main: {
        minHeight: 120,
        borderRadius: 15,
        marginBottom: 17,
    },
});
