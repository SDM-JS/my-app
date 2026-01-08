import { Lessons, Groups, Teacher, Student, Attendances } from '@prisma/client';

export type LessonsWithRelations = Lessons & {
    group: (Groups & {
        cource: { id: string; name: string; } | null;
        teacher: (Teacher & { user: { id: string; name: string; email: string; } }) | null;
        students: Student[];
    }) | null;
    teacher: (Teacher & { user: { id: string; name: string; email: string; phone: string; } }) | null;
    attendance: Attendances[];
};

export type AttendanceRecord = Attendances & {
    student: Student;
    teacher: Teacher;
    lessons: Lessons;
};