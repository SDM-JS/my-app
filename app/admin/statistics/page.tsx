import { prisma } from '@/lib/prisma';
import StatisticsClient from './StatisticsClient';

export const dynamic = 'force-dynamic';

// Helper function to calculate statistics
async function getDashboardStats() {
    const [
        totalStudents,
        totalTeachers,
        totalGroups,
        totalCourses,
        payments,
        attendances,
        newStudentsThisMonth,
        courses,
        teachers,
        sources
    ] = await Promise.all([
        prisma.student.count(),
        prisma.teacher.count(),
        prisma.groups.count(),
        prisma.course.count(),
        prisma.payments.findMany({
            where: {
                date: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            }
        }),
        prisma.attendances.findMany({
            where: {
                date: {
                    gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
                }
            },
            include: {
                student: true,
                lessons: true
            }
        }),
        prisma.student.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            }
        }),
        prisma.course.findMany({
            include: {
                students: true,
                groups: {
                    include: {
                        payments: true
                    }
                }
            }
        }),
        prisma.teacher.findMany({
            include: {
                courses: {
                    include: {
                        students: true
                    }
                },
                attendances: true
            }
        }),
        prisma.cameFrom.findMany({
            include: {
                students: true
            }
        })
    ]);

    // Calculate total revenue
    const totalRevenue = payments.reduce((sum, payment) => {
        const amount = parseFloat(payment.amount) || 0;
        return sum + amount;
    }, 0);

    // Calculate monthly revenue
    const currentMonth = new Date().getMonth();
    const monthlyPayments = payments.filter(p =>
        new Date(p.date).getMonth() === currentMonth
    );
    const monthlyRevenue = monthlyPayments.reduce((sum, payment) => {
        const amount = parseFloat(payment.amount) || 0;
        return sum + amount;
    }, 0);

    // Calculate attendance rate
    const totalAttendanceRecords = attendances.length;
    const attendanceRate = totalAttendanceRecords > 0 ?
        (attendances.filter(a => a.desc?.toLowerCase().includes('present') || a.desc?.toLowerCase().includes('attended')).length / totalAttendanceRecords) * 100 : 0;

    // Prepare course popularity data
    const coursePopularity = courses.map(course => ({
        name: course.name,
        students: course.students.length,
        revenue: course.groups.reduce((sum, group) => {
            return sum + group.payments.reduce((paySum, payment) => {
                return paySum + (parseFloat(payment.amount) || 0);
            }, 0);
        }, 0)
    })).sort((a, b) => b.students - a.students).slice(0, 6);

    // Prepare revenue data for the last 6 months
    const revenueData = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const month = date.toLocaleString('default', { month: 'short' });

        const monthPayments = payments.filter(p =>
            new Date(p.date).getMonth() === date.getMonth() &&
            new Date(p.date).getFullYear() === date.getFullYear()
        );

        const monthRevenue = monthPayments.reduce((sum, payment) => {
            return sum + (parseFloat(payment.amount) || 0);
        }, 0);

        const monthStudents = courses.reduce((sum, course) => {
            const monthCourseStudents = course.students.filter(s =>
                new Date(s.createdAt).getMonth() === date.getMonth() &&
                new Date(s.createdAt).getFullYear() === date.getFullYear()
            ).length;
            return sum + monthCourseStudents;
        }, 0);

        return {
            month,
            revenue: monthRevenue,
            students: monthStudents
        };
    }).reverse();

    // Prepare attendance data for last 7 days
    const attendanceData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const day = date.toLocaleDateString('default', { weekday: 'short' });

        const dayAttendances = attendances.filter(a => {
            const attendanceDate = new Date(a.date);
            return attendanceDate.getDate() === date.getDate() &&
                attendanceDate.getMonth() === date.getMonth() &&
                attendanceDate.getFullYear() === date.getFullYear();
        });

        const present = dayAttendances.filter(a =>
            a.desc?.toLowerCase().includes('present') || a.desc?.toLowerCase().includes('attended')
        ).length;

        const absent = dayAttendances.length - present;

        return {
            day,
            present,
            absent
        };
    }).reverse();

    // Prepare teacher performance data
    const teacherPerformance = teachers.map(teacher => {
        const teacherAttendances = attendances.filter(a => a.teacherId === teacher.id);
        const attendanceRate = teacherAttendances.length > 0 ?
            (teacherAttendances.filter(a =>
                a.desc?.toLowerCase().includes('present') || a.desc?.toLowerCase().includes('attended')
            ).length / teacherAttendances.length) * 100 : 0;

        return {
            name: teacher.name,
            rating: teacher.ratings || 0,
            students: teacher.courses.reduce((sum, course) => sum + course.students.length, 0),
            attendanceRate
        };
    }).sort((a, b) => b.rating - a.rating).slice(0, 5);

    // Prepare source distribution data
    const sourceDistribution = sources.map(source => ({
        name: source.name,
        students: source.students.length,
        value: source.students.length
    })).sort((a, b) => b.students - a.students);

    const dashboardStats = {
        totalStudents,
        totalTeachers,
        totalGroups,
        totalCourses,
        monthlyRevenue,
        totalRevenue,
        attendanceRate: Math.round(attendanceRate * 10) / 10,
        newStudentsThisMonth
    };

    return {
        dashboardStats,
        revenueData,
        coursePopularity,
        attendanceData,
        teacherPerformance,
        sourceDistribution
    };
}

export default async function StatisticsPage() {
    const data = await getDashboardStats();

    return (
        <StatisticsClient
            dashboardStats={data.dashboardStats}
            revenueData={data.revenueData}
            coursePopularity={data.coursePopularity}
            attendanceData={data.attendanceData}
            teacherPerformance={data.teacherPerformance}
            sourceDistribution={data.sourceDistribution}
        />
    );
}