import { Avatars } from '../../Data/Voices/Voices';
import TTS from 'react-native-tts';
import { AvatarVoiceStore } from '../../MobX/Avatar_Voice/Avatar_Voice';
import { TextToSpeechStore } from '../../MobX/Text_To_Speech/Text_To_Speech';
import { useEffect } from 'react';
import { AvatarSpeakStore } from '../../MobX/Avatar_Speak/Avatar_Speak';

const SPEECH_REDUCTION = 0.25;

const TextToSpeech = () => {
    const is_tts_engine_ready = async () => {
        const isInitialized = await TTS.getInitStatus();
        return isInitialized;
    };

    useEffect(() => {
        const ttsStartListener = () => {
            AvatarSpeakStore.set_avatar_speak({ should_avatar_speak: true });
        };

        const ttsFinishListener = () => {
            AvatarSpeakStore.set_avatar_speak({ should_avatar_speak: false });
            TextToSpeechStore.clear_speech();
        };

        TTS.addEventListener('tts-start', ttsStartListener);
        TTS.addEventListener('tts-finish', ttsFinishListener);

        return () => {
            TTS.removeEventListener('tts-start', ttsStartListener);
            TTS.removeEventListener('tts-finish', ttsFinishListener);
        };
    }, []);

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
                TTS.setDefaultPitch((isMale ? 1.1 : 1.0) - SPEECH_REDUCTION);
                TTS.setDefaultRate((isMale ? 0.8 : 0.9) - SPEECH_REDUCTION);
                break;
            case 'Australian':
                // TTS.setDefaultLanguage('en-US');
                TTS.setDefaultPitch((isMale ? 1.3 : 1.2) - SPEECH_REDUCTION);
                TTS.setDefaultRate((isMale ? 0.85 : 0.9) - SPEECH_REDUCTION);
                break;
            case 'Ireland':
                // TTS.setDefaultLanguage('en-US');
                TTS.setDefaultPitch((isMale ? 1.2 : 1.1) - SPEECH_REDUCTION);
                TTS.setDefaultRate((isMale ? 0.99 : 0.85) - SPEECH_REDUCTION);
                break;
            case 'American':
                // TTS.setDefaultLanguage('en-US');
                TTS.setDefaultPitch((isMale ? 1.2 : 1.1) - SPEECH_REDUCTION);
                TTS.setDefaultRate((isMale ? 1.0 : 0.9) - SPEECH_REDUCTION);
                break;
            default:
                // TTS.setDefaultLanguage('en-US');
                TTS.setDefaultPitch((isMale ? 1.2 : 1.1) - SPEECH_REDUCTION);
                TTS.setDefaultRate((isMale ? 1.0 : 0.9) - SPEECH_REDUCTION);
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

    if (TextToSpeechStore?.speech) {
        TTS.stop().then(() => {
            generate_speech({
                speech: TextToSpeechStore.speech,
            });
        });
    } else {
        TTS.stop();
    }
};

export { TextToSpeech };
