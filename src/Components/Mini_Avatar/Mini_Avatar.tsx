import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from '../../Configs/Colors/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { DebouncedFuncLeading } from 'lodash';
import SubtitleIcon from '../../Images/SVGs/Subtitle_Icon.svg';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import { observer } from 'mobx-react';
import { AvatarSpeakStore } from '../../MobX/Avatar_Speak/Avatar_Speak';
import FastImage, { Source } from 'react-native-fast-image';

const width = '100%';
const height = 200;
interface MiniAvatarProps {
    onPressVoice?: DebouncedFuncLeading<() => void>;
    onPressVoiceLeft?: DebouncedFuncLeading<() => void>;
    onPressVoiceRight?: DebouncedFuncLeading<() => void>;
    marginHorizontal?: number | 'auto';
    marginTop?: number | 'auto';
    marginBottom?: number | 'auto';
    isSubtitleIcon?: boolean;
    hideIcons?: boolean;
    isHomeWork?: boolean;
    isWritingTest?: boolean;
}
const MiniAvatar: FunctionComponent<MiniAvatarProps> = observer(
    ({
        onPressVoice,
        onPressVoiceLeft,
        onPressVoiceRight,
        marginHorizontal,
        marginTop,
        marginBottom,
        isSubtitleIcon,
        hideIcons,
        isHomeWork,
        isWritingTest,
    }) => {
        const isMale = isHomeWork
            ? !AvatarVoiceStore?.is_avatar_male || false
            : AvatarVoiceStore?.is_avatar_male || false;
        const isSpeaking = AvatarSpeakStore.should_avatar_speak;

        const MaleIdle = require('../../Videos/Male_Idle.gif');
        const MaleTalking = require('../../Videos/Male_Talking.gif');
        const FemaleIdle = require('../../Videos/Female_Idle.gif');
        const FemaleTalking = require('../../Videos/Female_Talking.gif');

        const AvatarIdle = isMale ? MaleIdle : FemaleIdle;
        const AvatarTalking = isMale ? MaleTalking : FemaleTalking;

        const [imageSource, setImageSource] = useState<Source>(AvatarIdle);

        useEffect(() => {
            if (isSpeaking) {
                setImageSource(AvatarTalking);
            } else {
                setImageSource(AvatarIdle);
            }
        }, [isSpeaking, AvatarIdle, AvatarTalking]);

        return (
            <View
                style={{
                    marginHorizontal: marginHorizontal || 0,
                    marginTop: marginTop || 0,
                    marginBottom: marginBottom || 0,
                }}>
                {isMale && (
                    <View style={styles.avatar_bg}>
                        <FastImage
                            source={imageSource}
                            style={{
                                width: width,
                                height: height,
                                borderRadius: 20,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        {!hideIcons &&
                            !isWritingTest &&
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
                        {!hideIcons && isWritingTest && (
                            <>
                                <TouchableOpacity
                                    onPress={onPressVoiceLeft}
                                    style={[
                                        styles.voice,
                                        { left: -9, right: undefined },
                                    ]}
                                    activeOpacity={0.75}>
                                    <View style={styles.voice_icon}>
                                        <Feather
                                            name="chevron-left"
                                            size={22}
                                            color={Colors.Primary}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onPressVoiceRight}
                                    style={styles.voice}
                                    activeOpacity={0.75}>
                                    <View style={styles.voice_icon}>
                                        <Feather
                                            name="chevron-right"
                                            size={22}
                                            color={Colors.Primary}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}
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
                        <FastImage
                            source={imageSource}
                            style={{
                                width: width,
                                height: height,
                                borderRadius: 20,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        {!hideIcons &&
                            !isWritingTest &&
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
                        {!hideIcons && isWritingTest && (
                            <>
                                <TouchableOpacity
                                    onPress={onPressVoiceLeft}
                                    style={[
                                        styles.voice,
                                        { left: -9, right: undefined },
                                    ]}
                                    activeOpacity={0.75}>
                                    <View style={styles.voice_icon}>
                                        <Feather
                                            name="chevron-left"
                                            size={22}
                                            color={Colors.Primary}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onPressVoiceRight}
                                    style={styles.voice}
                                    activeOpacity={0.75}>
                                    <View style={styles.voice_icon}>
                                        <Feather
                                            name="chevron-right"
                                            size={22}
                                            color={Colors.Primary}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}
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
