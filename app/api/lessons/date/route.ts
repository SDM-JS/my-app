import { NextRequest, NextResponse } from 'next/server';
import { DaysOfWeek } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const dateParam = searchParams.get('date');

        if (!dateParam) {
            return NextResponse.json(
                { error: 'Date parameter is required' },
                { status: 400 }
            );
        }

        // Parse the date
        const targetDate = new Date(dateParam);

        // Validate the date
        if (isNaN(targetDate.getTime())) {
            return NextResponse.json(
                { error: 'Invalid date format. Use ISO format (YYYY-MM-DD)' },
                { status: 400 }
            );
        }

        // Get day of week from the date (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeekNumber = targetDate.getDay();

        // If it's Sunday (0), automatically get Monday
        if (dayOfWeekNumber === 0) {
            targetDate.setDate(targetDate.getDate() + 1);
        }

        const adjustedDayOfWeekNumber = targetDate.getDay();

        // Map JavaScript day numbers to your DaysOfWeek enum
        const dayOfWeekMap: { [key: number]: DaysOfWeek } = {
            1: DaysOfWeek.Monday,
            2: DaysOfWeek.Tuesday,
            3: DaysOfWeek.Wednesday,
            4: DaysOfWeek.Thursday,
            5: DaysOfWeek.Friday,
            6: DaysOfWeek.Saturday,
        };

        const dayOfWeek = dayOfWeekMap[adjustedDayOfWeekNumber];

        // Fetch lessons for that day of week
        const lessons = await prisma.lessons.findMany({
            where: {
                daysOfWeek: {
                    has: dayOfWeek
                }
            },
            include: {
                group: {
                    include: {
                        teacher: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                avatarUrl: true,
                                phone: true
                            }
                        },
                        course: {
                            select: {
                                id: true,
                                name: true,
                                desc: true,
                                price: true
                            }
                        },
                        students: {
                            select: {
                                id: true,
                                name: true,
                                phone: true,
                                birthday: true
                            }
                        }
                    }
                },
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                        phone: true
                    }
                }
            },
            orderBy: {
                startTime: 'asc'
            }
        });


        return NextResponse.json({
            date: targetDate.toISOString(),
            dayOfWeek,
            lessons: lessons.map(lesson => ({
                id: lesson.id,
                desc: lesson.desc,
                startTime: lesson.startTime,
                endTime: lesson.endTime,
                room: lesson.room,
                daysOfWeek: lesson.daysOfWeek,
                group: lesson.group ? {
                    id: lesson.group.id,
                    name: lesson.group.name,
                    teacher: lesson.group.teacher,
                    course: lesson.group.course,
                    studentCount: lesson.group.students.length,
                    students: lesson.group.students
                } : null,
                teacher: lesson.teacher,
                createdAt: lesson.createdAt,
                updatedAt: lesson.updatedAt
            }))
        });

    } catch (error) {
        console.error('Error fetching lessons:', error);
        return NextResponse.json(
            { error: 'Failed to fetch lessons' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}