import { action, makeObservable, observable } from 'mobx';

class SearchTagsClass {
    search_tags: number[] = [];

    constructor() {
        makeObservable(this, {
            search_tags: observable,
            update_search_tags: action,
            clear_search_tags: action,
        });
    }

    update_search_tags = ({ tag_index }: { tag_index: number }) => {
        const prev_data = [...this.search_tags];
        if (prev_data?.includes(tag_index)) {
            const element_index = prev_data.indexOf(tag_index);
            prev_data?.splice(element_index, 1);
        } else {
            prev_data.push(tag_index);
        }
        this.search_tags = [...prev_data];
    };

    clear_search_tags = () => {
        this.search_tags = [];
    };
}

export const SearchTagsStore = new SearchTagsClass();
