import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import logger from '@/lib/logger';
import { Prisma } from '@prisma/client';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params; // Await the params
        const body = await request.json();

        const birthday = new Date(body.birthday);
        if (isNaN(birthday.getTime())) {
            return NextResponse.json(
                { error: 'Invalid birthday date' },
                { status: 400 }
            );
        }

        const updateData: Prisma.StudentUpdateInput = {
            name: body.name,
            phone: body.phone,
            birthday,
        };
        if (body.courseId) {
            updateData.courses = { set: [{ id: body.courseId }] };
        }
        if (body.groupId) {
            updateData.group = { connect: { id: body.groupId } };
        } else {
            updateData.group = { disconnect: true };
        }
        const cameFromId = body.cameFromId ?? body.cameFrom;
        if (cameFromId) {
            updateData.cameFrom = { connect: { id: cameFromId } };
        }

        const student = await prisma.student.update({
            where: { id },
            data: updateData,
            include: {
                courses: true,
                group: true,
            }
        });
        return NextResponse.json(student);
    } catch (error) {
        logger.error(`Error updating student: ${error}`);
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
        logger.error(`Error deleting student: ${error}`);

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