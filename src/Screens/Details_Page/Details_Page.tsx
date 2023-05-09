import React, { FunctionComponent, useEffect, useState } from 'react';
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
import { dislike_blog, like_blog } from '../../Configs/Queries/Blogs/Blogs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import BackButton from '../../Components/Back_Button/Back_Button';
import { query_id } from '../../Configs/Queries/Query_ID/Query_ID';
import { get_blog_info } from '../../Configs/Queries/Blogs/Blogs';
import { INTF_BlogDetails } from '../../Interface/Blog_Details/Blog_Details';
import { fonts } from '../../Configs/Fonts/Fonts';
import { mongo_date_converter_3 } from '../../Utils/Mongo_Date_Converter/Mongo_Date_Converter';
import { high_nums_converter } from '../../Utils/High_Nums_Converter/High_Nums_Converter';
import BasicButton from '../../Components/Basic_Button/Basic_Button';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { BottomSheetStore } from '../../MobX/Bottom_Sheet/Bottom_Sheet';
import { CurrentCommentsStore } from '../../MobX/Current_Comments/Current_Comments';
import { INTF_Comments } from '../../Interface/Comments/Comments';
import { AppTagsStore } from '../../MobX/App_Tags/App_Tags';
import { Observer } from 'mobx-react';
import { info_handler } from '../../Utils/Info_Handler/Info_Handler';

const DetailsPage: FunctionComponent = () => {
    const queryClient = useQueryClient();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);
    const [blogInfo, setBlogInfo] = useState<INTF_BlogDetails>({});

    const {
        data: blogData,
        refetch: refetchBlog,
        isLoading,
    } = useQuery(
        query_id({ id: route?.params?.bid }).blog_with_id,
        () =>
            get_blog_info({
                user_token: UserInfoStore?.user_info?.token,
                blogID: route?.params?.bid,
            }),
        {
            refetchInterval: 5 * 60 * 1000,
            retry: 5,
            refetchIntervalInBackground: true,
        },
    );

    const { mutate: like_blog_mutate } = useMutation(like_blog, {
        onMutate: () => {
            // TODO: useState used to simulate instant Server Response.
            setLiked(true);
            setLikes(likes <= 0 ? 1 : likes + 1);
        },
        onSettled: data => {
            if (data?.error) {
                setLiked(false);
                setLikes(likes <= 0 ? 0 : likes - 1);
            } else {
                setLiked(true);
                queryClient.cancelQueries([
                    query_id({ id: route?.params?.bid })?.blog_with_id,
                ]);
                const old_data: {
                    data: INTF_BlogDetails;
                    error: boolean;
                } = queryClient.getQueryData(
                    query_id({ id: route?.params?.bid })?.blog_with_id,
                    // @ts-ignore
                ) as {
                    data: INTF_BlogDetails;
                    error: boolean;
                };
                const new_data: {
                    data: INTF_BlogDetails;
                    error: boolean;
                } = {
                    data: {
                        ...old_data?.data,
                        likes_l:
                            (old_data?.data?.likes_l as number) + 1 <= 0
                                ? 1
                                : (old_data?.data?.likes_l as number) + 1,
                        liked: true,
                    },
                    error: false,
                };
                queryClient?.setQueryData(
                    query_id({ id: route?.params?.bid })?.blog_with_id,
                    new_data,
                );
                queryClient.resumePausedMutations();
            }
        },
    });

    const { mutate: dislike_blog_mutate } = useMutation(dislike_blog, {
        onMutate: () => {
            setLiked(false);
            setLikes(likes <= 0 ? 0 : likes - 1);
        },
        onSettled: async data => {
            if (data?.error) {
                setLiked(true);
                setLikes(likes <= 0 ? 1 : likes + 1);
            } else {
                setLiked(false);
                queryClient.cancelQueries([
                    query_id({ id: route?.params?.bid })?.blog_with_id,
                ]);
                const old_data: {
                    data: INTF_BlogDetails;
                    error: boolean;
                } = queryClient.getQueryData(
                    query_id({ id: route?.params?.bid })?.blog_with_id,
                    // @ts-ignore
                ) as {
                    data: INTF_BlogDetails;
                    error: boolean;
                };
                const new_data: {
                    data: INTF_BlogDetails;
                    error: boolean;
                } = {
                    data: {
                        ...old_data?.data,
                        likes_l:
                            (old_data?.data?.likes_l as number) - 1 <= 0
                                ? 0
                                : (old_data?.data?.likes_l as number) - 1,
                        liked: false,
                    },
                    error: false,
                };
                queryClient?.setQueryData(
                    query_id({ id: route?.params?.bid })?.blog_with_id,
                    new_data,
                );
                queryClient.resumePausedMutations();
            }
        },
    });

    const like_func = no_double_clicks({
        execFunc: () => {
            if (liked) {
                dislike_blog_mutate({
                    blogID: blogInfo?.bid as string,
                    user_token: UserInfoStore.user_info?.token as string,
                });
            } else {
                like_blog_mutate({
                    blogID: blogInfo?.bid as string,
                    user_token: UserInfoStore.user_info?.token as string,
                });
            }
        },
    });

    const nav_to_likes_page = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'LikesPage',
                    params: {
                        bid: blogInfo?.bid,
                    },
                } as never,
            );
        },
    });

    const nav_to_authors_page = no_double_clicks({
        execFunc: () => {
            if (blogInfo?.author !== 'Not Found') {
                navigation.push(
                    'HomeStack' as never,
                    {
                        screen: 'AuthorsPage',
                        params: {
                            aid: blogInfo?.a_id,
                        },
                    } as never,
                );
            }
        },
    });

    const refetch_blog = no_double_clicks({
        execFunc: () => {
            refetchBlog();
        },
    });

    const control_comment = no_double_clicks({
        execFunc: () => {
            if (BottomSheetStore?.is_bottom_sheet) {
                BottomSheetStore.close_bottom_sheet();
            } else {
                if (CurrentCommentsStore.current_comments?.length > 0) {
                    BottomSheetStore.open_bottom_sheet({
                        component_type: 2,
                    });
                }
            }
        },
    });

    const reply_blog_func = no_double_clicks({
        execFunc: () => {
            if (BottomSheetStore?.is_bottom_sheet) {
                BottomSheetStore.close_bottom_sheet();
            } else {
                BottomSheetStore.open_bottom_sheet({
                    component_type: 3,
                });
            }
        },
    });

    const delete_blog_func = no_double_clicks({
        execFunc: () => {
            info_handler({
                navigation: navigation,
                hide_back_btn: false,
                success_mssg:
                    "Are you sure you want to 'Delete' this Blog Post?",
                proceed_type: 5,
                hide_header: true,
            });
        },
    });

    useEffect(() => {
        if (!blogData?.error) {
            const p_blogData: INTF_BlogDetails = blogData?.data;
            if (p_blogData !== undefined) {
                setBlogInfo(p_blogData);
                setLiked(p_blogData?.liked as boolean);
                setLikes(p_blogData?.likes_l as number);
                CurrentCommentsStore.set_comments({
                    svr_comments: p_blogData?.comments as INTF_Comments[],
                });
            }
        }
    }, [blogData]);

    useEffect(() => {
        CurrentCommentsStore?.set_current_blog_id({
            blogID: route?.params?.bid,
        });
    }, [route]);

    return (
        <View style={styles.bdp_main}>
            <CustomStatusBar
                showSpinner={showSpinner || isLoading}
                backgroundColor={Colors().Background}
                backgroundDimColor={Colors().BackgroundDim}
            />
            <OverlaySpinner
                showSpinner={showSpinner || isLoading}
                setShowSpinner={setShowSpinner}
            />
            <View
                style={{
                    marginLeft: 22,
                    marginTop: navigation?.canGoBack()
                        ? Platform?.OS === 'ios'
                            ? 56
                            : 40
                        : Platform.OS === 'ios'
                        ? 70
                        : 40,
                    marginBottom: 5,
                }}>
                {navigation.canGoBack() && <BackButton />}
            </View>
            {!isLoading && !blogData?.error && !showSpinner && (
                <View style={{ flex: 1 }}>
                    <ScrollView
                        style={{
                            paddingHorizontal: 20,
                        }}>
                        <View
                            style={{
                                marginTop: 20,
                                marginBottom: 20,
                                maxHeight: 250,
                            }}>
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 16,
                                    resizeMode: 'cover',
                                }}
                                source={
                                    blogInfo?.b_dp_link === 'none' ||
                                    blogInfo?.b_dp_link === undefined
                                        ? require('../../Images/Extra/No_Blog_Image.png')
                                        : {
                                              uri: blogInfo?.b_dp_link,
                                              width: '100%',
                                              height: '100%',
                                          }
                                }
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 12,
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#f2f2f2',
                                    borderRadius: 6,
                                }}>
                                <Observer>
                                    {() => (
                                        <Text
                                            style={{
                                                fontFamily: fonts.OpenSans_400,
                                                margin: 7,
                                                lineHeight: 18,
                                                color: Colors().Black,
                                                fontSize: 12,
                                            }}>
                                            {AppTagsStore?.app_tags?.[
                                                blogInfo?.tags?.[0] as number
                                            ]?.tag_name === undefined ||
                                            AppTagsStore?.app_tags?.[
                                                blogInfo?.tags?.[0] as number
                                            ]?.tag_name === null
                                                ? 'Loading...'
                                                : AppTagsStore?.app_tags?.[
                                                      blogInfo
                                                          ?.tags?.[0] as number
                                                  ]?.tag_name}
                                        </Text>
                                    )}
                                </Observer>
                            </View>
                            <TouchableOpacity
                                onPress={nav_to_likes_page}
                                style={{
                                    marginLeft: 'auto',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: Colors().Grey2,
                                        fontFamily: fonts.OpenSans_300,
                                    }}>
                                    {blogInfo?.createdAt
                                        ? mongo_date_converter_3({
                                              input_mongo_date:
                                                  blogInfo?.createdAt as string,
                                          })
                                        : ''}
                                </Text>
                                <View
                                    style={{
                                        backgroundColor: Colors().Grey2,
                                        marginHorizontal: 5,
                                        width: 3,
                                        height: 3,
                                    }}>
                                    {''}
                                </View>
                                <Text
                                    style={{
                                        color: Colors().Grey2,
                                        fontFamily: fonts.OpenSans_300,
                                        marginRight: 10,
                                    }}>
                                    {(blogInfo?.likes_l as number) === 1
                                        ? '1 like'
                                        : `${high_nums_converter({
                                              number: likes,
                                          })} likes`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text
                            selectable
                            style={{
                                fontFamily: fonts.OpenSans_700,
                                fontSize: 24,
                                color: Colors().Black,
                                marginBottom: 5,
                            }}>
                            {blogInfo?.title}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.65}
                            onPress={nav_to_authors_page}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Image
                                style={{
                                    width: 30,
                                    maxWidth: 30,
                                    height: 30,
                                    maxHeight: 30,
                                    borderRadius: 30,
                                    resizeMode: 'cover',
                                }}
                                source={
                                    blogInfo?.a_dp_link === 'none' ||
                                    blogInfo?.a_dp_link === undefined
                                        ? require('../../Images/Extra/default_user_dp_light.jpg')
                                        : {
                                              uri: blogInfo?.a_dp_link,
                                              width: 30,
                                              height: 30,
                                          }
                                }
                            />
                            <Text
                                style={{
                                    marginLeft: 8,
                                    color: Colors().Black,
                                    fontFamily: fonts.OpenSans_400,
                                    fontSize: 13,
                                }}>{`By: ${blogInfo?.author}`}</Text>
                            {blogInfo?.averified && (
                                <Image
                                    source={require('../../Images/Icons/Verified_Icon.png')}
                                    style={{
                                        width: 16,
                                        height: 16,
                                        marginLeft: 2,
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                        <Text
                            selectable
                            style={{
                                marginTop: 20,
                                fontFamily: fonts.OpenSans_400,
                                fontSize: 16,
                                color: Colors().Black,
                            }}>
                            {blogInfo?.message}
                        </Text>
                        <View
                            style={{
                                marginBottom: 100,
                            }}>
                            {''}
                        </View>
                    </ScrollView>
                    <View
                        style={{
                            backgroundColor: Colors().White,
                            height: Platform?.OS === 'ios' ? 85 : 70,
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingBottom: Platform?.OS === 'ios' ? 25 : 10,
                            paddingHorizontal: 25,
                            borderTopWidth: 1,
                            borderTopColor: Colors().SearchBarBG,
                            zIndex: 2,
                        }}>
                        <TouchableOpacity
                            onPress={like_func}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            {
                                <Image
                                    style={{
                                        width: 35,
                                        height: 35,
                                    }}
                                    source={
                                        liked
                                            ? require('../../Images/Icons/Like_Icon.png')
                                            : require('../../Images/Icons/Dislike_Icon.png')
                                    }
                                />
                            }
                            <Text
                                style={{
                                    color: Colors().Grey,
                                    marginLeft: 1,
                                    fontSize: 18,
                                    fontFamily: fonts.Urbanist_500,
                                    marginBottom: 4,
                                }}>
                                {high_nums_converter({
                                    number: blogInfo?.likes_l as number,
                                })}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={control_comment}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 40,
                            }}>
                            <Feather
                                name="message-square"
                                size={30}
                                color={Colors().Grey}
                            />
                            <Text
                                style={{
                                    color: Colors().Grey,
                                    marginLeft: 4,
                                    fontSize: 18,
                                    fontFamily: fonts.Urbanist_500,
                                    marginBottom: 4,
                                }}>
                                {high_nums_converter({
                                    number: CurrentCommentsStore
                                        ?.current_comments?.length,
                                })}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={reply_blog_func}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 'auto',
                            }}>
                            <MaterialIcons
                                name="comment-plus-outline"
                                size={30}
                                color={Colors().Grey}
                            />
                        </TouchableOpacity>
                        {blogInfo?.isowner && (
                            <TouchableOpacity
                                onPress={reply_blog_func}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 30,
                                    marginBottom: 2,
                                }}>
                                <Feather
                                    name="edit"
                                    size={28}
                                    color={Colors().Grey}
                                />
                            </TouchableOpacity>
                        )}
                        {blogInfo?.isowner && (
                            <TouchableOpacity
                                onPress={delete_blog_func}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 30,
                                    marginBottom: 2,
                                }}>
                                <Feather
                                    name="trash-2"
                                    size={28}
                                    color={Colors().Grey}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
            {!isLoading && blogData?.error && !showSpinner && (
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 22,
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            marginTop: 300,
                            fontFamily: fonts.OpenSans_400,
                            color: Colors().Black,
                        }}>
                        An error occured. Please check your Internet
                        Connectivity and try again!
                    </Text>
                    <BasicButton
                        buttonText="Try Again"
                        marginTop={50}
                        execFunc={refetch_blog}
                    />
                </View>
            )}
        </View>
    );
};

export default DetailsPage;

const styles = StyleSheet.create({
    bdp_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
});
