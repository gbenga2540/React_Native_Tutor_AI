import { INTF_AssignedClass } from '../Assigned_Class/Assigned_Class';

export interface INTF_Exam {
    _id?: string;
    level?: INTF_AssignedClass;
    score?: number | null;
}
