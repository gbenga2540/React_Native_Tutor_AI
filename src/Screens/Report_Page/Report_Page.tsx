import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
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

const ReportPage: FunctionComponent = () => {
    const download_results = no_double_clicks({
        execFunc: () => {},
    });

    return (
        <View style={styles.report_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop: 65,
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
                <Text>Completed Lessons</Text>
                <Text>Completed Homework</Text>
                <View style={{ marginBottom: 50 }}>{''}</View>
            </ScrollView>
            <BasicButton
                execFunc={download_results}
                buttonText="Download Results"
                borderRadius={8}
                marginHorizontal={22}
                buttonHeight={56}
                marginTop={20}
                marginBottom={Platform.OS === 'ios' ? 50 : 20}
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
