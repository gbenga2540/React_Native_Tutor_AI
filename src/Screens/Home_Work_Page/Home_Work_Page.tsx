import React, { FunctionComponent, useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import PlayIcon from '../../Images/SVGs/Play_Icon.svg';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import HomeWorkStash from '../../Components/Home_Work_Stash/Home_Work_Stash';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const HomeWorkPage: FunctionComponent = () => {
    const [startedHW, setStartedHW] = useState<boolean>(false);

    return (
        <View style={styles.hw_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View style={styles.l_header_cont}>
                <BasicText
                    inputText="Homework"
                    marginBottom={18}
                    marginTop={'auto'}
                    textSize={25}
                    textWeight={700}
                />
            </View>
            {!startedHW && (
                <TouchableOpacity
                    onPress={no_double_clicks({
                        execFunc: () => setStartedHW(true),
                    })}
                    activeOpacity={0.55}
                    style={{
                        alignSelf: 'center',
                        width: 250,
                        height: 100,
                        backgroundColor: Colors.LightPrimary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                        borderRadius: 15,
                    }}>
                    <PlayIcon width={25} height={25} color={Colors.Primary} />
                    <BasicText
                        inputText="Start"
                        textWeight={700}
                        textSize={20}
                        marginTop={3}
                        textColor={Colors.Primary}
                    />
                </TouchableOpacity>
            )}
            {startedHW && (
                <View
                    style={{
                        alignSelf: 'center',
                        width: 250,
                        height: 100,
                        backgroundColor: Colors.LightPrimary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                        borderRadius: 15,
                        marginBottom: 3,
                    }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                backgroundColor: Colors.Primary,
                                minWidth: 30,
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 3,
                                borderRadius: 5,
                            }}>
                            <BasicText
                                inputText="2"
                                textWeight={700}
                                textSize={16}
                                marginTop={3}
                                textColor={Colors.White}
                            />
                        </View>
                        <BasicText
                            inputText=" / "
                            textWeight={700}
                            textSize={20}
                            marginTop={3}
                            textColor={Colors.Primary}
                        />
                        <View
                            style={{
                                backgroundColor: Colors.Primary,
                                minWidth: 30,
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 3,
                                borderRadius: 5,
                            }}>
                            <BasicText
                                inputText="100"
                                textWeight={700}
                                textSize={16}
                                marginTop={3}
                                textColor={Colors.White}
                            />
                        </View>
                    </View>
                    <BasicText
                        inputText="Ongoing"
                        textWeight={700}
                        textSize={20}
                        marginTop={5}
                        textColor={Colors.Primary}
                    />
                </View>
            )}
            {startedHW && (
                <ScrollView style={{ flex: 1 }}>
                    <HomeWorkStash />
                    <HomeWorkStash />
                    <View
                        style={{
                            marginBottom: 30,
                        }}>
                        {''}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default HomeWorkPage;

const styles = StyleSheet.create({
    hw_main: {
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
