import React, { FunctionComponent, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../../Components/Search_Bar/Search_Bar';
import { useQueries } from 'react-query';
import {
    get_blogs,
    get_foryou_blogs,
    get_trending_blogs,
} from '../../Configs/Queries/Blogs/Blogs';
import { query_id } from '../../Configs/Queries/Query_ID/Query_ID';
import BlogCard from '../../Components/Blog_Card/Blog_Card';
import { INTF_BlogPost } from '../../Interface/Blog_Post/Blog_Post';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import TextDivider from '../../Components/Text_Divider/Text_Divider';
import MiniBlogCard from '../../Components/Mini_Blog_Card/Mini_Blog_Card';
import { SearchTagsStore } from '../../MobX/Search_Tags/Search_Tags';
import { observer } from 'mobx-react';
import OctIcons from 'react-native-vector-icons/Octicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheetStore } from '../../MobX/Bottom_Sheet/Bottom_Sheet';
import { UserInfoStore } from '../../MobX/User_Info/User_Info';
import { AppTagsStore } from '../../MobX/App_Tags/App_Tags';

const HomePage: FunctionComponent = observer(() => {
    const [search, setSearch] = useState<string>('');
    const searchTags = SearchTagsStore.search_tags;

    const [
        {
            data: allBlogsData,
            refetch: refetechAllBlogs,
            isFetching: isFetchingAllBlogs,
        },
        { data: forYouBlogsData },
        { data: trendingBlogsData },
    ] = useQueries([
        {
            queryKey: query_id({}).blogs,
            queryFn: () =>
                get_blogs({
                    search: search?.length <= 1 ? '' : search,
                    paginationIndex: 0,
                    user_token: UserInfoStore?.user_info?.token as string,
                    tags: searchTags,
                }),
            cacheTime: 300000,
            staleTime: 300000,
            retry: 3,
            enabled: false,
        },
        {
            queryKey: query_id({}).foryoublogs,
            queryFn: () =>
                get_foryou_blogs({
                    user_token: UserInfoStore?.user_info?.token as string,
                    paginationIndex: 0,
                }),
            cacheTime: 300000,
            staleTime: 300000,
            retry: 3,
        },
        {
            queryKey: query_id({}).trendingblogs,
            queryFn: () =>
                get_trending_blogs({
                    user_token: UserInfoStore?.user_info?.token as string,
                    paginationIndex: 0,
                }),
            cacheTime: 300000,
            staleTime: 300000,
            retry: 3,
        },
    ]);

    useEffect(() => {
        refetechAllBlogs();
    }, [searchTags, refetechAllBlogs]);

    return (
        <View style={styles.home_main}>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: Platform?.OS === 'ios' ? 80 : 40,
                    marginBottom: 7,
                    marginRight: 12,
                    marginLeft: 22,
                }}>
                <SearchBar
                    inputValue={search}
                    setInputValue={setSearch}
                    placeHolderText="Search..."
                    inputMode="search"
                    marginRight={5}
                    onSearch={() => refetechAllBlogs()}
                    onClearText={() =>
                        !isFetchingAllBlogs && refetechAllBlogs()
                    }
                />
                <TouchableOpacity
                    onPress={() => {
                        if (BottomSheetStore?.is_bottom_sheet) {
                            BottomSheetStore.close_bottom_sheet();
                        } else {
                            BottomSheetStore.open_bottom_sheet({
                                component_type: 1,
                            });
                        }
                    }}
                    style={{
                        width: 50,
                        height: 56,
                        maxHeight: 56,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <OctIcons name="filter" size={28} color={Colors().Black} />
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }}>
                {searchTags?.length === 0 &&
                    search?.length === 0 &&
                    !trendingBlogsData?.error &&
                    trendingBlogsData?.data?.length > 0 && (
                        <Text style={styles.hm_header}>Trending</Text>
                    )}
                {searchTags?.length === 0 &&
                    search?.length === 0 &&
                    !trendingBlogsData?.error &&
                    trendingBlogsData?.data?.length > 0 && (
                        <View
                            style={{
                                alignSelf: 'center',
                                marginBottom: 20,
                                width: '100%',
                            }}>
                            <ScrollView
                                style={{
                                    minHeight: 278,
                                    maxHeight: 278,
                                }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {!trendingBlogsData?.error &&
                                    (
                                        trendingBlogsData?.data as INTF_BlogPost[]
                                    )?.map(
                                        (
                                            item: INTF_BlogPost,
                                            index: number,
                                        ) => (
                                            <BlogCard
                                                key={'Trending' + item?.bid}
                                                blog_post={item}
                                                index={index}
                                                tags={AppTagsStore?.app_tags}
                                            />
                                        ),
                                    )}
                            </ScrollView>
                        </View>
                    )}
                {searchTags?.length === 0 &&
                    search?.length === 0 &&
                    !trendingBlogsData?.error &&
                    trendingBlogsData?.data?.length > 0 && (
                        <View
                            style={{
                                marginHorizontal: 20,
                            }}>
                            <TextDivider singleLine />
                        </View>
                    )}
                {/* Slice Data to include Recommended Data */}
                <View
                    style={{
                        marginHorizontal: 22,
                        marginTop: 24,
                    }}>
                    {!allBlogsData?.error &&
                        (
                            allBlogsData?.data?.slice(0, 5) as INTF_BlogPost[]
                        )?.map((item: INTF_BlogPost, index: number) => (
                            <MiniBlogCard
                                key={'All' + item?.bid}
                                blog_post={item}
                                index={index}
                                tags={AppTagsStore?.app_tags}
                            />
                        ))}
                </View>
                {searchTags?.length === 0 &&
                    search?.length === 0 &&
                    !forYouBlogsData?.error &&
                    forYouBlogsData?.data?.length > 0 && (
                        <View
                            style={{
                                marginHorizontal: 20,
                                marginTop: 10,
                            }}>
                            <TextDivider singleLine />
                        </View>
                    )}
                {searchTags?.length === 0 &&
                    search?.length === 0 &&
                    !forYouBlogsData?.error &&
                    forYouBlogsData?.data?.length > 0 && (
                        <Text style={styles.hm_header}>Recommended</Text>
                    )}
                {searchTags?.length === 0 &&
                    search?.length === 0 &&
                    !forYouBlogsData?.error &&
                    forYouBlogsData?.data?.length > 0 && (
                        <View
                            style={{
                                alignSelf: 'center',
                                marginBottom: 20,
                            }}>
                            <ScrollView
                                style={{
                                    minHeight: 278,
                                    maxHeight: 278,
                                }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {!forYouBlogsData?.error &&
                                    (
                                        forYouBlogsData?.data as INTF_BlogPost[]
                                    )?.map(
                                        (
                                            item: INTF_BlogPost,
                                            index: number,
                                        ) => (
                                            <BlogCard
                                                key={'ForYou' + item?.bid}
                                                blog_post={item}
                                                index={index}
                                                tags={AppTagsStore?.app_tags}
                                            />
                                        ),
                                    )}
                            </ScrollView>
                        </View>
                    )}
                {searchTags?.length === 0 &&
                    search?.length === 0 &&
                    !forYouBlogsData?.error &&
                    forYouBlogsData?.data?.length > 0 && (
                        <View
                            style={{
                                marginHorizontal: 20,
                            }}>
                            <TextDivider singleLine />
                        </View>
                    )}
                <View
                    style={{
                        marginHorizontal: 22,
                        marginTop:
                            searchTags?.length === 0 &&
                            search?.length === 0 &&
                            !forYouBlogsData?.error &&
                            forYouBlogsData?.data?.length > 0
                                ? 24
                                : 0,
                    }}>
                    {!allBlogsData?.error &&
                        (
                            allBlogsData?.data?.slice(
                                5,
                                allBlogsData?.data?.length,
                            ) as INTF_BlogPost[]
                        )?.map((item: INTF_BlogPost, index: number) => (
                            <MiniBlogCard
                                key={'All' + item?.bid}
                                blog_post={item}
                                index={index}
                                tags={AppTagsStore?.app_tags}
                            />
                        ))}
                </View>
                {/* Just for Padding at the Bottom */}
                <View
                    style={{
                        marginBottom: 20,
                    }}>
                    {''}
                </View>
            </ScrollView>
        </View>
    );
});

export default HomePage;

const styles = StyleSheet.create({
    home_main: {
        flex: 1,
        backgroundColor: Colors().Background,
    },
    hm_header: {
        fontFamily: fonts.OpenSans_700,
        fontSize: 24,
        marginLeft: 22,
        marginTop: 24,
        color: Colors().Dark,
        lineHeight: 33,
        marginBottom: 16,
    },
});
