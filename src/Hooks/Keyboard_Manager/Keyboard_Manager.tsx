import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { KeyboardStore } from '../../MobX/Keyboard/Keyboard';

const KeyboardManager = () => {
    useEffect(() => {
        const k_Show = Keyboard.addListener('keyboardDidShow', () => {
            KeyboardStore.set_keyboard_on();
        });
        const k_Hide = Keyboard.addListener('keyboardDidHide', () => {
            KeyboardStore.set_keyboard_off();
        });

        return () => {
            k_Show.remove();
            k_Hide.remove();
        };
    }, []);
};

export { KeyboardManager };
