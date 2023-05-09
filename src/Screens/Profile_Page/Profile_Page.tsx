import React, { FunctionComponent, useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserDataStore } from '../../MobX/User_Data/User_Data';
import { fonts } from '../../Configs/Fonts/Fonts';
import { high_nums_converter } from '../../Utils/High_Nums_Converter/High_Nums_Converter';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import { getCustomTimeAgo } from '../../Utils/Time_Converter/Time_Converter';
import { shorten_text } from '../../Utils/Shorten_Text/Shorten_Text';
import BasicButton2 from '../../Components/Basic_Button_2/Basic_Button_2';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { observer } from 'mobx-react';
import { useQuery } from 'react-query';
import { get_author_blogs } from '../../Configs/Queries/Users/Users';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { query_id } from '../../Configs/Queries/Query_ID/Query_ID';
import MiniBlogCard from '../../Components/Mini_Blog_Card/Mini_Blog_Card';
import { INTF_BlogPost } from '../../Interface/Blog_Post/Blog_Post';
import { AppTagsStore } from '../../MobX/App_Tags/App_Tags';
import OverlaySpinner2 from '../../Components/Overlay_Spinner_2/Overlay_Spinner_2';

const ProfilePage: FunctionComponent = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const { data: authorsBlog, isLoading: isAuthorsBlogLoading } = useQuery({
        queryKey: query_id({ id: UserInfoStore?.user_info?.uid })
            ?.author_blogs_with_id,
        queryFn: () =>
            get_author_blogs({
                authorID: UserInfoStore?.user_info?.uid as string,
                user_token: UserInfoStore?.user_info?.token as string,
                paginationIndex: 0 as number,
            }),
        retry: 3,
        cacheTime: 300000,
        staleTime: 300000,
    });

    const edit_profile = no_double_clicks({
        execFunc: () => {
            navigation.navigate('SettingsPage' as never);
        },
    });

    const open_followings = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'FollowersPage',
                    params: {
                        is_following: true,
                        aid: UserInfoStore?.user_info?.uid,
                    },
                } as never,
            );
        },
    });

    const open_followers = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'FollowersPage',
                    params: {
                        is_following: false,
                        aid: UserInfoStore?.user_info?.uid,
                    },
                } as never,
            );
        },
    });

    return (
        <View style={styles.pp_main}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors().Background}
                backgroundDimColor={Colors().BackgroundDim}
            />
            <OverlaySpinner
                showSpinner={
                    showSpinner ||
                    Boolean(UserDataStore?.user_data?.uid) === false
                }
                setShowSpinner={setShowSpinner}
            />
            <Text
                style={{
                    marginTop: Platform?.OS === 'ios' ? 98 : 81,
                }}>
                {''}
            </Text>
            {Boolean(UserDataStore?.user_data?.uid) && (
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 20,
                        }}>
                        <View style={styles.pp_w_i_c}>
                            {UserDataStore?.user_data?.dp_link &&
                            UserDataStore?.user_data?.dp_link !== 'none' ? (
                                <Image
                                    style={styles.pp_w_i}
                                    source={{
                                        uri: UserDataStore?.user_data?.dp_link,
                                        width: 100,
                                        height: 100,
                                    }}
                                />
                            ) : (
                                <Image
                                    style={styles.pp_w_i}
                                    source={require('../../Images/Extra/default_user_dp_light.jpg')}
                                />
                            )}
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                            }}>
                            <TouchableOpacity
                                onPress={open_followers}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text style={styles.pp_txt_val}>
                                        {high_nums_converter({
                                            number: UserDataStore?.user_data
                                                ?.followers_l as number,
                                        })}
                                    </Text>
                                    <Text style={styles.pp_txt_desc}>
                                        {(UserDataStore?.user_data
                                            ?.followers_l as number) === 1
                                            ? 'Follower'
                                            : 'Followers'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={open_followings}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text style={styles.pp_txt_val}>
                                        {high_nums_converter({
                                            number: UserDataStore?.user_data
                                                ?.following_l as number,
                                        })}
                                    </Text>
                                    <Text style={styles.pp_txt_desc}>
                                        {(UserDataStore?.user_data
                                            ?.following_l as number) === 1
                                            ? 'Following'
                                            : 'Followings'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={styles.pp_txt_val}>
                                    {high_nums_converter({
                                        number: UserDataStore?.user_data
                                            ?.blogs_l as number,
                                    })}
                                </Text>
                                <Text style={styles.pp_txt_desc}>
                                    {(UserDataStore?.user_data
                                        ?.blogs_l as number) === 1
                                        ? 'Post'
                                        : 'Posts'}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            marginHorizontal: 22,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={[
                                        styles.pp_txt_val,
                                        { fontSize: 18 },
                                    ]}>
                                    {shorten_text({
                                        text: UserDataStore?.user_data
                                            ?.username as string,
                                        limit: 25,
                                    })}
                                </Text>
                                {UserDataStore?.user_data?.verified && (
                                    <Image
                                        source={require('../../Images/Icons/Verified_Icon.png')}
                                        style={{
                                            width: 16,
                                            height: 16,
                                            marginLeft: 3,
                                        }}
                                    />
                                )}
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 5,
                                }}>
                                <Text
                                    style={{
                                        fontFamily: fonts.OpenSans_500,
                                        fontSize: 16,
                                    }}>
                                    {'Joined: '}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: fonts.OpenSans_300,
                                        fontSize: 16,
                                    }}>
                                    {getCustomTimeAgo({
                                        date_string: UserDataStore?.user_data
                                            ?.createdAt as string,
                                    })}
                                </Text>
                            </View>
                        </View>
                        <BasicButton2
                            buttonText={'Edit'}
                            buttonHeight={38}
                            borderRaduis={5}
                            paddingHorizontal={15}
                            execFunc={edit_profile}
                        />
                    </View>
                    <TextDivider
                        singleLine
                        marginHorizontal={22}
                        marginTop={15}
                        marginBottom={15}
                    />
                    <Text
                        style={{
                            fontFamily: fonts.OpenSans_700,
                            fontSize: 24,
                            color: Colors().Dark,
                            lineHeight: 33,
                            marginBottom: 20,
                            marginHorizontal: 22,
                        }}>
                        Your Posts
                    </Text>
                    {isAuthorsBlogLoading ? (
                        <OverlaySpinner2 showSpinner={isAuthorsBlogLoading} />
                    ) : (
                        <ScrollView style={{ flex: 1, paddingHorizontal: 22 }}>
                            <View
                                style={{
                                    flex: 1,
                                }}>
                                {!(authorsBlog as any)?.error &&
                                    (
                                        (authorsBlog as any)
                                            ?.data as INTF_BlogPost[]
                                    )?.length > 0 &&
                                    (
                                        (authorsBlog as any)
                                            ?.data as INTF_BlogPost[]
                                    )?.map(
                                        (
                                            item: INTF_BlogPost,
                                            index: number,
                                        ) => (
                                            <MiniBlogCard
                                                key={item?.bid}
                                                blog_post={item}
                                                index={index}
                                                tags={AppTagsStore?.app_tags}
                                            />
                                        ),
                                    )}
                                {!(authorsBlog as any)?.error &&
                                    (
                                        (authorsBlog as any)
                                            ?.data as INTF_BlogPost[]
                                    )?.length <= 0 && (
                                        <Text
                                            style={{
                                                flex: 1,
                                                textAlign: 'center',
                                                marginTop: 100,
                                                fontFamily: fonts.Urbanist_500,
                                                fontSize: 16,
                                            }}>
                                            {'No Posts Available'}
                                        </Text>
                                    )}
                            </View>
                        </ScrollView>
                    )}
                </View>
            )}
        </View>
    );
});

export default ProfilePage;

const styles = StyleSheet.create({
    pp_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
    pp_w_i_c: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 100,
        padding: 3,
        borderColor: Colors().Grey,
        borderWidth: 2,
    },
    pp_w_i: {
        borderRadius: 100,
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    pp_txt_val: {
        fontFamily: fonts.Urbanist_600,
        fontSize: 18,
        color: Colors().Black,
    },
    pp_txt_desc: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 15,
        color: Colors().DarkGrey,
    },
});
