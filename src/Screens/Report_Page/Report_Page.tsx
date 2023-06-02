import React, { FunctionComponent } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import SimpleBIcon from '../../Images/SVGs/Simple_B_Icon.svg';
import FireIcon from '../../Images/SVGs/Fire_Icon.svg';
import { test_assignments } from '../../../test/Data/Assignments';
import CheckMark from '../../Components/Check_Mark/Check_Mark';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const ReportPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const download_results = no_double_clicks({
        execFunc: () => {},
    });

    return (
        <View style={styles.report_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop: Platform.OS === 'ios' ? 65 : 25,
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton />
                <Text
                    style={{
                        marginLeft: 30,
                        fontFamily: fonts.Urbanist_700,
                        color: Colors.Dark,
                        fontSize: 20,
                    }}>
                    Report
                </Text>
            </View>
            <ScrollView
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingTop: 30,
                    marginHorizontal: 2,
                }}>
                <View
                    style={{
                        height: 150,
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
                        <Text
                            style={{
                                fontFamily: fonts.Urbanist_600,
                                color: Colors.White,
                                fontSize: 12,
                                marginTop: 7,
                            }}>
                            Keep Going!
                        </Text>
                    </View>
                </View>
                <Text
                    style={{
                        fontFamily: fonts.Urbanist_700,
                        marginTop: 40,
                        color: Colors.Dark,
                        fontSize: 20,
                    }}>
                    Completed Lessons
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View
                        style={{
                            backgroundColor: Colors.Yellow,
                            borderRadius: 10,
                            padding: 10,
                            flexDirection: 'row',
                            height: 100,
                            flex: 1,
                        }}>
                        <Image
                            source={require('../../Images/Lessons/Lessons.png')}
                            style={{
                                width: 155,
                                height: 80,
                                alignSelf: 'center',
                            }}
                        />
                        <View
                            style={{
                                alignSelf: 'center',
                                marginLeft: 'auto',
                                marginRight: 20,
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_500,
                                    color: Colors.Dark,
                                    fontSize: 14,
                                }}>
                                100 Lessons Done
                            </Text>
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_700,
                                    color: Colors.Dark,
                                    fontSize: 16,
                                    marginTop: 10,
                                }}>
                                Total: 300mins
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={no_double_clicks({
                            execFunc: () => {
                                navigation.push(
                                    'HomeStack' as never,
                                    {
                                        screen: 'LessonArchivePage',
                                    } as never,
                                );
                            },
                        })}
                        activeOpacity={0.5}
                        style={{
                            width: 22,
                            height: 50,
                            backgroundColor: Colors.Yellow,
                            marginLeft: 10,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}>
                        <Feather
                            name="chevron-right"
                            color={Colors.Dark}
                            size={23}
                        />
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        fontFamily: fonts.Urbanist_700,
                        marginTop: 40,
                        color: Colors.Dark,
                        fontSize: 20,
                    }}>
                    Completed Homework
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View
                        style={{
                            backgroundColor: Colors.Primary,
                            borderRadius: 10,
                            padding: 10,
                            flexDirection: 'row',
                            height: 100,
                            flex: 1,
                        }}>
                        <Image
                            source={require('../../Images/Lessons/Lessons.png')}
                            style={{
                                width: 155,
                                height: 80,
                                alignSelf: 'center',
                            }}
                        />
                        <View
                            style={{
                                alignSelf: 'center',
                                marginLeft: 'auto',
                                marginRight: 20,
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_500,
                                    color: Colors.White,
                                    fontSize: 14,
                                }}>
                                100 Homework Done
                            </Text>
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_700,
                                    color: Colors.Green2,
                                    fontSize: 16,
                                    marginTop: 10,
                                }}>
                                Success Rate: 80%
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={no_double_clicks({
                            execFunc: () => {
                                navigation.push(
                                    'HomeStack' as never,
                                    {
                                        screen: 'HomeWorkArchivePage',
                                    } as never,
                                );
                            },
                        })}
                        activeOpacity={0.5}
                        style={{
                            width: 22,
                            height: 50,
                            backgroundColor: Colors.Primary,
                            marginLeft: 10,
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}>
                        <Feather
                            name="chevron-right"
                            color={Colors.White}
                            size={23}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 50 }}>{''}</View>
            </ScrollView>
            <BasicButton
                execFunc={download_results}
                buttonText="Download Results"
                borderRadius={8}
                marginHorizontal={22}
                buttonHeight={56}
                marginTop={20}
                marginBottom={Platform.OS === 'ios' ? 25 : 10}
            />
        </View>
    );
};

export default ReportPage;

const styles = StyleSheet.create({
    report_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
