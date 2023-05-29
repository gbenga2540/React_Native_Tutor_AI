import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { avatars_data } from '../../Data/Avatars/Avatars';
import Colors from '../../Configs/Colors/Colors';

const width = '100%';
const height = 200;
interface DisplayAvatarProps {
    isMale: boolean;
    marginHorizontal?: number | string;
    marginTop?: number | string;
    marginBottom?: number | string;
}
const DisplayAvatar: FunctionComponent<DisplayAvatarProps> = ({
    isMale,
    marginHorizontal,
    marginTop,
    marginBottom,
}) => {
    return (
        <View
            style={{
                marginHorizontal: marginHorizontal || 0,
                marginTop: marginTop || 0,
                marginBottom: marginBottom || 0,
            }}>
            {isMale && (
                <View style={styles.avatar_bg}>
                    <Image
                        source={avatars_data[6]?.image}
                        style={{
                            width: width,
                            height: height,
                            borderRadius: 20,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
            )}
            {!isMale && (
                <View
                    style={[
                        styles.avatar_bg,
                        { backgroundColor: Colors.LightPink },
                    ]}>
                    <Image
                        source={avatars_data[0]?.image}
                        style={{
                            width: width,
                            height: height,
                            borderRadius: 20,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
            )}
        </View>
    );
};

export default DisplayAvatar;

const styles = StyleSheet.create({
    avatar_bg: {
        backgroundColor: Colors.Primary,
        borderRadius: 20,
        width: width,
        height: height,
    },
});
