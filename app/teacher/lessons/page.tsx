import { testTeacherId } from '@/app/data/mockData'
import { prisma } from '@/lib/prisma'
import TeacherLessonsPage from './Container'

const Container = async () => {
    const lessons = await prisma.lessons.findMany({
        where: {
            teacherId: testTeacherId
        },
        include: {
            group: {
                select: {
                    course: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
    return (
        <TeacherLessonsPage lessons={lessons} />
    )
}

export default Container
