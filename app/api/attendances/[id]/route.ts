// app/api/attendances/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const param = (await params).id
    try {
        const attendance = await prisma.attendances.findUnique({
            where: { id: param },
            include: {
                student: true,
                teacher: true
            }
        });

        if (!attendance) {
            return NextResponse.json(
                { error: 'Attendance not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(attendance);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        return NextResponse.json(
            { error: 'Failed to fetch attendance' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();

        const param = (await params).id

        // Check if attendance exists
        const existingAttendance = await prisma.attendances.findUnique({
            where: { id: param }
        });

        if (!existingAttendance) {
            return NextResponse.json(
                { error: 'Attendance not found' },
                { status: 404 }
            );
        }

        // Validate that at least one of studentId or teacherId is provided
        if (!body.studentId && !body.teacherId) {
            return NextResponse.json(
                { error: 'Either studentId or teacherId is required' },
                { status: 400 }
            );
        }

        const attendance = await prisma.attendances.update({
            where: { id: param },
            data: {
                desc: body.desc,
                date: new Date(body.date),
                studentId: body.studentId || null,
                teacherId: body.teacherId || null,
            },
            include: {
                student: true,
                teacher: true
            }
        });

        return NextResponse.json(attendance);
    } catch (error: any) {
        console.error('Error updating attendance:', error);

        if (error.code === 'P2003') {
            return NextResponse.json(
                { error: 'Invalid student or teacher ID' },
                { status: 400 }
            );
        }

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Attendance not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to update attendance' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check if attendance exists
        const param = (await params).id
        const existingAttendance = await prisma.attendances.findUnique({
            where: { id: param }
        });

        if (!existingAttendance) {
            return NextResponse.json(
                { error: 'Attendance not found' },
                { status: 404 }
            );
        }

        // Delete the attendance
        await prisma.attendances.delete({
            where: { id: param }
        });

        return NextResponse.json(
            { message: 'Attendance deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error deleting attendance:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Attendance not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete attendance' },
            { status: 500 }
        );
    }
}