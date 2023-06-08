import React, { FunctionComponent } from 'react';
import { FlatList, Image, Platform, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import LessonCard from '../../Components/Lesson_Card/Lesson_Card';
import { test_lessons } from '../../../test/Data/Lessons';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const LessonArchivePage: FunctionComponent = () => {
    const retake_lesson = no_double_clicks({
        execFunc: () => {},
    });

    return (
        <View style={styles.lesson_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 45,
                                  if_false: 65,
                              })
                            : 25,
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton />
                <BasicText
                    inputText="Lesson Archives"
                    textWeight={700}
                    textSize={20}
                    marginLeft={15}
                />
            </View>
            <View
                style={{
                    paddingHorizontal: 4,
                    marginTop: 14,
                    flex: 1,
                    paddingBottom:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 10,
                                  if_false: 35,
                              })
                            : 20,
                }}>
                <Image
                    source={require('../../Images/Lessons/Lessons.png')}
                    style={{
                        width: 155,
                        height: 80,
                        marginTop: 10,
                        marginBottom: 10,
                        alignSelf: 'center',
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        marginBottom: 6,
                        justifyContent: 'center',
                    }}>
                    <View
                        style={{
                            marginRight: 10,
                            paddingHorizontal: 15,
                            paddingVertical: 9,
                            backgroundColor: Colors.LightPurple2,
                            borderRadius: 10,
                        }}>
                        <BasicText inputText="300mins" />
                    </View>
                    <View
                        style={{
                            marginLeft: 10,
                            paddingHorizontal: 15,
                            paddingVertical: 9,
                            backgroundColor: Colors.LightPurple2,
                            borderRadius: 10,
                        }}>
                        <BasicText inputText="100 Lessons" />
                    </View>
                </View>
                <FlatList
                    data={test_lessons}
                    keyExtractor={item => item.lesson_id as any}
                    renderItem={({ item, index }) => (
                        <LessonCard
                            lesson={item}
                            index={index}
                            last_index={
                                test_lessons?.length <= 1
                                    ? 0
                                    : test_lessons?.length - 1
                            }
                        />
                    )}
                    style={{
                        paddingHorizontal: 18,
                        paddingTop: 14,
                    }}
                />
                <BasicButton
                    execFunc={retake_lesson}
                    buttonText="Retake Lesson"
                    borderRadius={8}
                    marginHorizontal={20}
                    buttonHeight={56}
                    marginTop={5}
                />
            </View>
        </View>
    );
};

export default LessonArchivePage;

const styles = StyleSheet.create({
    lesson_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
