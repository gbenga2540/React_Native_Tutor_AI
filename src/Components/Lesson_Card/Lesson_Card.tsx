import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { INTF_Lesson } from '../../Interface/Lesson/Lesson';
import ArcInner from '../../Images/SVGs/Arc_Inner.svg';
import ArcOuter from '../../Images/SVGs/Arc_Outer.svg';
import { fonts } from '../../Configs/Fonts/Fonts';

interface LessonCardProps {
    lesson: INTF_Lesson;
}
const LessonCard: FunctionComponent<LessonCardProps> = ({ lesson }) => {
    return (
        <View
            style={[
                styles.lesson_main,
                {
                    backgroundColor:
                        lesson?.progress === 100
                            ? Colors.Primary
                            : Colors.LightPurple3,
                },
            ]}>
            <ArcInner
                style={{ position: 'absolute', right: 0 }}
                color={
                    lesson?.progress === 100
                        ? Colors.ArcInner_A
                        : Colors.ArcInner_I
                }
            />
            <ArcOuter
                style={{ position: 'absolute', right: 0 }}
                color={
                    lesson?.progress === 100
                        ? Colors.ArcOuter_A
                        : Colors.ArcOuter_I
                }
            />

            <Text
                style={{
                    color:
                        lesson?.progress === 100 ? Colors.White : Colors.Black,
                    fontFamily: fonts.Urbanist_600,
                    fontSize: 15,
                    position: 'absolute',
                    right: 10,
                    top: 10,
                }}>{`${lesson?.progress}%`}</Text>
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
                            lesson?.progress === 100
                                ? Colors.ArcInner_A
                                : Colors.ArcInner_I,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{
                            uri: lesson?.imageURL,
                            width: 88,
                            height: 88,
                        }}
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
                    <Text
                        style={{
                            color:
                                lesson?.progress === 100
                                    ? Colors.White
                                    : Colors.Black,
                            fontFamily: fonts.Urbanist_500,
                            fontSize: 15,
                        }}>
                        {`Lesson ${lesson?.lesson_id}`}
                    </Text>
                    <Text
                        style={{
                            color:
                                lesson?.progress === 100
                                    ? Colors.White
                                    : Colors.Black,
                            fontFamily: fonts.Urbanist_700,
                            fontSize: 18,
                        }}>
                        {lesson?.title}
                    </Text>
                </View>
            </View>
        </View>
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
