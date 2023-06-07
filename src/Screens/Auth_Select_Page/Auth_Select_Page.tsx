import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import LinearGradient from 'react-native-linear-gradient';
import { avatars_data } from '../../Data/Avatars/Avatars';
import { ScrollView } from 'react-native-gesture-handler';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const AuthSelectPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const scrollViewRef = useRef<ScrollView | null>(null);

    const nav_To_sign_up = no_double_clicks({
        execFunc: () =>
            navigation.navigate(
                'AuthStack' as never,
                {
                    screen: 'SignUpPage',
                } as never,
            ),
    });

    const nav_To_sign_in = no_double_clicks({
        execFunc: () =>
            navigation.navigate(
                'AuthStack' as never,
                {
                    screen: 'SignInPage',
                } as never,
            ),
    });

    useEffect(() => {
        const first_timer = setTimeout(() => {
            scrollViewRef.current !== null &&
                scrollViewRef.current?.scrollToEnd();
        }, 300);
        return () => clearTimeout(first_timer);
    }, []);

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{
                x: Math.cos((120 * Math.PI) / 180),
                y: Math.sin((120 * Math.PI) / 180),
            }}
            colors={['#CDC2FF', '#f5f5f5']}
            style={styles.auth_sel_main}>
            <CustomStatusBar backgroundColor={Colors.LightPurple} />
            <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
                <View
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        maxWidth: 310,
                        marginTop:
                            Platform.OS === 'ios'
                                ? 90
                                : screen_height_less_than({
                                      if_true: 60,
                                      if_false: 45,
                                  }),
                        marginLeft: 40,
                    }}>
                    {avatars_data?.slice(0, 6)?.map(item => (
                        <View
                            key={item?.id}
                            style={{
                                backgroundColor: item?.backgroundColor,
                                borderRadius: 20,
                                marginRight: 15,
                                marginBottom: 15,
                            }}>
                            <Image
                                source={item?.image}
                                style={{
                                    width: screen_height_less_than({
                                        if_true: 110,
                                        if_false: 130,
                                    }),
                                    height: screen_height_less_than({
                                        if_true: 110,
                                        if_false: 130,
                                    }),
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>
                    ))}
                </View>
                <BasicText
                    inputText="Tutor.AI"
                    textSize={36}
                    marginTop={screen_height_less_than({
                        if_true: 30,
                        if_false: 50,
                    })}
                    textAlign="center"
                    width={330}
                    textWeight={700}
                    textColor={Colors.Primary}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                />
                <BasicText
                    inputText="Learn English Language Effectively with our AI Tutors."
                    textSize={screen_height_less_than({
                        if_true: 16,
                        if_false: 18,
                    })}
                    marginTop={screen_height_less_than({
                        if_true: 5,
                        if_false: 15,
                    })}
                    textAlign="center"
                    width={330}
                    textWeight={500}
                    textColor={Colors.Black}
                    marginLeft={'auto'}
                    marginRight={'auto'}
                />
                <BasicButton
                    buttonText="Create Account"
                    marginHorizontal={22}
                    marginTop={screen_height_less_than({
                        if_true: 30,
                        if_false: 70,
                    })}
                    execFunc={nav_To_sign_up}
                />
                <BasicButton
                    buttonText="Sign In"
                    marginHorizontal={22}
                    marginTop={10}
                    marginBottom={Platform.OS === 'ios' ? 22 : 20}
                    execFunc={nav_To_sign_in}
                    textColor={Colors.Primary}
                    backgroundColor={Colors.LightPurple}
                />
            </ScrollView>
        </LinearGradient>
    );
};

export default AuthSelectPage;

const styles = StyleSheet.create({
    auth_sel_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
