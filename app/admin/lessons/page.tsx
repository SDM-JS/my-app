'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { Plus, Eye, Pencil, Trash2, Calendar, Clock, Users, MapPin, X, Search, ChevronLeft, ChevronRight, User, Check, XCircle } from 'lucide-react';
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
import { Lessons, Groups, Teacher, DaysOfWeek } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addDays } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

const lessonSchema = z.object({
    groupId: z.string().min(1, 'Group is required'),
    teacherId: z.string().min(1, 'Teacher is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    room: z.string().min(1, 'Room is required'),
    desc: z.string().optional(),
    daysOfWeek: z.array(z.nativeEnum(DaysOfWeek)).min(1, 'At least one day must be selected'),
});

type LessonFormData = z.infer<typeof lessonSchema>;

type LessonsWithRelations = Lessons & {
    group: (Groups & {
        course: { id: string; name: string; desc: string; price: string } | null;
        teacher: Teacher | null;
        students: {
            id: string;
            name: string;
            phone: string;
            birthday: Date;
        }[];
    }) | null;
    teacher: Teacher | null;
};


export default function LessonsPage() {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<LessonsWithRelations | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [viewModeType, setViewModeType] = useState<'table' | 'calendar'>('table');
    const [selectedDays, setSelectedDays] = useState<DaysOfWeek[]>([]);

    // Handle Sunday click - automatically get Monday
    const handleDateChange = (date: Date) => {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0) { // Sunday
            // Show message and automatically select Monday
            toast.info('Sunday selected', {
                description: 'Automatically showing Monday schedule'
            });
            const monday = addDays(date, 1);
            setSelectedDate(monday);
        } else {
            setSelectedDate(date);
        }
    };

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

    const { data: lessonsData, isLoading, refetch } = useQuery({
        queryKey: ["lessons", selectedDate.toISOString().split('T')[0]],
        queryFn: async () => {
            // Handle Sunday - show Monday instead
            const queryDate = new Date(selectedDate);
            const dayOfWeek = queryDate.getDay();
            if (dayOfWeek === 0) {
                queryDate.setDate(queryDate.getDate() + 1);
            }

            const { data } = await axiosClient.get("/api/lessons/date", {
                params: {
                    date: queryDate.toISOString().split('T')[0]
                }
            })
            return data
        },
    });

    console.log(lessonsData)

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
            daysOfWeek: [],
        },
    });

    const startTimeValue = watch('startTime');
    const endTimeValue = watch('endTime');
    const daysOfWeekValue = watch('daysOfWeek') || [];

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
            toast.success('Lesson Created', {
                description: 'Lesson has been created successfully.',
            });
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            closeDialog();
        },
        onError: (error: any) => {
            toast.error('Failed to create lesson', {
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

    const openDialog = (mode: 'view' | 'edit' | 'create', lesson?: LessonsWithRelations) => {
        setViewMode(mode);
        if (lesson) {
            setSelectedLesson(lesson);
            setSelectedDays(lesson.daysOfWeek);
            setValue('groupId', lesson.groupId || '');
            setValue('teacherId', lesson.teacherId || '');
            setValue('startTime', format(lesson.startTime, "yyyy-MM-dd'T'HH:mm"));
            setValue('endTime', format(lesson.endTime, "yyyy-MM-dd'T'HH:mm"));
            setValue('room', lesson.room);
            setValue('desc', lesson.desc || '');
            setValue('daysOfWeek', lesson.daysOfWeek);
        } else {
            setSelectedDays([]);
            reset({
                groupId: '',
                teacherId: '',
                startTime: format(new Date(), "yyyy-MM-dd'T'09:00"),
                endTime: format(new Date(), "yyyy-MM-dd'T'10:30"),
                room: '',
                desc: '',
                daysOfWeek: [],
            });
        }
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (lesson: LessonsWithRelations) => {
        setSelectedLesson(lesson);
        setIsDeleteDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedLesson(null);
        setSelectedDays([]);
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedLesson(null);
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

    const handleDayToggle = (day: DaysOfWeek) => {
        const newDays = daysOfWeekValue.includes(day)
            ? daysOfWeekValue.filter(d => d !== day)
            : [...daysOfWeekValue, day];

        setValue('daysOfWeek', newDays);
        setSelectedDays(newDays);
    };

    const getDayColor = (day: DaysOfWeek) => {
        const colors: Record<DaysOfWeek, string> = {
            [DaysOfWeek.Monday]: 'bg-blue-500 hover:bg-blue-600',
            [DaysOfWeek.Tuesday]: 'bg-purple-500 hover:bg-purple-600',
            [DaysOfWeek.Wednesday]: 'bg-green-500 hover:bg-green-600',
            [DaysOfWeek.Thursday]: 'bg-yellow-500 hover:bg-yellow-600',
            [DaysOfWeek.Friday]: 'bg-orange-500 hover:bg-orange-600',
            [DaysOfWeek.Saturday]: 'bg-red-500 hover:bg-red-600',
        };
        return colors[day] || 'bg-gray-500';
    };

    const columns = [
        {
            key: 'group',
            label: 'Group',
            sortable: true,
            render: (value: any, lesson: LessonsWithRelations) => {
                // 'value' here is lesson.group (the group object)
                // 'lesson' is the entire lesson object
                return lesson.group?.name || 'No group';
            }
        },
        {
            key: 'teacher',
            label: 'Teacher',
            sortable: true,
            render: (value: any, lesson: LessonsWithRelations) => {
                // 'value' here is lesson.teacher (the teacher object)
                return lesson.teacher?.name || 'No teacher';
            }
        },
        {
            key: 'daysOfWeek', // This should match the property name in the data
            label: 'Days',
            sortable: false,
            render: (value: any, lesson: LessonsWithRelations) => {
                // 'value' here is lesson.daysOfWeek (the array of days)
                // But for safety, we can also use the lesson parameter
                const daysOfWeek = lesson.daysOfWeek || value || [];

                if (!Array.isArray(daysOfWeek) || daysOfWeek.length === 0) {
                    return <Badge variant="default" className="text-xs">No days</Badge>;
                }

                return (
                    <div className="flex gap-1 flex-wrap">
                        {daysOfWeek.map((day) => (
                            <span
                                key={day}
                                className={"text-xs"}
                            >
                                {day.slice(0, 3)}
                            </span>
                        ))}
                    </div>
                );
            }
        },
        {
            key: 'startTime',
            label: 'Time',
            sortable: true,
            render: (value: any, lesson: LessonsWithRelations) => (
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
            render: (value: any, lesson: LessonsWithRelations) => (
                <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{lesson.room}</span>
                </div>
            )
        },
        {
            key: 'group', // We'll use group key again for students
            label: 'Students',
            sortable: false,
            render: (value: any, lesson: LessonsWithRelations) => (
                <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{lesson.group?.students?.length || 0}</span>
                </div>
            )
        },
    ];

    const weekDays = useMemo(() => {
        const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end });
    }, [selectedDate]);

    const lessons = lessonsData?.lessons || [];

    const lessonsByDay = useMemo(() => {
        const lessonsByDay: Record<string, LessonsWithRelations[]> = {};

        weekDays.forEach(day => {
            const dayStr = format(day, 'yyyy-MM-dd');
            lessonsByDay[dayStr] = [];
        });

        lessons?.forEach((lesson: LessonsWithRelations) => {
            const lessonDate = format(lesson.startTime, 'yyyy-MM-dd');
            if (lessonsByDay[lessonDate]) {
                lessonsByDay[lessonDate].push(lesson);
            }
        });

        return lessonsByDay;
    }, [lessons, weekDays]);

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
                    <h1 className="text-3xl font-bold">Lessons</h1>
                    <p className="text-muted-foreground">Manage lesson schedules</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">
                            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                        </span>
                    </div>
                    <Button
                        className="gap-2"
                        onClick={() => openDialog('create')}
                        disabled={isLoadingGroups || isLoadingTeachers}
                    >
                        <Plus className="h-4 w-4" />
                        Create Lesson
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="table" value={viewModeType} onValueChange={(v) => setViewModeType(v as 'table' | 'calendar')}>
                <TabsList>
                    <TabsTrigger value="table">Table View</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>

                <TabsContent value="table" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Lessons for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
                            <CardDescription>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDateChange(new Date())}
                                    >
                                        Today
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                    {selectedDate.getDay() === 1 && (
                                        <Badge variant="outline" className="ml-2">
                                            Monday (Sunday auto-adjusted)
                                        </Badge>
                                    )}
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex items-center justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <span className="ml-2">Loading lessons...</span>
                                </div>
                            ) : lessons.length === 0 ? (
                                <div className="text-center p-8">
                                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                    <p className="text-muted-foreground">No lessons scheduled for this day</p>
                                </div>
                            ) : (
                                <DataTable
                                    columns={columns}
                                    data={lessons as LessonsWithRelations[]}
                                    actions={(lesson) => (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openDialog('view', lesson as LessonsWithRelations)}
                                                title="View details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openDialog('edit', lesson as LessonsWithRelations)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openDeleteDialog(lesson as LessonsWithRelations)}
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
                                            Week {format(startOfWeek(selectedDate, { weekStartsOn: 1 }), 'w')}
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
                                    <div
                                        key={index}
                                        className={`space-y-2 p-2 rounded-lg ${isSameDay(day, selectedDate) ? 'bg-accent' : ''}`}
                                        onClick={() => handleDateChange(day)}
                                    >
                                        <div className={`text-center font-medium ${isSameDay(day, new Date()) ? 'text-primary' : ''}`}>
                                            <div>{format(day, 'EEE')}</div>
                                            <div className={`text-lg ${isSameDay(day, new Date()) ? 'bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
                                                {format(day, 'd')}
                                            </div>
                                            {day.getDay() === 0 && (
                                                <Badge variant="outline" className="text-xs mt-1">Sun→Mon</Badge>
                                            )}
                                        </div>
                                        <ScrollArea className="h-40">
                                            <div className="space-y-2">
                                                {lessonsByDay[format(day, 'yyyy-MM-dd')]?.map((lesson) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="p-2 text-xs bg-secondary/50 rounded-md cursor-pointer hover:bg-secondary transition-colors"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openDialog('view', lesson);
                                                        }}
                                                    >
                                                        <div className="font-medium truncate">{lesson.group?.name}</div>
                                                        <div className="text-muted-foreground truncate">
                                                            {format(lesson.startTime, 'HH:mm')} - {lesson.room}
                                                        </div>
                                                        <div>{lesson.teacher?.name}</div>
                                                        <div className="flex gap-1 mt-1">
                                                            {lesson.daysOfWeek.map(day => (
                                                                <Badge
                                                                    key={day}
                                                                    className="text-xs h-4 px-1"
                                                                >
                                                                    {day.slice(0, 1)}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Lesson Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Create New Lesson' : viewMode === 'edit' ? 'Edit Lesson' : 'View Lesson'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to create a new lesson'
                                : viewMode === 'edit'
                                    ? 'Update lesson information'
                                    : 'Lesson details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="groupId">Group *</Label>
                                <select
                                    id="groupId"
                                    {...register('groupId')}
                                    disabled={viewMode === 'view' || isLoadingGroups}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select a group</option>
                                    {groups?.map((group: Groups & { course?: any; students?: any[] }) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name} ({group.course?.name || 'No course'}) - {group.students?.length || 0} students
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
                                            {teacher.name} ({teacher.email})
                                        </option>
                                    ))}
                                </select>
                                {errors.teacherId && <p className="text-xs text-destructive">{errors.teacherId.message}</p>}
                            </div>
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
                            <Label>Days of Week *</Label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {Object.values(DaysOfWeek).map((day) => (
                                    <Button
                                        key={day}
                                        type="button"
                                        variant={selectedDays.includes(day) ? "default" : "outline"}
                                        className={selectedDays.includes(day) ? getDayColor(day) : ''}
                                        onClick={() => handleDayToggle(day)}
                                        disabled={viewMode === 'view'}
                                    >
                                        {day.slice(0, 3)}
                                        {selectedDays.includes(day) && (
                                            <Check className="ml-1 h-3 w-3" />
                                        )}
                                    </Button>
                                ))}
                            </div>
                            {errors.daysOfWeek && (
                                <p className="text-xs text-destructive">{errors.daysOfWeek.message}</p>
                            )}
                            <input
                                type="hidden"
                                {...register('daysOfWeek')}
                            />
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
                                            {viewMode === 'create' ? 'Creating...' : 'Saving...'}
                                        </>
                                    ) : (
                                        viewMode === 'create' ? 'Create Lesson' : 'Save Changes'
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
                        <DialogTitle>Delete Lesson</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this lesson?
                            <div className="mt-2 p-3 bg-muted rounded">
                                <p className="font-medium">{selectedLesson?.group?.name}</p>
                                <p className="text-sm">
                                    {selectedLesson && format(selectedLesson.startTime, 'EEEE, MMMM d, yyyy HH:mm')}
                                </p>
                                <p className="text-sm">Teacher: {selectedLesson?.teacher?.name}</p>
                                <p className="text-sm">Room: {selectedLesson?.room}</p>
                                <div className="flex gap-1 mt-1">
                                    {selectedLesson?.daysOfWeek?.map(day => (
                                        <Badge key={day} variant="outline" className="text-xs">
                                            {day.slice(0, 3)}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
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