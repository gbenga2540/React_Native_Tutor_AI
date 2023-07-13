import { INTF_AssignedClass } from '../Assigned_Class/Assigned_Class';

export interface INTF_UserInfo {
    __v?: number;
    _id?: string;
    fullname?: string;
    mobile?: string;
    email?: string;
    dateOfBirth?: string;
    level?: INTF_AssignedClass;
    initialLevel?: INTF_AssignedClass;
    interests?: string[];
    language?: string;
    study_target?: number;
    payment?: number;
    lessons?: {
        _id?: string;
        id?: number;
        score?: number | null;
    }[];
    exams?: {
        _id?: string;
        level?: INTF_AssignedClass;
        score?: number | null;
    }[];
    dp?: {
        public_id?: string;
        url?: string;
    };
    parental_control?: string;
    delete_otp?: string;
    password?: string;
    verified?: boolean;
    accessToken?: string;
    createdAt?: string;
    updatedAt?: string;
}
