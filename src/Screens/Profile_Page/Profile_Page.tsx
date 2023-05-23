import React, { FunctionComponent } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { fonts } from '../../Configs/Fonts/Fonts';
import { http_link_fix } from '../../Utils/HTTP_Link_Fix/HTTP_Link_Fix';
import MenuMaker from '../../Components/Menu_Maker/Menu_Maker';
import ProfileAccountIcon from '../../Images/SVGs/Profile_Account_Icon.svg';
import ProfileSubscriptionIcon from '../../Images/SVGs/Profile_Subscription_Icon.svg';
import ProfileSecurityIcon from '../../Images/SVGs/Profile_Security_Icon.svg';
import ProfileFilesFolderIcon from '../../Images/SVGs/Profile_Files_Folder_Icon.svg';
import {
    profile_menu_1,
    profile_menu_2,
    profile_menu_3,
    profile_menu_4,
} from '../../Data/Profile_Menu/Profile_Menu';

const ProfilePage: FunctionComponent = () => {
    return (
        <View style={styles.profile_main}>
            <Text style={styles.p_header}>Profile</Text>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.p_i_c_w}>
                    <View style={styles.p_i_c}>
                        {'' ? (
                            <Image
                                style={styles.p_i}
                                source={{
                                    uri: http_link_fix({
                                        http_link: '',
                                    }),
                                    width: 150,
                                    height: 150,
                                }}
                            />
                        ) : (
                            <Image
                                style={styles.p_i}
                                source={require('../../Images/Extra/default_user_dp_light.jpg')}
                            />
                        )}
                    </View>
                </View>
                <Text
                    style={{
                        fontFamily: fonts.Urbanist_700,
                        color: Colors.Dark,
                        marginTop: 10,
                        fontSize: 20,
                        textAlign: 'center',
                    }}>
                    Akindeju Oluwagbemiga
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.Urbanist_500,
                        color: Colors.DarkGrey,
                        marginTop: 5,
                        textAlign: 'center',
                    }}>
                    Joined since 10 May, 2023
                </Text>
                <View style={styles.p_menu_headers}>
                    <View style={styles.p_menu_img}>
                        <ProfileAccountIcon
                            width={23}
                            height={23}
                            color={Colors.Primary}
                        />
                    </View>
                    <Text style={styles.p_menu_txt}>Account</Text>
                </View>
                <MenuMaker
                    borderRadius={15}
                    backgroundColor={Colors.LightPurple2}
                    menu={profile_menu_1}
                />
                <View style={styles.p_menu_headers}>
                    <View
                        style={[
                            styles.p_menu_img,
                            { backgroundColor: Colors.LightYellow },
                        ]}>
                        <ProfileSubscriptionIcon
                            width={25}
                            height={25}
                            color={Colors.Primary}
                        />
                    </View>
                    <Text style={styles.p_menu_txt}>Subscription</Text>
                </View>
                <MenuMaker
                    borderRadius={15}
                    backgroundColor={Colors.LightYellow3}
                    menu={profile_menu_2}
                />
                <View style={styles.p_menu_headers}>
                    <View style={styles.p_menu_img}>
                        <ProfileSecurityIcon
                            width={30}
                            height={30}
                            color={Colors.Primary}
                        />
                    </View>
                    <Text style={styles.p_menu_txt}>Security</Text>
                </View>
                <MenuMaker
                    borderRadius={15}
                    backgroundColor={Colors.LightPurple2}
                    menu={profile_menu_3}
                />
                <View style={styles.p_menu_headers}>
                    <View
                        style={[
                            styles.p_menu_img,
                            { backgroundColor: Colors.LightOrange },
                        ]}>
                        <ProfileFilesFolderIcon
                            width={28}
                            height={28}
                            color={Colors.Orange}
                        />
                    </View>
                    <Text style={styles.p_menu_txt}>Contact & Information</Text>
                </View>
                <MenuMaker
                    borderRadius={15}
                    backgroundColor={Colors.LightOrange}
                    menu={profile_menu_4}
                />
                <View
                    style={{
                        marginBottom: 20,
                    }}>
                    {''}
                </View>
            </ScrollView>
        </View>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    profile_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    p_header: {
        fontFamily: fonts.Urbanist_700,
        fontSize: 25,
        marginTop: 60,
        marginLeft: 22,
        marginBottom: 18,
    },
    p_i_c_w: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        borderWidth: 2,
        borderRadius: 160,
        padding: 3,
        borderColor: Colors.DarkGrey,
    },
    p_i_c: {
        borderRadius: 150,
    },
    p_i: {
        borderRadius: 150,
        width: 150,
        height: 150,
    },
    p_menu_headers: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 22,
        marginBottom: 10,
        marginTop: 30,
    },
    p_menu_img: {
        width: 50,
        height: 50,
        backgroundColor: Colors.LightPrimary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    p_menu_txt: {
        marginLeft: 10,
        color: Colors.Dark,
        fontFamily: fonts.Urbanist_600,
        fontSize: 18,
    },
});
