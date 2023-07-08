import { SECURE_STORAGE_NAME, SECURE_STORAGE_SPEECH_CONTROLLER } from '@env';
import { action, makeObservable, observable } from 'mobx';
import SInfo from 'react-native-sensitive-info';

const save_speech_data = async ({
    rate,
    pitch,
}: {
    rate: number;
    pitch: number;
}) => {
    try {
        await SInfo.setItem(
            SECURE_STORAGE_SPEECH_CONTROLLER,
            JSON.stringify({ rate: rate, pitch: pitch }),
            {
                sharedPreferencesName: SECURE_STORAGE_NAME,
                keychainService: SECURE_STORAGE_NAME,
            },
        );
    } catch (error) {}
};
class SpeechControllerClass {
    rate: number = 90;
    pitch: number = 90;

    constructor() {
        makeObservable(this, {
            rate: observable,
            pitch: observable,
            set_rate_pitch: action,
            save_rate_pitch: action,
        });
    }

    set_rate_pitch = ({ rate, pitch }: { rate: number; pitch: number }) => {
        this.rate = rate;
        this.pitch = pitch;
    };

    save_rate_pitch = ({ rate, pitch }: { rate: number; pitch: number }) => {
        this.rate = rate;
        this.pitch = pitch;
        save_speech_data({ rate: rate, pitch: pitch });
    };
}

export const SpeechControllerStore = new SpeechControllerClass();
