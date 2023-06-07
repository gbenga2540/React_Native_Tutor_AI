import React, { FunctionComponent, ReactElement } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import LessonCard from '../../Components/Lesson_Card/Lesson_Card';
import { test_lessons } from '../../../test/Data/Lessons';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { StudentInfoStore } from '../../MobX/Student_Info/Student_Info';
import { Observer } from 'mobx-react';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import {
    screen_height_less_than,
    screen_width_less_than,
} from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const LessonPage: FunctionComponent = () => {
    return (
        <View style={styles.lesson_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View style={styles.l_header_cont}>
                <BasicText
                    inputText="Lessons"
                    marginTop={'auto'}
                    marginBottom={18}
                    textSize={25}
                    textWeight={700}
                />
            </View>
            <View
                style={{
                    paddingHorizontal: 4,
                    marginTop: 14,
                    paddingBottom: 20,
                }}>
                <BasicText
                    inputText="Assigned Class"
                    marginLeft={22}
                    textColor={Colors.Black}
                    textWeight={700}
                    textSize={20}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        marginBottom: 3,
                    }}>
                    <View
                        style={{
                            backgroundColor: Colors.Primary,
                            minWidth: 133,
                            height: 42,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 11,
                            flexDirection: 'row',
                            marginLeft: 22,
                            paddingLeft: 10,
                            paddingRight: 4,
                        }}>
                        <Observer>
                            {() => (
                                <BasicText
                                    inputText={
                                        StudentInfoStore?.student_info
                                            ?.assigned_class as string
                                    }
                                    textColor={Colors.White}
                                    textSize={18}
                                    marginRight={3}
                                    textWeight={600}
                                />
                            )}
                        </Observer>
                    </View>
                    <View
                        style={{
                            backgroundColor: Colors.LightPrimary,
                            width: screen_width_less_than({
                                if_true: 100,
                                if_false: 131,
                            }),
                            height: 42,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 11,
                            marginLeft: 'auto',
                            marginRight: 22,
                        }}>
                        <BasicText
                            inputText={'30:00 Mins'}
                            textColor={Colors.Primary}
                            textSize={18}
                            textWeight={600}
                        />
                    </View>
                </View>
                <FlatList
                    ListHeaderComponent={() =>
                        (
                            <View style={{ marginTop: 20 }}>{''}</View>
                        ) as ReactElement<any>
                    }
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
                    }}
                    ListFooterComponent={() =>
                        (
                            <View style={{ marginBottom: 130 }}>{''}</View>
                        ) as ReactElement<any>
                    }
                />
            </View>
        </View>
    );
};

export default LessonPage;

const styles = StyleSheet.create({
    lesson_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    l_header_cont: {
        height:
            Platform.OS === 'ios'
                ? screen_height_less_than({
                      if_true: 90,
                      if_false: 120,
                  })
                : 70,
        paddingLeft: 22,
        backgroundColor: Colors.Background,
        shadowColor:
            Platform.OS === 'ios'
                ? 'rgba(0 ,0 ,0 , 0.35)'
                : 'rgba(0 ,0 ,0 , 0.9)',
        shadowOffset: {
            width: 1,
            height: Platform.OS === 'ios' ? 1 : 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3.27,
        elevation: 3,
    },
});
