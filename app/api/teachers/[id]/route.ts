import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';
import logger from '@/lib/logger';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!body.name || !body.phone || !body.email || !body.birthday) {
            return NextResponse.json(
                { error: 'Name, phone, email, and birthday are required' },
                { status: 400 }
            );
        }

        const birthday = new Date(body.birthday);
        if (isNaN(birthday.getTime())) {
            return NextResponse.json(
                { error: 'Invalid birthday date' },
                { status: 400 }
            );
        }

        const client = await clerkClient();
        const clerkUpdate: { password?: string; firstName?: string; lastName?: string } = {};
        const nameParts = body.name.trim().split(/\s+/);
        clerkUpdate.firstName = nameParts[0] ?? body.name;
        clerkUpdate.lastName = nameParts.slice(1).join(' ') || nameParts[0] ?? '';
        if (body.password != null && String(body.password).length >= 8) {
            clerkUpdate.password = body.password;
        }
        if (Object.keys(clerkUpdate).length > 0) {
            await client.users.updateUser(id, clerkUpdate);
        }

        const teacher = await prisma.teacher.update({
            where: { id },
            data: {
                name: body.name,
                phone: body.phone,
                email: body.email,
                birthday,
                ...(body.avatarUrl != null && { avatarUrl: body.avatarUrl }),
                subjects: {
                    set: body.subjectIds?.map((subjectId: string) => ({ id: subjectId })) || []
                }
            },
            include: {
                subjects: true,
            }
        });

        return NextResponse.json(teacher);
    } catch (error: any) {
        logger.error(`Error updating teacher: ${error}`);
        if (error?.code === 'P2025') {
            return NextResponse.json(
                { error: 'Teacher not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(
            {
                error: 'Failed to update teacher',
                details: error?.errors?.[0]?.message || error?.message,
            },
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
        logger.error(`Error deleting teacher: ${error}`);

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