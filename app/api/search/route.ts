import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.query) {
            return NextResponse.json(
                { error: 'Query is required!' },
                { status: 400 }
            );
        }

        const [teachers, students] = await Promise.all([
            prisma.teacher.findMany({
                where: {
                    name: {
                        contains: body.query,
                        mode: 'insensitive',
                    }
                },
                take: 5,
            }),
            prisma.student.findMany({
                where: {
                    name: {
                        contains: body.query,
                        mode: 'insensitive',
                    }
                },
                take: 5,
            }),
        ]);

        return NextResponse.json({ teachers, students }, { status: 200 });
    } catch (error: any) {
        logger.error(`Error searching: ${error}`);

        return NextResponse.json(
            { error: 'Failed to search' },
            { status: 500 }
        );
    }
}