import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, CheckSquare, BookOpen } from 'lucide-react';
import { testTeacherId } from '@/app/data/mockData';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

export default async function TeacherDashboard() {
    const currentTeacher = await prisma.teacher.findFirst({
        where: {
            id: testTeacherId
        },
        include: {
            group: {
                include: {
                    students: true,
                    course: true
                }
            },
            lessons: {
                where: {
                    startTime: {
                        equals: new Date()
                    },
                },
            },
            attendances: {
                include: {
                    student: true
                }
            }

        }
    })

    const teacherStudents = await prisma.student.findMany({
        where: {
            group: {
                teacherId: currentTeacher?.id
            }
        }
    })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {currentTeacher?.name}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Students</CardTitle>
                        <Users className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{teacherStudents.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Active students</p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Groups</CardTitle>
                        <BookOpen className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{currentTeacher?.group.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Teaching groups</p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Lessons</CardTitle>
                        <Calendar className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{currentTeacher?.lessons.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Scheduled lessons</p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                        <CheckSquare className="h-5 w-5 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground mt-1">This month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Today's Schedule
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {currentTeacher?.lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className="flex items-center justify-between rounded-lg border p-4 transition-smooth hover:bg-muted/50"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium">{currentTeacher.group.map(g => g.course?.name)}</p>
                                    <p className="text-sm text-muted-foreground">{currentTeacher.group.map(g => g.course?.desc)}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-sm font-medium">{format(lesson.startTime, "P")}</p>
                                    <p className="text-sm font-medium">{format(lesson.endTime, "P")}</p>
                                    <p className="text-sm text-muted-foreground">{lesson.room}</p>
                                </div>
                                <Badge variant="outline">{lesson.status}</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Group List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        My Groups
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        {currentTeacher?.group.map((group) => (
                            <div key={group.id} className="rounded-lg border p-4 transition-smooth hover:bg-muted/50">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-semibold">{group.name}</p>
                                    <Badge variant="secondary">{group.students.length} students</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{group.course?.name}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}