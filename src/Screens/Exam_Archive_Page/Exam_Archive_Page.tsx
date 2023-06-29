import React, { FunctionComponent } from 'react';
import { FlatList, Image, Platform, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import ExamCard from '../../Components/Exam_Card/Exam_Card';
import { exams } from '../../../test/Data/Exams';

const ExamArchivePage: FunctionComponent = () => {
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
                    inputText="Exam Archives"
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
                                  if_false: 25,
                              })
                            : 10,
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
                        <BasicText inputText="5 Exams" />
                    </View>
                    <View
                        style={{
                            marginLeft: 10,
                            paddingHorizontal: 15,
                            paddingVertical: 9,
                            backgroundColor: Colors.LightPurple2,
                            borderRadius: 10,
                        }}>
                        <BasicText inputText="70%" />
                    </View>
                </View>
                <FlatList
                    data={exams}
                    keyExtractor={item => item.exam_id as any}
                    renderItem={({ item, index }) => (
                        <ExamCard
                            exam={item}
                            index={index}
                            last_index={
                                exams?.length <= 1 ? 0 : exams?.length - 1
                            }
                        />
                    )}
                    style={{
                        paddingHorizontal: 18,
                        paddingTop: 14,
                    }}
                />
            </View>
        </View>
    );
};

export default ExamArchivePage;

const styles = StyleSheet.create({
    lesson_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
