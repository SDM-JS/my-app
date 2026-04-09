import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ name: string }> }
) {
    try {
        const { name } = await params;

        if (!name) {
            return NextResponse.json(
                { error: 'Student ID is required' },
                { status: 400 }
            );
        }
        const stud=await prisma.student.findFirst({
            where:{
                name
            }
        })
        if(!stud){
            return NextResponse.json(
                { error: 'Student with this name not found' },
                { status: 400 }
            );
        }
        await prisma.payments.deleteMany({
            where: {
                studentId: stud.id
            }
        })
        await prisma.student.delete({
            where: { id:stud.id }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        logger.error(`Error deleting student: ${error}`);

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