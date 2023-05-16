import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';

const ProfilePage: FunctionComponent = () => {
    return (
        <View style={styles.profile_main}>
            <ScrollView style={{ flex: 1 }}>
                <Text
                    style={{ color: 'black', marginTop: 100, marginLeft: 180 }}>
                    ProfilePage
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

export default ProfilePage;

const styles = StyleSheet.create({
    profile_main: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
});
