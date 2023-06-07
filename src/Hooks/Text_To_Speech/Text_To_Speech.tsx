import { Avatars } from '../../Data/Voices/Voices';
import TTS from 'react-native-tts';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';

const TextToSpeech = () => {
    const is_tts_engine_ready = async () => {
        await TTS.voices().then(res => console.log(res));
        const isInitialized = await TTS.getInitStatus();
        return isInitialized;
    };

    const generate_speech_for_avatar = ({
        type,
        isMale,
        speech,
    }: {
        type: string;
        isMale: boolean;
        speech: string;
    }) => {
        switch (type) {
            case 'British':
                // TTS.setDefaultLanguage('en-US');
                TTS.setDefaultPitch(isMale ? 1.1 : 1.0);
                TTS.setDefaultRate(isMale ? 0.8 : 0.9);
                break;
            case 'Australian':
                // TTS.setDefaultLanguage('en-US');
                TTS.setDefaultPitch(isMale ? 1.3 : 1.2);
                TTS.setDefaultRate(isMale ? 0.85 : 0.9);
                break;
            case 'Ireland':
                // TTS.setDefaultLanguage('en-US');
                TTS.setDefaultPitch(isMale ? 1.2 : 1.1);
                TTS.setDefaultRate(isMale ? 0.99 : 0.85);
                break;
            case 'American':
                // TTS.setDefaultLanguage('en-US');
                TTS.setDefaultPitch(isMale ? 1.2 : 1.1);
                TTS.setDefaultRate(isMale ? 0.99 : 0.89);
                break;
            default:
                // TTS.setDefaultLanguage('en-US');
                TTS.setDefaultPitch(isMale ? 1.2 : 1.1);
                TTS.setDefaultRate(isMale ? 0.99 : 0.89);
                break;
        }

        TTS.speak(speech);
    };

    const generate_speech = async ({ speech }: { speech: string }) => {
        const ttsEngineReady = await is_tts_engine_ready();

        if (!ttsEngineReady) {
            return;
        }

        if (AvatarVoiceStore?.is_avatar_male) {
            const male_avatar = Avatars.Male.find(
                avatar => avatar.name === AvatarVoiceStore?.avatar_male_voice,
            );
            generate_speech_for_avatar({
                type: male_avatar?.type as string,
                isMale: true,
                speech: speech,
            });
        } else if (!AvatarVoiceStore?.is_avatar_male) {
            const female_avatar = Avatars.Female.find(
                avatar => avatar.name === AvatarVoiceStore?.avatar_female_voice,
            );
            generate_speech_for_avatar({
                type: female_avatar?.type as string,
                isMale: false,
                speech: speech,
            });
        }
    };

    generate_speech({
        speech: `Hi there, My Name is ${
            AvatarVoiceStore.is_avatar_male
                ? AvatarVoiceStore.avatar_male_voice
                : AvatarVoiceStore.avatar_female_voice
        }. Welcome To Tutor AI.`,
    });
};

export { TextToSpeech };
