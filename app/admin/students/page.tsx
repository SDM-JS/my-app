'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cameFrom, Student as PStudent, Course, Groups } from "@prisma/client"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Eye, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DataTable from '@/app/components/DataTable';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axiosClient';

// Схема валидации Zod
const studentSchema = z.object({
    name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
    phone: z.string().min(10, 'Введите корректный номер телефона'),
    birthday: z.string().min(1, 'Дата рождения обязательна'),
    courseId: z.string().optional(),
    groupId: z.string().optional(),
    cameFromId: z.string().optional()
});

type StudentFormData = z.infer<typeof studentSchema>;

type StudentWithRelations = PStudent & {
    courses: Course[];
    group: Groups | null;
    cameFrom: cameFrom
};

export default function StudentsPage() {
    // Загрузка данных студентов
    const { data: studentsData, isLoading, refetch } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const { data } = await axiosClient.get<StudentWithRelations[]>("/api/students")
            return data
        },
    });

    // Загрузка курсов для выпадающего списка
    const { data: courses } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/courses")
            return data
        },
    });

    // Загрузка групп для выпадающего списка
    const { data: groups } = useQuery({
        queryKey: ["groups"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/groups")
            return data
        },
    });

    // Загрузка источников (откуда узнали)
    const { data: cameFromData } = useQuery({
        queryKey: ['cameFrom'],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/cameFrom")
            return data
        }
    })

    const [students, setStudents] = useState<StudentWithRelations[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentWithRelations | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (studentsData) {
            setStudents(studentsData);
        }
    }, [studentsData]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema),
    });

    const openDeleteDialog = (student: StudentWithRelations) => {
        setSelectedStudent(student);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedStudent(null);
    };

    const openDialog = (mode: 'view' | 'edit' | 'create', student?: StudentWithRelations) => {
        setViewMode(mode);
        if (student) {
            setSelectedStudent(student);
            setValue('name', student.name);
            setValue('phone', student.phone);

            // Обработка даты рождения
            const birthday = new Date(student.birthday);
            const formattedBirthday = isNaN(birthday.getTime())
                ? ''
                : birthday.toISOString().split('T')[0];
            setValue('birthday', formattedBirthday);

            setValue('courseId', student.courses?.[0]?.id || '');
            setValue('groupId', student.groupId || '');
            setValue('cameFromId', student.cameFrom?.id || undefined);
        } else {
            reset({
                name: '',
                phone: '',
                birthday: '',
                courseId: '',
                groupId: '',
                cameFromId: undefined
            });
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedStudent(null);
        reset();
    };

    const createStudent = async (data: StudentFormData) => {
        const response = await axiosClient.post('/api/students', {
            name: data.name,
            phone: data.phone,
            birthday: new Date(data.birthday),
            courseId: data.courseId || null,
            groupId: data.groupId || null,
            cameFrom: data.cameFromId
        });
        return response.data;
    };

    const updateStudent = async (id: string, data: StudentFormData) => {
        try {
            const response = await axiosClient.put(`/api/students/${id}`, {
                name: data.name,
                phone: data.phone,
                birthday: new Date(data.birthday),
                courseId: data.courseId || null,
                groupId: data.groupId || null,
                cameFrom: data.cameFromId
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Ошибка при обновлении студента');
        }
    };

    const onSubmit = async (data: StudentFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedStudent) {
                await updateStudent(selectedStudent.id, data);
                toast.success("Данные студента обновлены!");
                await refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                await createStudent(data);
                toast.success("Студент успешно добавлен!");
                await refetch();
                closeDialog();
            }
        } catch (error: any) {
            console.error('Ошибка сохранения:', error);
            toast.error(error.message || "Не удалось сохранить данные");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true)
        if (selectedStudent) {
            try {
                await axiosClient.delete(`/api/students/${selectedStudent.id}`);
                setStudents(students.filter((s) => s.id !== selectedStudent.id));
                toast.success("Студент удален!");
                closeDeleteDialog();
                await refetch();
            } catch (error: any) {
                console.error('Ошибка удаления:', error);
                const errorMessage = error.response?.data?.error || "Ошибка при удалении";
                toast.error(errorMessage);

                if (error.response?.status === 404) {
                    setStudents(students.filter((s) => s.id !== selectedStudent.id));
                    toast.info("Студент уже был удален");
                    closeDeleteDialog();
                }
            } finally {
                setIsSubmitting(false)
            }
        }
    };

    const columns = [
        {
            key: 'name',
            label: 'ФИО',
            sortable: true
        },
        {
            key: 'phone',
            label: 'Телефон',
            sortable: false
        },
        {
            key: 'courses',
            label: 'Курс',
            sortable: true,
            render: (courses: Course[] | undefined) => {
                if (!courses || courses.length === 0) {
                    return <span className="text-muted-foreground">Нет курса</span>;
                }
                return courses[0]?.name || 'Нет курса';
            }
        },
        {
            key: 'group',
            label: 'Группа',
            sortable: true,
            render: (group: Groups | null | undefined) =>
                group?.name || <span className="text-muted-foreground">Нет группы</span>
        },
        {
            key: 'cameFrom',
            label: 'Источник',
            render: (cameFrom: any) => (
                <Badge variant="outline" className="capitalize">
                    {cameFrom ? cameFrom.name : "Неизвестно"}
                </Badge>
            ),
        },
        {
            key: 'birthday',
            label: 'ДР',
            sortable: true,
            render: (birthday: string | Date) => {
                const date = new Date(birthday);
                return isNaN(date.getTime()) ? 'Дата неверна' : date.toLocaleDateString('ru-RU');
            },
        },
        {
            key: 'createdAt',
            label: 'Добавлен',
            sortable: true,
            render: (createdAt: string | Date) => {
                const date = new Date(createdAt);
                return isNaN(date.getTime()) ? 'Дата неверна' : date.toLocaleDateString('ru-RU');
            },
        },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="h-8 w-48 bg-muted rounded-md animate-pulse"></div>
                        <div className="h-4 w-64 bg-muted/50 rounded-md animate-pulse"></div>
                    </div>
                    <div className="h-9 w-28 bg-muted rounded-md animate-pulse"></div>
                </div>

                <div className="rounded-lg border bg-card">
                    <div className="p-6">
                        <div className="h-10 w-full bg-muted rounded-md animate-pulse mb-4"></div>
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-muted rounded-full animate-pulse"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                                            <div className="h-3 w-28 bg-muted/50 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
                                        <div className="h-6 w-20 bg-muted rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Заголовок */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Студенты</h1>
                    <p className="text-muted-foreground">
                        Управление базой студентов (всего: {students.length})
                    </p>
                </div>
                <Button
                    onClick={() => openDialog('create')}
                    className="gap-2"
                    size="lg"
                >
                    <Plus className="h-4 w-4" />
                    Добавить студента
                </Button>
            </div>

            {/* Таблица данных */}
            <DataTable
                columns={columns}
                data={students}
                actions={(student) => (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('view', student)}
                            title="Просмотр"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('edit', student)}
                            title="Редактировать"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(student)}
                            title="Удалить"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
                emptyMessage={
                    <div className="text-center py-12">
                        <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                            <User className="h-12 w-12" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Студенты не найдены</h3>
                        <p className="text-muted-foreground mb-4">
                            Начните работу, добавив первого студента в систему
                        </p>

                        <Button onClick={() => openDialog('create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Создать запись
                        </Button>
                    </div>
                }
            />

            {/* Диалог формы */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Новый студент' :
                                viewMode === 'edit' ? 'Редактирование' : 'Детали профиля'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Заполните данные для регистрации студента'
                                : viewMode === 'edit'
                                    ? 'Обновите информацию о студенте'
                                    : 'Просмотр полной информации'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">ФИО *</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                disabled={viewMode === 'view' || isSubmitting}
                                placeholder="Иванов Иван Иванович"
                            />
                            {errors.name && (
                                <p className="text-xs text-destructive">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Номер телефона *</Label>
                            <Input
                                id="phone"
                                {...register('phone')}
                                disabled={viewMode === 'view' || isSubmitting}
                                placeholder="+7 (999) 000-00-00"
                            />
                            {errors.phone && (
                                <p className="text-xs text-destructive">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="birthday">Дата рождения *</Label>
                            <Input
                                id="birthday"
                                type="date"
                                {...register('birthday')}
                                disabled={viewMode === 'view' || isSubmitting}
                            />
                            {errors.birthday && (
                                <p className="text-xs text-destructive">{errors.birthday.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="courseId">Курс</Label>
                            <select
                                id="courseId"
                                {...register('courseId')}
                                disabled={viewMode === 'view' || isSubmitting}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Выберите курс (необязательно)</option>
                                {courses?.map((course: any) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="groupId">Группа</Label>
                            <select
                                id="groupId"
                                {...register('groupId')}
                                disabled={viewMode === 'view' || isSubmitting}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Выберите группу (необязательно)</option>
                                {groups?.map((group: any) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cameFrom">Откуда узнали? *</Label>
                            <select
                                id="cameFrom"
                                {...register('cameFromId')}
                                disabled={viewMode === 'view' || isSubmitting}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Выберите источник</option>
                                {cameFromData?.map((source: any) => (
                                    <option key={source.id} value={source.id}>
                                        {source.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDialog}
                                disabled={isSubmitting}
                            >
                                Отмена
                            </Button>
                            {viewMode !== 'view' && (
                                <Button type="submit" disabled={isSubmitting} className='ml-2'>
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            {viewMode === 'create' ? 'Создание...' : 'Сохранение...'}
                                        </div>
                                    ) : (
                                        viewMode === 'create' ? 'Добавить студента' : 'Сохранить изменения'
                                    )}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Диалог удаления */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">
                            Удаление студента
                        </DialogTitle>
                        <DialogDescription>
                            Вы уверены, что хотите удалить студента <strong>{selectedStudent?.name}</strong>?
                            Это действие нельзя отменить, все связанные данные будут безвозвратно удалены.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeDeleteDialog}
                            disabled={isSubmitting}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Удаление..." : "Удалить"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}