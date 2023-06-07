import {
    INTF_AvatarFemaleVoice,
    INTF_AvatarMaleVoice,
} from '../Avatar_Voice/Avatar_Voice';

export interface INTF_VoiceInfo {
    is_avatar_male: boolean;
    avatar_male_voice: INTF_AvatarMaleVoice;
    avatar_female_voice: INTF_AvatarFemaleVoice;
}
