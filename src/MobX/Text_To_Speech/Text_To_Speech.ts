import { action, makeObservable, observable } from 'mobx';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import { AvatarSpeakStore } from '../Avatar_Speak/Avatar_Speak';
import { GOOGLE_TTS_ANDROID, GOOGLE_TTS_IOS, GOOGLE_TTS_LINK } from '@env';
import { clamp_value } from '../../Utils/Clamp_Value/Clamp_Value';
import {
    INTF_AvatarFemaleVoice,
    INTF_AvatarMaleVoice,
} from '../../Interface/Avatar_Voice/Avatar_Voice';

let currentSound: Sound | null = null;
const path = `${RNFS.DocumentDirectoryPath}/voice.mp3`;

const get_male_voice = ({
    male_voice,
}: {
    male_voice: INTF_AvatarMaleVoice;
}) => {
    switch (male_voice) {
        case 'Harry':
            return 'en-GB-Standard-B';
        case 'Ethan':
            return 'en-AU-Standard-B';
        case 'Kyle':
            return 'en-US-Standard-B';
        case 'Kumar':
            return 'en-IN-Standard-B';
        default:
            return 'en-GB-Standard-B';
    }
};

const get_female_voice = ({
    female_voice,
}: {
    female_voice: INTF_AvatarFemaleVoice;
}) => {
    switch (female_voice) {
        case 'Emma':
            return 'en-GB-Standard-A';
        case 'Willow':
            return 'en-AU-Standard-A';
        case 'Emily':
            return 'en-US-Standard-A';
        case 'Priya':
            return 'en-IN-Standard-A';
        default:
            return 'en-GB-Standard-A';
    }
};

const createRequest = ({
    text,
    isMale,
    femaleVoice,
    maleVoice,
    speechRate,
}: {
    text: string;
    isMale: boolean;
    femaleVoice: INTF_AvatarFemaleVoice;
    maleVoice: INTF_AvatarMaleVoice;
    speechRate: number;
}) => ({
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        input: {
            text,
        },
        voice: {
            languageCode: 'en-US',
            name: isMale
                ? get_male_voice({ male_voice: maleVoice })
                : get_female_voice({ female_voice: femaleVoice }),
            ssmlGender: isMale ? 'MALE' : 'FEMALE',
        },
        audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: clamp_value({
                value: speechRate || 1,
                minValue: 0.7,
                maxValue: 1.5,
            }),
        },
    }),
    method: 'POST',
});

const createFile = async ({ m_path, data }: { m_path: any; data: any }) => {
    try {
        if (!data || typeof data !== 'string') {
            throw new Error('Invalid data provided.');
        }
        return await RNFS.writeFile(m_path, data, 'base64');
    } catch (err) {
        // console.log(err);
    }
    return null;
};

const stopSpeech = () => {
    if (currentSound) {
        currentSound?.stop(() => {
            currentSound?.release();
            currentSound = null;
        });
    }
    AvatarSpeakStore.set_avatar_speak({ should_avatar_speak: false });
};

const fireAudio = () => {
    currentSound = new Sound(path, '', error => {
        if (error) {
            AvatarSpeakStore.set_avatar_speak({
                should_avatar_speak: false,
            });
            return null;
        }
        AvatarSpeakStore.set_avatar_speak({
            should_avatar_speak: true,
        });
        currentSound?.play(() => {
            AvatarSpeakStore.set_avatar_speak({
                should_avatar_speak: false,
            });
            currentSound?.release();
            currentSound = null;
        });
        return null;
    });
};

const playSound = () => {
    if (currentSound) {
        currentSound?.stop(() => {
            currentSound?.release();
            fireAudio();
        });
    } else {
        fireAudio();
    }
};

const playSpeech = async ({
    text,
    isMale,
    maleVoice,
    femaleVoice,
    speechRate,
}: {
    text: string;
    isMale: boolean;
    maleVoice: INTF_AvatarMaleVoice;
    femaleVoice: INTF_AvatarFemaleVoice;
    speechRate: number;
}) => {
    const key = Platform.OS === 'ios' ? GOOGLE_TTS_IOS : GOOGLE_TTS_ANDROID;
    const address = `${GOOGLE_TTS_LINK}${key}`;
    const payload = createRequest({
        text: text,
        isMale: isMale,
        maleVoice: maleVoice,
        femaleVoice: femaleVoice,
        speechRate: speechRate / 100 || 1.0,
    });
    try {
        const response = await fetch(address, {
            ...payload,
            body: payload.body,
        });
        const result = await response.json();
        const audio = result.audioContent;
        await createFile({ m_path: path, data: audio });
        playSound();
    } catch (err) {
        AvatarSpeakStore.set_avatar_speak({ should_avatar_speak: false });
    }
};

class TextToSpeechClass {
    speech: string = '';

    constructor() {
        makeObservable(this, {
            speech: observable,
            play_speech: action,
            clear_speech: action,
        });
    }

    play_speech = ({
        speech,
        isMale,
        femaleVoice,
        maleVoice,
        speechRate,
    }: {
        speech: string;
        isMale: boolean;
        maleVoice: INTF_AvatarMaleVoice;
        femaleVoice: INTF_AvatarFemaleVoice;
        speechRate: number;
    }) => {
        this.speech = speech;
        playSpeech({
            text: speech,
            isMale: isMale,
            femaleVoice: femaleVoice,
            maleVoice: maleVoice,
            speechRate: speechRate,
        });
    };

    clear_speech = () => {
        this.speech = '';
        stopSpeech();
    };
}

export const TextToSpeechStore = new TextToSpeechClass();
