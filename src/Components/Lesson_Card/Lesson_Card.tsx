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
import { INTF_Lesson } from '../../Interface/Lesson/Lesson';
import ArcInnerIcon from '../../Images/SVGs/Arc_Inner_Icon.svg';
import ArcOuterIcon from '../../Images/SVGs/Arc_Outer_Icon.svg';
import { fonts } from '../../Configs/Fonts/Fonts';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasicText from '../Basic_Text/Basic_Text';

interface LessonCardProps {
    lesson: INTF_Lesson;
    index: number;
    last_index: number;
    disabled?: boolean;
}
const LessonCard: FunctionComponent<LessonCardProps> = ({
    lesson,
    index,
    last_index,
    disabled,
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const is_completed = false;
    const lesson_progress = 0;

    return (
        <TouchableOpacity
            onPress={no_double_clicks({
                execFunc: () => {
                    navigation.push(
                        'HomeStack' as never,
                        {
                            screen: 'LessonConvPage',
                            params: {
                                topic: lesson?.lesson_topic,
                            },
                        } as never,
                    );
                },
            })}
            disabled={disabled || false}
            activeOpacity={0.5}
            style={[
                styles.lesson_main,
                {
                    backgroundColor: is_completed
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
                color={is_completed ? Colors.ArcInner_A : Colors.ArcInner_I}
            />
            <ArcOuterIcon
                style={{ position: 'absolute', right: 0 }}
                color={is_completed ? Colors.ArcOuter_A : Colors.ArcOuter_I}
            />
            <Text
                style={{
                    color: is_completed ? Colors.White : Colors.Black,
                    fontFamily: fonts.Urbanist_600,
                    fontSize: 15,
                    position: 'absolute',
                    right: 10,
                    top: 10,
                }}>{`${lesson_progress}%`}</Text>
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
                        borderColor: is_completed
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
                        inputText={`Lesson ${lesson?.lesson_id}`}
                        textWeight={500}
                        textSize={15}
                        textColor={is_completed ? Colors.White : Colors.Black}
                    />
                    <BasicText
                        inputText={lesson?.lesson_topic as string}
                        textWeight={600}
                        textSize={18}
                        textColor={is_completed ? Colors.White : Colors.Black}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default LessonCard;

const styles = StyleSheet.create({
    lesson_main: {
        minHeight: 120,
        borderRadius: 15,
        marginBottom: 17,
    },
});
