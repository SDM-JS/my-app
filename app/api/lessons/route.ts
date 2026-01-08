import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/lessons - Get all lessons with optional date filtering
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        const where: any = {};

        if (startDate && endDate) {
            where.startTime = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }

        const lessons = await prisma.lessons.findMany({
            where,
            include: {
                group: {
                    include: {
                        course: {
                            select: {
                                id: true,
                                name: true,
                            }
                        },
                        teacher: true,
                        students: true,
                    }
                },
                teacher: true,
                attendance: {
                    include: {
                        student: true,
                        teacher: true,
                    }
                },
            },
            orderBy: {
                startTime: 'asc',
            },
        });

        return NextResponse.json(lessons);
    } catch (error) {
        console.error('Error fetching lessons:', error);
        return NextResponse.json(
            { error: 'Failed to fetch lessons' },
            { status: 500 }
        );
    }
}

// POST /api/lessons - Create a new lesson
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { groupId, teacherId, startTime, endTime, room, status, desc, daysOfWeek } = body;

        // Validate required fields
        if (!teacherId || !startTime || !endTime || !room) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate time
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (start >= end) {
            return NextResponse.json(
                { error: 'End time must be after start time' },
                { status: 400 }
            );
        }

        // Create lesson
        const lesson = await prisma.lessons.create({
            data: {
                // groupId: groupId ? groupId : "",
                teacherId,
                startTime: start,
                endTime: end,
                room,
                status: status || 'SCHEDULED',
                desc: desc || '',
                daysOfWeek: daysOfWeek || [],
            },
            include: {
                group: {
                    include: {
                        course: true,
                        teacher: true,
                        students: true,
                    }
                },
                teacher: true,
                attendance: true,
            },
        });

        return NextResponse.json(lesson, { status: 201 });
    } catch (error) {
        console.error('Error creating lesson:', error);
        return NextResponse.json(
            { error: 'Failed to create lesson' },
            { status: 500 }
        );
    }
}