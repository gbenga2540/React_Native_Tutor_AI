import { action, makeObservable, observable } from 'mobx';

class BottomSheetClass {
    is_bottom_sheet: boolean = false;
    component_type: number = 0;

    constructor() {
        makeObservable(this, {
            is_bottom_sheet: observable,
            component_type: observable,
            open_bottom_sheet: action,
            close_bottom_sheet: action,
        });
    }

    open_bottom_sheet = ({ component_type }: { component_type: number }) => {
        this.component_type = component_type;
        this.is_bottom_sheet = true;
    };

    close_bottom_sheet = () => {
        this.is_bottom_sheet = false;
        this.component_type = 0;
    };
}

export const BottomSheetStore = new BottomSheetClass();
