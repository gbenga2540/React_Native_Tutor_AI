import { action, makeObservable, observable } from 'mobx';
import { INTF_Comments } from '../../Interface/Comments/Comments';

class CurrentCommentsClass {
    current_comments: INTF_Comments[] = [];
    current_blog_id: string = '';

    constructor() {
        makeObservable(this, {
            current_comments: observable,
            current_blog_id: observable,
            set_current_blog_id: action,
            set_comments: action,
            update_comment: action,
            delete_comment: action,
        });
    }

    set_current_blog_id = ({ blogID }: { blogID: string }) => {
        this.current_blog_id = blogID;
    };

    set_comments = ({ svr_comments }: { svr_comments: INTF_Comments[] }) => {
        this.current_comments = svr_comments;
    };

    update_comment = ({ cid, message }: { cid: string; message: string }) => {
        let comments = this.current_comments;
        const filtered_comments = comments.map(item => {
            if (item?._id === cid) {
                return { ...item, comment: message };
            }
            return item;
        });
        this.current_comments = filtered_comments;
    };

    delete_comment = ({ cid }: { cid: string }) => {
        let comments = this.current_comments;
        const filtered_comments = comments.filter(item => item?._id !== cid);
        this.current_comments = filtered_comments;
    };
}

export const CurrentCommentsStore = new CurrentCommentsClass();
