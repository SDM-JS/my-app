import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    try {
        const { name } = await params

        if (!name) {
            return NextResponse.json(
                { error: "Source id is required!" },
                { status: 400 }
            )
        }
        const source=await prisma.cameFrom.findFirst({
            where:{
                name
            }
        })
        if(!source){
            return NextResponse.json({
                error:"Source with this name does'nt found",
                status:400
            })
        }
        
        await prisma.cameFrom.delete({
            where: {
                id:source?.id
            }
        })
        return NextResponse.json({ message: "Source deleted successfully!" })
    } catch (error) {
        logger.error(`Error deleting source: ${error}`);
        return NextResponse.json(
            { error: 'Failed to delete source' },
            { status: 500 }
        )
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

        const sor=await prisma.cameFrom.findFirst({
            where:{
                name
            }
        })

        if(!sor){
            return NextResponse.json(
                { error: 'Subject with this name not found' },
                { status: 400 }
            );
        }

        const source = await prisma.cameFrom.update({
            where: { id:sor?.id },
            data: { name:newName }
        });

        return NextResponse.json(source);
    } catch (error) {
        logger.error(`Error updating source: ${error}`);
        return NextResponse.json(
            { error: 'Failed to update source' },
            { status: 500 }
        );
    }
}