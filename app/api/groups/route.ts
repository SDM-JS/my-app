// app/api/groups/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

const cacheKey = "groups:all"

export async function GET() {
    try {
        // Check cache first
        const cached = await redis.get(cacheKey);
        if (cached) {
            return NextResponse.json(JSON.parse(cached));
        }

        const groups = await prisma.groups.findMany({
            orderBy: {
                name: 'asc'
            },
            include: {
                course: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                },
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                students: {
                    select: {
                        id: true,
                        name: true,
                        phone: true
                    }
                }
            }
        });

        // Cache the result for 60 seconds
        await redis.set(cacheKey, JSON.stringify(groups), "EX", 60);

        return NextResponse.json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);
        return NextResponse.json(
            { error: 'Failed to fetch groups' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['name', 'from', 'to', 'daysOfWeek', 'teacherId', 'courseId'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Create the group with single teacher connection
        const group = await prisma.groups.create({
            data: {
                name: body.name,
                course: { connect: { id: body.courseId } },
                teacher: { connect: { id: body.teacherId } }
            },
            include: {
                course: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                },
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                students: {
                    select: {
                        id: true,
                        name: true,
                        phone: true
                    }
                }
            }
        });

        // Clear the cache since data has changed
        await redis.del(cacheKey);

        return NextResponse.json(group, { status: 201 });
    } catch (error: any) {
        console.error('Error creating group:', error);

        // Handle specific Prisma errors
        if (error.code === 'P2003') {
            return NextResponse.json(
                { error: 'Invalid course or teacher ID' },
                { status: 400 }
            );
        }

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'A group with this name already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create group' },
            { status: 500 }
        );
    }
}