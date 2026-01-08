import { prisma } from "@/lib/prisma"
import { testTeacherId } from "@/app/data/mockData"
import { TeacherStudentsPage } from "../components/studentsPageContainer"

const StudentsPage = async () => {
    const students = await prisma.student.findMany({
        where: {
            group: {
                teacherId: testTeacherId
            }
        },
        select: {
            name: true,
            id: true,
            birthday: true,
            phone: true,
            cameFrom: true,
            attendances: {
                orderBy: {
                    date: 'desc'
                },
                select: {
                    date: true,
                    desc: true,
                }
            },
            courses: {
                select: {
                    name: true,
                    price: true
                }
            },
            group: {
                select: {
                    name: true,
                    payments: {
                        orderBy: {
                            date: 'desc'
                        },
                        select: {
                            amount: true,
                            date: true,
                            desc: true,
                        }
                    },
                    lessons: true
                }
            }
        }
    })
    console.log(students)

    // // Transform the data to match the expected format
    // const transformedStudents = students.map(student => {
    //     // Get last attendance date
    //     const lastAttendance = student.attendances.length > 0
    //         ? student.attendances[0].date // Already sorted desc, so first is latest
    //         : null;

    //     // Calculate progress (simplified: based on days elapsed vs total days)
    //     const now = new Date();
    //     const groupStart = new Date(student.group?.lessons ? || '');
    //     const groupEnd = new Date(student?.group?.to || '');
    //     const groupStartTime = groupStart.getTime();
    //     const groupEndTime = groupEnd.getTime();
    //     const nowTime = now.getTime();

    //     // Total course duration in days
    //     const totalDays = Math.max(1, Math.floor((groupEndTime - groupStartTime) / (1000 * 60 * 60 * 24)));

    //     // Days elapsed from start
    //     const daysElapsed = Math.max(0, Math.floor((nowTime - groupStartTime) / (1000 * 60 * 60 * 24)));

    //     // Calculate progress percentage
    //     const progress = Math.min(100, Math.round((daysElapsed / totalDays) * 100));

    //     // Calculate total paid amount
    //     const totalPaid = student?.group?.payments.reduce((sum, payment) => {
    //         return sum + Number(payment.amount);
    //     }, 0) || 0;

    //     // Calculate total course price (if multiple courses, sum them)
    //     const totalCoursePrice = student?.courses?.reduce((sum, course) => {
    //         return sum + Number(course.price);
    //     }, 0) || 0;

    //     // Calculate balance (negative means owes money)
    //     const balance = totalPaid - totalCoursePrice;

    //     return {
    //         id: student.id,
    //         name: student.name,
    //         phone: student.phone,
    //         birthday: student.birthday,
    //         cameFrom: student.cameFrom,
    //         group: student?.group?.name || '',
    //         lastAttendance: lastAttendance,
    //         progress: progress,
    //         // For dialog data
    //         groupData: student.group,
    //         courses: student?.courses || [],
    //         attendances: student.attendances,
    //         payments: student?.group?.payments || [],
    //         balance: balance,
    //         totalPaid: totalPaid,
    //         totalCoursePrice: totalCoursePrice
    //     };
    // });

    return (
        // <TeacherStudentsPage students={transformedStudents} />
        <div></div>
    )
}

export default StudentsPage