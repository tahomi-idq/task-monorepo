import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authCookieName } from "./constants";

export function middleware(request: NextRequest) {

    if(request.url.indexOf("/login") !== -1 ) {
        return NextResponse.next();
    }

    // if(isAuthenticated(request)) {
    //     return NextResponse.next();
    // }

    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
      ],
}