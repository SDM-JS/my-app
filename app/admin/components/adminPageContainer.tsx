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

    // Получить целевую дату (если воскресенье, показать понедельник)
    const getTargetDate = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Воскресенье

        if (dayOfWeek === 0) { 
            return addDays(today, 1); // Понедельник
        }

        return today;
    };

    // Загрузка занятий через React Query
    const { data: lessonsData, isLoading, error } = useQuery({
        queryKey: ["dashboard-lessons", selectedDate.toISOString().split('T')[0]],
        queryFn: async () => {
            const targetDate = getTargetDate();
            setSelectedDate(targetDate);

            // Показать уведомление в воскресенье
            if (new Date().getDay() === 0) {
                toast.info('Показано расписание на понедельник', {
                    description: 'Воскресенье автоматически заменено на понедельник'
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

    // Названия дней недели
    const getDayName = (date: Date) => {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return days[date.getDay()];
    };

    // Определение колонок для DataTable
    const columns = useMemo(() => [
        {
            key: 'group',
            label: 'Группа',
            sortable: true,
            render: (value: any, lesson: any) => {
                return lesson.group?.name || 'Нет группы';
            }
        },
        {
            key: 'course',
            label: 'Курс',
            sortable: true,
            render: (value: any, lesson: any) => {
                return lesson.group?.course?.name || 'Нет курса';
            }
        },
        {
            key: 'teacher',
            label: 'Преподаватель',
            sortable: true,
            render: (value: any, lesson: any) => {
                return lesson.teacher?.name || lesson.group?.teacher?.name || 'Не назначен';
            }
        },
        {
            key: 'time',
            label: 'Время',
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
            label: 'Кабинет',
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
            label: 'Ученики',
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
            label: 'Статус',
            sortable: false,
            render: (value: any, lesson: any) => {
                const currentTime = new Date();
                const startTime = new Date(lesson.startTime);
                const endTime = new Date(lesson.endTime);

                const lessonStart = new Date();
                lessonStart.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

                const lessonEnd = new Date();
                lessonEnd.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

                const isOngoing = currentTime >= lessonStart && currentTime <= lessonEnd;
                const isPast = currentTime > lessonEnd;

                if (isOngoing) {
                    return (
                        <Badge className="bg-green-500 hover:bg-green-600">
                            <span className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                Идет сейчас
                            </span>
                        </Badge>
                    );
                } else if (isPast) {
                    return <Badge variant="outline">Завершено</Badge>;
                } else {
                    return <Badge variant="outline">Ожидается</Badge>;
                }
            }
        }
    ], []);

    const tableData = useMemo(() => {
        if (!lessonsData?.lessons) return [];

        return lessonsData.lessons.map((lesson: any) => {
            const startTime = new Date(lesson.startTime);
            const endTime = new Date(lesson.endTime);
            const today = getTargetDate();
            
            const lessonStart = new Date(today);
            lessonStart.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

            const lessonEnd = new Date(today);
            lessonEnd.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

            return {
                ...lesson,
                id: lesson.id,
                group: lesson.group,
                teacher: lesson.teacher,
                room: lesson.room,
                startTime: lessonStart,
                endTime: lessonEnd,
                originalStartTime: startTime,
                originalEndTime: endTime,
                isOngoing: false
            };
        });
    }, [lessonsData]);

    useEffect(() => {
        if (isLoaded && orgRole !== "org:admin") {
            router.push("/");
        }
    }, [orgRole, isLoaded, router]);

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-muted-foreground">Загрузка...</p>
                </div>
            </div>
        );
    }

    if (orgRole !== "org:admin") {
        return null;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Панель управления</h1>
                <p className="text-muted-foreground">
                    {selectedDate.toDateString() === new Date().toDateString()
                        ? "Обзор на сегодня"
                        : `Занятия на ${getDayName(selectedDate)} (${format(selectedDate, 'd MMM, yyyy')})`
                    }
                </p>
            </div>

            {/* Сетка статистики */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Всего учеников</CardTitle>
                        <Users className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalStudents}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="font-medium">{newStudentsMonth} новых учеников</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Преподаватели</CardTitle>
                        <GraduationCap className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTeachers}</div>
                        <p className="text-xs text-muted-foreground mt-1">Активные инструкторы</p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Платежи за месяц</CardTitle>
                        <CreditCard className="h-5 w-5 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${paymentsForMonth}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {persState === "desc" && <span><TrendingUp className="inline h-3 w-3 text-green-500" /> {pers.toFixed(2)}% с прошлого месяца</span>}
                            {persState === "asc" && <span><TrendingDown className="inline h-3 w-3 text-red-500" />  -{fixedPers}% с прошлого месяца</span>}
                        </p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Посещаемость</CardTitle>
                        <CheckSquare className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{attendanceRate}%</div>
                        <p className="text-xs text-muted-foreground mt-1">Посещаемость за сегодня</p>
                    </CardContent>
                </Card>
            </div>

            {/* Таблица занятий */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {selectedDate.toDateString() === new Date().toDateString()
                            ? "Занятия на сегодня"
                            : `Занятия: ${getDayName(selectedDate)}`
                        }
                        {selectedDate.getDay() === 1 && new Date().getDay() === 0 && (
                            <Badge variant="outline" className="ml-2">
                                Понедельник (авто-корректировка)
                            </Badge>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="ml-2">Загрузка расписания...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center p-8">
                            <p className="text-red-500">Не удалось загрузить занятия</p>
                        </div>
                    ) : tableData.length === 0 ? (
                        <div className="text-center p-8">
                            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">Нет запланированных занятий</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <DataTable
                                columns={columns}
                                data={tableData}
                            />
                            <div className="text-center text-sm text-muted-foreground pt-2">
                                Показано {tableData.length} занятий на {getDayName(selectedDate)}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}