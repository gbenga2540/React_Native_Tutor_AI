import React, { FunctionComponent, ReactElement } from 'react';
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import LessonCard from '../../Components/Lesson_Card/Lesson_Card';
import { fonts } from '../../Configs/Fonts/Fonts';
import { test_lessons } from '../../../test/Data/Lessons';
import Feather from 'react-native-vector-icons/Feather';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { StudentInfoStore } from '../../MobX/Student_Info/Student_Info';
import { BottomSheetStore } from '../../MobX/Bottom_Sheet/Bottom_Sheet';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { Observer } from 'mobx-react';

const LessonPage: FunctionComponent = () => {
    return (
        <View style={styles.lesson_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View style={styles.l_header_cont}>
                <Text style={styles.l_header}>Lessons</Text>
            </View>
            <View
                style={{
                    paddingHorizontal: 4,
                    marginTop: 14,
                    paddingBottom: 20,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.Urbanist_700,
                        color: Colors.Black,
                        fontSize: 20,
                        marginHorizontal: 22,
                    }}>
                    Assigned Class
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginBottom: 3,
                    }}>
                    <TouchableOpacity
                        onPress={no_double_clicks({
                            execFunc: () => {
                                BottomSheetStore.open_bottom_sheet({
                                    component_type: 1,
                                });
                            },
                        })}
                        activeOpacity={0.6}
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
                                <Text
                                    style={{
                                        color: Colors.White,
                                        fontFamily: fonts.Urbanist_600,
                                        fontSize: 18,
                                        marginRight: 3,
                                    }}>
                                    {
                                        StudentInfoStore?.student_info
                                            ?.assigned_class
                                    }
                                </Text>
                            )}
                        </Observer>
                        <Feather
                            name="chevron-down"
                            size={21}
                            color={Colors.White}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            backgroundColor: Colors.LightPrimary,
                            width: 131,
                            height: 42,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 11,
                            marginLeft: 'auto',
                            marginRight: 22,
                        }}>
                        <Text
                            style={{
                                color: Colors.Primary,
                                fontFamily: fonts.Urbanist_600,
                                fontSize: 18,
                            }}>
                            20:00 Mins
                        </Text>
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
        height: Platform.OS === 'ios' ? 120 : 80,
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
        color: Colors.Dark,
    },
});
