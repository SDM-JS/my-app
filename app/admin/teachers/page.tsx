'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/app/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Eye, Star, User, Upload, X } from 'lucide-react';
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
import { CldUploadWidget } from 'next-cloudinary';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

const teacherSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be valid'),
    password: z.string().min(8, 'Password must be at least 8 characters').optional(),
    email: z.string().email('Invalid email address'),
    birthday: z.string().min(1, 'Birthday is required'),
    subjectIds: z.array(z.string()).min(1, 'At least one subject is required'),
    avatarUrl: z.string().optional()
});

type TeacherFormData = z.infer<typeof teacherSchema>;

type TeacherWithRelations = Teacher & {
    subjects: Subject[];
    password?: string
};

export default function TeachersPage() {
    // Fetch teachers data
    const { data: teachersData, isLoading, refetch } = useQuery({
        queryKey: ["teachers"],
        queryFn: async () => {
            const { data } = await axiosClient.get<TeacherWithRelations[]>("/api/teachers")
            return data
        },
    });

    // Fetch subjects for dropdown
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

    // Watch subjectIds to get current values
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

            // Only set password for create mode, not for edit/view
            if (mode === 'create') {
                setValue('password', '');
            }

            // Safely handle birthday date conversion
            const birthday = new Date(teacher.birthday);
            const formattedBirthday = isNaN(birthday.getTime())
                ? ''
                : birthday.toISOString().split('T')[0];
            setValue('birthday', formattedBirthday);

            setValue('subjectIds', teacher.subjects?.map(subject => subject.id) || []);
        } else {
            setAvatarUrl('');
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
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedTeacher(null);
    };

    // Create teacher using API route
    const createTeacher = async (data: TeacherFormData) => {
        try {
            const response = await axiosClient.post('/api/teachers', {
                name: data.name,
                phone: data.phone,
                email: data.email,
                birthday: new Date(data.birthday),
                subjectIds: data.subjectIds,
                avatarUrl: avatarUrl || data.avatarUrl,
                password: data.password
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to create teacher');
        }
    };

    // Update teacher using API route
    const updateTeacher = async (id: string, data: TeacherFormData) => {
        try {
            const response = await axiosClient.put(`/api/teachers/${id}`, {
                name: data.name,
                phone: data.phone,
                email: data.email,
                birthday: new Date(data.birthday),
                subjectIds: data.subjectIds,
                avatarUrl: avatarUrl || data.avatarUrl,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to update teacher');
        }
    };

    const onSubmit = async (data: TeacherFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedTeacher) {
                // Update teacher
                await updateTeacher(selectedTeacher.id, data);
                toast.success("Teacher updated successfully!");
                refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                // Create new teacher
                await createTeacher(data);
                toast.success("Teacher created successfully!");
                refetch();
                closeDialog();
            }
        } catch (error: any) {
            console.error('Error submitting teacher:', error);
            toast.error(error.message || "Failed to save teacher");
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
        onSuccess: () => {
            // Update local state
            setTeachers(teachers.filter((t) => t.id !== selectedTeacher?.id));
            toast.success("Teacher deleted successfully!");
            closeDeleteDialog();
        }
    })

    const handleSubjectChange = (subjectId: string) => {
        const updatedSubjectIds = currentSubjectIds.includes(subjectId)
            ? currentSubjectIds.filter(id => id !== subjectId)
            : [...currentSubjectIds, subjectId];

        setValue('subjectIds', updatedSubjectIds, { shouldValidate: true });
    };

    const removeAvatar = () => {
        setAvatarUrl('');
        setValue('avatarUrl', '');
    };

    const columns = [
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            render: (value: string, item: any) => {
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={item.avatarUrl} />
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
            label: 'Subjects',
            sortable: true,
            render: (subjects: Subject[] | undefined) => {
                if (!subjects || subjects.length === 0) {
                    return <span className="text-muted-foreground">No subjects</span>;
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
            label: 'Phone',
            sortable: false
        },
        {
            key: 'email',
            label: 'Email',
            sortable: true
        },
        {
            key: 'ratings',
            label: 'Rating',
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
            label: 'Birthday',
            sortable: true,
            render: (birthday: string | Date) => {
                const date = new Date(birthday);
                return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
            },
        },
    ];

    // Loading state
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Teachers</h1>
                    <p className="text-muted-foreground">Manage teaching staff ({teachers.length} total)</p>
                </div>
                <Button className="gap-2" onClick={() => openDialog('create')}>
                    <Plus className="h-4 w-4" />
                    Add Teacher
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={teachers}
                actions={(teacher) => (
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openDialog("view", teacher)}>
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDialog("edit", teacher)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(teacher)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
                emptyMessage={
                    <div className="text-center py-12">
                        <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
                            <User className="h-12 w-12" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">No teachers found</h3>
                        <p className="text-muted-foreground mb-4">
                            {searchTerm ? 'Try a different search term' : 'Get started by creating a new teacher'}
                        </p>
                        {!searchTerm && (
                            <Button onClick={() => openDialog('create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Teacher
                            </Button>

                        )}
                    </div>
                }
            />

            {/* Teacher Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden p-0">
                    <DialogHeader className="px-6 pt-6">
                        <DialogTitle className="text-xl">
                            {viewMode === 'create' ? 'Add New Teacher' : viewMode === 'edit' ? 'Edit Teacher' : 'Teacher Details'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to add a new teacher'
                                : viewMode === 'edit'
                                    ? 'Update teacher information'
                                    : 'View teacher details'}
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="max-h-[calc(90vh-200px)]">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 pb-6">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative">
                                    <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                                        <AvatarImage src={avatarUrl || currentAvatarUrl} />
                                        <AvatarFallback className="text-2xl bg-primary/10">
                                            <User className="h-12 w-12" />
                                        </AvatarFallback>
                                    </Avatar>
                                    {avatarUrl && viewMode !== 'view' && (
                                        <button
                                            type="button"
                                            onClick={removeAvatar}
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        {...register('name')}
                                        disabled={viewMode === 'view' || isSubmitting}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...register('email')}
                                        disabled={viewMode === 'view' || isSubmitting}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                                </div>

                                {viewMode === 'create' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password *</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            {...register('password')}
                                            disabled={isSubmitting}
                                            placeholder="••••••••"
                                        />
                                        {errors.password && <p className="text-xs text-destructive">{errors.password?.message}</p>}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone *</Label>
                                    <Input
                                        id="phone"
                                        {...register('phone')}
                                        disabled={viewMode === 'view' || isSubmitting}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                    {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="birthday">Birthday *</Label>
                                    <Input
                                        id="birthday"
                                        type="date"
                                        {...register('birthday')}
                                        disabled={viewMode === 'view' || isSubmitting}
                                    />
                                    {errors.birthday && <p className="text-xs text-destructive">{errors.birthday.message}</p>}
                                </div>
                            </div>

                            {/* Subjects Section */}
                            <div className="space-y-3">
                                <Label>Subjects *</Label>
                                {subjectsLoading ? (
                                    <div className="text-sm text-muted-foreground">Loading subjects...</div>
                                ) : subjects && subjects.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-2 border rounded-lg p-3 max-h-48 overflow-y-auto">
                                        {subjects.map((subject: any) => (
                                            <div key={subject.id} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`subject-${subject.id}`}
                                                    checked={currentSubjectIds.includes(subject.id)}
                                                    onChange={() => handleSubjectChange(subject.id)}
                                                    disabled={viewMode === 'view' || isSubmitting}
                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                />
                                                <label
                                                    htmlFor={`subject-${subject.id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {subject.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-sm text-muted-foreground border rounded-lg p-4 text-center">
                                        No subjects available
                                    </div>
                                )}
                                {errors.subjectIds && <p className="text-xs text-destructive">{errors.subjectIds.message}</p>}
                            </div>

                            <DialogFooter className="pt-4 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={closeDialog}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                {viewMode !== 'view' && (
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                {viewMode === 'create' ? 'Creating...' : 'Saving...'}
                                            </div>
                                        ) : (
                                            viewMode === 'create' ? 'Create Teacher' : 'Save Changes'
                                        )}
                                    </Button>
                                )}
                            </DialogFooter>
                        </form>
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-destructive flex items-center gap-2">
                            <Trash2 className="h-5 w-5" />
                            Delete Teacher
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            Are you sure you want to delete <strong>{selectedTeacher?.name}</strong>?
                            This action cannot be undone and all associated data will be permanently removed.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteTeacher.isPending}
                            className="gap-2"
                        >
                            {deleteTeacher.isPending ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Deleting...
                                </div>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4" />
                                    Delete Teacher
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}