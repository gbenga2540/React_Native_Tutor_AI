import { SECURE_STORAGE_NAME, SECURE_STORAGE_SPEECH_CONTROLLER } from '@env';
import { action, makeObservable, observable } from 'mobx';
import SInfo from 'react-native-sensitive-info';

const save_speech_data = async ({ rate }: { rate: number }) => {
    try {
        await SInfo.setItem(
            SECURE_STORAGE_SPEECH_CONTROLLER,
            JSON.stringify({ rate: rate }),
            {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            },
        );
    } catch (error) {}
};
class SpeechControllerClass {
    rate: number = 100;

    constructor() {
        makeObservable(this, {
            rate: observable,
            set_rate_pitch: action,
            save_rate_pitch: action,
        });
    }

    set_rate_pitch = ({ rate }: { rate: number }) => {
        this.rate = rate;
    };

    save_rate_pitch = ({ rate }: { rate: number }) => {
        this.rate = rate;
        save_speech_data({ rate: rate });
    };
}

export const SpeechControllerStore = new SpeechControllerClass();
