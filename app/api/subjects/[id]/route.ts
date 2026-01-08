import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single subject
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    try {
        const subject = await prisma.subject.findUnique({
            where: { id }
        });

        if (!subject) {
            return NextResponse.json(
                { error: 'Subject not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(subject);
    } catch (error) {
        console.error('Error fetching subject:', error);
        return NextResponse.json(
            { error: 'Failed to fetch subject' },
            { status: 500 }
        );
    }
}

// PUT update subject
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { name } = body;
        const { id } = await params

        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            );
        }

        const subject = await prisma.subject.update({
            where: { id },
            data: { name }
        });

        return NextResponse.json(subject);
    } catch (error) {
        console.error('Error updating subject:', error);
        return NextResponse.json(
            { error: 'Failed to update subject' },
            { status: 500 }
        );
    }
}

// DELETE subject
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        console.log(id)
        // Check if subject has courses
        const coursesCount = await prisma.course.count({
            where: { subjectId: id }
        });

        if (coursesCount > 0) {
            return NextResponse.json(
                { error: 'Cannot delete subject with associated courses. Please remove courses first.' },
                { status: 400 }
            );
        }

        // Check if subject has teachers
        const teachersCount = await prisma.teacher.count({
            where: {
                subjects: {
                    some: { id }
                }
            }
        });

        if (teachersCount > 0) {
            return NextResponse.json(
                { error: 'Cannot delete subject with associated teachers. Please remove teachers first.' },
                { status: 400 }
            );
        }

        await prisma.subject.delete({
            where: { id }
        });

        return NextResponse.json(
            { message: 'Subject deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting subject:', error);
        return NextResponse.json(
            { error: 'Failed to delete subject' },
            { status: 500 }
        );
    }
}