'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { Plus, Pencil, Trash2, Eye, Search, GraduationCap, X, BookOpen } from 'lucide-react';
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
import { Groups, Teacher, Course, DaysOfWeek } from '@prisma/client';

// Схема Zod, соответствующая обновленной схеме Prisma
const groupSchema = z.object({
    name: z.string().min(1, 'Название группы обязательно'),
    courseId: z.string().min(1, 'Курс обязателен'),
    teacherId: z.string().min(1, 'Преподаватель обязателен!'),
    from: z.string().min(1, 'Время начала обязательно'),
    to: z.string().min(1, 'Время окончания обязательно'),
    daysOfWeek: z.array(z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])).min(1, 'Выберите хотя бы один день'),
});

type GroupFormData = z.infer<typeof groupSchema>;

type GroupWithRelations = Groups & {
    course: Course | null;
    teacher: Teacher | null;
    students: any[];
};

// Вспомогательная функция для преобразования групп для DataTable
const transformGroupsForTable = (groups: GroupWithRelations[]) => {
    return groups.map(group => ({
        id: group.id,
        name: group.name,
        course: group.course?.name || 'Нет курса',
        teacher: group.teacher?.name || 'Нет преподавателя',
        studentCount: group.students?.length || 0,
        from: (group as any).from,
        to: (group as any).to,
        daysOfWeek: (group as any).daysOfWeek ?? [],
        // Сохраняем исходные объекты для функций рендеринга
        _course: group.course,
        _teacher: group.teacher,
        _students: group.students,
        _raw: group // Сохраняем исходные данные для действий
    }));
};

export default function GroupsPage() {
    // Получение данных групп с отношениями
    const { data: groupsData, isLoading, refetch } = useQuery({
        queryKey: ["groups"],
        queryFn: async () => {
            const { data } = await axiosClient.get<GroupWithRelations[]>("/api/groups")
            return data
        },
    });

    // Получение курсов для выпадающего списка
    const { data: courses } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/courses")
            return data
        },
    });

    // Получение преподавателей для выпадающего списка
    const { data: teachers } = useQuery({
        queryKey: ["teachers"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/teachers")
            return data
        },
    });

    const [groups, setGroups] = useState<GroupWithRelations[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<GroupWithRelations | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDays, setSelectedDays] = useState<DaysOfWeek[]>([]);

    // Состояния Popover для выбора курса
    const [courseSearch, setCourseSearch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    // Состояния Popover для выбора преподавателя
    const [teacherSearch, setTeacherSearch] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    useEffect(() => {
        if (groupsData) {
            setGroups(groupsData);
            setTableData(transformGroupsForTable(groupsData));
        }
    }, [groupsData]);

    // Фильтрация курсов на основе поиска
    const filteredCourses = useMemo(() => {
        if (!courses) return [];
        return courses.filter((course: Course) =>
            course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
            (course.desc && course.desc.toLowerCase().includes(courseSearch.toLowerCase()))
        );
    }, [courses, courseSearch]);

    // Фильтрация преподавателей на основе поиска
    const filteredTeachers = useMemo(() => {
        if (!teachers) return [];
        return teachers.filter((teacher: Teacher) =>
            teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
            teacher.email.toLowerCase().includes(teacherSearch.toLowerCase())
        );
    }, [teachers, teacherSearch]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
        trigger,
    } = useForm<GroupFormData>({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            daysOfWeek: [],
        }
    });

    const openDeleteDialog = (group: any) => {
        const originalGroup = groups.find(g => g.id === group._raw.id) || group._raw;
        setSelectedGroup(originalGroup);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedGroup(null);
    };

    const openDialog = (mode: 'view' | 'edit' | 'create', tableGroup?: any) => {
        setViewMode(mode);
        if (tableGroup) {
            const originalGroup = groups.find(g => g.id === tableGroup._raw.id) || tableGroup._raw;
            setSelectedGroup(originalGroup);

            // Установка курса
            const courseObj = originalGroup.course;
            setSelectedCourse(courseObj);
            setValue('courseId', originalGroup.courseId || '');

            // Установка преподавателя
            const teacherObj = originalGroup.teacher;
            setSelectedTeacher(teacherObj);
            setValue('teacherId', originalGroup.teacherId || '');

            setValue('name', originalGroup.name);

            // Установка дней
            const days = originalGroup.daysOfWeek as DaysOfWeek[];
            setSelectedDays(days);
            setValue('daysOfWeek', days);
        } else {
            reset({
                name: '',
                courseId: '',
                teacherId: '',
                from: '',
                to: '',
                daysOfWeek: [],
            });
            setSelectedCourse(null);
            setSelectedTeacher(null);
            setSelectedDays([]);
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedGroup(null);
        setSelectedCourse(null);
        setSelectedTeacher(null);
        setCourseSearch('');
        setTeacherSearch('');
        reset();
        setSelectedDays([]);
    };

    const toggleDay = (day: DaysOfWeek) => {
        const newDays = selectedDays.includes(day)
            ? selectedDays.filter(d => d !== day)
            : [...selectedDays, day];

        setSelectedDays(newDays);
        setValue('daysOfWeek', newDays);
    };

    // Обработка выбора курса
    const handleSelectCourse = (course: Course) => {
        setSelectedCourse(course);
        setValue('courseId', course.id);
        setCourseSearch('');
        trigger('courseId');
    };

    // Обработка выбора преподавателя
    const handleSelectTeacher = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setValue('teacherId', teacher.id);
        setTeacherSearch('');
        trigger('teacherId');
    };

    // Очистка выбора курса
    const handleClearCourse = () => {
        setSelectedCourse(null);
        setValue('courseId', '');
        trigger('courseId');
    };

    // Очистка выбора преподавателя
    const handleClearTeacher = () => {
        setSelectedTeacher(null);
        setValue('teacherId', '');
        trigger('teacherId');
    };

    // Создание группы через API
    const createGroup = async (data: GroupFormData) => {
        // Преобразование строк времени в полную дату и время
        const today = new Date();
        const fromTime = new Date(`${today.toISOString().split('T')[0]}T${data.from}:00`);
        const toTime = new Date(`${today.toISOString().split('T')[0]}T${data.to}:00`);

        const response = await axiosClient.post('/api/groups', {
            name: data.name,
            courseId: data.courseId,
            teacherId: data.teacherId,
            from: fromTime,
            to: toTime,
            daysOfWeek: data.daysOfWeek,
        });
        return response.data;
    };

    // Обновление группы через API
    const updateGroup = async (id: string, data: GroupFormData) => {
        try {
            // Преобразование строк времени в полную дату и время
            const today = new Date();
            const fromTime = new Date(`${today.toISOString().split('T')[0]}T${data.from}:00`);
            const toTime = new Date(`${today.toISOString().split('T')[0]}T${data.to}:00`);

            const response = await axiosClient.put(`/api/groups/${id}`, {
                name: data.name,
                courseId: data.courseId,
                teacherId: data.teacherId,
                from: fromTime,
                to: toTime,
                daysOfWeek: data.daysOfWeek,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Не удалось обновить группу');
        }
    };

    const onSubmit = async (data: GroupFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedGroup) {
                // Обновление группы
                await updateGroup(selectedGroup.id, data);
                toast.success("Группа успешно обновлена!");
                await refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                // Создание новой группы
                await createGroup(data);
                toast.success("Группа успешно создана!");
                await refetch();
                closeDialog();
            }
        } catch (error: any) {
            console.error('Ошибка при сохранении группы:', error);
            toast.error(error.message || "Не удалось сохранить группу");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (selectedGroup) {
            try {
                // Удаление группы из базы данных
                await axiosClient.delete(`/api/groups/${selectedGroup.id}`);

                setGroups(groups.filter((g) => g.id !== selectedGroup.id));
                toast.success("Группа успешно удалена!");
                closeDeleteDialog();
                await refetch();
            } catch (error: any) {
                console.error('Ошибка при удалении группы:', error);
                const errorMessage = error.response?.data?.error || "Не удалось удалить группу";
                toast.error(errorMessage);

                // Если ошибка "не найдено", все равно удаляем из локального состояния
                if (error.response?.status === 404) {
                    setGroups(groups.filter((g) => g.id !== selectedGroup.id));
                    toast.info("Группа уже была удалена");
                    closeDeleteDialog();
                }
            }
        }
    };

    // Определение колонок для DataTable
    const columns = [
        {
            key: 'name',
            label: 'Название группы',
            sortable: true
        },
        {
            key: 'course',
            label: 'Курс',
            sortable: true,
            render: (value: string) => {
                return value || <span className="text-muted-foreground">Нет курса</span>;
            }
        },
        {
            key: 'teacher',
            label: 'Преподаватель',
            sortable: true,
            render: (value: string) => {
                return value || <span className="text-muted-foreground">Нет преподавателя</span>;
            }
        },
        {
            key: 'studentCount',
            label: 'Студенты',
            sortable: true,
            render: (value: number) => {
                return <span className="text-blue-500 font-medium">{value}</span>;
            }
        },
        {
            key: 'from',
            label: 'Время',
            sortable: true,
            render: (value: Date, item: any) => {
                if (value == null || item?.to == null) return <span className="text-muted-foreground">—</span>;
                const fromDate = new Date(value);
                const toDate = new Date(item.to);
                if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
                    return <span className="text-muted-foreground">—</span>;
                }
                return `${fromDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${toDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            },
        },
        {
            key: 'daysOfWeek',
            label: 'Дни',
            sortable: true,
            render: (value: DaysOfWeek[]) => {
                if (!value || value.length === 0) {
                    return 'Нет дней';
                }
                return value.map(day => day.slice(0, 3)).join(', ');
            },
        },
    ];

    // Состояние загрузки
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
                    <h1 className="text-3xl font-bold">Группы</h1>
                    <p className="text-muted-foreground">
                        Управление всеми группами студентов (всего {tableData.length})
                    </p>
                </div>
                <Button
                    onClick={() => openDialog('create')}
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Создать группу
                </Button>
            </div>

            {/* Таблица данных */}
            <DataTable
                columns={columns}
                data={tableData}
                actions={(item) => (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('view', item)}
                            title="Просмотр группы"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('edit', item)}
                            title="Редактирование группы"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(item)}
                            title="Удаление группы"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            {/* Диалог формы группы */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); }}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Создать новую группу' :
                                viewMode === 'edit' ? 'Редактировать группу' : 'Просмотр группы'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Заполните данные для создания новой группы'
                                : viewMode === 'edit'
                                    ? 'Обновление информации о группе'
                                    : 'Детали группы'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Название группы *</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                disabled={viewMode === 'view' || isSubmitting}
                                placeholder="Введите название группы"
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>

                        {/* Popover выбора курса */}
                        <div className="space-y-2">
                            <Label>Курс *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="w-full justify-start h-10"
                                        disabled={viewMode === 'view' || isSubmitting}
                                    >
                                        {selectedCourse ? (
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4" />
                                                    <span className="truncate">{selectedCourse.name}</span>
                                                </div>
                                                {viewMode !== 'view' && (
                                                    <div
                                                        className="h-6 w-6 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleClearCourse();
                                                        }}
                                                    >
                                                        <X className="h-3 w-3 hover:bg-accent hover:text-accent-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <BookOpen className="h-4 w-4" />
                                                <span>Выберите курс</span>
                                            </div>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-0" align="start">
                                    <div className="p-3 border-b">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                placeholder="Поиск курсов..."
                                                value={courseSearch}
                                                onChange={(e) => setCourseSearch(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <ScrollArea className="h-64">
                                        {filteredCourses.length > 0 ? (
                                            <div className="p-1">
                                                {filteredCourses.map((course: Course) => (
                                                    <Button
                                                        key={course.id}
                                                        variant="ghost"
                                                        className="w-full justify-start text-left h-auto py-2 px-3"
                                                        onClick={() => handleSelectCourse(course)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                                <BookOpen className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <div className="flex flex-col items-start">
                                                                <span className="font-medium">{course.name}</span>
                                                                {course.desc && (
                                                                    <span className="text-xs text-muted-foreground line-clamp-1">
                                                                        {course.desc}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-6 text-center">
                                                <p className="text-sm text-muted-foreground">
                                                    {courseSearch ? 'Курсы не найдены' : 'Нет доступных курсов'}
                                                </p>
                                            </div>
                                        )}
                                    </ScrollArea>
                                </PopoverContent>
                            </Popover>
                            {errors.courseId && <p className="text-xs text-destructive">{errors.courseId.message}</p>}
                            <input type="hidden" {...register('courseId')} />
                        </div>

                        {/* Popover выбора преподавателя */}
                        <div className="space-y-2">
                            <Label>Преподаватель *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start h-10"
                                        disabled={viewMode === 'view' || isSubmitting}
                                    >
                                        {selectedTeacher ? (
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4" />
                                                    <span className="truncate">{selectedTeacher.name}</span>
                                                </div>
                                                {viewMode !== 'view' && (
                                                    <div
                                                        className="h-6 w-6 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleClearTeacher();
                                                        }}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <GraduationCap className="h-4 w-4" />
                                                <span>Выберите преподавателя</span>
                                            </div>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-0" align="start">
                                    <div className="p-3 border-b">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                placeholder="Поиск преподавателей..."
                                                value={teacherSearch}
                                                onChange={(e) => setTeacherSearch(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <ScrollArea className="h-64">
                                        {filteredTeachers.length > 0 ? (
                                            <div className="p-1">
                                                {filteredTeachers.map((teacher: Teacher) => (
                                                    <Button
                                                        key={teacher.id}
                                                        variant="ghost"
                                                        className="w-full justify-start text-left h-auto py-2 px-3"
                                                        onClick={() => handleSelectTeacher(teacher)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                                <GraduationCap className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <div className="flex flex-col items-start">
                                                                <span className="font-medium">{teacher.name}</span>
                                                                <span className="text-xs text-muted-foreground">
                                                                    {teacher.email}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-6 text-center">
                                                <p className="text-sm text-muted-foreground">
                                                    {teacherSearch ? 'Преподаватели не найдены' : 'Нет доступных преподавателей'}
                                                </p>
                                            </div>
                                        )}
                                    </ScrollArea>
                                </PopoverContent>
                            </Popover>
                            {errors.teacherId && <p className="text-xs text-destructive">{errors.teacherId.message}</p>}
                            <input type="hidden" {...register('teacherId')} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="from">Время начала *</Label>
                                <Input
                                    id="from"
                                    type="time"
                                    {...register('from')}
                                    disabled={viewMode === 'view' || isSubmitting}
                                />
                                {errors.from && <p className="text-xs text-destructive">{errors.from.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="to">Время окончания *</Label>
                                <Input
                                    id="to"
                                    type="time"
                                    {...register('to')}
                                    disabled={viewMode === 'view' || isSubmitting}
                                />
                                {errors.to && <p className="text-xs text-destructive">{errors.to.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Дни недели *</Label>
                            <div className="flex flex-wrap gap-2">
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                                    <Button
                                        key={day}
                                        type="button"
                                        variant={selectedDays.includes(day as DaysOfWeek) ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => toggleDay(day as DaysOfWeek)}
                                        disabled={viewMode === 'view' || isSubmitting}
                                        className="capitalize"
                                    >
                                        {day.slice(0, 3)}
                                    </Button>
                                ))}
                            </div>
                            {errors.daysOfWeek && <p className="text-xs text-destructive">{errors.daysOfWeek.message}</p>}
                            <input type="hidden" {...register('daysOfWeek')} />
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
                                        viewMode === 'create' ? 'Создать группу' : 'Сохранить изменения'
                                    )}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Диалог подтверждения удаления */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => { if (!open) closeDeleteDialog(); }}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Удалить группу</DialogTitle>
                        <DialogDescription>
                            Вы уверены, что хотите удалить группу "<strong>{selectedGroup?.name}</strong>"?
                            Это действие невозможно отменить, и все студенты в этой группе будут откреплены.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Отмена
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            Удалить группу
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}