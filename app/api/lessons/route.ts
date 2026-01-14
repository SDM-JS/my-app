import { NextRequest, NextResponse } from 'next/server';
import { DaysOfWeek } from '@prisma/client';
import { prisma } from '@/lib/prisma';

// GET all lessons or filtered by date range
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        let whereClause: any = {};

        if (startDate && endDate) {
            whereClause = {
                OR: [
                    {
                        startTime: {
                            gte: new Date(startDate),
                            lte: new Date(endDate)
                        }
                    }
                ]
            };
        }

        const lessons = await prisma.lessons.findMany({
            where: whereClause,
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
                                phone: true
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

        return NextResponse.json(lessons);
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

// POST create new lesson
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            groupId,
            teacherId,
            startTime,
            endTime,
            room,
            desc,
            daysOfWeek
        } = body;

        // Validate required fields
        if (!groupId || !teacherId || !startTime || !endTime || !room || !daysOfWeek) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate daysOfWeek array
        const validDays = Object.values(DaysOfWeek);
        if (!Array.isArray(daysOfWeek) ||
            !daysOfWeek.every(day => validDays.includes(day))) {
            return NextResponse.json(
                { error: 'Invalid daysOfWeek format' },
                { status: 400 }
            );
        }

        const lesson = await prisma.lessons.create({
            data: {
                groupId,
                teacherId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                room,
                desc: desc || '',
                daysOfWeek: daysOfWeek as DaysOfWeek[],
            },
            include: {
                group: {
                    include: {
                        teacher: true,
                        course: true,
                        students: true
                    }
                },
                teacher: true
            }
        });

        return NextResponse.json(lesson, { status: 201 });
    } catch (error) {
        console.error('Error creating lesson:', error);
        return NextResponse.json(
            { error: 'Failed to create lesson' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}