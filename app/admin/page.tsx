import { prisma } from "@/lib/prisma";
import AdminPageContainer from "./components/adminPageContainer";
import { Status } from "@prisma/client";

// Helper function to check if a day is in daysOfWeek array
const isTodayInDaysOfWeek = (daysOfWeek: string[], today: Date): boolean => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = dayNames[today.getDay()];
    return daysOfWeek.includes(todayName);
};

const AdminPage = async () => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    // Fetch all data in parallel
    const [
        totalTeachers,
        totalStudents,
        payments,
        lastMonthPayment,
        attendancesToday,
        allAttendances,
        groupsWithLessons,
        existingLessonsToday,
        newStudentsMonth
    ] = await Promise.all([
        prisma.teacher.count(),
        prisma.student.count(),
        prisma.payments.findMany({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                }
            }
        }),
        prisma.payments.findMany({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                    lte: new Date(new Date().getFullYear(), new Date().getMonth(), 0)
                }
            }
        }),
        prisma.attendances.findMany({
            where: {
                date: {
                    gte: startOfToday,
                    lte: endOfToday
                }
            }
        }),
        prisma.attendances.findMany({
            where: {
                date: {
                    gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                }
            }
        }),
        // Fetch groups with their schedules and related data
        prisma.groups.findMany({
            include: {
                course: true,
                teacher: true,
            }
        }),
        // Fetch existing lessons for today
        prisma.lessons.findMany({
            where: {
                status: Status.SCHEDULED
            },
            include: {
                teacher: true
            }
        }),
        prisma.student.findMany({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                }
            }
        })
    ]);

    // Calculate derived values
    const paymentsForMonth = payments.reduce((sum, payment) =>
        sum + parseFloat(payment.amount || '0'), 0
    );

    const paymentsForLastMonth = lastMonthPayment.reduce((sum, payment) =>
        sum + parseFloat(payment.amount || '0'), 0
    );

    const pers = paymentsForLastMonth === 0 ? 100 : (paymentsForMonth * 100) / paymentsForLastMonth

    const persState = paymentsForLastMonth > paymentsForMonth ? "asc" : "desc"

    const attendanceRate = totalStudents > 0
        ? Math.round((attendancesToday.length / totalStudents) * 100)
        : 0;

    // Combine existing lessons with auto-generated ones
    const allUpcomingLessons = [
        ...existingLessonsToday.map(lesson => ({
            id: lesson.id,
            teacher: lesson.teacher?.name || 'No Teacher',
            room: lesson.room || 'TBD',
            status: lesson.status,
        })),
    ];

    // Filter out lessons that have already ended
    const currentTime = new Date();
    return (

        <AdminPageContainer
            totalStudents={totalStudents}
            totalTeachers={totalTeachers}
            paymentsForMonth={paymentsForMonth}
            attendanceRate={attendanceRate}
            newStudentsMonth={newStudentsMonth.length}
            pers={pers}
            persState={persState}
        // Pass upcoming lessons to the container component

        />
    )
}

export default AdminPage;