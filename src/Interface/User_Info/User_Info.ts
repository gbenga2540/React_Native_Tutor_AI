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
    mobile?: string;
    paymentStatus?: boolean;
    updatedAt?: string;
    verified?: boolean;
    language?: string;
    dp?: {
        public_id?: string;
        url?: string;
    };
    password?: string;
}
