import React, { FunctionComponent } from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import HomeWorkStash from '../../Components/Home_Work_Stash/Home_Work_Stash';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const HomeWorkArchivePage: FunctionComponent = () => {
    const restart_homework = no_double_clicks({
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
                    inputText="Homework Archives"
                    textWeight={700}
                    textSize={20}
                    marginLeft={15}
                />
            </View>
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
                    <BasicText inputText="80% Pass" />
                </View>
                <View
                    style={{
                        marginLeft: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 9,
                        backgroundColor: Colors.LightPurple2,
                        borderRadius: 10,
                    }}>
                    <BasicText inputText="100 Homework" />
                </View>
            </View>
            <ScrollView
                style={{
                    flex: 1,
                    paddingTop: 14,
                }}>
                <HomeWorkStash />
                <HomeWorkStash />
                <View
                    style={{
                        marginBottom: 30,
                    }}>
                    {''}
                </View>
            </ScrollView>
            <BasicButton
                execFunc={restart_homework}
                buttonText="Retake Lesson"
                borderRadius={8}
                marginHorizontal={20}
                buttonHeight={56}
                marginTop={5}
                marginBottom={
                    Platform.OS === 'ios'
                        ? screen_height_less_than({
                              if_true: 10,
                              if_false: 35,
                          })
                        : 20
                }
            />
        </View>
    );
};

export default HomeWorkArchivePage;

const styles = StyleSheet.create({
    lesson_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
