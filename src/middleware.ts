import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    console.log(`Middleware Intercepting: ${pathname}`);

    const session = req.cookies.get("user_session");

    if (pathname.startsWith("/api/dashboard") && !session) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/admin/login")) {
        const token = req.headers.get("Authorization");


        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // const modifiedHeaders = new Headers(req.headers);
        // modifiedHeaders.set("X-Custom-Header", "middleware-intercepted");

        // return NextResponse.next({
        //     request: {
        //         headers: modifiedHeaders,
        //     },
        // });

    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*"]
}