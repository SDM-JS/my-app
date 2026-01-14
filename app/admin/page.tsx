import { prisma } from "@/lib/prisma";
import AdminPageContainer from "./components/adminPageContainer";
import { DaysOfWeek } from "@prisma/client";

const AdminPage = async () => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    // Map JavaScript day numbers to DaysOfWeek enum
    const dayOfWeekMap: { [key: number]: DaysOfWeek } = {
        0: DaysOfWeek.Saturday, // Sunday = Saturday (adjusted)
        1: DaysOfWeek.Monday,
        2: DaysOfWeek.Tuesday,
        3: DaysOfWeek.Wednesday,
        4: DaysOfWeek.Thursday,
        5: DaysOfWeek.Friday,
        6: DaysOfWeek.Saturday,
    };

    // Get today's day as DaysOfWeek enum
    const todayDayOfWeek = dayOfWeekMap[today.getDay()];

    // If it's Sunday (0), handle according to your business logic
    // You can adjust this based on your requirements
    if (today.getDay() === 0) {
        // Option 1: Return empty for Sunday
        // return empty or handle differently
    }

    // Fetch all data in parallel
    const [
        totalTeachers,
        totalStudents,
        payments,
        lastMonthPayment,
        attendancesToday,
        allAttendances,
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
        prisma.student.findMany({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                }
            }
        })
    ]);

    // Fetch ONLY today's lessons
    const todayLessons = await prisma.lessons.findMany({
        where: {
            // Filter lessons that have today in their daysOfWeek array
            daysOfWeek: {
                has: todayDayOfWeek
            },
            // Optionally filter by time range if needed
            startTime: {
                gte: startOfToday,
                lte: endOfToday
            }
        },
        include: {
            group: {
                include: {
                    teacher: true,
                    course: true,
                    students: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            teacher: true,
            attendance: {
                where: {
                    date: {
                        gte: startOfToday,
                        lte: endOfToday
                    }
                },
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        },
        orderBy: {
            startTime: 'asc'
        }
    });

    // Calculate derived values
    const paymentsForMonth = payments.reduce((sum, payment) =>
        sum + parseFloat(payment.amount || '0'), 0
    );

    const paymentsForLastMonth = lastMonthPayment.reduce((sum, payment) =>
        sum + parseFloat(payment.amount || '0'), 0
    );

    const pers = paymentsForLastMonth === 0 ? 100 : (paymentsForMonth * 100) / paymentsForLastMonth;

    const persState = paymentsForLastMonth > paymentsForMonth ? "asc" : "desc";

    const attendanceRate = totalStudents > 0
        ? Math.round((attendancesToday.length / totalStudents) * 100)
        : 0;

    // Filter out lessons that have already ended (if needed)
    const currentTime = new Date();
    const upcomingLessons = todayLessons
        .filter(lesson => new Date(lesson.endTime) > currentTime)
        .slice(0, 5); // Take only first 5 upcoming lessons

    // Format lessons for the container
    const formattedLessons = upcomingLessons.map(lesson => ({
        id: lesson.id,
        teacher: lesson.teacher?.name || 'No Teacher',
        room: lesson.room || 'TBD',
        time: `${new Date(lesson.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(lesson.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        group: lesson.group?.name || 'No Group',
        course: lesson.group?.course?.name || 'No Course',
        studentCount: lesson.group?.students?.length || 0,
        attendanceCount: lesson.attendance?.length || 0
    }));

    return (
        <AdminPageContainer
            totalStudents={totalStudents}
            totalTeachers={totalTeachers}
            paymentsForMonth={paymentsForMonth}
            attendanceRate={attendanceRate}
            newStudentsMonth={newStudentsMonth.length}
            pers={pers}
            persState={persState}
            upcomingLessons={formattedLessons}
        />
    );
}

export default AdminPage;