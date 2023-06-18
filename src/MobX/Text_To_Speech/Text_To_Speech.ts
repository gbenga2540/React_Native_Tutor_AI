import { action, makeObservable, observable } from 'mobx';

class TextToSpeechClass {
    speech: string = '';

    constructor() {
        makeObservable(this, {
            speech: observable,
            play_speech: action,
            clear_speech: action,
        });
    }

    play_speech = ({ speech }: { speech: string }) => {
        this.speech = speech;
    };

    clear_speech = () => {
        this.speech = '';
    };
}

export const TextToSpeechStore = new TextToSpeechClass();
