import { NextRequest, NextResponse } from 'next/server';
import { DaysOfWeek } from '@prisma/client';
import { prisma } from '@/lib/prisma';

// GET single lesson
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const lesson = await prisma.lessons.findUnique({
            where: { id: params.id },
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
    } finally {
        await prisma.$disconnect();
    }
}

// PUT update lesson
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();

        const { id } = await params

        const {
            groupId,
            teacherId,
            startTime,
            endTime,
            room,
            desc,
            daysOfWeek
        } = body;

        // Validate daysOfWeek if provided
        if (daysOfWeek) {
            const validDays = Object.values(DaysOfWeek);
            if (!Array.isArray(daysOfWeek) ||
                !daysOfWeek.every(day => validDays.includes(day))) {
                return NextResponse.json(
                    { error: 'Invalid daysOfWeek format' },
                    { status: 400 }
                );
            }
        }

        const lesson = await prisma.lessons.update({
            where: { id },
            data: {
                groupId,
                teacherId,
                startTime: startTime ? new Date(startTime) : undefined,
                endTime: endTime ? new Date(endTime) : undefined,
                room,
                desc,
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

        return NextResponse.json(lesson);
    } catch (error) {
        console.error('Error updating lesson:', error);
        return NextResponse.json(
            { error: 'Failed to update lesson' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// DELETE lesson
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params
    try {
        // Check if lesson exists
        const lesson = await prisma.lessons.findUnique({
            where: { id }
        });

        if (!lesson) {
            return NextResponse.json(
                { error: 'Lesson not found' },
                { status: 404 }
            );
        }

        await prisma.lessons.delete({
            where: { id }
        });

        return NextResponse.json(
            { message: 'Lesson deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting lesson:', error);
        return NextResponse.json(
            { error: 'Failed to delete lesson' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}