import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';

const HomePage: FunctionComponent = () => {
    return (
        <View style={styles.home_main}>
            <ScrollView style={{ flex: 1 }}>
                <Text
                    style={{ color: 'black', marginTop: 100, marginLeft: 180 }}>
                    HomePage
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

export default HomePage;

const styles = StyleSheet.create({
    home_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
