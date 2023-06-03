import React, { FunctionComponent } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import StarIcon from '../../Images/SVGs/Star_Icon.svg';
import ProgressBar from '../../Components/Progress_Bar/Progress_Bar';
import SimpleBIcon from '../../Images/SVGs/Simple_B_Icon.svg';
import FireIcon from '../../Images/SVGs/Fire_Icon.svg';
import { test_assignments } from '../../../test/Data/Assignments';
import CheckMark from '../../Components/Check_Mark/Check_Mark';
import Feather from 'react-native-vector-icons/Feather';
import VocabularyIcon from '../../Images/SVGs/Vocabulary_Icon.svg';
import StatsReportIcon from '../../Images/SVGs/Stats_Report_Icon.svg';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheetStore } from '../../MobX/Bottom_Sheet/Bottom_Sheet';
import { StudentInfoStore } from '../../MobX/Student_Info/Student_Info';
import { Observer } from 'mobx-react';
import BasicText from '../../Components/Basic_Text/Basic_Text';

const HomePage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <View style={styles.home_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View style={styles.h_header_cont}>
                <View style={styles.h_header_txt_c}>
                    <Text style={styles.h_header}>Hello, Oluwagbemiga</Text>
                    <Text style={styles.h_header_2}>5 Pending Homework</Text>
                </View>
                <Image
                    source={require('../../../test/Images/Test_DP.png')}
                    style={styles.h_header_img}
                />
            </View>
            <ScrollView
                style={{
                    flex: 1,
                    paddingHorizontal: 18,
                    paddingTop: 30,
                    marginHorizontal: 2,
                }}>
                <View
                    style={{
                        height: 140,
                        backgroundColor: Colors.DarkPurple,
                        borderRadius: 20,
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            marginLeft: 25,
                            marginTop: 30,
                            zIndex: 1,
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.Urbanist_700,
                                color: Colors.White,
                                fontSize: 20,
                            }}>
                            Assigned Class
                        </Text>
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
                    </View>
                    <Image
                        source={require('../../Images/Home/HPA_1.png')}
                        style={{
                            width: 180,
                            height: 133,
                            resizeMode: 'contain',
                            marginLeft: 'auto',
                            marginRight: 20,
                            marginTop: 'auto',
                        }}
                    />
                </View>
                <Text
                    style={{
                        fontFamily: fonts.Urbanist_700,
                        fontSize: 20,
                        marginTop: 30,
                        color: Colors.Black,
                    }}>
                    Access Classroom
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        marginBottom: 40,
                    }}>
                    <View
                        style={{
                            flex: 1,
                            marginRight: 11,
                        }}>
                        <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    navigation.navigate(
                                        'HomeTab' as never,
                                        {
                                            screen: 'LessonPage',
                                        } as never,
                                    );
                                },
                            })}
                            activeOpacity={0.55}
                            style={{
                                backgroundColor: Colors.Primary,
                                height: 145,
                                borderRadius: 15,
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_700,
                                    color: Colors.White,
                                    marginTop: 17,
                                    marginLeft: 17,
                                    fontSize: 19,
                                }}>
                                Lessons
                            </Text>
                            <ProgressBar
                                marginTop={15}
                                progress={(55 / 70) * 100}
                                height={4}
                                backgroundColor={Colors.White}
                                progressBackgroundColor={Colors.DeepBlue}
                                marginHorizontal={17}
                            />
                            <Text
                                style={{
                                    fontFamily: fonts.OpenSans_700,
                                    color: Colors.White,
                                    marginTop: 5,
                                    marginLeft: 17,
                                    fontSize: 15,
                                }}>
                                55/70
                            </Text>
                            <Image
                                source={require('../../Images/Home/HPA_3.png')}
                                style={{
                                    width: 100,
                                    height: 80,
                                    resizeMode: 'contain',
                                    position: 'absolute',
                                    bottom: -3.5,
                                    right: 10,
                                }}
                            />
                            <StarIcon
                                width={35}
                                height={35}
                                color={Colors.White}
                                style={{
                                    position: 'absolute',
                                    bottom: 11,
                                    left: 20,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    navigation.navigate(
                                        'HomeTab' as never,
                                        {
                                            screen: 'HomeWorkPage',
                                        } as never,
                                    );
                                },
                            })}
                            activeOpacity={0.55}
                            style={{
                                backgroundColor: Colors.LightPrimary,
                                marginTop: 25,
                                height: 145,
                                borderRadius: 15,
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_700,
                                    color: Colors.Primary,
                                    marginTop: 17,
                                    marginLeft: 17,
                                    fontSize: 19,
                                }}>
                                Homework
                            </Text>
                            <ProgressBar
                                marginTop={15}
                                progress={(70 / 100) * 100}
                                height={4}
                                backgroundColor={Colors.White}
                                progressBackgroundColor={Colors.DeepBlue}
                                marginHorizontal={17}
                            />
                            <Text
                                style={{
                                    fontFamily: fonts.OpenSans_700,
                                    color: Colors.Primary,
                                    marginTop: 5,
                                    marginLeft: 17,
                                    fontSize: 15,
                                }}>
                                70%
                            </Text>
                            <Image
                                source={require('../../Images/Home/HPA_4.png')}
                                style={{
                                    width: 100,
                                    height: 72,
                                    resizeMode: 'contain',
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 10,
                                }}
                            />
                            <StarIcon
                                width={35}
                                height={35}
                                color={Colors.Primary}
                                style={{
                                    position: 'absolute',
                                    bottom: 11,
                                    left: 20,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 11,
                        }}>
                        <TouchableOpacity
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    navigation.push(
                                        'HomeStack' as never,
                                        {
                                            screen: 'VocabularyPage',
                                        } as never,
                                    );
                                },
                            })}
                            activeOpacity={0.55}
                            style={{
                                backgroundColor: Colors.Pink,
                                height: 206,
                                borderRadius: 15,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 15,
                                    marginLeft: 17,
                                }}>
                                <BasicText
                                    inputText="Vocabulary"
                                    textWeight={700}
                                    textColor={Colors.White}
                                    textSize={19}
                                />
                                <Feather
                                    name="chevron-right"
                                    color={Colors.White}
                                    size={25}
                                    style={{
                                        marginTop: 2,
                                    }}
                                />
                            </View>
                            <BasicText
                                inputText="Learn new English Words"
                                textColor={Colors.White}
                                textSize={12}
                                textWeight={700}
                                marginTop={5}
                                marginLeft={17}
                                marginRight={17}
                                width={135}
                            />
                            <VocabularyIcon
                                style={{
                                    width: 100,
                                    height: 100,
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    bottom: -3,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.55}
                            onPress={no_double_clicks({
                                execFunc: () => {
                                    navigation.push(
                                        'HomeStack' as never,
                                        {
                                            screen: 'ReportPage',
                                        } as never,
                                    );
                                },
                            })}
                            style={{
                                backgroundColor: Colors.LightPrimary,
                                marginTop: 25,
                                height: 84,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.Urbanist_700,
                                        color: Colors.Primary,
                                        fontSize: 20,
                                        marginRight: 3,
                                    }}>
                                    View Report
                                </Text>
                                <StatsReportIcon
                                    color={Colors.Primary}
                                    width={25}
                                    height={25}
                                />
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 5,
                                    justifyContent: 'center',
                                    marginLeft: 5,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.Urbanist_500,
                                        color: Colors.Primary,
                                        fontSize: 12,
                                    }}>
                                    Download your result here
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        height: 140,
                        backgroundColor: Colors.DarkPurple,
                        borderRadius: 20,
                        flexDirection: 'row',
                    }}>
                    <SimpleBIcon
                        width={60}
                        height={60}
                        color={Colors.Primary}
                        style={{
                            marginLeft: 22,
                            marginTop: 25,
                        }}
                    />
                    <View
                        style={{
                            marginLeft: 24,
                            marginTop: 12,
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.Urbanist_700,
                                color: Colors.White,
                                fontSize: 20,
                                textAlign: 'center',
                            }}>
                            You’re on Fire
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 5,
                            }}>
                            <FireIcon width={22} height={22} />
                            <Text
                                style={{
                                    fontFamily: fonts.OpenSans_700,
                                    color: Colors.White,
                                    fontSize: 20,
                                }}>
                                3
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 10,
                            }}>
                            {test_assignments?.map((item, index) => (
                                <CheckMark
                                    key={index}
                                    day_num={item?.id}
                                    isCompleted={item?.completed}
                                />
                            ))}
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 50 }}>{''}</View>
            </ScrollView>
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    home_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    h_header_cont: {
        height: Platform.OS === 'ios' ? 120 : 75,
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
        flexDirection: 'row',
    },
    h_header_txt_c: {
        marginTop: 'auto',
        marginBottom: 12,
    },
    h_header: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 22,
        color: Colors.Dark,
    },
    h_header_2: {
        fontFamily: fonts.OpenSans_400,
        fontSize: 14,
        color: Colors.Dark,
    },
    h_header_img: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
        marginRight: 22,
        marginTop: 'auto',
        marginBottom: 12,
        borderRadius: 50,
    },
});
