'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, CreditCard, CheckSquare, Calendar, TrendingUp, TrendingDown, Clock, MapPin, User, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Lesson = {
    id: string;
    teacher: string;
    room: string;
    time: string;
    group: string;
    course: string;
};

type props = {
    totalStudents: number,
    totalTeachers: number;
    paymentsForMonth: number;
    attendanceRate: number;
    newStudentsMonth: number;
    pers: number,
    persState: "asc" | "desc",
    upcomingLessons: Lesson[],
}

export default function AdminPageContainer({
    totalStudents,
    totalTeachers,
    paymentsForMonth,
    attendanceRate,
    newStudentsMonth,
    pers,
    persState,
    upcomingLessons
}: props) {
    const fixedPers = (100 - pers).toFixed(2);

    // Get current time for status display
    const currentTime = new Date();

    const isLessonOngoing = (lessonTime: string) => {
        const [startTimeStr, endTimeStr] = lessonTime.split(' - ');
        const [startHour, startMinute] = startTimeStr.split(':').map(Number);
        const [endHour, endMinute] = endTimeStr.split(':').map(Number);

        const startTime = new Date();
        startTime.setHours(startHour, startMinute, 0, 0);

        const endTime = new Date();
        endTime.setHours(endHour, endMinute, 0, 0);

        return currentTime >= startTime && currentTime <= endTime;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
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
                        <div className="text-2xl font-bold">${paymentsForMonth.toLocaleString()}</div>
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

            {/* Upcoming Lessons */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Today's Lessons
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {upcomingLessons.length === 0 ? (
                        <div className="text-center py-8">
                            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">No lessons scheduled for today</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {upcomingLessons.map((lesson) => (
                                    <div
                                        key={lesson.id}
                                        className={`border rounded-lg p-4 transition-smooth hover:shadow-md ${isLessonOngoing(lesson.time)
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-semibold text-lg">{lesson.group}</h3>
                                                <p className="text-sm text-muted-foreground">{lesson.course}</p>
                                            </div>
                                            <Badge
                                                variant={isLessonOngoing(lesson.time) ? "default" : "outline"}
                                                className={isLessonOngoing(lesson.time) ? "bg-green-500 hover:bg-green-600" : ""}
                                            >
                                                {isLessonOngoing(lesson.time) ? (
                                                    <span className="flex items-center gap-1">
                                                        <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                                        Ongoing
                                                    </span>
                                                ) : (
                                                    "Upcoming"
                                                )}
                                            </Badge>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{lesson.teacher}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{lesson.time}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span>{lesson.room}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="text-center text-sm text-muted-foreground pt-2">
                                {upcomingLessons.length} lessons scheduled for today
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}