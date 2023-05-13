import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { avatars_data } from '../../Data/Avatars/Avatars';
import Colors from '../../Configs/Colors/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { DebouncedFuncLeading } from 'lodash';

interface MiniAvatarProps {
    isMale: boolean;
    onPressVoice?: DebouncedFuncLeading<() => void>;
}
const MiniAvatar: FunctionComponent<MiniAvatarProps> = ({
    isMale,
    onPressVoice,
}) => {
    if (isMale) {
        return (
            <View style={styles.avatar_bg}>
                <Image
                    source={avatars_data[6]?.image}
                    style={{
                        width: 140,
                        height: 140,
                    }}
                />
                <TouchableOpacity
                    onPress={onPressVoice}
                    style={styles.voice}
                    activeOpacity={0.75}>
                    <View style={styles.voice_icon}>
                        <Feather
                            name="volume-2"
                            size={23}
                            color={Colors.Primary}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View
                style={[
                    styles.avatar_bg,
                    { backgroundColor: Colors.LightPink },
                ]}>
                <Image
                    source={avatars_data[0]?.image}
                    style={{
                        width: 140,
                        height: 140,
                    }}
                />
                <TouchableOpacity
                    onPress={onPressVoice}
                    style={styles.voice}
                    activeOpacity={0.75}>
                    <View style={styles.voice_icon}>
                        <Feather
                            name="volume-2"
                            size={23}
                            color={Colors.Primary}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
};

export default MiniAvatar;

const styles = StyleSheet.create({
    avatar_bg: {
        backgroundColor: Colors.Primary,
        borderRadius: 20,
        width: 140,
        height: 140,
    },
    voice: {
        position: 'absolute',
        right: -9,
        bottom: -2,
        backgroundColor: Colors.White,
        width: 42,
        height: 42,
        borderRadius: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    voice_icon: {
        backgroundColor: Colors.LightPurple,
        width: 36,
        height: 36,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
