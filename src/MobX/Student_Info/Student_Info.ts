import { action, makeObservable, observable } from 'mobx';
import { INTF_StudentInfo } from '../../Interface/Student_Info/Student_Info';
import { INTF_AssignedClass } from '../../Interface/Assigned_Class/Assigned_Class';

class StudentInfoClass {
    student_info: INTF_StudentInfo = {
        assigned_class: 'Beginner',
    };

    constructor() {
        makeObservable(this, {
            student_info: observable,
            update_assigned_class: action,
        });
    }

    update_assigned_class = ({
        assigned_class,
    }: {
        assigned_class: INTF_AssignedClass;
    }) => {
        this.student_info.assigned_class = assigned_class;
    };
}

export const StudentInfoStore = new StudentInfoClass();
