import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // try {
    const { id } = await params; // Await the params
    const body = await request.json();

    const payment = await prisma.groups.update({
        where: { id },
        data: {
            name: body.name,
            daysOfWeek: body.daysOfWeek,
            ...(body.groupId && {
                group: {
                    connect: { id: body.groupId }
                }
            }),
            ...(body.courseId && {
                cource: {
                    connect: { id: body.courseId }
                }
            })
        },
    });

    return NextResponse.json(payment);
    // } catch (error) {
    //     console.error('Error updating group:', error);
    //     return NextResponse.json(
    //         { error: 'Failed to update group' },
    //         { status: 500 }
    //     );
    // }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params; // Await the params

        if (!id) {
            return NextResponse.json(
                { error: 'Group ID is required' },
                { status: 400 }
            );
        }

        await prisma.groups.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting group:', error);

        // Handle specific Prisma errors
        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Group not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete group' },
            { status: 500 }
        );
    }
}