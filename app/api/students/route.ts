import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const students = await prisma.student.findMany({
            include: {
                courses: true,
                group: true,
                cameFrom: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log(students)
        return NextResponse.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        return NextResponse.json(
            { error: 'Failed to fetch students' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.phone || !body.birthday || !body.cameFrom) {
            return NextResponse.json(
                { error: 'Name, phone, birthday, and cameFrom are required' },
                { status: 400 }
            );
        }

        const studentData: any = {
            name: body.name,
            phone: body.phone,
            birthday: new Date(body.birthday),
            cameText: body.cameFrom,
        };

        // Only connect course if provided
        if (body.courseId) {
            studentData.courses = {
                connect: { id: body.courseId }
            };
        }

        // Only connect group if provided
        if (body.groupId) {
            studentData.group = {
                connect: { id: body.groupId }
            };
        }

        const student = await prisma.student.create({
            data: studentData,
            include: {
                courses: true,
                group: true,
            }
        });

        return NextResponse.json(student, { status: 201 });
    } catch (error: any) {
        console.error('Error creating student:', error);

        // Handle foreign key constraint errors
        if (error.code === 'P2003') {
            return NextResponse.json(
                { error: 'Invalid course or group ID' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create student' },
            { status: 500 }
        );
    }
}