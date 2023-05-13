import React, { FunctionComponent } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import { http_link_fix } from '../../Utils/HTTP_Link_Fix/HTTP_Link_Fix';
import ProgressBar from '../../Components/Progress_Bar/Progress_Bar';

const HomePage: FunctionComponent = () => {
    return (
        <View style={styles.home_main}>
            <ScrollView style={{ flex: 1 }}>
                <Text
                    style={{ color: 'black', marginTop: 100, marginLeft: 180 }}>
                    Tutor AI
                </Text>

                <ProgressBar progress={20} />
                <Image
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={{
                        uri: http_link_fix({
                            http_link:
                                'http://res.cloudinary.com/gbenga2540/image/upload/v1683481053/agma_blogged/users/642a877a3fa635e9ce81112a.jpg',
                        }),
                        width: 200,
                        height: 200,
                    }}
                />

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
