import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const payments = await prisma.payments.findMany({
            include: {
                group: true,
                student: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        const validatedPayments = payments.map(payment => ({
            ...payment,
            studentName: payment.student?.name || ""
        }))
        return NextResponse.json(validatedPayments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch payments' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.amount || !body.studentId) {
            return NextResponse.json(
                { error: 'Amount and student are required' },
                { status: 400 }
            );
        }

        const payment = await prisma.payments.create({
            data: {
                amount: String(body?.amount),
                studentId: body?.studentId,
                desc: body.desc ? body.desc : "",
                groupId: body?.groupId,
                date: body?.date
            },
            include: {
                group: true,
                student: true
            }
        });

        return NextResponse.json(payment, { status: 201 });
    } catch (error: any) {
        console.error('Error creating payment:', error);

        // Handle foreign key constraint errors
        if (error.code === 'P2003') {
            return NextResponse.json(
                { error: 'Invalid course or group ID' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create payment' },
            { status: 500 }
        );
    }
}