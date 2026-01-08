import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params; // Await the params
        const body = await request.json();

        const payment = await prisma.payments.update({
            where: { id },
            data: {
                studentName: body.studentName,
                amount: String(body.amount),
                date: new Date(body.date),
                desc: body.desc,
                ...(body.groupId && {
                    group: {
                        connect: { id: body.groupId }
                    }
                }),
                ...(body.groupId && {
                    group: {
                        connect: { id: body.groupId }
                    }
                })
            },
            include: {
                group: true,
            }
        });

        return NextResponse.json(payment);
    } catch (error) {
        console.error('Error updating payment:', error);
        return NextResponse.json(
            { error: 'Failed to update payment' },
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
                { error: 'Payment ID is required' },
                { status: 400 }
            );
        }

        await prisma.payments.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting payment:', error);

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