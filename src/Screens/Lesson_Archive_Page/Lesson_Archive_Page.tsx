import React, { FunctionComponent, Suspense, useEffect, useState } from 'react';
import { FlatList, Image, Platform, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import LessonCard from '../../Components/Lesson_Card/Lesson_Card';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { INTF_Lesson } from '../../Interface/Lesson/Lesson';
import {
    Beginner,
    Confident,
    Intermediate,
    PreIntermediate,
    UpperIntermediate,
} from '../../Data/Lessons/Lessons';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { observer } from 'mobx-react';

const LessonArchivePage: FunctionComponent = observer(() => {
    const L_Beginner = Beginner;
    const L_PreIntermediate = PreIntermediate;
    const L_Intermediate = Intermediate;
    const L_UpperIntermediate = UpperIntermediate;
    const L_Confident = Confident;

    const UserLevel = UserInfoStore.user_info?.level || 'Beginner';
    const [lessons, setLessons] = useState<INTF_Lesson[]>(L_Beginner);

    useEffect(() => {
        const set_lessons_data = () => {
            switch (UserLevel) {
                case 'Beginner':
                    setLessons(L_Beginner);
                    break;
                case 'Pre-Intermediate':
                    setLessons(L_PreIntermediate);
                    break;
                case 'Intermediate':
                    setLessons(L_Intermediate);
                    break;
                case 'Upper-Intermediate':
                    setLessons(L_UpperIntermediate);
                    break;
                case 'Confident':
                    setLessons(L_Confident);
                    break;
                default:
                    setLessons(L_Beginner);
                    break;
            }
        };
        set_lessons_data();
    }, [
        UserLevel,
        L_Beginner,
        L_PreIntermediate,
        L_Intermediate,
        L_UpperIntermediate,
        L_Confident,
    ]);

    // const retake_lesson = no_double_clicks({
    //     execFunc: () => {},
    // });

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
                        <BasicText inputText={`${lessons?.length * 30}mins`} />
                    </View>
                    <View
                        style={{
                            marginLeft: 10,
                            paddingHorizontal: 15,
                            paddingVertical: 9,
                            backgroundColor: Colors.LightPurple2,
                            borderRadius: 10,
                        }}>
                        <BasicText inputText={`${lessons?.length} Lessons`} />
                    </View>
                </View>
                <Suspense fallback={null}>
                    {lessons.length > 0 && (
                        <FlatList
                            data={lessons}
                            keyExtractor={item => item.lesson_id as any}
                            renderItem={({ item, index }) => (
                                <LessonCard
                                    lesson={item}
                                    index={index}
                                    last_index={
                                        lessons?.length <= 1
                                            ? 0
                                            : lessons?.length - 1
                                    }
                                />
                            )}
                            style={{
                                paddingHorizontal: 18,
                                paddingTop: 14,
                            }}
                        />
                    )}
                </Suspense>
                {/* <BasicButton
                    execFunc={() => retake_lesson({})}
                    buttonText="Retake Lesson"
                    borderRadius={8}
                    marginHorizontal={20}
                    buttonHeight={56}
                    marginTop={5}
                /> */}
            </View>
        </View>
    );
});

export default LessonArchivePage;

const styles = StyleSheet.create({
    lesson_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
