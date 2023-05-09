import { action, makeObservable, observable } from 'mobx';

class KeyboardClass {
    keyboard_active: boolean = false;

    constructor() {
        makeObservable(this, {
            keyboard_active: observable,
            set_keyboard_on: action,
            set_keyboard_off: action,
        });
    }

    set_keyboard_on = () => {
        this.keyboard_active = true;
    };
    set_keyboard_off = () => {
        this.keyboard_active = false;
    };
}

export const KeyboardStore = new KeyboardClass();
