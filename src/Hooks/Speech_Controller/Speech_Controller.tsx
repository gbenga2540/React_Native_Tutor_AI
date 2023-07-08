import { SECURE_STORAGE_NAME, SECURE_STORAGE_SPEECH_CONTROLLER } from '@env';
import SInfo from 'react-native-sensitive-info';
import { SpeechControllerStore } from '../../MobX/Speech_Controller/Speech_Controller';

const SpeechController = async () => {
    try {
        await SInfo.getItem(SECURE_STORAGE_SPEECH_CONTROLLER, {
            sharedPreferencesName: SECURE_STORAGE_NAME,
            keychainService: SECURE_STORAGE_NAME,
        })?.then(async res => {
            if (res) {
                const json_res: { rate: number; pitch: number } =
                    JSON.parse(res);
                SpeechControllerStore.set_rate_pitch({
                    rate: json_res?.rate || 90,
                    pitch: json_res?.pitch || 90,
                });
            }
        });
    } catch (error) {}
};

export { SpeechController };
