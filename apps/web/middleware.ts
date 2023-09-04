import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isApiAuthenticated, isAuthenticated } from "./lib/auth/auth";

export async function middleware(request: NextRequest) {
    if(request.nextUrl.pathname.startsWith('/api/graphql')){
        if(await isApiAuthenticated(request)){
            return NextResponse.next();
        } else {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'authentication failed' }),
                { status: 401, headers: { 'content-type': 'application/json' } }
              )
        }
    }

    if(request.nextUrl.pathname.startsWith('/login') 
    || request.nextUrl.pathname.startsWith('/register')
    || request.nextUrl.pathname.startsWith('/api/auth')
    || request.nextUrl.pathname.startsWith('/api/register')) {
        return NextResponse.next();
    }

    if(await isAuthenticated(request)) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
      ],
}