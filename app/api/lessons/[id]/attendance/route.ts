import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = {
    params: {
        id: string;
    };
};

// GET /api/lessons/[id]/attendance - Get all attendance for a lesson
export async function GET({ params }: Params) {
    try {
        const { id } = params;

        const attendanceRecords = await prisma.attendances.findMany({
            where: { lessonsId: id },
            include: {
                student: true,
                teacher: true,
            },
            orderBy: {
                date: 'desc',
            },
        });

        return NextResponse.json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        return NextResponse.json(
            { error: 'Failed to fetch attendance' },
            { status: 500 }
        );
    }
}

// POST /api/lessons/[id]/attendance - Create attendance record
export async function POST(request: NextRequest, { params }: Params) {
    try {
        const { id } = params;
        const body = await request.json();
        const { studentId, teacherId, desc } = body;

        // Validate required fields
        if (!studentId || !teacherId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if lesson exists
        const lesson = await prisma.lessons.findUnique({
            where: { id },
        });

        if (!lesson) {
            return NextResponse.json(
                { error: 'Lesson not found' },
                { status: 404 }
            );
        }

        // Check if attendance already exists for this student in this lesson
        const existingAttendance = await prisma.attendances.findFirst({
            where: {
                lessonsId: id,
                studentId,
            },
        });

        if (existingAttendance) {
            return NextResponse.json(
                { error: 'Attendance already recorded for this student' },
                { status: 400 }
            );
        }

        // Create attendance record
        const attendance = await prisma.attendances.create({
            data: {
                lessonsId: id,
                studentId,
                teacherId,
                desc: desc || 'Present',
                date: new Date(),
            },
            include: {
                student: true,
                teacher: true,
            },
        });

        return NextResponse.json(attendance, { status: 201 });
    } catch (error) {
        console.error('Error creating attendance:', error);
        return NextResponse.json(
            { error: 'Failed to create attendance' },
            { status: 500 }
        );
    }
}

