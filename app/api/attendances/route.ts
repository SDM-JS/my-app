// app/api/attendances/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const attendances = await prisma.attendances.findMany({
            orderBy: {
                date: 'desc'
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        phone: true
                    }
                },
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        return NextResponse.json(attendances);
    } catch (error) {
        console.error('Error fetching attendances:', error);
        return NextResponse.json(
            { error: 'Failed to fetch attendances' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate that at least studentId or teacherId is provided
        if (!body.studentId && !body.teacherId) {
            return NextResponse.json(
                { error: 'Either studentId or teacherId is required' },
                { status: 400 }
            );
        }

        const attendance = await prisma.attendances.create({
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

        return NextResponse.json(attendance, { status: 201 });
    } catch (error: any) {
        console.error('Error creating attendance:', error);
        return NextResponse.json(
            { error: 'Failed to create attendance' },
            { status: 500 }
        );
    }
}