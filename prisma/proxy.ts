import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type RouteAccessMap = {
    [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
    "/admin/dashboard": ["admin"],
    "/admin(.*)": ["admin"],
    "/teacher/dashboard": ["teacher"],
    "/teacher(.*)": ["teacher"],
    "/attendances": ["admin", "teacher"],
    "/lessons": ["admin", "teacher"],
    "/groups": ["admin", "teacher"],
    "/students": ["admin", "teacher"],
    "/subjects": ["admin"],
    "/courses": ["admin"],
    "/payments": ["admin"],
    "/statistics": ["admin"],
    "/settings": ["admin"],
};

// Public routes that should bypass all checks
const publicRoutes = [
    '/',
    '/api/.*'  // Allow API routes (adjust as needed)
];

export default clerkMiddleware(async (auth, req: NextRequest) => {
    const { userId, orgRole } = await auth();
    const pathname = req.nextUrl.pathname;

    // Check if route is public
    const isPublicRoute = publicRoutes.some(route => {
        const regex = new RegExp(`^${route.replace('.*', '.*')}$`);
        return regex.test(pathname);
    });

    if (isPublicRoute) {
        return NextResponse.next();
    }

    // If no user ID, redirect to sign-in
    if (!userId) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    console.log('UserId:', userId);
    console.log('OrgRole:', orgRole);
    console.log('Pathname:', pathname);

    // Check route access
    let hasAccess = false;
    let requiredRoles: string[] = [];

    for (const route in routeAccessMap) {
        const regex = new RegExp(`^${route}$`);

        if (regex.test(pathname)) {
            requiredRoles = routeAccessMap[route];
            hasAccess = orgRole ? requiredRoles.includes(orgRole) : false;
            break;
        }
    }

    // If no specific route rule matches, allow access
    if (requiredRoles.length === 0) {
        return NextResponse.next();
    }

    // Deny access if user doesn't have required role
    if (!hasAccess) {
        console.log('Access denied. Required roles:', requiredRoles, 'User role:', orgRole);

        // Redirect based on user's actual role
        let redirectPath = "/";

        if (orgRole === 'admin') {
            redirectPath = "/admin";
        } else if (orgRole === 'teacher') {
            redirectPath = "/teacher";
        }

        // Prevent redirect loop by checking if we're already on the redirect page
        if (pathname !== redirectPath) {
            return NextResponse.redirect(new URL(redirectPath, req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}