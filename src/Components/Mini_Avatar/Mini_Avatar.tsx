import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { avatars_data } from '../../Data/Avatars/Avatars';
import Colors from '../../Configs/Colors/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { DebouncedFuncLeading } from 'lodash';
import SubtitleIcon from '../../Images/SVGs/Subtitle_Icon.svg';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import { observer } from 'mobx-react';

const width = '100%';
const height = 200;
interface MiniAvatarProps {
    onPressVoice?: DebouncedFuncLeading<() => void>;
    marginHorizontal?: number | 'auto';
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    isSubtitleIcon?: boolean;
    hideIcons?: boolean;
}
const MiniAvatar: FunctionComponent<MiniAvatarProps> = observer(
    ({
        onPressVoice,
        marginHorizontal,
        marginTop,
        marginBottom,
        isSubtitleIcon,
        hideIcons,
    }) => {
        const isMale = AvatarVoiceStore?.is_avatar_male || false;
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
                        {!hideIcons &&
                            (isSubtitleIcon ? (
                                <TouchableOpacity
                                    onPress={onPressVoice}
                                    style={styles.voice}
                                    activeOpacity={0.75}>
                                    <View style={styles.voice_icon}>
                                        <SubtitleIcon width={20} height={20} />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={onPressVoice}
                                    style={styles.voice}
                                    activeOpacity={0.75}>
                                    <View style={styles.voice_icon}>
                                        <Feather
                                            name="volume-2"
                                            size={22}
                                            color={Colors.Primary}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                    </View>
                )}
                {!isMale && (
                    <View
                        style={[
                            styles.avatar_bg,
                            {
                                backgroundColor: Colors.LightPink,
                            },
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
                        {!hideIcons &&
                            (isSubtitleIcon ? (
                                <TouchableOpacity
                                    onPress={onPressVoice}
                                    style={styles.voice}
                                    activeOpacity={0.75}>
                                    <View style={styles.voice_icon}>
                                        <SubtitleIcon width={20} height={20} />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={onPressVoice}
                                    style={styles.voice}
                                    activeOpacity={0.75}>
                                    <View style={styles.voice_icon}>
                                        <Feather
                                            name="volume-2"
                                            size={22}
                                            color={Colors.Primary}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                    </View>
                )}
            </View>
        );
    },
);

export default MiniAvatar;

const styles = StyleSheet.create({
    avatar_bg: {
        backgroundColor: Colors.Primary,
        borderRadius: 20,
        width: width,
        height: height,
    },
    voice: {
        position: 'absolute',
        right: -9,
        bottom: -2,
        backgroundColor: Colors.White,
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    voice_icon: {
        backgroundColor: Colors.LightPurple,
        width: 35,
        height: 35,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
