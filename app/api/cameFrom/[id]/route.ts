import logger from "@/lib/logger"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const body = await request.json()

        if (!id) {
            NextResponse.json({
                error: "Source id is required!",
                status: 400
            })
        }
        const source = await prisma.cameFrom.update({
            where: {
                id
            },
            data: {
                name: body.name
            }
        })
        return NextResponse.json(source);
    } catch (error) {
        logger.error(`Error updating cameFrom: ${error}`);
        return NextResponse.json(
            { error: 'Failed to update cameFrom' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params

        if (!id) {
            NextResponse.json({
                error: "Source id is required!",
                status: 400
            })
        }
        await prisma.cameFrom.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: "Source deleted successfully!" })
    } catch (error) {
        logger.error(`Error deleting cameFrom: ${error}`);
        return NextResponse.json(error)
    }
}