import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, View, Platform, Image } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
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
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

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
                    inputText="Report"
                    textSize={20}
                    textWeight={700}
                    marginLeft={10}
                />
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
                        <BasicText
                            inputText="You’re on Fire"
                            textAlign="center"
                            textSize={20}
                            textWeight={700}
                            textColor={Colors.White}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 5,
                            }}>
                            <FireIcon width={22} height={22} />
                            <BasicText
                                inputText="3"
                                textSize={20}
                                textWeight={700}
                                textColor={Colors.White}
                                marginTop={2}
                            />
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
                        <BasicText
                            inputText="Keep Going!"
                            textSize={12}
                            marginTop={7}
                            textWeight={600}
                            textColor={Colors.White}
                        />
                    </View>
                </View>
                <BasicText
                    inputText="Completed Lessons"
                    textSize={20}
                    marginTop={40}
                    textWeight={700}
                />
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
                            <BasicText
                                inputText="100 Lessons Done"
                                textSize={14}
                                textWeight={500}
                            />
                            <BasicText
                                inputText="Total: 300mins"
                                textSize={16}
                                textWeight={700}
                                marginTop={10}
                            />
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
                <BasicText
                    inputText="Completed Homework"
                    textSize={20}
                    marginTop={40}
                    textWeight={700}
                />
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
                            <BasicText
                                inputText="100 Homework Done"
                                textSize={14}
                                textWeight={500}
                                textColor={Colors.White}
                            />
                            <BasicText
                                inputText="Success Rate: 80%"
                                textSize={16}
                                textWeight={700}
                                marginTop={10}
                                textColor={Colors.Green2}
                            />
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
                marginTop={2}
                marginBottom={
                    Platform.OS === 'ios'
                        ? screen_height_less_than({
                              if_true: 10,
                              if_false: 40,
                          })
                        : 20
                }
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
