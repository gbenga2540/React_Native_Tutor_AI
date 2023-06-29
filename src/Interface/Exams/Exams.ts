import { INTF_AssignedClass } from '../Assigned_Class/Assigned_Class';

export interface INTF_Exam {
    exam_id: number;
    exam_level: INTF_AssignedClass;
    score?: number;
}
