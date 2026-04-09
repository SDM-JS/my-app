'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { Plus, Trash2, Eye, Search, User, GraduationCap, X, Pencil } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axiosClient';
import { Attendances, Student, Teacher } from '@prisma/client';

// Схема Zod: описание и дата обязательны, хотя бы один из (студент/преподаватель) должен быть выбран
const attendanceSchema = z.object({
    desc: z.string().min(1, 'Описание обязательно'),
    date: z.string().min(1, 'Дата обязательна'),
    studentId: z.string().optional(),
    teacherId: z.string().optional(),
}).refine(
    (data) => data.studentId || data.teacherId,
    {
        message: 'Необходимо выбрать либо студента, либо преподавателя',
        path: ['studentId']
    }
);

type AttendanceFormData = z.infer<typeof attendanceSchema>;

type AttendanceWithRelations = Attendances & {
    student: Student | null;
    teacher: Teacher | null;
};

// Хелпер для трансформации данных под таблицу
const transformAttendancesForTable = (attendances: AttendanceWithRelations[]) => {
    return attendances.map(attendance => ({
        id: attendance.id,
        student: attendance.student?.name || 'Нет студента',
        teacher: attendance.teacher?.name || 'Нет преподавателя',
        date: attendance.date,
        desc: attendance.desc,
        createdAt: attendance.createdAt,
        _student: attendance.student,
        _teacher: attendance.teacher,
        _raw: attendance
    }));
};

export default function AttendancesPage() {
    // Загрузка посещаемости
    const { data: attendancesData, isLoading, refetch } = useQuery({
        queryKey: ["attendances"],
        queryFn: async () => {
            const { data } = await axiosClient.get<AttendanceWithRelations[]>("/api/attendances")
            return data
        },
    });

    // Загрузка студентов для выпадающего списка
    const { data: studentsData } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/students")
            return data
        },
    });

    // Загрузка преподавателей
    const { data: teachersData } = useQuery({
        queryKey: ["teachers"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/teachers")
            return data
        },
    });

    const [attendances, setAttendances] = useState<AttendanceWithRelations[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState<AttendanceWithRelations | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Состояния поиска в Popover
    const [studentSearch, setStudentSearch] = useState('');
    const [teacherSearch, setTeacherSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    useEffect(() => {
        if (attendancesData) {
            setAttendances(attendancesData);
            setTableData(transformAttendancesForTable(attendancesData));
        }
    }, [attendancesData]);

    const filteredStudents = useMemo(() => {
        if (!studentsData) return [];
        return studentsData.filter((student: Student) =>
            student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
            student.phone.includes(studentSearch)
        );
    }, [studentsData, studentSearch]);

    const filteredTeachers = useMemo(() => {
        if (!teachersData) return [];
        return teachersData.filter((teacher: Teacher) =>
            teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
            teacher.email.toLowerCase().includes(teacherSearch.toLowerCase())
        );
    }, [teachersData, teacherSearch]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
        trigger,
    } = useForm<AttendanceFormData>({
        resolver: zodResolver(attendanceSchema),
    });

    const openDeleteDialog = (attendance: any) => {
        const originalAttendance = attendances.find(a => a.id === attendance._raw.id) || attendance._raw;
        setSelectedAttendance(originalAttendance);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedAttendance(null);
    };

    const openDialog = (mode: 'view' | 'edit' | 'create', tableAttendance?: any) => {
        setViewMode(mode);
        if (tableAttendance) {
            const originalAttendance = attendances.find(a => a.id === tableAttendance._raw.id) || tableAttendance._raw;
            setSelectedAttendance(originalAttendance);
            setSelectedStudent(originalAttendance.student);
            setSelectedTeacher(originalAttendance.teacher);
            setValue('desc', originalAttendance.desc);
            setValue('date', new Date(originalAttendance.date).toISOString().split('T')[0]);
            setValue('studentId', originalAttendance.studentId || '');
            setValue('teacherId', originalAttendance.teacherId || '');
        } else {
            reset({
                desc: '',
                date: new Date().toISOString().split('T')[0],
                studentId: '',
                teacherId: '',
            });
            setSelectedStudent(null);
            setSelectedTeacher(null);
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedAttendance(null);
        setSelectedStudent(null);
        setSelectedTeacher(null);
        setStudentSearch('');
        setTeacherSearch('');
        reset();
    };

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        setValue('studentId', student.id);
        setStudentSearch('');
        trigger('studentId');
    };

    const handleSelectTeacher = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setValue('teacherId', teacher.id);
        setTeacherSearch('');
        trigger('teacherId');
    };

    const handleClearStudent = () => {
        setSelectedStudent(null);
        setValue('studentId', '');
        trigger('studentId');
    };

    const handleClearTeacher = () => {
        setSelectedTeacher(null);
        setValue('teacherId', '');
        trigger('teacherId');
    };

    const onSubmit = async (data: AttendanceFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedAttendance) {
                await axiosClient.put(`/api/attendances/${selectedAttendance.id}`, {
                    ...data,
                    date: new Date(data.date),
                    studentId: data.studentId || null,
                    teacherId: data.teacherId || null,
                });
                toast.success("Запись обновлена!");
                refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                await axiosClient.post('/api/attendances', {
                    ...data,
                    date: new Date(data.date),
                    studentId: data.studentId || null,
                    teacherId: data.teacherId || null,
                });
                toast.success("Посещаемость отмечена!");
                refetch();
                closeDialog();
            }
        } catch (error: any) {
            toast.error("Ошибка при сохранении");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (selectedAttendance) {
            setIsSubmitting(true);
            try {
                await axiosClient.delete(`/api/attendances/${selectedAttendance.id}`);
                toast.success("Запись удалена!");
                refetch();
                closeDeleteDialog();
            } catch (error) {
                toast.error("Не удалось удалить запись");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Неверная дата' : date.toLocaleDateString('ru-RU');
    };

    const formatDateTime = (dateString: string | Date) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Неверная дата' : date.toLocaleString('ru-RU');
    };

    const columns = [
        { key: 'desc', label: 'Описание', sortable: true },
        {
            key: 'student',
            label: 'Студент',
            sortable: true,
            render: (value: string) => value || <span className="text-muted-foreground">Нет студента</span>
        },
        {
            key: 'teacher',
            label: 'Преподаватель',
            sortable: true,
            render: (value: string) => value || <span className="text-muted-foreground">Нет преподавателя</span>
        },
        { key: 'date', label: 'Дата', sortable: true, render: (value: any) => formatDate(value) },
        { key: 'createdAt', label: 'Записано', sortable: true, render: (value: any) => formatDateTime(value) },
    ];

    if (isLoading) {
        return <div className="p-8 text-center">Загрузка посещаемости...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Посещаемость</h1>
                    <p className="text-muted-foreground">
                        Контроль записей посещаемости (всего: {tableData.length})
                    </p>
                </div>
                <Button onClick={() => openDialog('create')} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Отметить посещение
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={tableData}
                actions={(item) => (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog('view', item)} title="Просмотр">
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDialog('edit', item)} title="Редактировать">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(item)} title="Удалить">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Отметить посещение' :
                                viewMode === 'edit' ? 'Редактировать запись' : 'Детали посещения'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create' ? 'Создание новой записи' : 'Изменение информации о посещении'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="desc">Описание *</Label>
                            <Input
                                id="desc"
                                {...register('desc')}
                                disabled={viewMode === 'view' || isSubmitting}
                                placeholder="Напр. 'Обычное занятие', 'Экзамен'"
                            />
                            {errors.desc && <p className="text-xs text-destructive">{errors.desc.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Дата *</Label>
                            <Input id="date" type="date" {...register('date')} disabled={viewMode === 'view' || isSubmitting} />
                            {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Студент</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className="relative">
                                            <Button variant="outline" className="w-full justify-start h-10" disabled={viewMode === 'view' || isSubmitting}>
                                                <User className="mr-2 h-4 w-4" />
                                                <span className="truncate">{selectedStudent?.name || "Выбрать студента"}</span>
                                            </Button>
                                            {selectedStudent && viewMode !== 'view' && (
                                                <X className="absolute right-2 top-3 h-4 w-4 cursor-pointer opacity-50" onClick={handleClearStudent} />
                                            )}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0">
                                        <div className="p-2 border-b">
                                            <Input placeholder="Поиск студента..." value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} />
                                        </div>
                                        <ScrollArea className="h-64">
                                            {filteredStudents.map((s: Student) => (
                                                <div key={s.id} className="p-2 hover:bg-accent cursor-pointer" onClick={() => handleSelectStudent(s)}>
                                                    {s.name}
                                                </div>
                                            ))}
                                        </ScrollArea>
                                    </PopoverContent>
                                </Popover>
                                <input type="hidden" {...register('studentId')} />
                            </div>

                            <div className="space-y-2">
                                <Label>Преподаватель</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className="relative">
                                            <Button variant="outline" className="w-full justify-start h-10" disabled={viewMode === 'view' || isSubmitting}>
                                                <GraduationCap className="mr-2 h-4 w-4" />
                                                <span className="truncate">{selectedTeacher?.name || "Выбрать учителя"}</span>
                                            </Button>
                                            {selectedTeacher && viewMode !== 'view' && (
                                                <X className="absolute right-2 top-3 h-4 w-4 cursor-pointer opacity-50" onClick={handleClearTeacher} />
                                            )}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0">
                                        <div className="p-2 border-b">
                                            <Input placeholder="Поиск учителя..." value={teacherSearch} onChange={(e) => setTeacherSearch(e.target.value)} />
                                        </div>
                                        <ScrollArea className="h-64">
                                            {filteredTeachers.map((t: Teacher) => (
                                                <div key={t.id} className="p-2 hover:bg-accent cursor-pointer" onClick={() => handleSelectTeacher(t)}>
                                                    {t.name}
                                                </div>
                                            ))}
                                        </ScrollArea>
                                    </PopoverContent>
                                </Popover>
                                <input type="hidden" {...register('teacherId')} />
                            </div>
                        </div>

                        {viewMode !== 'view' && (
                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Сохранение..." : "Сохранить"}
                                </Button>
                            </DialogFooter>
                        )}
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Подтвердите удаление</DialogTitle>
                        <DialogDescription>Вы уверены, что хотите удалить эту запись?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeDeleteDialog}>Отмена</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>Удалить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}