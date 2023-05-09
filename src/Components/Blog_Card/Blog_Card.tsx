import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { INTF_BlogPost } from '../../Interface/Blog_Post/Blog_Post';
import { shorten_text } from '../../Utils/Shorten_Text/Shorten_Text';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { mongo_date_converter_3 } from '../../Utils/Mongo_Date_Converter/Mongo_Date_Converter';
import { high_nums_converter } from '../../Utils/High_Nums_Converter/High_Nums_Converter';
import { INTF_Tag } from '../../Interface/Tags/Tags';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';
import { observer } from 'mobx-react';
interface BlogCardProps {
    blog_post: INTF_BlogPost;
    index: number;
    tags: INTF_Tag[];
}

const BlogCard: FunctionComponent<BlogCardProps> = observer(
    ({ blog_post, index, tags }) => {
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
            <View
                style={[{ marginLeft: index === 0 ? 22 : 0 }, styles.bc_main]}>
                {tags[(first_tag as number) || 0]?.tag_name && (
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={nav_to_blog_desc_page}
                        style={{
                            backgroundColor: 'rgba(80, 80, 80, 0.5)',
                            position: 'absolute',
                            zIndex: 1,
                            left: 12,
                            top: 12,
                            borderRadius: 6,
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.OpenSans_400,
                                margin: 6,
                                lineHeight: 18,
                                color: Colors().White,
                                fontSize: 11,
                            }}>
                            {tags[(first_tag as number) || 0]?.tag_name}
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={nav_to_blog_desc_page}>
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
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={nav_to_blog_desc_page}>
                    <Text style={styles.bc_m_title}>
                        {shorten_text({
                            text: blog_post?.title as string,
                            limit: 63,
                        })}
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
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
                            limit: 17,
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
                    <TouchableOpacity
                        onPress={nav_to_likes_page}
                        style={{
                            marginLeft: 'auto',
                            alignItems: 'center',
                            flexDirection: 'row',
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
                        <View
                            style={{
                                backgroundColor: Colors().Grey2,
                                marginHorizontal: 5,
                                width: 3,
                                height: 3,
                                alignSelf: 'center',
                            }}>
                            {''}
                        </View>
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
            </View>
        );
    },
);

export default BlogCard;

const styles = StyleSheet.create({
    bc_main: {
        width: 289,
        minHeight: 278,
        maxHeight: 278,
        marginRight: 20,
        borderRadius: 16,
    },
    bc_m_image: {
        width: 289,
        height: 176,
        borderRadius: 16,
        marginBottom: 12,
        resizeMode: 'cover',
    },
    bc_m_title: {
        fontSize: 18,
        fontFamily: fonts.OpenSans_700,
        lineHeight: 25,
        height: 51,
        marginBottom: 12,
        color: Colors().Dark,
    },
});
