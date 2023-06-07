import { SECURE_STORAGE_NAME, SECURE_STORAGE_VOICE_INFO } from '@env';
import SInfo from 'react-native-sensitive-info';
import { INTF_VoiceInfo } from '../../Interface/Voice_Info/Voice_Info';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';

const LoadAvatarVoice = async () => {
    try {
        await SInfo.getItem(SECURE_STORAGE_VOICE_INFO, {
            sharedPreferencesName: SECURE_STORAGE_NAME,
            keychainService: SECURE_STORAGE_NAME,
        })?.then(async res => {
            if (res) {
                const avatar_info: INTF_VoiceInfo = JSON.parse(res);
                AvatarVoiceStore.set_is_avatar_male({
                    isMale: avatar_info?.is_avatar_male,
                });
                AvatarVoiceStore.set_avatar_male_voice({
                    voice: avatar_info?.avatar_male_voice,
                });
                AvatarVoiceStore.set_avatar_female_voice({
                    voice: avatar_info?.avatar_female_voice,
                });
            }
        });
    } catch (error) {}
};

export { LoadAvatarVoice };
