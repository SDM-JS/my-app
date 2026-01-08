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
import { Plus, Pencil, Trash2, Eye, BookOpen, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DataTable from '@/app/components/DataTable';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axiosClient';

// Fixed Zod schema
const studentSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be valid'),
    birthday: z.string().min(1, 'Birthday is required'),
    courseId: z.string().optional(),
    groupId: z.string().optional(),
    cameFromId: z.string().optional()
});

type StudentFormData = z.infer<typeof studentSchema>;

type StudentWithRelations = PStudent & {
    cources: Course[];
    group: Groups | null;
    cameFrom: cameFrom
};

export default function StudentsPage() {
    // Fetch students data
    const { data: studentsData, isLoading, refetch } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const { data } = await axiosClient.get<StudentWithRelations[]>("/api/students")
            return data
        },
    });

    // Fetch courses for dropdown
    const { data: courses } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/courses")
            return data
        },
    });

    // Fetch groups for dropdown
    const { data: groups } = useQuery({
        queryKey: ["groups"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/groups")
            return data
        },
    });

    const { data: cameFrom } = useQuery({
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

            // Safely handle birthday date conversion
            const birthday = new Date(student.birthday);
            const formattedBirthday = isNaN(birthday.getTime())
                ? ''
                : birthday.toISOString().split('T')[0];
            setValue('birthday', formattedBirthday);

            setValue('courseId', student.cources?.[0]?.id || '');
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

    // Create student using API route
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

    // Update student using API route
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
            throw new Error(error.response?.data?.error || 'Failed to update student');
        }
    };

    const onSubmit = async (data: StudentFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedStudent) {
                // Update student
                await updateStudent(selectedStudent.id, data);
                toast.success("Student updated successfully!");
                refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                // Create new student
                await createStudent(data);
                toast.success("Student created successfully!");
                refetch();
                closeDialog();
            }
        } catch (error: any) {
            console.error('Error submitting student:', error);
            toast.error(error.message || "Failed to save student");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsSubmitting(true)
        if (selectedStudent) {
            try {
                // Delete student from database
                await axiosClient.delete(`/api/students/${selectedStudent.id}`);

                // Update local state
                setStudents(students.filter((s) => s.id !== selectedStudent.id));
                toast.success("Student deleted successfully!");
                closeDeleteDialog();
            } catch (error: any) {
                console.error('Error deleting student:', error);
                const errorMessage = error.response?.data?.error || "Failed to delete student";
                toast.error(errorMessage);

                // If it's a "not found" error, remove from local state anyway
                if (error.response?.status === 404) {
                    setStudents(students.filter((s) => s.id !== selectedStudent.id));
                    toast.info("Student was already removed");
                    closeDeleteDialog();
                }
            }
            finally {
                setIsSubmitting(false)
            }
        }
    };

    // Fixed columns definition to match DataTable interface
    const columns = [
        {
            key: 'name',
            label: 'Name',
            sortable: true
        },
        {
            key: 'phone',
            label: 'Phone',
            sortable: false
        },
        {
            key: 'courses',
            label: 'Course',
            sortable: true,
            render: (cources: Course[] | undefined) => {
                if (!cources || cources.length === 0) {
                    return <span className="text-muted-foreground">No course</span>;
                }
                return cources[0]?.name || 'No course';
            }
        },
        {
            key: 'group',
            label: 'Group',
            sortable: true,
            render: (group: Groups | null | undefined) =>
                group?.name || <span className="text-muted-foreground">No group</span>
        },
        {
            key: 'cameFrom',
            label: 'Source',
            render: (cameFrom: any) => (
                <Badge variant="outline" className="capitalize">
                    {cameFrom ? cameFrom.name : "Unknown"}
                </Badge>
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
        {
            key: 'createdAt',
            label: 'Joined',
            sortable: true,
            render: (createdAt: string | Date) => {
                const date = new Date(createdAt);
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
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Students</h1>
                    <p className="text-muted-foreground">
                        Manage all students in the system ({students.length} total)
                    </p>
                </div>
                <Button
                    onClick={() => openDialog('create')}
                    className="gap-2"
                    size="lg"
                >
                    <Plus className="h-4 w-4" />
                    Add Student
                </Button>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={students}
                actions={(student) => (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('view', student)}
                            title="View student"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('edit', student)}
                            title="Edit student"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(student)}
                            title="Delete student"
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
                        <h3 className="font-semibold text-lg mb-2">No students found</h3>
                        <p className="text-muted-foreground mb-4">
                            Get started by creating a new student
                        </p>

                        <Button onClick={() => openDialog('create')}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Student
                        </Button>
                    </div>
                }
            />

            {/* Student Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Add New Student' :
                                viewMode === 'edit' ? 'Edit Student' : 'Student Details'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to add a new student'
                                : viewMode === 'edit'
                                    ? 'Update student information'
                                    : 'View student details'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                disabled={viewMode === 'view' || isSubmitting}
                                placeholder="Enter student's full name"
                            />
                            {errors.name && (
                                <p className="text-xs text-destructive">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                                id="phone"
                                {...register('phone')}
                                disabled={viewMode === 'view' || isSubmitting}
                                placeholder="Enter phone number"
                            />
                            {errors.phone && (
                                <p className="text-xs text-destructive">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Birthday */}
                        <div className="space-y-2">
                            <Label htmlFor="birthday">Birthday *</Label>
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

                        {/* Course Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="courseId">Course</Label>
                            <select
                                id="courseId"
                                {...register('courseId')}
                                disabled={viewMode === 'view' || isSubmitting}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select a course (optional)</option>
                                {courses?.map((course: any) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                            {errors.courseId && (
                                <p className="text-xs text-destructive">{errors.courseId.message}</p>
                            )}
                        </div>

                        {/* Group Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="groupId">Group</Label>
                            <select
                                id="groupId"
                                {...register('groupId')}
                                disabled={viewMode === 'view' || isSubmitting}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select a group (optional)</option>
                                {groups?.map((group: any) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                            {errors.groupId && (
                                <p className="text-xs text-destructive">{errors.groupId.message}</p>
                            )}
                        </div>

                        {/* Came From */}
                        <div className="space-y-2">
                            <Label htmlFor="cameFrom">How did they find us? *</Label>
                            <select
                                id="cameFrom"
                                {...register('cameFromId')}
                                disabled={viewMode === 'view' || isSubmitting}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select source (optional)</option>
                                {cameFrom?.map((cameFrom: any) => (
                                    <option key={cameFrom.id} value={cameFrom.id}>
                                        {cameFrom.name}
                                    </option>
                                ))}
                            </select>
                            {errors.cameFromId && (
                                <p className="text-xs text-destructive">{errors.cameFromId.message}</p  >
                            )}
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDialog}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            {viewMode !== 'view' && (
                                <Button type="submit" disabled={isSubmitting} className='ml-2'>
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            {viewMode === 'create' ? 'Creating...' : 'Saving...'}
                                        </div>
                                    ) : (
                                        viewMode === 'create' ? 'Create Student' : 'Save Changes'
                                    )}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">
                            Delete Student
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{selectedStudent?.name}</strong>?
                            This action cannot be undone and all associated data will be permanently removed.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeDeleteDialog}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Deleting Student..." : "Delete Student"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}