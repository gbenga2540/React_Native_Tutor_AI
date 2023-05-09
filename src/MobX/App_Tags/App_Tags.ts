import { action, makeObservable, observable } from 'mobx';
import { INTF_Tag } from '../../Interface/Tags/Tags';

class AppTagsClass {
    app_tags: INTF_Tag[] = [];

    constructor() {
        makeObservable(this, {
            app_tags: observable,
            set_app_tags: action,
            clear_app_tags: action,
        });
    }

    set_app_tags = ({ tags }: { tags: INTF_Tag[] }) => {
        this.app_tags = tags;
    };

    clear_app_tags = () => {
        this.app_tags = [];
    };
}

export const AppTagsStore = new AppTagsClass();
