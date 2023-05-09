import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { INTF_BlogPost } from '../../Interface/Blog_Post/Blog_Post';
import { shorten_text } from '../../Utils/Shorten_Text/Shorten_Text';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { mongo_date_converter_3 } from '../../Utils/Mongo_Date_Converter/Mongo_Date_Converter';
import { high_nums_converter } from '../../Utils/High_Nums_Converter/High_Nums_Converter';
import { INTF_Tag } from '../../Interface/Tags/Tags';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

interface MiniBlogCardProps {
    blog_post: INTF_BlogPost;
    index: number;
    tags: INTF_Tag[];
}

const MiniBlogCard: FunctionComponent<MiniBlogCardProps> = ({
    blog_post,
    tags,
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const first_tag = blog_post?.tags?.[0];

    const nav_to_likes_page = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'LikesPage',
                    params: {
                        bid: blog_post?.bid,
                    },
                } as never,
            );
        },
    });

    const nav_to_authors_page = no_double_clicks({
        execFunc: () => {
            if (blog_post?.author !== 'Not Found') {
                navigation.push(
                    'HomeStack' as never,
                    {
                        screen: 'AuthorsPage',
                        params: {
                            aid: blog_post?.aid,
                        },
                    } as never,
                );
            }
        },
    });

    const nav_to_blog_desc_page = no_double_clicks({
        execFunc: () => {
            navigation.push(
                'HomeStack' as never,
                {
                    screen: 'DetailsPage',
                    params: {
                        bid: blog_post?.bid,
                    },
                } as never,
            );
        },
    });

    return (
        <View style={styles.bc_main}>
            <TouchableOpacity activeOpacity={1} onPress={nav_to_blog_desc_page}>
                <Image
                    style={styles.bc_m_image}
                    source={
                        blog_post?.b_dp_link === 'none'
                            ? require('../../Images/Extra/No_Blog_Image.png')
                            : {
                                  uri: blog_post?.b_dp_link,
                                  width: 289,
                                  height: 176,
                              }
                    }
                />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            marginRight: 'auto',
                        }}
                        activeOpacity={1}
                        onPress={nav_to_blog_desc_page}>
                        <View
                            style={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: 6,
                            }}>
                            <Text
                                style={{
                                    fontFamily: fonts.OpenSans_400,
                                    margin: 6,
                                    fontSize: 10,
                                    color: Colors().Dark,
                                }}>
                                {tags[(first_tag as number) || 0]?.tag_name
                                    ? tags[(first_tag as number) || 0]?.tag_name
                                    : 'Loading...'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={nav_to_likes_page}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                color: Colors().Grey2,
                                fontFamily: fonts.OpenSans_300,
                            }}>
                            {mongo_date_converter_3({
                                input_mongo_date:
                                    blog_post?.createdAt as string,
                            })}
                        </Text>
                        <Text
                            style={{
                                backgroundColor: Colors().Grey2,
                                marginHorizontal: 5,
                                width: 3,
                                height: 3,
                                alignSelf: 'center',
                            }}>
                            {''}
                        </Text>
                        <Text
                            style={{
                                color: Colors().Grey2,
                                fontFamily: fonts.OpenSans_300,
                            }}>
                            {(blog_post?.likes_l as number) === 1
                                ? '1 like'
                                : `${high_nums_converter({
                                      number: blog_post?.likes_l as number,
                                  })} likes`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={nav_to_blog_desc_page}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: fonts.OpenSans_700,
                            marginBottom: 1,
                            marginTop: 9,
                            color: Colors().Dark,
                        }}>
                        {shorten_text({
                            text: blog_post?.title as string,
                            limit: 63,
                        })}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={nav_to_authors_page}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontFamily: fonts.OpenSans_400,
                            fontSize: 12,
                            color: '#333333',
                        }}>{`By: ${shorten_text({
                        text: blog_post?.author as string,
                        limit: 25,
                    })}`}</Text>
                    {blog_post?.averified && (
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
            </View>
        </View>
    );
};

export default MiniBlogCard;

const styles = StyleSheet.create({
    bc_main: {
        flex: 1,
        minHeight: 100,
        maxHeight: 100,
        borderRadius: 16,
        marginBottom: 20,
        flexDirection: 'row',
    },
    bc_m_image: {
        width: 100,
        height: 100,
        borderRadius: 16,
        resizeMode: 'cover',
        marginRight: 12,
    },
});
