import { INTF_AssignedClass } from '../Assigned_Class/Assigned_Class';

export interface INTF_UserInfo {
    __v?: number;
    _id?: string;
    createdAt?: string;
    dateOfBirth?: string;
    email?: string;
    fullname?: string;
    interests?: string[];
    level?: INTF_AssignedClass;
    initialLevel?: INTF_AssignedClass;
    mobile?: string;
    paymentStatus?: boolean;
    updatedAt?: string;
    verified?: boolean;
    study_target?: number;
    language?: string;
    dp?: {
        public_id?: string;
        url?: string;
    };
    password?: string;
    accessToken?: string;
}
