import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';


export async function GET() {
    const auth = (await cookies()).get("admin_session")?.value;
    if (auth) {
        const decode = jwt.verify(auth, process.env.JWT_SECRET!)
        return NextResponse.json({ code: 200, isAuthenticated: true, msg: decode }, { status: 200 });
    } else {
        return NextResponse.json({ code: 500, error: "Unauthorized" }, { status: 401 });
    }
}