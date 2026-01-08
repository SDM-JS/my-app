'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, CreditCard, CheckSquare, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
type props = {
    totalStudents: number,
    totalTeachers: number;
    paymentsForMonth: number;
    attendanceRate: number;
    newStudentsMonth: number;
    pers: number,
    persState: "asc" | "desc"
}

export default function AdminPageContainer({
    totalStudents,
    totalTeachers,
    paymentsForMonth,
    attendanceRate,
    newStudentsMonth,
    pers,
    persState
}: props) {
    const fixedPers = (100 - pers).toFixed(2)
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
                        Upcoming Lessons Today
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">

                    </div>
                </CardContent>
            </Card>
        </div>
    );
}