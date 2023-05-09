import { INTF_Comments } from '../Comments/Comments';

export interface INTF_BlogDetails {
    bid?: string;
    title?: string;
    author?: string;
    averified?: boolean;
    isowner?: boolean;
    a_id?: string;
    a_followed?: boolean;
    a_dp_link?: string;
    a_followers?: number;
    a_createdAt?: string;
    b_dp_link?: string;
    message?: string;
    likes_l?: number;
    comments?: INTF_Comments[];
    comments_l?: number;
    tags?: number[];
    liked?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
