'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, CreditCard, CheckSquare, Calendar, TrendingUp, TrendingDown, Clock, MapPin, User, Eye, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { addDays, format } from 'date-fns';
import { toast } from 'sonner';
import { axiosClient } from '@/lib/axiosClient';
import DataTable from '@/app/components/DataTable';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
    totalStudents: number;
    totalTeachers: number;
    paymentsForMonth: number;
    attendanceRate: number;
    newStudentsMonth: number;
    pers: number;
    persState: "asc" | "desc";
};

export default function AdminPageContainer({
    totalStudents,
    totalTeachers,
    paymentsForMonth,
    attendanceRate,
    newStudentsMonth,
    pers,
    persState,
}: Props) {
    const fixedPers = (100 - pers).toFixed(2);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const router = useRouter();
    const { orgRole, isLoaded } = useAuth();

    // Get target date (if Sunday, show Monday)
    const getTargetDate = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

        if (dayOfWeek === 0) { // Sunday
            return addDays(today, 1); // Monday
        }

        return today;
    };

    // Fetch lessons using React Query
    const { data: lessonsData, isLoading, error } = useQuery({
        queryKey: ["dashboard-lessons", selectedDate.toISOString().split('T')[0]],
        queryFn: async () => {
            const targetDate = getTargetDate();
            setSelectedDate(targetDate);

            // Show toast for Sunday
            if (new Date().getDay() === 0) {
                toast.info('Showing Monday schedule', {
                    description: 'Sunday automatically adjusted to Monday'
                });
            }

            const { data } = await axiosClient.get("/api/lessons/date", {
                params: {
                    date: targetDate.toISOString().split('T')[0]
                }
            });
            return data;
        },
        enabled: isLoaded && orgRole === "org:admin",
    });

    // Get day name for display
    const getDayName = (date: Date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };

    // Define columns for DataTable
    const columns = useMemo(() => [
        {
            key: 'group',
            label: 'Group',
            sortable: true,
            render: (value: any, lesson: any) => {
                return lesson.group?.name || 'No group';
            }
        },
        {
            key: 'course',
            label: 'Course',
            sortable: true,
            render: (value: any, lesson: any) => {
                return lesson.group?.course?.name || 'No course';
            }
        },
        {
            key: 'teacher',
            label: 'Teacher',
            sortable: true,
            render: (value: any, lesson: any) => {
                return lesson.teacher?.name || lesson.group?.teacher?.name || 'No teacher';
            }
        },
        {
            key: 'time',
            label: 'Time',
            sortable: true,
            render: (value: any, lesson: any) => {
                const startTime = new Date(lesson.startTime);
                const endTime = new Date(lesson.endTime);
                return (
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}</span>
                    </div>
                );
            }
        },
        {
            key: 'room',
            label: 'Room',
            sortable: true,
            render: (value: any, lesson: any) => (
                <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{lesson.room}</span>
                </div>
            )
        },
        {
            key: 'students',
            label: 'Students',
            sortable: false,
            render: (value: any, lesson: any) => (
                <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{lesson.group?.students?.length || 0}</span>
                </div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            sortable: false,
            render: (value: any, lesson: any) => {
                const currentTime = new Date();
                const startTime = new Date(lesson.startTime);
                const endTime = new Date(lesson.endTime);

                // Create lesson date with today's date but lesson's time
                const lessonStart = new Date();
                lessonStart.setHours(
                    startTime.getHours(),
                    startTime.getMinutes(),
                    0,
                    0
                );

                const lessonEnd = new Date();
                lessonEnd.setHours(
                    endTime.getHours(),
                    endTime.getMinutes(),
                    0,
                    0
                );

                const isOngoing = currentTime >= lessonStart && currentTime <= lessonEnd;
                const isPast = currentTime > lessonEnd;

                if (isOngoing) {
                    return (
                        <Badge className="bg-green-500 hover:bg-green-600">
                            <span className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                Ongoing
                            </span>
                        </Badge>
                    );
                } else if (isPast) {
                    return <Badge variant="outline">Completed</Badge>;
                } else {
                    return <Badge variant="outline">Upcoming</Badge>;
                }
            }
        }
    ], []);

    // Format data for DataTable
    const tableData = useMemo(() => {
        if (!lessonsData?.lessons) return [];

        return lessonsData.lessons.map((lesson: any) => {
            // Parse lesson times for current day
            const startTime = new Date(lesson.startTime);
            const endTime = new Date(lesson.endTime);

            // Create lesson date with today's date but lesson's time
            const today = getTargetDate();
            const lessonStart = new Date(today);
            lessonStart.setHours(
                startTime.getHours(),
                startTime.getMinutes(),
                0,
                0
            );

            const lessonEnd = new Date(today);
            lessonEnd.setHours(
                endTime.getHours(),
                endTime.getMinutes(),
                0,
                0
            );

            return {
                ...lesson,
                id: lesson.id,
                group: lesson.group,
                teacher: lesson.teacher,
                room: lesson.room,
                startTime: lessonStart,
                endTime: lessonEnd,
                originalStartTime: startTime, // Keep original for reference
                originalEndTime: endTime,
                isOngoing: false // Will be calculated in status column
            };
        });
    }, [lessonsData]);

    // Use useEffect for navigation logic
    useEffect(() => {
        if (isLoaded && orgRole !== "org:admin") {
            router.push("/");
        }
    }, [orgRole, isLoaded, router]);

    // Show loading state while auth is loading
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // If not admin (after useEffect will redirect), show nothing
    if (orgRole !== "org:admin") {
        return null;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                    {selectedDate.toDateString() === new Date().toDateString()
                        ? "Today's overview"
                        : `Showing lessons for ${getDayName(selectedDate)} (${format(selectedDate, 'MMM d, yyyy')})`
                    }
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalStudents}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="font-medium">{newStudentsMonth} new students</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                        <GraduationCap className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTeachers}</div>
                        <p className="text-xs text-muted-foreground mt-1">Active instructors</p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Payments This Month</CardTitle>
                        <CreditCard className="h-5 w-5 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${paymentsForMonth}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {persState === "desc" && <span><TrendingUp className="inline h-3 w-3 text-green-500" /> {pers.toFixed(2)}% from last month</span>}
                            {persState === "asc" && <span><TrendingDown className="inline h-3 w-3 text-red-500" />  -{fixedPers}% from last month</span>}
                        </p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                        <CheckSquare className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{attendanceRate}%</div>
                        <p className="text-xs text-muted-foreground mt-1">Today's attendance</p>
                    </CardContent>
                </Card>
            </div>

            {/* Lessons Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {selectedDate.toDateString() === new Date().toDateString()
                            ? "Today's Lessons"
                            : `${getDayName(selectedDate)}'s Lessons`
                        }
                        {selectedDate.getDay() === 1 && new Date().getDay() === 0 && (
                            <Badge variant="outline" className="ml-2">
                                Monday (Sunday auto-adjusted)
                            </Badge>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="ml-2">Loading lessons...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center p-8">
                            <p className="text-red-500">Failed to load lessons</p>
                        </div>
                    ) : tableData.length === 0 ? (
                        <div className="text-center p-8">
                            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">No lessons scheduled</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <DataTable
                                columns={columns}
                                data={tableData}

                            />
                            {/* Summary */}
                            <div className="text-center text-sm text-muted-foreground pt-2">
                                Showing {tableData.length} lessons for {getDayName(selectedDate)}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}