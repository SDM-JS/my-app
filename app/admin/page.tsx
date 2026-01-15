import { prisma } from "@/lib/prisma";
import AdminPageContainer from "./components/adminPageContainer";

const AdminPage = async () => {
    // Fetch only the stats data (no lessons)
    const [
        totalTeachers,
        totalStudents,
        payments,
        lastMonthPayment,
        attendancesToday,
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
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lte: new Date(new Date().setHours(23, 59, 59, 999))
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

    return (
        <AdminPageContainer
            totalStudents={totalStudents}
            totalTeachers={totalTeachers}
            paymentsForMonth={paymentsForMonth}
            attendanceRate={attendanceRate}
            newStudentsMonth={newStudentsMonth.length}
            pers={pers}
            persState={persState}
        />
    );
}

export default AdminPage;