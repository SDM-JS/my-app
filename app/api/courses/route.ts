import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const courses = await prisma.course.findMany({
            include: {
                students: true,
                teacher: true,
                subject: true
            },
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const { name, desc, price, subjectId, teacherIds } = await request.json()
    try {
        const createdCource = await prisma.course.create({
            data: {
                name,
                desc, price, subjectId, teacher: {
                    connect: teacherIds?.map((id: string) => ({ id })) || []
                }
            }
        })
        return NextResponse.json(createdCource)
    } catch (error: any) {
        console.error('Error fetching courses:', error);
        return NextResponse.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}