import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ name: string }> }
) {
    try {
        const { name } = await params
        // Check if subject has courses
        const coursesCount = await prisma.course.count({
            where: {
                subject: {
                    name
                }
            }
        });

        if (coursesCount > 0) {
            return NextResponse.json(
                { error: 'Cannot delete subject with associated courses. Please remove courses first.' },
                { status: 400 }
            );
        }

        // Check if subject has teachers
        const teachersCount = await prisma.teacher.count({
            where: {
                subjects: {
                    some: { name }
                }
            }
        });

        if (teachersCount > 0) {
            return NextResponse.json(
                { error: 'Cannot delete subject with associated teachers. Please remove teachers first.' },
                { status: 400 }
            );
        }

        const subj = await prisma.subject.findFirst({
            where: {
                name
            }
        })

        await prisma.subject.delete({
            where: {
                id: subj?.id
            }
        });

        return NextResponse.json(
            { message: 'Subject deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        logger.error('Error deleting subject:', error);
        return NextResponse.json(
            { error: 'Failed to delete subject' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ name: string }> }
) {
    try {
        const body = await request.json();
        const { newName } = body;
        const { name } = await params

        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            );
        }

        const sub=await prisma.subject.findFirst({
            where:{
                name
            }
        })

        if(!sub){
            return NextResponse.json(
                { error: 'Subject with this name not found' },
                { status: 400 }
            );
        }

        const subject = await prisma.subject.update({
            where: { id:sub?.id },
            data: { name:newName }
        });

        return NextResponse.json(subject);
    } catch (error) {
        logger.error(`Error updating subject: ${error}`);
        return NextResponse.json(
            { error: 'Failed to update subject' },
            { status: 500 }
        );
    }
}