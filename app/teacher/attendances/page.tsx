import { testTeacherId } from "@/app/data/mockData"
import { prisma } from "@/lib/prisma"

const AttendancesPageContainer = async () => {
    // const attendances = await prisma.attendances.findMany({
    //     where: {
    //         student: {
    //             group: {
    //                 teacherId: testTeacherId
    //             }
    //         }
    //     },
    //     orderBy: {
    //         date: "asc"
    //     },
    //     include: {
    //         student: {
    //             select: {
    //                 group: {
    //                     select: {
    //                         _count: {
    //                             select: {
    //                                 students: true
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })
    const attendances = await prisma.student.findMany({
        where: {
            group: {
                teacherId: testTeacherId
            },
        },
        include: {
            attendances: true,
            group: true,
        },
        orderBy: {
            attendances: {
                _count: "asc"
            }
        }
    })
    console.log(attendances)
    return (
        <div>AttendancesPageContainer</div>
    )
}

export default AttendancesPageContainer
