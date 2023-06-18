import { action, makeObservable, observable } from 'mobx';

class AvatarSpeakClass {
    should_avatar_speak: boolean = false;

    constructor() {
        makeObservable(this, {
            should_avatar_speak: observable,
            set_avatar_speak: action,
        });
    }

    set_avatar_speak = ({
        should_avatar_speak,
    }: {
        should_avatar_speak: boolean;
    }) => {
        this.should_avatar_speak = should_avatar_speak;
    };
}

export const AvatarSpeakStore = new AvatarSpeakClass();
