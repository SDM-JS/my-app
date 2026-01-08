import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET() {
    try {
        const teachers = await prisma.teacher.findMany({
            include: {
                subjects: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch teachers' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.phone || !body.email || !body.birthday || !body.password) {
            return NextResponse.json(
                { error: 'Name, phone, email, password and birthday are required' },
                { status: 400 }
            );
        }

        const client = await clerkClient();

        const user = await client.users.createUser({
            password: body.password,
            emailAddress: [body.email],
            publicMetadata: {
                "role": "teacher"
            }
        });

        const teacher = await prisma.teacher.create({
            data: {
                name: body.name,
                phone: body.phone,
                email: body.email,
                birthday: new Date(body.birthday),
                avatarUrl: body.avatarUrl,
                id: user.id, // Store Clerk user ID
                subjects: {
                    connect: body.subjectIds?.map((id: string) => ({ id })) || []
                }
            },
            include: {
                subjects: true,
            }
        });

        return NextResponse.json(teacher, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating teacher:', error);

        // Provide more specific error messages for Clerk errors
        if (error && typeof error === 'object' && 'status' in error && error.status === 422) {
            const clerkError = error as any;
            return NextResponse.json(
                {
                    error: 'Failed to create user account',
                    details: clerkError.errors || 'Validation failed',
                    clerkTraceId: clerkError.clerkTraceId
                },
                { status: 422 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create teacher' },
            { status: 500 }
        );
    }
}