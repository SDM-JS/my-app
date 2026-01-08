import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params; // Await the params
        const body = await request.json();

        const student = await prisma.student.update({
            where: { id },
            data: {
                name: body.name,
                phone: body.phone,
                birthday: new Date(body.birthday),
                cameText: body.cameFrom || undefined,
                ...(body.courseId && {
                    cources: {
                        connect: { id: body.courseId }
                    }
                }),
                ...(body.groupId && {
                    group: {
                        connect: { id: body.groupId }
                    }
                })
            },
            include: {
                courses: true,
                group: true,
            }
        });

        return NextResponse.json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        return NextResponse.json(
            { error: 'Failed to update student' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params; // Await the params

        if (!id) {
            return NextResponse.json(
                { error: 'Student ID is required' },
                { status: 400 }
            );
        }
        await prisma.payments.deleteMany({
            where: {
                studentId: id
            }
        })
        await prisma.student.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting student:', error);

        // Handle specific Prisma errors
        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Student not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete student' },
            { status: 500 }
        );
    }
}