import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = {
    params: {
        id: string;
    };
};

// GET /api/lessons/[id] - Get a specific lesson
export async function GET(request: NextRequest, { params }: Params) {
    try {
        const { id } = params;

        const lesson = await prisma.lessons.findUnique({
            where: { id },
            include: {
                group: {
                    include: {
                        course: true,
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
        });

        if (!lesson) {
            return NextResponse.json(
                { error: 'Lesson not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(lesson);
    } catch (error) {
        console.error('Error fetching lesson:', error);
        return NextResponse.json(
            { error: 'Failed to fetch lesson' },
            { status: 500 }
        );
    }
}

// PUT /api/lessons/[id] - Update a lesson
export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const { id } = params;
        const body = await request.json();
        const { groupId, teacherId, startTime, endTime, room, status, desc, daysOfWeek } = body;

        // Check if lesson exists
        const existingLesson = await prisma.lessons.findUnique({
            where: { id },
        });

        if (!existingLesson) {
            return NextResponse.json(
                { error: 'Lesson not found' },
                { status: 404 }
            );
        }

        // Validate time if both are provided
        if (startTime && endTime) {
            const start = new Date(startTime);
            const end = new Date(endTime);

            if (start >= end) {
                return NextResponse.json(
                    { error: 'End time must be after start time' },
                    { status: 400 }
                );
            }
        }

        // Update lesson
        const updateData: any = {};
        if (groupId !== undefined) updateData.groupId = groupId;
        if (teacherId !== undefined) updateData.teacherId = teacherId;
        if (startTime !== undefined) updateData.startTime = new Date(startTime);
        if (endTime !== undefined) updateData.endTime = new Date(endTime);
        if (room !== undefined) updateData.room = room;
        if (status !== undefined) updateData.status = status;
        if (desc !== undefined) updateData.desc = desc;
        if (daysOfWeek !== undefined) updateData.daysOfWeek = daysOfWeek;

        const lesson = await prisma.lessons.update({
            where: { id },
            data: updateData,
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

        return NextResponse.json(lesson);
    } catch (error) {
        console.error('Error updating lesson:', error);
        return NextResponse.json(
            { error: 'Failed to update lesson' },
            { status: 500 }
        );
    }
}

// DELETE /api/lessons/[id] - Delete a lesson
export async function DELETE({ params }: Params) {
    try {
        const { id } = params;

        // Check if lesson exists
        const existingLesson = await prisma.lessons.findUnique({
            where: { id },
        });

        if (!existingLesson) {
            return NextResponse.json(
                { error: 'Lesson not found' },
                { status: 404 }
            );
        }

        // Delete all attendance records first
        await prisma.attendances.deleteMany({
            where: { lessonsId: id },
        });

        // Delete the lesson
        await prisma.lessons.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        console.error('Error deleting lesson:', error);
        return NextResponse.json(
            { error: 'Failed to delete lesson' },
            { status: 500 }
        );
    }
}
