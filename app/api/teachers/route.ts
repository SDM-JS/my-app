import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';

const ORGANIZATION_ID = process.env.CLERK_ORG_ID!;
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

        if (!body.name || !body.phone || !body.email || !body.birthday || !body.password) {
            return NextResponse.json(
                { error: "Name, phone, email, password and birthday are required" },
                { status: 400 }
            );
        }

        const client = await clerkClient();

        // 1️⃣ First, check if organization exists
        try {
            const org = await client.organizations.getOrganization({
                organizationId: ORGANIZATION_ID,
            });
            console.log('Organization found:', org.name);
        } catch (orgError: any) {
            console.error('Organization error:', orgError);
            return NextResponse.json(
                {
                    error: "Organization not found",
                    details: `Organization ID ${ORGANIZATION_ID} is invalid or you don't have access`,
                    suggestion: "Check your .env.local file for CLERK_ORG_ID"
                },
                { status: 404 }
            );
        }
        console.log(body)
        // 2️⃣ Create Clerk User
        const user = await client.users.createUser({
            emailAddress: [body.email],
            password: body.password,
        });



        console.log('User created:', user.id);

        // 3️⃣ Add user to Organization as TEACHER
        try {
            const membership = await client.organizations.createOrganizationMembership({
                organizationId: ORGANIZATION_ID,
                userId: user.id,
                role: "org:teacher", // Note: try with "org:" prefix
            });
            console.log('Membership created:', membership);
        } catch (membershipError: any) {
            console.error('Membership error:', membershipError);

            // If membership fails, delete the user to avoid orphaned accounts
            await client.users.deleteUser(user.id);

            return NextResponse.json(
                {
                    error: "Failed to add user to organization",
                    details: membershipError?.errors?.[0]?.message || membershipError?.message,
                    suggestion: "Check if the user already exists in the organization"
                },
                { status: 400 }
            );
        }

        // 4️⃣ Save teacher in DB
        const teacher = await prisma.teacher.create({
            data: {
                id: user.id, // Clerk User ID
                name: body.name,
                phone: body.phone,
                email: body.email,
                birthday: new Date(body.birthday),
                avatarUrl: body.avatarUrl,
                subjects: {
                    connect: body.subjectIds?.map((id: string) => ({ id })) || [],
                },
            },
            include: {
                subjects: true,
            },
        });

        return NextResponse.json(teacher, { status: 201 });
    } catch (error: any) {
        console.error("Error creating teacher:", error);

        return NextResponse.json(
            {
                error: "Failed to create teacher",
                details: error?.errors?.[0]?.message || error?.message,
                clerkErrorCode: error?.code,
                clerkStatus: error?.status,
            },
            { status: 500 }
        );
    }
}