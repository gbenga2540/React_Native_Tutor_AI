import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';
import { INTF_Tag } from '../../Interface/Tags/Tags';
import { SearchTagsStore } from '../../MobX/Search_Tags/Search_Tags';
import { observer } from 'mobx-react';
import { no_double_clicks } from '../../Utils/No_Double_Clicks/No_Double_Clicks';

interface TagButtonProps {
    tag: INTF_Tag;
}
const TagButton: FunctionComponent<TagButtonProps> = observer(({ tag }) => {
    const [active, setActive] = useState<boolean>(false);
    const SearchTags = SearchTagsStore?.search_tags;

    const update_search_tags_func = no_double_clicks({
        execFunc: () => {
            SearchTagsStore.update_search_tags({
                tag_index: tag.tag_index as number,
            });
        },
    });

    useEffect(() => {
        if (SearchTags?.includes(tag?.tag_index as number)) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [SearchTags, tag.tag_index]);

    return (
        <View
            style={{
                marginRight: 8,
                marginBottom: 8,
            }}>
            <TouchableOpacity
                onPress={update_search_tags_func}
                style={[
                    styles.tb_main,
                    {
                        borderColor: active ? Colors().Dark : Colors().Grey,
                        backgroundColor: active ? Colors().Dark : undefined,
                    },
                ]}>
                <Text
                    style={[
                        styles.tb_m_txt,
                        {
                            color: active ? Colors().White : Colors().Dark,
                        },
                    ]}>
                    {tag?.tag_name}
                </Text>
            </TouchableOpacity>
        </View>
    );
});

export default TagButton;

const styles = StyleSheet.create({
    tb_main: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 6,
    },
    tb_m_txt: {
        fontFamily: fonts.OpenSans_300,
        marginHorizontal: 8,
        marginVertical: 6,
        fontSize: 14,
    },
});
