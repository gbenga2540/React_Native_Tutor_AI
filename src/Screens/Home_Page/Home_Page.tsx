import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { fonts } from '../../Configs/Fonts/Fonts';
import Colors from '../../Configs/Colors/Colors';

import { observer } from 'mobx-react';

const HomePage: FunctionComponent = observer(() => {
    return (
        <View style={styles.home_main}>
            <ScrollView style={{ flex: 1 }}>
                <Text style={{ color: 'black' }}>sjaknsx</Text>
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
