import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import LessonCard from '../../Components/Lesson_Card/Lesson_Card';
import { fonts } from '../../Configs/Fonts/Fonts';
import { test_lessons } from '../../../test/Data/Lessons';

const LessonPage: FunctionComponent = () => {
    return (
        <View style={styles.lesson_main}>
            <View style={styles.l_header_cont}>
                <Text style={styles.l_header}>Lessons</Text>
            </View>
            <View
                style={{
                    paddingHorizontal: 4,
                    marginTop: 40,
                    paddingBottom: 20,
                }}>
                <FlatList
                    data={test_lessons}
                    keyExtractor={item => item.lesson_id as any}
                    renderItem={({ item }) => <LessonCard lesson={item} />}
                    style={{
                        paddingHorizontal: 18,
                    }}
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
        marginBottom: 100,
    },
    l_header_cont: {
        height: 120,
        paddingLeft: 22,
        backgroundColor: Colors.Background,
        shadowColor: 'rgba(0 ,0 ,0 , 0.35)',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3.27,
        elevation: 3,
    },
    l_header: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 25,
        marginTop: 'auto',
        marginBottom: 18,
    },
});
