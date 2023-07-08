import React, {
    FunctionComponent,
    ReactElement,
    Suspense,
    useEffect,
    useState,
} from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import CustomStatusBar from '../../Components/Custom_Status_Bar/Custom_Status_Bar';
import BackButton from '../../Components/Back_Button/Back_Button';
import BasicText from '../../Components/Basic_Text/Basic_Text';
import SearchBar from '../../Components/Search_Bar/Search_Bar';
import GlossaryItem from '../../Components/Glossary_Item/Glossary_Item';
import { sort_glossary_by_name } from '../../Utils/Sort_Glossary_By_Name/Sort_Glossary_By_Name';
import { screen_height_less_than } from '../../Utils/Screen_Less_Than/Screen_Less_Than';
import { INTF_Glossary } from '../../Interface/Glossary/Glossary';
import { SECURE_STORAGE_GLOSSARY, SECURE_STORAGE_NAME } from '@env';
import SInfo from 'react-native-sensitive-info';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const GlossaryPage: FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [search, setSearch] = useState<string>('');
    const [tempGlossary, setTempGlossary] = useState<INTF_Glossary[]>([]);
    const [glossary, setGlossary] = useState<INTF_Glossary[]>([]);

    useEffect(() => {
        const get_glossary = async () => {
            try {
                await SInfo.getItem(SECURE_STORAGE_GLOSSARY, {
                    sharedPreferencesName: SECURE_STORAGE_NAME,
                    keychainService: SECURE_STORAGE_NAME,
                })
                    .catch(() => {})
                    .then(async res => {
                        if (res) {
                            const json_res: INTF_Glossary[] = JSON.parse(res);
                            if (json_res?.length > 0) {
                                setTempGlossary(
                                    sort_glossary_by_name({
                                        glossary_list: [...json_res],
                                    }),
                                );
                            }
                        }
                    });
            } catch (error) {}
        };

        get_glossary();
    }, []);

    useEffect(() => {
        if (search) {
            setGlossary([
                ...tempGlossary?.filter(item =>
                    item?.word?.toLowerCase()?.includes(search?.toLowerCase()),
                ),
            ]);
        } else {
            setGlossary(tempGlossary);
        }
    }, [tempGlossary, search]);

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
                <BackButton
                    execFunc={() => {
                        TextToSpeechStore.clear_speech();
                        navigation.goBack();
                    }}
                />
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
            {glossary?.length > 0 ? (
                <Suspense fallback={null}>
                    <FlatList
                        data={glossary}
                        windowSize={4}
                        keyExtractor={(item, index) =>
                            `${item?.word as string}-${index}`
                        }
                        renderItem={({
                            item,
                            index,
                        }: {
                            item: INTF_Glossary;
                            index: number;
                        }) => (
                            <GlossaryItem
                                key={`${item?.word as string}-${index}`}
                                word={item?.word as string}
                                meaning={item?.meaning as string}
                                translation={item?.translation as string}
                                example={item?.example as string}
                                index={index}
                                lastWordInit={
                                    index === 0
                                        ? ''
                                        : glossary[index - 1]?.word?.[0]
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
                </Suspense>
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <BasicText
                        inputText="Loading..."
                        textSize={17}
                        textWeight={600}
                    />
                </View>
            )}
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
