import { Attendances, Student, Teacher } from '@prisma/client';

export type AttendanceRecord = Attendances & {
    student: Student;
    teacher: Teacher;
};