import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';

const HomeWorkPage: FunctionComponent = () => {
    return (
        <View style={styles.hw_main}>
            <ScrollView style={{ flex: 1 }}>
                <Text
                    style={{ color: 'black', marginTop: 100, marginLeft: 180 }}>
                    HomeWorkPage
                </Text>
                <View
                    style={{
                        marginBottom: 20,
                    }}>
                    {''}
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeWorkPage;

const styles = StyleSheet.create({
    hw_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
