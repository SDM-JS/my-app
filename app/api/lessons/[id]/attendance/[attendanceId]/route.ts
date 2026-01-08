// app/api/lessons/[id]/attendance/[attendanceId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = {
    params: Promise<{
        id: string;
        attendanceId: string;
    }>;
};

// DELETE /api/lessons/[id]/attendance/[attendanceId] - Delete attendance record
export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const { id, attendanceId } = await params;

        // Check if attendance exists
        const existingAttendance = await prisma.attendances.findUnique({
            where: { id: attendanceId },
        });

        if (!existingAttendance) {
            return NextResponse.json(
                { error: 'Attendance record not found' },
                { status: 404 }
            );
        }

        // Verify attendance belongs to this lesson
        if (existingAttendance.lessonsId !== id) {
            return NextResponse.json(
                { error: 'Attendance does not belong to this lesson' },
                { status: 400 }
            );
        }

        // Delete attendance
        await prisma.attendances.delete({
            where: { id: attendanceId },
        });

        return NextResponse.json({ message: 'Attendance deleted successfully' });
    } catch (error) {
        console.error('Error deleting attendance:', error);
        return NextResponse.json(
            { error: 'Failed to delete attendance' },
            { status: 500 }
        );
    }
}