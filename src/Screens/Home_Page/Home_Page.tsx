import React, { FunctionComponent } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import Star from '../../Images/SVGs/Star.svg';
import ProgressBar from '../../Components/Progress_Bar/Progress_Bar';
import SimpleB from '../../Images/SVGs/Simple_B.svg';
import Fire from '../../Images/SVGs/Fire.svg';
import { test_assignments } from '../../../test/Data/Assignments';
import CheckMark from '../../Components/Check_Mark/Check_Mark';

const HomePage: FunctionComponent = () => {
    return (
        <View style={styles.home_main}>
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
                    paddingHorizontal: 20,
                    marginTop: 30,
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
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.Urbanist_700,
                                color: Colors.White,
                                fontSize: 20,
                            }}>
                            Assigned Class
                        </Text>
                        <View
                            style={{
                                backgroundColor: Colors.Primary,
                                width: 131,
                                height: 40,
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 15,
                            }}>
                            <Text
                                style={{
                                    color: Colors.White,
                                    fontFamily: fonts.Urbanist_600,
                                    fontSize: 18,
                                }}>
                                Confident
                            </Text>
                        </View>
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
                    <View style={{ flex: 1, marginRight: 11 }}>
                        <View
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
                            <Star
                                width={35}
                                height={35}
                                color={Colors.White}
                                style={{
                                    position: 'absolute',
                                    bottom: 11,
                                    left: 20,
                                }}
                            />
                        </View>
                        <View
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
                            <Star
                                width={35}
                                height={35}
                                color={Colors.Primary}
                                style={{
                                    position: 'absolute',
                                    bottom: 11,
                                    left: 20,
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, marginLeft: 11 }}>
                        <View
                            style={{
                                backgroundColor: Colors.Pink,
                                height: 206,
                                borderRadius: 15,
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_700,
                                    color: Colors.White,
                                    marginTop: 15,
                                    marginLeft: 17,
                                    fontSize: 20,
                                }}>
                                Conversation
                            </Text>
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_700,
                                    color: Colors.White,
                                    marginTop: 10,
                                    marginHorizontal: 17,
                                    fontSize: 12,
                                }}>
                                Talk with your Ai Avatar and Practice your
                                English more
                            </Text>
                            <Image
                                source={require('../../Images/Home/HPA_2.png')}
                                style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'contain',
                                    position: 'absolute',
                                    bottom: 8,
                                    alignSelf: 'center',
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.LightPrimary,
                                marginTop: 25,
                                height: 84,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.Urbanist_700,
                                    color: Colors.Primary,
                                    fontSize: 22,
                                }}>
                                Report
                            </Text>
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
                    <SimpleB
                        width={60}
                        height={60}
                        color={Colors.Primary}
                        style={{ marginLeft: 22, marginTop: 25 }}
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
                            <Fire width={22} height={22} />
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
                <View style={{ marginBottom: 25 }}>{''}</View>
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
        flexDirection: 'row',
    },
    h_header_txt_c: {
        marginTop: 'auto',
        marginBottom: 12,
    },
    h_header: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 22,
    },
    h_header_2: {
        fontFamily: fonts.OpenSans_400,
        fontSize: 14,
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
