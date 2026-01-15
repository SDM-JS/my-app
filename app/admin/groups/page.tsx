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

// Zod schema matching your updated Prisma schema
const groupSchema = z.object({
    name: z.string().min(1, 'Group name is required'),
    courseId: z.string().min(1, 'Course is required'),
    teacherId: z.string().min(1, 'Teacher is required!'),
    from: z.string().min(1, 'Start time is required'),
    to: z.string().min(1, 'End time is required'),
    daysOfWeek: z.array(z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])).min(1, 'Select at least one day'),
});

type GroupFormData = z.infer<typeof groupSchema>;

type GroupWithRelations = Groups & {
    course: Course | null;
    teacher: Teacher | null;
    students: any[];
};

// Helper function to transform groups for DataTable
const transformGroupsForTable = (groups: GroupWithRelations[]) => {
    return groups.map(group => ({
        id: group.id,
        name: group.name,
        course: group.course?.name || 'No course',
        teacher: group.teacher?.name || 'No teacher',
        studentCount: group.students?.length || 0,
        // Keep the original objects for render functions
        _cource: group.course,
        _teacher: group.teacher,
        _students: group.students,
        _raw: group // Keep raw data for actions
    }));
};

export default function GroupsPage() {
    // Fetch groups data with relations
    const { data: groupsData, isLoading, refetch } = useQuery({
        queryKey: ["groups"],
        queryFn: async () => {
            const { data } = await axiosClient.get<GroupWithRelations[]>("/api/groups")
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

    // Fetch teachers for dropdown
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

    // Popover states for course selection
    const [courseSearch, setCourseSearch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    // Popover states for teacher selection
    const [teacherSearch, setTeacherSearch] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    useEffect(() => {
        if (groupsData) {
            setGroups(groupsData);
            setTableData(transformGroupsForTable(groupsData));
        }
    }, [groupsData]);

    // Filter courses based on search
    const filteredCourses = useMemo(() => {
        if (!courses) return [];
        return courses.filter((course: Course) =>
            course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
            (course.desc && course.desc.toLowerCase().includes(courseSearch.toLowerCase()))
        );
    }, [courses, courseSearch]);

    // Filter teachers based on search
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

            // Set course
            const courseObj = originalGroup.cource;
            setSelectedCourse(courseObj);
            setValue('courseId', originalGroup.courseId || '');

            // Set teacher
            const teacherObj = originalGroup.teacher;
            setSelectedTeacher(teacherObj);
            setValue('teacherId', originalGroup.teacherId || '');

            setValue('name', originalGroup.name);

            // Set days
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

    // Handle course selection
    const handleSelectCourse = (course: Course) => {
        setSelectedCourse(course);
        setValue('courseId', course.id);
        setCourseSearch('');
        trigger('courseId');
    };

    // Handle teacher selection
    const handleSelectTeacher = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setValue('teacherId', teacher.id);
        setTeacherSearch('');
        trigger('teacherId');
    };

    // Clear course selection
    const handleClearCourse = () => {
        setSelectedCourse(null);
        setValue('courseId', '');
        trigger('courseId');
    };

    // Clear teacher selection
    const handleClearTeacher = () => {
        setSelectedTeacher(null);
        setValue('teacherId', '');
        trigger('teacherId');
    };

    // Create group using API route
    const createGroup = async (data: GroupFormData) => {
        // Convert time strings to full datetime
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

    // Update group using API route
    const updateGroup = async (id: string, data: GroupFormData) => {
        try {
            // Convert time strings to full datetime
            const today = new Date();
            const fromTime = new Date(`${today.toISOString().split('T')[0]}T${data.from}:00`);
            const toTime = new Date(`${today.toISOString().split('T')[0]}T${data.to}:00`);

            const response = await axiosClient.put(`/api/groups/${id}`, {
                studentName: data.name,
                courseId: data.courseId,
                teacherId: data.teacherId,
                from: fromTime,
                to: toTime,
                daysOfWeek: data.daysOfWeek,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to update group');
        }
    };

    const onSubmit = async (data: GroupFormData) => {
        setIsSubmitting(true);
        try {
            if (viewMode === 'edit' && selectedGroup) {
                // Update group
                await updateGroup(selectedGroup.id, data);
                toast.success("Group updated successfully!");
                refetch();
                closeDialog();
            } else if (viewMode === 'create') {
                // Create new group
                await createGroup(data);
                toast.success("Group created successfully!");
                refetch();
                closeDialog();
            }
        } catch (error: any) {
            console.error('Error submitting group:', error);
            toast.error(error.message || "Failed to save group");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (selectedGroup) {
            try {
                // Delete group from database
                await axiosClient.delete(`/api/groups/${selectedGroup.id}`);

                // Update local state
                setGroups(groups.filter((g) => g.id !== selectedGroup.id));
                toast.success("Group deleted successfully!");
                closeDeleteDialog();
            } catch (error: any) {
                console.error('Error deleting group:', error);
                const errorMessage = error.response?.data?.error || "Failed to delete group";
                toast.error(errorMessage);

                // If it's a "not found" error, remove from local state anyway
                if (error.response?.status === 404) {
                    setGroups(groups.filter((g) => g.id !== selectedGroup.id));
                    toast.info("Group was already removed");
                    closeDeleteDialog();
                }
            }
        }
    };

    // Fixed columns definition to match DataTable interface
    const columns = [
        {
            key: 'name',
            label: 'Group Name',
            sortable: true
        },
        {
            key: 'course',
            label: 'Course',
            sortable: true,
            render: (value: string, item: any) => {
                return value || <span className="text-muted-foreground">No course</span>;
            }
        },
        {
            key: 'teacher',
            label: 'Teacher',
            sortable: true,
            render: (value: string, item: any) => {
                return value || <span className="text-muted-foreground">No teacher</span>;
            }
        },
        {
            key: 'studentCount',
            label: 'Students',
            sortable: true,
            render: (value: number) => {
                return <span className="text-blue-500 font-medium">{value}</span>;
            }
        },
        {
            key: 'from',
            label: 'Time',
            sortable: true,
            render: (value: Date, item: any) => {
                const fromDate = new Date(value);
                const toDate = new Date(item.to);
                if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
                    return 'Invalid time';
                }
                return `${fromDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${toDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            },
        },
        {
            key: 'daysOfWeek',
            label: 'Days',
            sortable: true,
            render: (value: DaysOfWeek[]) => {
                if (!value || value.length === 0) {
                    return 'No days';
                }
                return value.map(day => day.slice(0, 3)).join(', ');
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
                    <h1 className="text-3xl font-bold">Groups</h1>
                    <p className="text-muted-foreground">
                        Manage all student groups ({tableData.length} total)
                    </p>
                </div>
                <Button
                    onClick={() => openDialog('create')}
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Create Group
                </Button>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={tableData}
                actions={(item) => (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('view', item)}
                            title="View group"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog('edit', item)}
                            title="Edit group"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(item)}
                            title="Delete group"
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            {/* Group Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Create New Group' :
                                viewMode === 'edit' ? 'Edit Group' : 'View Group'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to create a new group'
                                : viewMode === 'edit'
                                    ? 'Update group information'
                                    : 'Group details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Group Name *</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                disabled={viewMode === 'view' || isSubmitting}
                                placeholder="Enter group name"
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>

                        {/* Course Selection Popover */}
                        <div className="space-y-2">
                            <Label>Course *</Label>
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
                                                <span>Select a course</span>
                                            </div>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-0" align="start">
                                    <div className="p-3 border-b">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                placeholder="Search courses..."
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
                                                    {courseSearch ? 'No courses found' : 'No courses available'}
                                                </p>
                                            </div>
                                        )}
                                    </ScrollArea>
                                </PopoverContent>
                            </Popover>
                            {errors.courseId && <p className="text-xs text-destructive">{errors.courseId.message}</p>}
                            <input type="hidden" {...register('courseId')} />
                        </div>

                        {/* Teacher Selection Popover */}
                        <div className="space-y-2">
                            <Label>Teacher *</Label>
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
                                                <span>Select a teacher</span>
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
                                                    {teacherSearch ? 'No teachers found' : 'No teachers available'}
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
                                <Label htmlFor="from">Start Time *</Label>
                                <Input
                                    id="from"
                                    type="time"
                                    {...register('from')}
                                    disabled={viewMode === 'view' || isSubmitting}
                                />
                                {errors.from && <p className="text-xs text-destructive">{errors.from.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="to">End Time *</Label>
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
                            <Label>Days of Week *</Label>
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
                                        viewMode === 'create' ? 'Create Group' : 'Save Changes'
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
                        <DialogTitle className="text-destructive">Delete Group</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the "<strong>{selectedGroup?.name}</strong>" group?
                            This action cannot be undone and all students in this group will be unassigned.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            Delete Group
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}