import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET(request: Request) {
    // try {
    // const body = await request.json();

    const { sessionClaims, userId } = await auth()
    return NextResponse.json({
        sessionClaims,
        userId
    });

    // } catch (error: any) {
    // console.error('Clerk Test Error Details:', {
    //     status: error?.status,
    //     statusText: error?.statusText,
    //     errors: error?.errors,
    //     message: error?.message,
    //     clerkTraceId: error?.clerkTraceId,
    //     fullError: JSON.stringify(error, null, 2)
    // });

    // return NextResponse.json({
    //     success: false,
    //     error: error?.message,
    //     details: error?.errors,
    //     traceId: error?.clerkTraceId
    // }, { status: error?.status || 500 });
    // }
}