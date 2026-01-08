import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        const cameFrom = await prisma.cameFrom.findMany()
        return NextResponse.json(cameFrom)
    } catch (error) {
        return NextResponse.json("Error fetching came froms. \n" + error)
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const { name } = await req.json()
        await prisma.cameFrom.create({
            data: {
                name
            }
        })
        return NextResponse.json({ success: true, error: false })
    } catch (error) {
        return NextResponse.json({ errors: "Error creating came froms. \n" + error, success: true, error: false })

    }
}