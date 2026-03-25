import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import logger from '@/lib/logger';
import { Prisma } from '@prisma/client';

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
        return NextResponse.json(students);
    } catch (error) {
        logger.error(`Error fetching students: ${error}`);
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
        if (!body.name || !body.phone || !body.birthday) {
            return NextResponse.json(
                { error: 'Name, phone, and birthday are required' },
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

        const studentData: Prisma.StudentCreateInput = {
            name: body.name,
            phone: body.phone,
            birthday,
        };

        const cameFromId = body.cameFrom ?? body.cameFromId;
        if (cameFromId) {
            studentData.cameFrom = { connect: { id: cameFromId } };
        }

        if (body.courseId) {
            studentData.courses = { connect: { id: body.courseId } };
        }
        if (body.groupId) {
            studentData.group = { connect: { id: body.groupId } };
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
        logger.error(`Error creating student: ${error}`);

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