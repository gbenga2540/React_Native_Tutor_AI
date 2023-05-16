import React, { FunctionComponent } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import LinearGradient from 'react-native-linear-gradient';
import { avatars_data } from '../../Data/Avatars/Avatars';
import { ScrollView } from 'react-native-gesture-handler';
import { fonts } from '../../Configs/Fonts/Fonts';
import BasicButton from '../../Components/Basic_Button/Basic_Button';

const AuthSelectPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        maxWidth: 310,
                        marginTop: Platform?.OS === 'ios' ? 120 : 70,
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
                                    width: 130,
                                    height: 130,
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>
                    ))}
                </View>
                <Text
                    style={[
                        styles.a_s_m_txt,
                        {
                            marginTop: 50,
                            color: Colors.Primary,
                            fontSize: 36,
                            fontFamily: fonts.Urbanist_700,
                        },
                    ]}>
                    Tutor.AI
                </Text>
                <Text style={styles.a_s_m_txt}>
                    Learn English Language Effectively with our Ai Avatars.
                </Text>
                <BasicButton
                    buttonText="Create Account"
                    marginHorizontal={22}
                    marginTop={30}
                    execFunc={nav_To_sign_up}
                />
                <BasicButton
                    buttonText="Sign In"
                    marginHorizontal={22}
                    marginTop={15}
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
    a_s_m_txt: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 18,
        maxWidth: 330,
        alignSelf: 'center',
        fontFamily: fonts.Urbanist_500,
        color: Colors.Black,
    },
});
