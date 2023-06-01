export type INTF_AssignedClass =
    | 'Beginner'
    | 'Elementary'
    | 'Intermediary'
    | 'Upper Intermediary'
    | 'Confident';

export interface INTF_StudentInfo {
    assigned_class?: INTF_AssignedClass;
}
