'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, CreditCard, CheckSquare, TrendingUp, TrendingDown, UsersRound, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { axiosClient } from '@/lib/axiosClient';
import DataTable from '@/app/components/DataTable';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

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

    const router = useRouter();
    const { orgRole, isLoaded } = useAuth();

    // Загрузка последних платежей
    const { data: paymentsData, isLoading: paymentsLoading } = useQuery({
        queryKey: ["recent-payments"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/payments");
            return data;
        },
        enabled: isLoaded && orgRole === "org:admin",
    });

    // Загрузка групп
    const { data: groupsData, isLoading: groupsLoading } = useQuery({
        queryKey: ["dashboard-groups"],
        queryFn: async () => {
            const { data } = await axiosClient.get("/api/groups");
            return data;
        },
        enabled: isLoaded && orgRole === "org:admin",
    });

    // Колонки таблицы платежей
    const paymentColumns = useMemo(() => [
        {
            key: 'student',
            label: 'Ученик',
            sortable: true,
            render: (value: any, row: any) => (
                <span className="font-medium">{row.student?.name || '—'}</span>
            )
        },
        {
            key: 'amount',
            label: 'Сумма',
            sortable: true,
            render: (value: string) => (
                <span className="font-semibold text-green-600 dark:text-green-400">
                    {parseFloat(value || '0').toLocaleString('ru-RU')} ₸
                </span>
            )
        },
        {
            key: 'desc',
            label: 'Описание',
            sortable: false,
            render: (value: string) => (
                <span className="text-muted-foreground line-clamp-1 max-w-[180px]">{value || '—'}</span>
            )
        },
        {
            key: 'date',
            label: 'Дата',
            sortable: true,
            render: (value: string) => (
                <span>{value ? format(new Date(value), 'dd.MM.yyyy') : '—'}</span>
            )
        },
        {
            key: 'group',
            label: 'Группа',
            sortable: true,
            render: (value: any, row: any) => (
                <Badge variant="outline">{row.group?.name || '—'}</Badge>
            )
        },
    ], []);

    // Колонки таблицы групп
    const groupColumns = useMemo(() => [
        {
            key: 'name',
            label: 'Название',
            sortable: true,
            render: (value: string) => <span className="font-medium">{value}</span>
        },
        {
            key: 'course',
            label: 'Курс',
            sortable: true,
            render: (value: any, row: any) => (
                <span>{row.course?.name || <span className="text-muted-foreground">—</span>}</span>
            )
        },
        {
            key: 'teacher',
            label: 'Преподаватель',
            sortable: true,
            render: (value: any, row: any) => (
                <span>{row.teacher?.name || <span className="text-muted-foreground">—</span>}</span>
            )
        },
        {
            key: 'students',
            label: 'Учеников',
            sortable: false,
            render: (value: any, row: any) => (
                <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-blue-500" />
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                        {row.students?.length ?? 0}
                    </span>
                </div>
            )
        },
        {
            key: 'daysOfWeek',
            label: 'Дни',
            sortable: false,
            render: (value: string[]) => (
                <span className="text-sm text-muted-foreground">
                    {value?.length ? value.map((d: string) => d.slice(0, 3)).join(', ') : '—'}
                </span>
            )
        },
    ], []);

    // Последние 8 платежей (сортировка по дате убывания)
    const recentPayments = useMemo(() => {
        if (!paymentsData) return [];
        return [...paymentsData]
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 8);
    }, [paymentsData]);

    // Топ 6 групп по количеству учеников
    const topGroups = useMemo(() => {
        if (!groupsData) return [];
        return [...groupsData]
            .sort((a: any, b: any) => (b.students?.length ?? 0) - (a.students?.length ?? 0))
            .slice(0, 6);
    }, [groupsData]);

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
                <p className="text-muted-foreground">Обзор на сегодня</p>
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
                        <div className="text-2xl font-bold">{paymentsForMonth.toLocaleString('ru-RU')} ₸</div>
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

            {/* Таблица последних платежей */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Последние платежи
                    </CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin/payments" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            Все платежи <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    {paymentsLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="ml-2">Загрузка платежей...</span>
                        </div>
                    ) : recentPayments.length === 0 ? (
                        <div className="text-center p-8">
                            <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">Нет платежей</p>
                        </div>
                    ) : (
                        <DataTable
                            columns={paymentColumns}
                            data={recentPayments}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Таблица групп */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <UsersRound className="h-5 w-5" />
                        Топ групп по ученикам
                    </CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin/groups" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            Все группы <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    {groupsLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="ml-2">Загрузка групп...</span>
                        </div>
                    ) : topGroups.length === 0 ? (
                        <div className="text-center p-8">
                            <UsersRound className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">Нет групп</p>
                        </div>
                    ) : (
                        <DataTable
                            columns={groupColumns}
                            data={topGroups}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}