import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    console.log(`Middleware Intercepting: ${pathname}`);

    if (pathname.startsWith("/api/")) {
        const token = req.headers.get("authorixaation");

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