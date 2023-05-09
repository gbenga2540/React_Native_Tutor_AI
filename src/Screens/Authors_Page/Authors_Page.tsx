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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackButton from '../../Components/Back_Button/Back_Button';
import { fonts } from '../../Configs/Fonts/Fonts';
import { high_nums_converter } from '../../Utils/High_Nums_Converter/High_Nums_Converter';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import { getCustomTimeAgo } from '../../Utils/Time_Converter/Time_Converter';
import { shorten_text } from '../../Utils/Shorten_Text/Shorten_Text';
import BasicButton2 from '../../Components/Basic_Button_2/Basic_Button_2';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { observer } from 'mobx-react';
import { useMutation, useQueries, useQueryClient } from 'react-query';
import {
    follow_author,
    get_author_blogs,
    get_author_info,
    unfollow_author,
} from '../../Configs/Queries/Users/Users';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { query_id } from '../../Configs/Queries/Query_ID/Query_ID';
import MiniBlogCard from '../../Components/Mini_Blog_Card/Mini_Blog_Card';
import { INTF_BlogPost } from '../../Interface/Blog_Post/Blog_Post';
import { AppTagsStore } from '../../MobX/App_Tags/App_Tags';
import { INTF_UserData } from '../../Interface/User_Data/User_Data';
import OverlaySpinner2 from '../../Components/Overlay_Spinner_2/Overlay_Spinner_2';

const AuthorsPage: FunctionComponent = observer(() => {
    const queryClient = useQueryClient();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [
        { data: authorsData },
        { data: authorsBlog, isLoading: isAuthorsBlogLoading },
    ] = useQueries([
        {
            queryKey: query_id({ id: route?.params?.aid }).user_with_id,
            queryFn: () =>
                get_author_info({
                    user_token: UserInfoStore?.user_info?.token,
                    authorID: route?.params?.aid,
                }),
            enabled:
                (UserInfoStore?.user_info?.token as string)?.length > 0 &&
                route?.params?.aid?.length > 0,
            retry: 3,
            cacheTime: 300000,
            staleTime: 300000,
        },
        {
            queryKey: query_id({ id: route?.params?.aid })
                ?.author_blogs_with_id,
            queryFn: () =>
                get_author_blogs({
                    authorID: route?.params?.aid as string,
                    user_token: UserInfoStore?.user_info?.token as string,
                    paginationIndex: 0 as number,
                }),
            retry: 3,
            cacheTime: 300000,
            staleTime: 300000,
        },
    ]);

    const { mutate: follow_author_mutate } = useMutation(follow_author, {
        onMutate: () => {
            queryClient.cancelQueries([
                query_id({ id: route?.params?.aid })?.user_with_id,
                query_id({ id: UserInfoStore?.user_info?.uid })?.user_with_id,
            ]);
            // !The Person you are following ->
            const old_data: {
                data: INTF_UserData;
                error: boolean;
            } = queryClient.getQueryData(
                query_id({ id: route?.params?.aid })?.user_with_id,
                // @ts-ignore
            ) as {
                data: INTF_UserData;
                error: boolean;
            };
            const new_data: {
                data: INTF_UserData;
                error: boolean;
            } = {
                data: {
                    ...old_data?.data,
                    followers_l:
                        (old_data?.data?.followers_l as number) + 1 <= 0
                            ? 1
                            : (old_data?.data?.followers_l as number) + 1,
                    followed: true,
                },
                error: false,
            };
            queryClient?.setQueryData(
                query_id({ id: route?.params?.aid })?.user_with_id,
                new_data,
            );
            // !The Person you are following

            // !Your Account Cache Update ->
            const old_data_2: {
                data: INTF_UserData;
                error: boolean;
            } = queryClient.getQueryData(
                query_id({ id: UserInfoStore?.user_info?.uid })?.user_with_id,
                // @ts-ignore
            ) as {
                data: INTF_UserData;
                error: boolean;
            };
            const new_data_2: {
                data: INTF_UserData;
                error: boolean;
            } = {
                data: {
                    ...old_data_2?.data,
                    following_l:
                        (old_data_2?.data?.following_l as number) + 1 <= 0
                            ? 1
                            : (old_data_2?.data?.following_l as number) + 1,
                },
                error: false,
            };
            queryClient?.setQueryData(
                query_id({ id: UserInfoStore?.user_info?.uid })?.user_with_id,
                new_data_2,
            );
            // !Your Account Cache Update
        },
        onSettled: async data => {
            if (data?.error) {
                queryClient.cancelQueries([
                    query_id({ id: route?.params?.aid })?.user_with_id,
                    query_id({ id: UserInfoStore?.user_info?.uid })
                        ?.user_with_id,
                ]);
                // !The Person you are following ->
                const old_data: {
                    data: INTF_UserData;
                    error: boolean;
                } = queryClient.getQueryData(
                    query_id({ id: route?.params?.aid })?.user_with_id,
                    // @ts-ignore
                ) as {
                    data: INTF_UserData;
                    error: boolean;
                };
                const new_data: {
                    data: INTF_UserData;
                    error: boolean;
                } = {
                    data: {
                        ...old_data?.data,
                        followers_l:
                            (old_data?.data?.followers_l as number) - 1 <= 0
                                ? 0
                                : (old_data?.data?.followers_l as number) - 1,
                        followed: false,
                    },
                    error: false,
                };
                queryClient?.setQueryData(
                    query_id({ id: route?.params?.aid })?.user_with_id,
                    new_data,
                );
                // !The Person you are following

                // !Your Account Cache Update ->
                const old_data_2: {
                    data: INTF_UserData;
                    error: boolean;
                } = queryClient.getQueryData(
                    query_id({ id: UserInfoStore?.user_info?.uid })
                        ?.user_with_id,
                    // @ts-ignore
                ) as {
                    data: INTF_UserData;
                    error: boolean;
                };
                const new_data_2: {
                    data: INTF_UserData;
                    error: boolean;
                } = {
                    data: {
                        ...old_data_2?.data,
                        following_l:
                            (old_data_2?.data?.following_l as number) - 1 <= 0
                                ? 0
                                : (old_data_2?.data?.following_l as number) - 1,
                    },
                    error: false,
                };
                queryClient?.setQueryData(
                    query_id({ id: UserInfoStore?.user_info?.uid })
                        ?.user_with_id,
                    new_data_2,
                );
                // !Your Account Cache Update
                queryClient.resumePausedMutations();
            }
        },
    });

    const { mutate: unfollow_author_mutate } = useMutation(unfollow_author, {
        onMutate: () => {
            queryClient.cancelQueries([
                query_id({ id: route?.params?.aid })?.user_with_id,
                query_id({ id: UserInfoStore?.user_info?.uid })?.user_with_id,
            ]);
            // !The Person you are following ->
            const old_data: {
                data: INTF_UserData;
                error: boolean;
            } = queryClient.getQueryData(
                query_id({ id: route?.params?.aid })?.user_with_id,
                // @ts-ignore
            ) as {
                data: INTF_UserData;
                error: boolean;
            };
            const new_data: {
                data: INTF_UserData;
                error: boolean;
            } = {
                data: {
                    ...old_data?.data,
                    followers_l:
                        (old_data?.data?.followers_l as number) - 1 <= 0
                            ? 0
                            : (old_data?.data?.followers_l as number) - 1,
                    followed: false,
                },
                error: false,
            };
            queryClient?.setQueryData(
                query_id({ id: route?.params?.aid })?.user_with_id,
                new_data,
            );
            // !The Person you are following

            // !Your Account Cache Update ->
            const old_data_2: {
                data: INTF_UserData;
                error: boolean;
            } = queryClient.getQueryData(
                query_id({ id: UserInfoStore?.user_info?.uid })?.user_with_id,
                // @ts-ignore
            ) as {
                data: INTF_UserData;
                error: boolean;
            };
            const new_data_2: {
                data: INTF_UserData;
                error: boolean;
            } = {
                data: {
                    ...old_data_2?.data,
                    following_l:
                        (old_data_2?.data?.following_l as number) - 1 <= 0
                            ? 0
                            : (old_data_2?.data?.following_l as number) - 1,
                },
                error: false,
            };
            queryClient?.setQueryData(
                query_id({ id: UserInfoStore?.user_info?.uid })?.user_with_id,
                new_data_2,
            );
            // !Your Account Cache Update
        },
        onSettled: async data => {
            if (data?.error) {
                queryClient.cancelQueries([
                    query_id({ id: route?.params?.aid })?.user_with_id,
                    query_id({ id: UserInfoStore?.user_info?.uid })
                        ?.user_with_id,
                ]);
                // !The Person you are following ->
                const old_data: {
                    data: INTF_UserData;
                    error: boolean;
                } = queryClient.getQueryData(
                    query_id({ id: route?.params?.aid })?.user_with_id,
                    // @ts-ignore
                ) as {
                    data: INTF_UserData;
                    error: boolean;
                };
                const new_data: {
                    data: INTF_UserData;
                    error: boolean;
                } = {
                    data: {
                        ...old_data?.data,
                        followers_l:
                            (old_data?.data?.followers_l as number) + 1 <= 0
                                ? 1
                                : (old_data?.data?.followers_l as number) + 1,
                        followed: true,
                    },
                    error: false,
                };
                queryClient?.setQueryData(
                    query_id({ id: route?.params?.aid })?.user_with_id,
                    new_data,
                );
                // !The Person you are following

                // !Your Account Cache Update ->
                const old_data_2: {
                    data: INTF_UserData;
                    error: boolean;
                } = queryClient.getQueryData(
                    query_id({ id: UserInfoStore?.user_info?.uid })
                        ?.user_with_id,
                    // @ts-ignore
                ) as {
                    data: INTF_UserData;
                    error: boolean;
                };
                const new_data_2: {
                    data: INTF_UserData;
                    error: boolean;
                } = {
                    data: {
                        ...old_data_2?.data,
                        following_l:
                            (old_data_2?.data?.following_l as number) + 1 <= 0
                                ? 1
                                : (old_data_2?.data?.following_l as number) + 1,
                    },
                    error: false,
                };
                queryClient?.setQueryData(
                    query_id({ id: UserInfoStore?.user_info?.uid })
                        ?.user_with_id,
                    new_data_2,
                );
                // !Your Account Cache Update
                queryClient.resumePausedMutations();
            }
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
                        aid: route?.params?.aid,
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
                        aid: route?.params?.aid,
                    },
                } as never,
            );
        },
    });

    const follow_unfollow_author = no_double_clicks({
        execFunc: () => {
            if (authorsData?.data?.followed) {
                unfollow_author_mutate({
                    authorID: route?.params?.aid as string,
                    user_token: UserInfoStore?.user_info?.token as string,
                });
            } else {
                follow_author_mutate({
                    authorID: route?.params?.aid as string,
                    user_token: UserInfoStore?.user_info?.token as string,
                });
            }
        },
    });

    return (
        <View style={styles.ap_main}>
            <CustomStatusBar
                showSpinner={showSpinner}
                backgroundColor={Colors().Background}
                backgroundDimColor={Colors().BackgroundDim}
            />
            <OverlaySpinner
                showSpinner={
                    showSpinner || Boolean(authorsData?.data?.uid) === false
                }
                setShowSpinner={setShowSpinner}
            />
            <View
                style={{
                    marginLeft: 22,
                    marginTop: Platform?.OS === 'ios' ? 56 : 40,
                    marginBottom: 5,
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            {Boolean(authorsData?.data?.uid) && (
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 20,
                        }}>
                        <View style={styles.ap_w_i_c}>
                            {authorsData?.data?.dp_link &&
                            authorsData?.data?.dp_link !== 'none' ? (
                                <Image
                                    style={styles.ap_w_i}
                                    source={{
                                        uri: authorsData?.data?.dp_link,
                                        width: 100,
                                        height: 100,
                                    }}
                                />
                            ) : (
                                <Image
                                    style={styles.ap_w_i}
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
                                    <Text style={styles.ap_txt_val}>
                                        {high_nums_converter({
                                            number: authorsData?.data
                                                ?.followers_l as number,
                                        })}
                                    </Text>
                                    <Text style={styles.ap_txt_desc}>
                                        {(authorsData?.data
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
                                    <Text style={styles.ap_txt_val}>
                                        {high_nums_converter({
                                            number: authorsData?.data
                                                ?.following_l as number,
                                        })}
                                    </Text>
                                    <Text style={styles.ap_txt_desc}>
                                        {(authorsData?.data
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
                                <Text style={styles.ap_txt_val}>
                                    {high_nums_converter({
                                        number: authorsData?.data
                                            ?.blogs_l as number,
                                    })}
                                </Text>
                                <Text style={styles.ap_txt_desc}>
                                    {(authorsData?.data?.blogs_l as number) ===
                                    1
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
                                        styles.ap_txt_val,
                                        { fontSize: 18 },
                                    ]}>
                                    {shorten_text({
                                        text: authorsData?.data
                                            ?.username as string,
                                        limit: 25,
                                    })}
                                </Text>
                                {authorsData?.data?.verified && (
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
                                        date_string: authorsData?.data
                                            ?.createdAt as string,
                                    })}
                                </Text>
                            </View>
                        </View>
                        {!authorsData?.data?.isowner && (
                            <BasicButton2
                                buttonText={
                                    authorsData?.data?.followed
                                        ? 'following'
                                        : 'follow'
                                }
                                buttonHeight={38}
                                borderRaduis={5}
                                paddingHorizontal={15}
                                execFunc={follow_unfollow_author}
                            />
                        )}
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
                        Blog Posts
                    </Text>
                    {isAuthorsBlogLoading ? (
                        <OverlaySpinner2 showSpinner={isAuthorsBlogLoading} />
                    ) : (
                        <ScrollView style={{ flex: 1, paddingHorizontal: 22 }}>
                            <View
                                style={{
                                    flex: 1,
                                }}>
                                {!authorsBlog?.error &&
                                    (authorsBlog?.data as INTF_BlogPost[])
                                        ?.length > 0 &&
                                    (authorsBlog?.data as INTF_BlogPost[])?.map(
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
                                {!authorsBlog?.error &&
                                    (authorsBlog?.data as INTF_BlogPost[])
                                        ?.length <= 0 && (
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

export default AuthorsPage;

const styles = StyleSheet.create({
    ap_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
    ap_w_i_c: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 100,
        padding: 3,
        borderColor: Colors().Grey,
        borderWidth: 2,
    },
    ap_w_i: {
        borderRadius: 100,
        width: 100,
        height: 100,
    },
    ap_txt_val: {
        fontFamily: fonts.Urbanist_600,
        fontSize: 18,
        color: Colors().Black,
    },
    ap_txt_desc: {
        fontFamily: fonts.Urbanist_500,
        fontSize: 15,
        color: Colors().DarkGrey,
    },
});
