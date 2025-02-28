import { adminAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();
        const decodeToken = await adminAuth.verifyIdToken(idToken);

        (await cookies()).set({
            name: "user_session",
            value: idToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 27 * 7,
            path: "/"
        });
        return NextResponse.json({ success: true, user: decodeToken });

    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 401 })
    }
} 