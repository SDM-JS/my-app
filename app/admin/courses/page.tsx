'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { Plus, Pencil, Trash2, Eye, Search, GraduationCap, X } from 'lucide-react';
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
import { Course, Groups, Lessons, Student, Subject, Teacher } from '@prisma/client';

// Схема Zod для валидации формы курса
const courseSchema = z.object({
    name: z.string().min(1, 'Название курса обязательно'),
    desc: z.string().min(1, 'Описание обязательно'),
    price: z.string().min(1, 'Цена обязательна'),
    subjectId: z.string().min(1, 'Выберите предмет'),
    teacherIds: z.array(z.string()).min(1, 'Выберите хотя бы одного преподавателя'),
});

type CourseFormData = z.infer<typeof courseSchema>;

type CourseWithRelations = Course & {
    subject: Subject | null;
    teacher: Teacher[];
    students: Student[];
    lessons: Lessons[];
    groups: Groups[];
};

// Трансформация данных для таблицы
const transformCoursesForTable = (courses: CourseWithRelations[]) => {
    return courses.map(course => ({
        id: course.id,
        name: course.name,
        desc: course.desc,
        price: `${course.price}`,
        subject: course.subject?.name || 'Без предмета',
        teachersCount: course.teacher?.length || 0,
        studentsCount: course.students?.length || 0,
        _subject: course.subject,
        _teacher: course.teacher,
        _students: course.students,
        _raw: course
    }));
};

export default function CoursesPage() {
    // Получение курсов
    const { data: coursesData, isLoading, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const { data } = await axiosClient.get<CourseWithRelations[]>("/api/courses")
            return data
        },
    });

    // Получение предметов
    const { data: subjects } = useQuery({
        queryKey: ["subjects"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/subjects")
            return data
        },
    });

    // Получение преподавателей
    const { data: teachersData } = useQuery({
        queryKey: ["teachers"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/teachers")
            return data
        },
    });

    const [courses, setCourses] = useState<CourseWithRelations[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseWithRelations | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [teacherSearch, setTeacherSearch] = useState('');
    const [selectedTeachers, setSelectedTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        if (coursesData) {
            setCourses(coursesData);
            setTableData(transformCoursesForTable(coursesData));
        }
    }, [coursesData]);

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
    } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            teacherIds: [],
        }
    });

    const openDeleteDialog = (course: any) => {
        const originalCourse = courses.find(c => c.id === course._raw.id) || course._raw;
        setSelectedCourse(originalCourse);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedCourse(null);
    };

    const openDialog = (mode: 'view' | 'edit' | 'create', tableCourse?: any) => {
        setViewMode(mode);
        if (tableCourse) {
            const originalCourse = courses.find(c => c.id === tableCourse._raw.id) || tableCourse._raw;
            setSelectedCourse(originalCourse);
            setSelectedTeachers(originalCourse.teacher || []);
            setValue('name', originalCourse.name);
            setValue('desc', originalCourse.desc);
            setValue('price', originalCourse.price);
            setValue('subjectId', originalCourse.subjectId || '');
            setValue('teacherIds', originalCourse.teacher.map((t: Teacher) => t.id));
        } else {
            reset({
                name: '',
                desc: '',
                price: '',
                subjectId: '',
                teacherIds: [],
            });
            setSelectedTeachers([]);
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedCourse(null);
        setSelectedTeachers([]);
        setTeacherSearch('');
        reset();
    };

    const toggleTeacher = (teacher: Teacher) => {
        const isSelected = selectedTeachers.some(t => t.id === teacher.id);
        const newTeachers = isSelected
            ? selectedTeachers.filter(t => t.id !== teacher.id)
            : [...selectedTeachers, teacher];

        setSelectedTeachers(newTeachers);
        setValue('teacherIds', newTeachers.map(t => t.id));
        trigger('teacherIds');
    };

    const handleClearTeachers = () => {
        setSelectedTeachers([]);
        setValue('teacherIds', []);
        trigger('teacherIds');
    };

    const onSubmit = async (data: CourseFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedCourse) {
                await axiosClient.put(`/api/courses/${selectedCourse.id}`, data);
                toast.success("Курс успешно обновлен!");
                refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                await axiosClient.post('/api/courses', data);
                toast.success("Курс успешно создан!");
                refetch();
                closeDialog();
            }
        } catch (error: any) {
            toast.error(error.message || "Ошибка при сохранении курса");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (selectedCourse) {
            try {
                await axiosClient.delete(`/api/courses/${selectedCourse.id}`);
                setCourses(courses.filter((c) => c.id !== selectedCourse.id));
                toast.success("Курс удален!");
                closeDeleteDialog();
            } catch (error: any) {
                toast.error("Не удалось удалить курс");
            }
        }
    };

    const columns = [
        { key: 'name', label: 'Название курса', sortable: true },
        {
            key: 'desc',
            label: 'Описание',
            sortable: true,
            render: (value: string) => <span className="line-clamp-1 max-w-[200px]">{value}</span>
        },
        { key: 'price', label: 'Цена', sortable: true, render: (value: string) => <span className="font-medium">{value}</span> },
        { key: 'subject', label: 'Предмет', sortable: true },
        {
            key: 'teachersCount',
            label: 'Учителя',
            sortable: true,
            render: (value: number) => <span className="text-blue-500 font-medium">{value}</span>
        },
        {
            key: 'studentsCount',
            label: 'Ученики',
            sortable: true,
            render: (value: number) => <span className="text-green-500 font-medium">{value}</span>
        },
    ];

    if (isLoading) {
        return <div className="p-8 text-center">Загрузка курсов...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Курсы</h1>
                    <p className="text-muted-foreground">Управление всеми курсами (всего: {tableData.length})</p>
                </div>
                <Button onClick={() => openDialog('create')} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Добавить курс
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={tableData}
                itemsPerPage={10}
                actions={(course) => (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog('view', course)} title="Просмотр">
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDialog('edit', course)} title="Редактировать">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(course)} title="Удалить">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Добавить новый курс' :
                                viewMode === 'edit' ? 'Редактировать курс' : 'Детали курса'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create' ? 'Заполните данные для создания курса' : 'Просмотр или изменение информации о курсе'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Название курса *</Label>
                            <Input id="name" {...register('name')} disabled={viewMode === 'view' || isSubmitting} placeholder="Введите название" />
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="desc">Описание *</Label>
                            <textarea
                                id="desc"
                                {...register('desc')}
                                disabled={viewMode === 'view' || isSubmitting}
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                                placeholder="Введите описание курса"
                            />
                            {errors.desc && <p className="text-xs text-destructive">{errors.desc.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Цена *</Label>
                            <Input id="price" {...register('price')} disabled={viewMode === 'view' || isSubmitting} placeholder="Напр., 25000" />
                            {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subjectId">Предмет *</Label>
                            <select
                                id="subjectId"
                                {...register('subjectId')}
                                disabled={viewMode === 'view' || isSubmitting}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                            >
                                <option value="">Выберите предмет</option>
                                {subjects?.map((subject: any) => (
                                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                                ))}
                            </select>
                            {errors.subjectId && <p className="text-xs text-destructive">{errors.subjectId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Преподаватели *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start h-10" disabled={viewMode === 'view' || isSubmitting}>
                                        <GraduationCap className="mr-2 h-4 w-4" />
                                        <span className="truncate">
                                            {selectedTeachers.length > 0 
                                                ? `Выбрано преподавателей: ${selectedTeachers.length}` 
                                                : "Выбрать преподавателей"}
                                        </span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-0" align="start">
                                    <div className="p-3 border-b">
                                        <Input placeholder="Поиск преподавателя..." value={teacherSearch} onChange={(e) => setTeacherSearch(e.target.value)} />
                                    </div>
                                    <ScrollArea className="h-64">
                                        {filteredTeachers.map((teacher: Teacher) => (
                                            <Button
                                                key={teacher.id}
                                                variant="ghost"
                                                className="w-full justify-start py-2 px-3"
                                                onClick={() => toggleTeacher(teacher)}
                                            >
                                                <div className={`mr-2 h-4 w-4 rounded border ${selectedTeachers.some(t => t.id === teacher.id) ? 'bg-primary' : 'border-input'}`} />
                                                {teacher.name}
                                            </Button>
                                        ))}
                                    </ScrollArea>
                                </PopoverContent>
                            </Popover>
                            {errors.teacherIds && <p className="text-xs text-destructive">{errors.teacherIds.message}</p>}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>Отмена</Button>
                            {viewMode !== 'view' && (
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Сохранение..." : viewMode === 'create' ? "Добавить" : "Сохранить"}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Удалить курс</DialogTitle>
                        <DialogDescription>
                            Вы уверены, что хотите удалить "<strong>{selectedCourse?.name}</strong>"? Это действие необратимо.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeDeleteDialog}>Отмена</Button>
                        <Button variant="destructive" onClick={handleDelete}>Удалить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}