'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { Plus, Eye, Pencil, Trash2, Calendar, Clock, Users, MapPin, X, Search, ChevronLeft, ChevronRight, User } from 'lucide-react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '@/lib/axiosClient';
import { Lessons, Groups, Teacher } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const lessonSchema = z.object({
    groupId: z.string().min(1, 'Group is required'),
    teacherId: z.string().min(1, 'Teacher is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    room: z.string().min(1, 'Room is required'),
    status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELED']),
    desc: z.string().optional(),
});

type LessonFormData = z.infer<typeof lessonSchema>;

type LessonsWithRelations = Lessons & {
    group: (Groups & {
        cource: { id: string; name: string; } | null;
        teacher: (Teacher & { user: { id: string; name: string; email: string; } }) | null;
        students: any[];
    }) | null;
    teacher: (Teacher & { user: { id: string; name: string; email: string; phone: string; } }) | null;
    attendance: any[];
};

type AttendanceRecord = {
    id: string;
    studentId: string;
    lessonsId: string;
    desc: string | null;
    teacherId: string;
    date: Date;
    student: {
        id: string;
        name: string;
        phone: string;
        birthday: Date;
    };
    teacher: {
        id: string;
        name: string;
        email: string;
        phone: string;
    };
};

export default function LessonsPage() {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<LessonsWithRelations | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [viewModeType, setViewModeType] = useState<'table' | 'calendar'>('table');
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [attendanceSearch, setAttendanceSearch] = useState('');
    const [teacherSearch, setTeacherSearch] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    const { data: groups, isLoading: isLoadingGroups } = useQuery({
        queryKey: ["groups"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/groups")
            return data
        },
    });

    const { data: teachers, isLoading: isLoadingTeachers } = useQuery({
        queryKey: ["teachers"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/teachers")
            return data
        },
    });

    const { data: lessons, isLoading, refetch } = useQuery({
        queryKey: ["lessons", selectedDate.toISOString().split('T')[0]],
        queryFn: async () => {
            const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
            const endDate = endOfWeek(selectedDate, { weekStartsOn: 1 });

            const { data } = await axiosClient.get<LessonsWithRelations[]>("/api/lessons", {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                }
            })
            return data
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<LessonFormData>({
        resolver: zodResolver(lessonSchema),
        defaultValues: {
            status: 'SCHEDULED',
        },
    });

    const startTimeValue = watch('startTime');
    const endTimeValue = watch('endTime');

    const createLessonMutation = useMutation({
        mutationFn: async (data: LessonFormData) => {
            const response = await axiosClient.post('/api/lessons', {
                ...data,
                startTime: new Date(data.startTime).toISOString(),
                endTime: new Date(data.endTime).toISOString(),
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Lesson Scheduled', {
                description: 'Lesson has been scheduled successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            closeDialog();
        },
        onError: (error: any) => {
            toast.error('Failed to schedule lesson', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    const updateLessonMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string, data: LessonFormData }) => {
            const response = await axiosClient.put(`/api/lessons/${id}`, {
                ...data,
                startTime: new Date(data.startTime).toISOString(),
                endTime: new Date(data.endTime).toISOString(),
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Lesson Updated', {
                description: 'Lesson has been updated successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            closeDialog();
        },
        onError: (error: any) => {
            toast.error('Failed to update lesson', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    const deleteLessonMutation = useMutation({
        mutationFn: async (id: string) => {
            await axiosClient.delete(`/api/lessons/${id}`);
        },
        onSuccess: () => {
            toast.success('Lesson Deleted', {
                description: 'Lesson has been deleted successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            closeDeleteDialog();
        },
        onError: (error: any) => {
            toast.error('Failed to delete lesson', {
                description: error.response?.data?.error || 'Please try again.',
            });
        },
    });

    const fetchAttendanceMutation = useMutation({
        mutationFn: async (lessonId: string) => {
            const { data } = await axiosClient.get(`/api/lessons/${lessonId}/attendance`);
            return data;
        },
        onSuccess: (data) => {
            setAttendanceRecords(data);
            setIsAttendanceDialogOpen(true);
        },
        onError: (error) => {
            toast.error('Failed to fetch attendance', {
                description: 'Please try again.',
            });
        },
    });

    const createAttendanceMutation = useMutation({
        mutationFn: async ({ lessonId, studentId, teacherId }: { lessonId: string; studentId: string; teacherId: string }) => {
            const response = await axiosClient.post(`/api/lessons/${lessonId}/attendance`, {
                studentId,
                teacherId,
                status: 'present',
                desc: 'Marked present',
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Attendance Recorded', {
                description: 'Attendance has been recorded successfully.',
            });
            if (selectedLesson) {
                fetchAttendanceMutation.mutate(selectedLesson.id);
            }
        },
        onError: (error) => {
            toast.error('Failed to record attendance', {
                description: 'Please try again.',
            });
        },
    });

    const deleteAttendanceMutation = useMutation({
        mutationFn: async ({ lessonId, attendanceId }: { lessonId: string; attendanceId: string }) => {
            await axiosClient.delete(`/api/lessons/${lessonId}/attendance?attendanceId=${attendanceId}`);
        },
        onSuccess: () => {
            toast.success('Attendance Deleted', {
                description: 'Attendance record has been deleted.',
            });
            if (selectedLesson) {
                fetchAttendanceMutation.mutate(selectedLesson.id);
            }
        },
        onError: (error) => {
            toast.error('Failed to delete attendance', {
                description: 'Please try again.',
            });
        },
    });

    const openDialog = (mode: 'view' | 'edit' | 'create', lesson?: LessonsWithRelations) => {
        setViewMode(mode);
        if (lesson) {
            setSelectedLesson(lesson);
            setValue('groupId', lesson.groupId || '');
            setValue('teacherId', lesson.teacherId || '');
            setValue('startTime', format(lesson.startTime, "yyyy-MM-dd'T'HH:mm"));
            setValue('endTime', format(lesson.endTime, "yyyy-MM-dd'T'HH:mm"));
            setValue('room', lesson.room);
            setValue('status', lesson.status);
            setValue('desc', lesson.desc || '');
        } else {
            reset({
                groupId: '',
                teacherId: '',
                startTime: format(new Date(), "yyyy-MM-dd'T'09:00"),
                endTime: format(new Date(), "yyyy-MM-dd'T'10:30"),
                room: '',
                status: 'SCHEDULED',
                desc: '',
            });
        }
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (lesson: LessonsWithRelations) => {
        setSelectedLesson(lesson);
        setIsDeleteDialogOpen(true);
    };

    const openAttendanceDialog = (lesson: LessonsWithRelations) => {
        setSelectedLesson(lesson);
        fetchAttendanceMutation.mutate(lesson.id);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedLesson(null);
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedLesson(null);
    };

    const closeAttendanceDialog = () => {
        setIsAttendanceDialogOpen(false);
        setAttendanceRecords([]);
        setSelectedLesson(null);
        setAttendanceSearch('');
    };

    const onSubmit = async (data: LessonFormData) => {
        if (viewMode === 'edit' && selectedLesson) {
            updateLessonMutation.mutate({ id: selectedLesson.id, data });
        } else if (viewMode === 'create') {
            createLessonMutation.mutate(data);
        }
    };

    const handleDelete = async () => {
        if (selectedLesson) {
            deleteLessonMutation.mutate(selectedLesson.id);
        }
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            SCHEDULED: 'outline',
            COMPLETED: 'default',
            CANCELED: 'destructive',
        };

        return (
            <Badge variant={variants[status] || 'outline'} className="capitalize">
                {status.toLowerCase()}
            </Badge>
        );
    };

    const handleMarkAttendance = (studentId: string) => {
        if (!selectedLesson || !selectedTeacher) return;

        createAttendanceMutation.mutate({
            lessonId: selectedLesson.id,
            studentId,
            teacherId: selectedTeacher.id,
        });
    };

    const handleDeleteAttendance = (attendanceId: string) => {
        if (!selectedLesson) return;

        deleteAttendanceMutation.mutate({
            lessonId: selectedLesson.id,
            attendanceId,
        });
    };

    const columns = [
        {
            key: 'group',
            label: 'Group',
            sortable: true,
            render: (group: any | null) => group?.name || 'No group'
        },
        {
            key: 'teacher',
            label: 'Teacher',
            sortable: true,
            render: (teacher: any | null) => teacher?.user?.name || 'No teacher'
        },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            render: (lesson: LessonsWithRelations) => format(lesson.startTime, 'MMM dd, yyyy')
        },
        {
            key: 'time',
            label: 'Time',
            sortable: false,
            render: (lesson: LessonsWithRelations) => (
                <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{format(lesson.startTime, 'HH:mm')} - {format(lesson.endTime, 'HH:mm')}</span>
                </div>
            )
        },
        {
            key: 'room',
            label: 'Room',
            sortable: true,
            render: (room: string) => (
                <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{room}</span>
                </div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (status: string) => getStatusBadge(status)
        },
    ];

    const weekDays = useMemo(() => {
        const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end });
    }, [selectedDate]);

    const lessonsByDay = useMemo(() => {
        const lessonsByDay: Record<string, LessonsWithRelations[]> = {};

        weekDays.forEach(day => {
            const dayStr = format(day, 'yyyy-MM-dd');
            lessonsByDay[dayStr] = [];
        });

        lessons?.forEach(lesson => {
            const lessonDate = format(lesson.startTime, 'yyyy-MM-dd');
            if (lessonsByDay[lessonDate]) {
                lessonsByDay[lessonDate].push(lesson);
            }
        });

        return lessonsByDay;
    }, [lessons, weekDays]);

    const filteredAttendance = useMemo(() => {
        if (!attendanceSearch) return attendanceRecords;
        return attendanceRecords.filter(record =>
            record.student.name.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
            record.student.phone.includes(attendanceSearch)
        );
    }, [attendanceRecords, attendanceSearch]);

    const availableStudents = useMemo(() => {
        if (!selectedLesson?.group?.students) return [];

        const attendedStudentIds = new Set(attendanceRecords.map(record => record.studentId));

        return selectedLesson.group.students.filter(student =>
            !attendedStudentIds.has(student.id)
        );
    }, [selectedLesson, attendanceRecords]);

    if (isLoadingGroups || isLoadingTeachers) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="h-8 w-48 bg-muted rounded-md animate-pulse"></div>
                        <div className="h-4 w-64 bg-muted/50 rounded-md animate-pulse"></div>
                    </div>
                    <div className="h-9 w-28 bg-muted rounded-md animate-pulse"></div>
                </div>
                <div className="rounded-lg border bg-card p-8">
                    <div className="flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2 text-lg">Loading lessons...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Lessons</h1>
                    <p className="text-muted-foreground">Manage lesson schedules and attendance</p>
                </div>
                <Button
                    className="gap-2"
                    onClick={() => openDialog('create')}
                    disabled={isLoadingGroups || isLoadingTeachers}
                >
                    <Plus className="h-4 w-4" />
                    Schedule Lesson
                </Button>
            </div>

            <Tabs defaultValue="table" value={viewModeType} onValueChange={(v) => setViewModeType(v as 'table' | 'calendar')}>
                <TabsList>
                    <TabsTrigger value="table">Table View</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>

                <TabsContent value="table" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Week of {format(startOfWeek(selectedDate, { weekStartsOn: 1 }), 'MMM dd')} - {format(endOfWeek(selectedDate, { weekStartsOn: 1 }), 'MMM dd, yyyy')}</CardTitle>
                            <CardDescription>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedDate(new Date())}
                                    >
                                        Today
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setSelectedDate(prev => {
                                            const newDate = new Date(prev);
                                            newDate.setDate(newDate.getDate() - 7);
                                            return newDate;
                                        })}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setSelectedDate(prev => {
                                            const newDate = new Date(prev);
                                            newDate.setDate(newDate.getDate() + 7);
                                            return newDate;
                                        })}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!isLoading && (
                                <DataTable
                                    columns={columns}
                                    data={lessons || []}
                                    actions={(lesson) => (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openDialog('view', lesson)}
                                                title="View details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openAttendanceDialog(lesson)}
                                                title="Attendance"
                                            >
                                                <Users className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openDialog('edit', lesson)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openDeleteDialog(lesson)}
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    )}
                                />
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="calendar" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Calendar</CardTitle>
                            <CardDescription>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedDate(new Date())}
                                        >
                                            Today
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setSelectedDate(prev => {
                                                const newDate = new Date(prev);
                                                newDate.setDate(newDate.getDate() - 7);
                                                return newDate;
                                            })}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <span className="font-medium">
                                            {format(startOfWeek(selectedDate, { weekStartsOn: 1 }), 'MMM dd')} - {format(endOfWeek(selectedDate, { weekStartsOn: 1 }), 'MMM dd, yyyy')}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setSelectedDate(prev => {
                                                const newDate = new Date(prev);
                                                newDate.setDate(newDate.getDate() + 7);
                                                return newDate;
                                            })}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-7 gap-2">
                                {weekDays.map((day, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className={`text-center font-medium ${isSameDay(day, new Date()) ? 'text-primary' : ''}`}>
                                            {format(day, 'EEE')}
                                            <div className={`text-lg ${isSameDay(day, new Date()) ? 'bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
                                                {format(day, 'd')}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {lessonsByDay[format(day, 'yyyy-MM-dd')]?.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className="p-2 text-xs bg-secondary/50 rounded-md cursor-pointer hover:bg-secondary transition-colors"
                                                    onClick={() => openDialog('view', lesson)}
                                                >
                                                    <div className="font-medium truncate">{lesson.group?.name}</div>
                                                    <div className="text-muted-foreground truncate">
                                                        {format(lesson.startTime, 'HH:mm')} - {lesson.room}
                                                    </div>
                                                    <div>{lesson.teacher?.user?.name}</div>
                                                    {getStatusBadge(lesson.status)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Lesson Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Schedule New Lesson' : viewMode === 'edit' ? 'Edit Lesson' : 'View Lesson'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to schedule a new lesson'
                                : viewMode === 'edit'
                                    ? 'Update lesson information'
                                    : 'Lesson details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="groupId">Group *</Label>
                            <select
                                id="groupId"
                                {...register('groupId')}
                                disabled={viewMode === 'view' || isLoadingGroups}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select a group</option>
                                {groups?.map((group: Groups) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                            {errors.groupId && <p className="text-xs text-destructive">{errors.groupId.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="teacherId">Teacher *</Label>
                            <select
                                id="teacherId"
                                {...register('teacherId')}
                                disabled={viewMode === 'view' || isLoadingTeachers}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select a teacher</option>
                                {teachers?.map((teacher: Teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </select>
                            {errors.teacherId && <p className="text-xs text-destructive">{errors.teacherId.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startTime">Start Time *</Label>
                                <Input
                                    id="startTime"
                                    type="datetime-local"
                                    {...register('startTime')}
                                    disabled={viewMode === 'view' || createLessonMutation.isPending || updateLessonMutation.isPending}
                                />
                                {errors.startTime && <p className="text-xs text-destructive">{errors.startTime.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endTime">End Time *</Label>
                                <Input
                                    id="endTime"
                                    type="datetime-local"
                                    {...register('endTime')}
                                    disabled={viewMode === 'view' || createLessonMutation.isPending || updateLessonMutation.isPending}
                                    min={startTimeValue}
                                />
                                {errors.endTime && <p className="text-xs text-destructive">{errors.endTime.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="room">Room *</Label>
                            <Input
                                id="room"
                                {...register('room')}
                                disabled={viewMode === 'view' || createLessonMutation.isPending || updateLessonMutation.isPending}
                                placeholder="Enter room number or name"
                            />
                            {errors.room && <p className="text-xs text-destructive">{errors.room.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                {...register('status')}
                                disabled={viewMode === 'view'}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="SCHEDULED">Scheduled</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELED">Canceled</option>
                            </select>
                            {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="desc">Description (Optional)</Label>
                            <Textarea
                                id="desc"
                                {...register('desc')}
                                disabled={viewMode === 'view' || createLessonMutation.isPending || updateLessonMutation.isPending}
                                rows={3}
                                placeholder="Add any additional notes about the lesson"
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDialog}
                                disabled={createLessonMutation.isPending || updateLessonMutation.isPending}
                            >
                                Cancel
                            </Button>
                            {viewMode !== 'view' && (
                                <Button
                                    type="submit"
                                    disabled={createLessonMutation.isPending || updateLessonMutation.isPending}
                                >
                                    {(createLessonMutation.isPending || updateLessonMutation.isPending) ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {viewMode === 'create' ? 'Scheduling...' : 'Saving...'}
                                        </>
                                    ) : (
                                        viewMode === 'create' ? 'Schedule Lesson' : 'Save Changes'
                                    )}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Attendance Dialog */}
            <Dialog open={isAttendanceDialogOpen} onOpenChange={closeAttendanceDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Attendance for {selectedLesson?.group?.name}</DialogTitle>
                        <DialogDescription>
                            {selectedLesson && (
                                <div className="space-y-1">
                                    <div>Date: {format(selectedLesson.startTime, 'MMM dd, yyyy')}</div>
                                    <div>Time: {format(selectedLesson.startTime, 'HH:mm')} - {format(selectedLesson.endTime, 'HH:mm')}</div>
                                    <div>Teacher: {selectedLesson.teacher?.name}</div>
                                </div>
                            )}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Teacher Selection */}
                        <div className="space-y-2">
                            <Label>Mark Attendance As</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start h-10"
                                    >
                                        {selectedTeacher ? (
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    <span className="truncate">{selectedTeacher.name}</span>
                                                </div>
                                                <div
                                                    className="h-6 w-6 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedTeacher(null);
                                                    }}
                                                >
                                                    <X className="h-3 w-3 hover:bg-accent hover:text-accent-foreground" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <User className="h-4 w-4" />
                                                <span>Select teacher</span>
                                            </div>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-0 bg-popover border border-border shadow-lg rounded-md" align="start">
                                    <div className="p-3 border-b">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                            <Input
                                                placeholder="Search teachers..."
                                                value={teacherSearch}
                                                onChange={(e) => setTeacherSearch(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <ScrollArea className="h-64">
                                        {teachers?.filter((teacher: Teacher) =>
                                            teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
                                            teacher.email.toLowerCase().includes(teacherSearch.toLowerCase())
                                        ).length > 0 ? (
                                            <div className="p-1">
                                                {teachers
                                                    .filter((teacher: Teacher) =>
                                                        teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
                                                        teacher.email.toLowerCase().includes(teacherSearch.toLowerCase())
                                                    )
                                                    .map((teacher: Teacher) => (
                                                        <Button
                                                            key={teacher.id}
                                                            variant="ghost"
                                                            className="w-full justify-start text-left h-auto py-2 px-3"
                                                            onClick={() => setSelectedTeacher(teacher)}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                                    <User className="h-4 w-4 text-primary" />
                                                                </div>
                                                                <div className="flex flex-col items-start">
                                                                    <span className="font-medium">{teacher.name}</span>
                                                                    {teacher.email && (
                                                                        <span className="text-xs text-muted-foreground line-clamp-1">
                                                                            {teacher.email}
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
                                                    {teacherSearch ? 'No teachers found' : 'No teachers available'}
                                                </p>
                                            </div>
                                        )}
                                    </ScrollArea>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Search */}
                        <div className="space-y-2">
                            <Label>Search Students</Label>
                            <Input
                                placeholder="Search by name or phone..."
                                value={attendanceSearch}
                                onChange={(e) => setAttendanceSearch(e.target.value)}
                            />
                        </div>

                        {/* Mark New Attendance */}
                        {availableStudents.length > 0 && selectedTeacher && (
                            <div className="space-y-2">
                                <Label>Mark Attendance for:</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {availableStudents.map((student) => (
                                        <div
                                            key={student.id}
                                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                                        >
                                            <div>
                                                <div className="font-medium">{student.name}</div>
                                                <div className="text-sm text-muted-foreground">{student.phone}</div>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleMarkAttendance(student.id)}
                                                disabled={createAttendanceMutation.isPending}
                                            >
                                                {createAttendanceMutation.isPending ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    'Present'
                                                )}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Attendance Records */}
                        <div className="space-y-2">
                            <Label>Attendance Records</Label>
                            <div className="border rounded-lg">
                                {filteredAttendance.length > 0 ? (
                                    <div className="divide-y">
                                        {filteredAttendance.map((record) => (
                                            <div key={record.id} className="p-4 flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium">{record.student.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {record.student.phone} • Marked by: {record.teacher.name}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                        {format(record.date, 'MMM dd, yyyy HH:mm')}
                                                    </div>
                                                    {record.desc && (
                                                        <div className="text-sm mt-1">{record.desc}</div>
                                                    )}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteAttendance(record.id)}
                                                    disabled={deleteAttendanceMutation.isPending}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                        <p className="text-muted-foreground">No attendance records yet</p>
                                        {availableStudents.length === 0 && selectedLesson?.group?.students && (
                                            <p className="text-sm text-muted-foreground mt-1">
                                                All students have been marked
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeAttendanceDialog}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Lesson</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the lesson for {selectedLesson?.group?.name} scheduled for {selectedLesson && format(selectedLesson.startTime, 'MMM dd, yyyy HH:mm')}?
                            This will also delete all attendance records for this lesson.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeDeleteDialog}
                            disabled={deleteLessonMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteLessonMutation.isPending}
                        >
                            {deleteLessonMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete Lesson'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}