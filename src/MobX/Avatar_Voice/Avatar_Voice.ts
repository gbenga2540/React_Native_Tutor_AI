import { action, makeObservable, observable } from 'mobx';
import {
    INTF_AvatarFemaleVoice,
    INTF_AvatarMaleVoice,
} from '../../Interface/Avatar_Voice/Avatar_Voice';

class AvatarVoiceClass {
    is_avatar_male: boolean = false;
    avatar_male_voice: INTF_AvatarMaleVoice = 'Ethan';
    avatar_female_voice: INTF_AvatarFemaleVoice = 'Anne';

    constructor() {
        makeObservable(this, {
            is_avatar_male: observable,
            avatar_male_voice: observable,
            avatar_female_voice: observable,
            set_is_avatar_male: action,
            set_avatar_male_voice: action,
            set_avatar_female_voice: action,
        });
    }

    set_is_avatar_male = ({ isMale }: { isMale: boolean }) => {
        this.is_avatar_male = isMale;
    };

    set_avatar_male_voice = ({ voice }: { voice: INTF_AvatarMaleVoice }) => {
        this.avatar_male_voice = voice;
    };

    set_avatar_female_voice = ({
        voice,
    }: {
        voice: INTF_AvatarFemaleVoice;
    }) => {
        this.avatar_female_voice = voice;
    };
}

export const AvatarVoiceStore = new AvatarVoiceClass();
