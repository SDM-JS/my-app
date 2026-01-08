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

// Zod schema matching your Prisma schema
const courseSchema = z.object({
    name: z.string().min(1, 'Course name is required'),
    desc: z.string().min(1, 'Description is required'),
    price: z.string().min(1, 'Price is required'),
    subjectId: z.string().min(1, 'Subject is required'),
    teacherIds: z.array(z.string()).min(1, 'Select at least one teacher'),
});

type CourseFormData = z.infer<typeof courseSchema>;

// Extended type to include relations
type CourseWithRelations = Course & {
    subject: Subject | null;
    teacher: Teacher[];
    students: Student[];
    lessons: Lessons[];
    groups: Groups[];
};

// Helper function to transform courses for DataTable
const transformCoursesForTable = (courses: CourseWithRelations[]) => {
    return courses.map(course => ({
        id: course.id,
        name: course.name,
        desc: course.desc,
        price: `$${course}`,
        subject: course.subject?.name || 'No subject',
        teachersCount: course.teacher?.length || 0,
        studentsCount: course.students?.length || 0,
        // Keep the original objects for render functions
        _subject: course.subject,
        _teacher: course.teacher,
        _students: course.students,
        _raw: course
    }));
};

export default function CoursesPage() {
    // Fetch courses data with relations
    const { data: coursesData, isLoading, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const { data } = await axiosClient.get<CourseWithRelations[]>("/api/courses")
            return data
        },
    });

    // Fetch subjects for dropdown
    const { data: subjects } = useQuery({
        queryKey: ["subjects"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/subjects")
            return data
        },
    });

    // Fetch teachers for dropdown
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

    // Popover states
    const [teacherSearch, setTeacherSearch] = useState('');
    const [selectedTeachers, setSelectedTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        if (coursesData) {
            setCourses(coursesData);
            setTableData(transformCoursesForTable(coursesData));
        }
    }, [coursesData]);

    // Filter teachers based on search
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

    // Handle teacher selection
    const toggleTeacher = (teacher: Teacher) => {
        const isSelected = selectedTeachers.some(t => t.id === teacher.id);
        const newTeachers = isSelected
            ? selectedTeachers.filter(t => t.id !== teacher.id)
            : [...selectedTeachers, teacher];

        setSelectedTeachers(newTeachers);
        setValue('teacherIds', newTeachers.map(t => t.id));
        trigger('teacherIds');
    };

    // Clear all teacher selections
    const handleClearTeachers = () => {
        setSelectedTeachers([]);
        setValue('teacherIds', []);
        trigger('teacherIds');
    };

    // Create course using API route
    const createCourse = async (data: CourseFormData) => {
        const response = await axiosClient.post('/api/courses', {
            name: data.name,
            desc: data.desc,
            price: data.price,
            subjectId: data.subjectId,
            teacherIds: data.teacherIds,
        });
        return response.data;
    };

    // Update course using API route
    const updateCourse = async (id: string, data: CourseFormData) => {
        try {
            const response = await axiosClient.put(`/api/courses/${id}`, {
                name: data.name,
                desc: data.desc,
                price: data.price,
                subjectId: data.subjectId,
                teacherIds: data.teacherIds,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to update course');
        }
    };

    const onSubmit = async (data: CourseFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedCourse) {
                // Update course
                await updateCourse(selectedCourse.id, data);
                toast.success("Course updated successfully!");
                refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                // Create new course
                await createCourse(data);
                toast.success("Course created successfully!");
                refetch();
                closeDialog();
            }
        } catch (error: any) {
            console.error('Error submitting course:', error);
            toast.error(error.message || "Failed to save course");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (selectedCourse) {
            try {
                // Delete course from database
                await axiosClient.delete(`/api/courses/${selectedCourse.id}`);

                setCourses(courses.filter((c) => c.id !== selectedCourse.id));
                toast.success("Course deleted successfully!");
                closeDeleteDialog();
            } catch (error: any) {
                console.error('Error deleting course:', error);
                const errorMessage = error.response?.data?.error || "Failed to delete course";
                toast.error(errorMessage);

                if (error.response?.status === 404) {
                    setCourses(courses.filter((c) => c.id !== selectedCourse.id));
                    toast.info("Course was already removed");
                    closeDeleteDialog();
                }
            }
        }
    };

    const columns = [
        {
            key: 'name',
            label: 'Course Name',
            sortable: true
        },
        {
            key: 'desc',
            label: 'Description',
            sortable: true,
            render: (value: string) => (
                <span className="line-clamp-1 max-w-[200px]">{value}</span>
            )
        },
        {
            key: 'price',
            label: 'Price',
            sortable: true,
            render: (value: string) => (
                <span className="font-medium">{value}</span>
            )
        },
        {
            key: 'subject',
            label: 'Subject',
            sortable: true,
            render: (value: string, item: any) => {
                return value || <span className="text-muted-foreground">No subject</span>;
            }
        },
        {
            key: 'teachersCount',
            label: 'Teachers',
            sortable: true,
            render: (value: number) => (
                <span className="text-blue-500 font-medium">{value}</span>
            )
        },
        {
            key: 'studentsCount',
            label: 'Students',
            sortable: true,
            render: (value: number) => (
                <span className="text-green-500 font-medium">{value}</span>
            )
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
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Courses</h1>
                    <p className="text-muted-foreground">
                        Manage all courses ({tableData.length} total)
                    </p>
                </div>
                <Button
                    onClick={() => openDialog('create')}
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Course
                </Button>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={tableData}
                itemsPerPage={10}
                actions={(course) => (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('view', course)}
                            title="View course"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('edit', course)}
                            title="Edit course"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(course)}
                            title="Delete course"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            {/* Course Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Add New Course' :
                                viewMode === 'edit' ? 'Edit Course' : 'View Course'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to add a new course'
                                : viewMode === 'edit'
                                    ? 'Update course information'
                                    : 'Course details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Course Name *</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                disabled={viewMode === 'view' || isSubmitting}
                                placeholder="Enter course name"
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="desc">Description *</Label>
                            <textarea
                                id="desc"
                                {...register('desc')}
                                disabled={viewMode === 'view' || isSubmitting}
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter course description"
                            />
                            {errors.desc && <p className="text-xs text-destructive">{errors.desc.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price *</Label>
                            <Input
                                id="price"
                                {...register('price')}
                                disabled={viewMode === 'view' || isSubmitting}
                                placeholder="e.g., 250.00"
                            />
                            {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subjectId">Subject *</Label>
                            <select
                                id="subjectId"
                                {...register('subjectId')}
                                disabled={viewMode === 'view' || isSubmitting}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select a subject</option>
                                {subjects?.map((subject: any) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            {errors.subjectId && <p className="text-xs text-destructive">{errors.subjectId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Teachers *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start h-10"
                                        disabled={viewMode === 'view' || isSubmitting}
                                    >
                                        {selectedTeachers.length > 0 ? (
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4" />
                                                    <span className="truncate">
                                                        {selectedTeachers.length} teacher{selectedTeachers.length !== 1 ? 's' : ''} selected
                                                    </span>
                                                </div>
                                                {viewMode !== 'view' && (
                                                    <div onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleClearTeachers();
                                                    }} className='h-6 w-6 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
                                                        <X className="h-3 w-3" />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <GraduationCap className="h-4 w-4" />
                                                <span>Select teachers</span>
                                            </div>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-0" align="start">
                                    <div className="p-3 border-b">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                placeholder="Search teachers..."
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
                                                        onClick={() => toggleTeacher(teacher)}
                                                    >
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className={`flex h-6 w-6 items-center justify-center rounded border ${selectedTeachers.some(t => t.id === teacher.id)
                                                                ? 'bg-primary border-primary'
                                                                : 'border-gray-300'
                                                                }`}>
                                                                {selectedTeachers.some(t => t.id === teacher.id) && (
                                                                    <div className="h-2 w-2 rounded-full bg-white" />
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col items-start flex-1">
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
                                                    {teacherSearch ? 'No teachers found' : 'No teachers available'}
                                                </p>
                                            </div>
                                        )}
                                    </ScrollArea>
                                    {selectedTeachers.length > 0 && (
                                        <div className="p-3 border-t">
                                            <div className="flex flex-wrap gap-1">
                                                {selectedTeachers.map((teacher) => (
                                                    <div
                                                        key={teacher.id}
                                                        className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                                                    >
                                                        {teacher.name}
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleTeacher(teacher)}
                                                            className="hover:bg-primary/20 rounded"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </PopoverContent>
                            </Popover>
                            {errors.teacherIds && <p className="text-xs text-destructive">{errors.teacherIds.message}</p>}
                            <input type="hidden" {...register('teacherIds')} />
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
                                        viewMode === 'create' ? 'Add Course' : 'Save Changes'
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
                        <DialogTitle className="text-destructive">Delete Course</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "<strong>{selectedCourse?.name}</strong>"?
                            This action cannot be undone and all associated lessons and groups will be affected.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            Delete Course
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}