import React, { FunctionComponent, ReactElement, useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import SearchBar from '../../Components/Search_Bar/Search_Bar';
import { glossary } from '../../../test/Data/Glossary';
import GlossaryItem from '../../Components/Glossary_Item/Glossary_Item';
import { sort_glossary_by_name } from '../../Utils/Sort_Glossary_By_Name/Sort_Glossary_By_Name';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';

const GlossaryPage: FunctionComponent = () => {
    const [search, setSearch] = useState<string>('');
    const p_glossary = sort_glossary_by_name({ glossary_list: glossary });

    return (
        <View style={styles.report_main}>
            <CustomStatusBar backgroundColor={Colors.Background} />
            <View
                style={{
                    marginTop:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 45,
                                  if_false: 65,
                              })
                            : 25,
                    marginHorizontal: 22,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <BackButton />
                <BasicText
                    inputText="Glossary"
                    textWeight={700}
                    textSize={20}
                    marginLeft={15}
                />
            </View>
            <View
                style={{
                    marginHorizontal: 22,
                    height: 56,
                    marginTop: 20,
                    marginBottom: 2,
                }}>
                <SearchBar
                    inputMode="search"
                    inputValue={search}
                    setInputValue={setSearch}
                    placeHolderText="Search"
                />
            </View>
            <FlatList
                data={p_glossary}
                keyExtractor={(item, index) =>
                    `${item?.word as string}-${index}`
                }
                renderItem={({ item, index }) => (
                    <GlossaryItem
                        key={`${item?.word as string}-${index}`}
                        word={item?.word}
                        meaning={item?.meaning}
                        index={index}
                        lastWordInit={
                            index === 0 ? '' : p_glossary[index - 1]?.word?.[0]
                        }
                    />
                )}
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    marginHorizontal: 2,
                    paddingBottom: Platform.OS === 'ios' ? 25 : 5,
                    marginBottom:
                        Platform.OS === 'ios'
                            ? screen_height_less_than({
                                  if_true: 10,
                                  if_false: 20,
                              })
                            : 5,
                }}
                ListFooterComponent={() =>
                    (
                        <View style={{ marginBottom: 50 }}>{''}</View>
                    ) as ReactElement<any>
                }
            />
        </View>
    );
};

export default GlossaryPage;

const styles = StyleSheet.create({
    report_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
