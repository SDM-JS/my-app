'use client';

import { useState, useEffect, useRef } from 'react';
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from '@imagekit/next';
import DataTable from '@/app/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Eye, Star, User, X, Upload, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axiosClient';
import { Teacher, Subject } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { noAvatarURL } from '@/lib/constants';

// Схема валидации Zod
const teacherSchema = z.object({
    name: z.string().min(2, 'ФИО должно содержать минимум 2 символа'),
    phone: z.string().min(10, 'Введите корректный номер телефона'),
    password: z.string().min(8, 'Пароль должен быть не менее 8 символов').optional(),
    email: z.string().email('Некорректный адрес электронной почты'),
    birthday: z.string().min(1, 'Дата рождения обязательна'),
    subjectIds: z.array(z.string()).min(1, 'Выберите хотя бы один предмет'),
    avatarUrl: z.string().optional()
});

type TeacherFormData = z.infer<typeof teacherSchema>;

type TeacherWithRelations = Teacher & {
    subjects: Subject[];
    password?: string
};

export default function TeachersPage() {
    // Получение данных учителей
    const { data: teachersData, isLoading, refetch } = useQuery({
        queryKey: ["teachers"],
        queryFn: async () => {
            const { data } = await axiosClient.get<TeacherWithRelations[]>("/api/teachers")
            return data
        },
    });

    // Получение предметов для выбора
    const { data: subjects, isLoading: subjectsLoading } = useQuery({
        queryKey: ["subjects"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/subjects")
            return data
        },
    });

    const [teachers, setTeachers] = useState<TeacherWithRelations[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<TeacherWithRelations | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [avatarFileId, setAvatarFileId] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const avatarFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (teachersData) {
            setTeachers(teachersData);
        }
    }, [teachersData]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TeacherFormData>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            subjectIds: [],
            avatarUrl: ''
        }
    });

    const currentSubjectIds = watch('subjectIds');
    const currentAvatarUrl = watch('avatarUrl');

    const openDialog = (mode: 'view' | 'edit' | 'create', teacher?: TeacherWithRelations) => {
        setViewMode(mode);
        if (teacher) {
            setSelectedTeacher(teacher);
            setValue('name', teacher.name);
            setValue('phone', teacher.phone);
            setValue('email', teacher.email);
            setValue('avatarUrl', teacher.avatarUrl || '');
            setAvatarUrl(teacher.avatarUrl || '');
            setAvatarFileId((teacher as { avatarFileId?: string | null }).avatarFileId ?? null);

            if (mode === 'create') {
                setValue('password', '');
            }

            const birthday = new Date(teacher.birthday);
            const formattedBirthday = isNaN(birthday.getTime())
                ? ''
                : birthday.toISOString().split('T')[0];
            setValue('birthday', formattedBirthday);

            setValue('subjectIds', teacher.subjects?.map(subject => subject.id) || []);
        } else {
            setAvatarUrl('');
            setAvatarFileId(null);
            reset({
                name: '',
                phone: '',
                email: '',
                birthday: '',
                password: '',
                subjectIds: [],
                avatarUrl: ''
            });
        }
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (teacher: TeacherWithRelations) => {
        setSelectedTeacher(teacher);
        setIsDeleteDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedTeacher(null);
        setAvatarUrl('');
        setAvatarFileId(null);
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedTeacher(null);
    };

    const createTeacher = async (data: TeacherFormData) => {
        try {
            const response = await axiosClient.post('/api/teachers', {
                name: data.name,
                phone: data.phone,
                email: data.email,
                birthday: new Date(data.birthday),
                subjectIds: data.subjectIds,
                avatarUrl: avatarUrl || data.avatarUrl || '',
                avatarFileId: avatarFileId ?? undefined,
                password: data.password
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Не удалось создать преподавателя');
        }
    };

    const updateTeacher = async (id: string, data: TeacherFormData) => {
        try {
            const response = await axiosClient.put(`/api/teachers/${id}`, {
                name: data.name,
                phone: data.phone,
                email: data.email,
                birthday: new Date(data.birthday),
                subjectIds: data.subjectIds,
                avatarUrl: avatarUrl !== '' ? avatarUrl : (currentAvatarUrl || ''),
                avatarFileId: avatarFileId ?? undefined,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Не удалось обновить преподавателя');
        }
    };

    const onSubmit = async (data: TeacherFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedTeacher) {
                await updateTeacher(selectedTeacher.id, data);
                toast.success("Данные обновлены!");
                await refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                await createTeacher(data);
                toast.success("Преподаватель успешно добавлен!");
                await refetch();
                closeDialog();
            }
        } catch (error: any) {
            console.error('Ошибка:', error);
            toast.error(error.message || "Не удалось сохранить изменения");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (selectedTeacher) {
            deleteTeacher.mutate()
        }
    };

    const deleteTeacher = useMutation({
        mutationFn: async () => {
            await axiosClient.delete(`/api/teachers/${selectedTeacher?.id}`);
        },
        onSuccess: async () => {
            setTeachers(teachers.filter((t) => t.id !== selectedTeacher?.id));
            toast.success("Преподаватель удален!");
            closeDeleteDialog();
            await refetch();
        },
    })

    const handleSubjectChange = (subjectId: string) => {
        const updatedSubjectIds = currentSubjectIds.includes(subjectId)
            ? currentSubjectIds.filter(id => id !== subjectId)
            : [...currentSubjectIds, subjectId];

        setValue('subjectIds', updatedSubjectIds, { shouldValidate: true });
    };

    const removeAvatar = () => {
        setAvatarUrl('');
        setAvatarFileId(null);
        setValue('avatarUrl', '');
    };

    const uploadAuthenticator = async () => {
        const response = await fetch('/api/upload-auth');
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Аутентификация загрузки не удалась: ${response.status} ${errorText}`);
        }
        return await response.json();
    };

    const handleAvatarUpload = async () => {
        const fileInput = avatarFileInputRef.current;
        if (!fileInput?.files?.length) {
            fileInput?.click();
            return;
        }
        const file = fileInput.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Пожалуйста, выберите изображение (JPEG, PNG, WebP или GIF)');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Размер изображения не должен превышать 5МБ');
            return;
        }
        setIsUploading(true);
        setUploadProgress(0);
        try {
            const authData = await uploadAuthenticator();
            const uploadResponse = await upload({
                ...authData,
                file,
                fileName: `teachers/${Date.now()}-${file.name.replace(/\s+/g, '-')}`,
                responseFields: ['fileId', 'url'],
                onProgress: (event) => setUploadProgress((event.loaded / event.total) * 100),
            });
            const res = uploadResponse as { url?: string; fileId?: string };
            if (res.url) {
                setAvatarUrl(res.url);
                if (res.fileId) setAvatarFileId(res.fileId);
                setValue('avatarUrl', res.url, { shouldValidate: true });
                toast.success('Фото профиля загружено');
            }
        } catch (error) {
            toast.error('Не удалось загрузить изображение');
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            fileInput.value = '';
        }
    };

    const columns = [
        {
            key: 'name',
            label: 'ФИО',
            sortable: true,
            render: (value: string, item: any) => {
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={item.avatarUrl || noAvatarURL} />
                            <AvatarFallback className="bg-primary/10">
                                <User className="h-5 w-5 text-primary" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{value}</p>
                            <p className="text-xs text-muted-foreground">
                                ID: {item.id.slice(0, 8)}...
                            </p>
                        </div>
                    </div>
                )
            }
        },
        {
            key: 'subjects',
            label: 'Предметы',
            sortable: true,
            render: (subjects: Subject[] | undefined) => {
                if (!subjects || subjects.length === 0) {
                    return <span className="text-muted-foreground">Нет предметов</span>;
                }
                return (
                    <div className="flex flex-wrap gap-1">
                        {subjects.map((subject) => (
                            <Badge key={subject.id} variant="outline" className="text-xs">
                                {subject.name}
                            </Badge>
                        ))}
                    </div>
                );
            }
        },
        {
            key: 'phone',
            label: 'Телефон',
            sortable: false
        },
        {
            key: 'email',
            label: 'Email',
            sortable: true
        },
        {
            key: 'ratings',
            label: 'Рейтинг',
            sortable: true,
            render: (ratings: number | null) => (
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{ratings?.toFixed(1) || '0.0'}</span>
                </div>
            ),
        },
        {
            key: 'birthday',
            label: 'День рождения',
            sortable: true,
            render: (birthday: string | Date) => {
                const date = new Date(birthday);
                return isNaN(date.getTime()) ? 'Неверная дата' : date.toLocaleDateString('ru-RU');
            },
        },
    ];

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Загрузка данных преподавателей...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Преподаватели</h1>
                    <p className="text-muted-foreground">Управление учебным персоналом (всего: {teachers.length})</p>
                </div>
                <Button className="gap-2" onClick={() => openDialog('create')}>
                    <Plus className="h-4 w-4" />
                    Добавить преподавателя
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={teachers}
                actions={(teacher) => (
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openDialog("view", teacher)} title="Просмотр">
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDialog("edit", teacher)} title="Редактировать">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(teacher)} title="Удалить">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
                emptyMessage={
                    <div className="text-center py-12">
                        <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                            <User className="h-12 w-12" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Преподаватели не найдены</h3>
                        <p className="text-muted-foreground mb-4">Начните работу, создав первую запись</p>
                        <Button onClick={() => openDialog('create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Добавить преподавателя
                        </Button>
                    </div>
                }
            />

            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden p-0">
                    <DialogHeader className="px-6 pt-6">
                        <DialogTitle className="text-xl">
                            {viewMode === 'create' ? 'Новый преподаватель' : viewMode === 'edit' ? 'Редактирование' : 'Информация'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create' ? 'Заполните данные для регистрации' : 'Обновите или просмотрите информацию'}
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="max-h-[calc(90vh-200px)]">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 pb-6">
                            <div className="flex flex-col items-center gap-4">
                                <input
                                    type="file"
                                    ref={avatarFileInputRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarUpload}
                                />
                                <div className="relative">
                                    <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                                        {(avatarUrl || currentAvatarUrl) && <AvatarImage src={avatarUrl || currentAvatarUrl} />}
                                        <AvatarFallback className="text-2xl bg-primary/10">
                                            <User className="h-12 w-12" />
                                        </AvatarFallback>
                                    </Avatar>
                                    {avatarUrl && viewMode !== 'view' && (
                                        <button type="button" onClick={removeAvatar} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-white flex items-center justify-center"><X className="h-3 w-3" /></button>
                                    )}
                                </div>
                                {viewMode !== 'view' && (
                                    <Button type="button" variant="outline" size="sm" onClick={() => avatarFileInputRef.current?.click()} disabled={isUploading}>
                                        {isUploading ? `Загрузка ${Math.round(uploadProgress)}%` : 'Загрузить фото'}
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>ФИО *</Label>
                                    <Input {...register('name')} disabled={viewMode === 'view' || isSubmitting} placeholder="Иванов Иван Иванович" />
                                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Email *</Label>
                                    <Input type="email" {...register('email')} disabled={viewMode === 'view' || isSubmitting} placeholder="example@mail.ru" />
                                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                                </div>
                                {viewMode === 'create' && (
                                    <div className="space-y-2">
                                        <Label>Пароль *</Label>
                                        <Input type="password" {...register('password')} disabled={isSubmitting} placeholder="••••••••" />
                                        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label>Телефон *</Label>
                                    <Input {...register('phone')} disabled={viewMode === 'view' || isSubmitting} placeholder="+7 (999) 000-00-00" />
                                    {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>День рождения *</Label>
                                    <Input type="date" {...register('birthday')} disabled={viewMode === 'view' || isSubmitting} />
                                    {errors.birthday && <p className="text-xs text-destructive">{errors.birthday.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label>Предметы *</Label>
                                <div className="grid grid-cols-2 gap-2 border rounded-lg p-3 max-h-48 overflow-y-auto">
                                    {subjects?.map((subject: any) => (
                                        <div key={subject.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={`sub-${subject.id}`}
                                                checked={currentSubjectIds.includes(subject.id)}
                                                onChange={() => handleSubjectChange(subject.id)}
                                                disabled={viewMode === 'view' || isSubmitting}
                                                className="h-4 w-4 rounded border-gray-300 text-primary"
                                            />
                                            <Label htmlFor={`sub-${subject.id}`} className="text-sm font-normal">{subject.name}</Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.subjectIds && <p className="text-xs text-destructive">{errors.subjectIds.message}</p>}
                            </div>

                            <DialogFooter className="pt-4 border-t">
                                <Button type="button" variant="outline" onClick={closeDialog} disabled={isSubmitting}>Отмена</Button>
                                {viewMode !== 'view' && (
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Сохранение...' : (viewMode === 'create' ? 'Создать' : 'Сохранить')}
                                    </Button>
                                )}
                            </DialogFooter>
                        </form>
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-destructive flex items-center gap-2">
                            <Trash2 className="h-5 w-5" />
                            Удаление преподавателя
                        </DialogTitle>
                        <DialogDescription>
                            Вы уверены, что хотите удалить <strong>{selectedTeacher?.name}</strong>? Это действие нельзя отменить.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeDeleteDialog} disabled={deleteTeacher.isPending}>Отмена</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={deleteTeacher.isPending}>
                            {deleteTeacher.isPending ? "Удаление..." : "Удалить преподавателя"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}