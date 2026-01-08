import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        (await clerkClient()).users.updateUser(id, {
            password: body.password,
        })

        const teacher = await prisma.teacher.update({
            where: { id },
            data: {
                name: body.name,
                phone: body.phone,
                email: body.email,
                birthday: new Date(body.birthday),
                subjects: {
                    set: body.subjectIds?.map((id: string) => ({ id })) || []
                }
            },
            include: {
                subjects: true,
            }
        });

        return NextResponse.json(teacher);
    } catch (error) {
        console.error('Error updating teacher:', error);
        return NextResponse.json(
            { error: 'Failed to update teacher' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Teacher ID is required' },
                { status: 400 }
            );
        }

        (await clerkClient()).users.deleteUser(id)

        await prisma.teacher.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting teacher:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Teacher not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete teacher' },
            { status: 500 }
        );
    }
}