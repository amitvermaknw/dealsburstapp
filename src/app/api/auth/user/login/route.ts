import { adminAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";


const baseUrl = process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_SERVICE_LOCAL : process.env.DEALSBURST_SERVICE_PROD;

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

        let loggedUserInfo = false;
        const result: AxiosResponse<{ msg: string }> = await axios.post<{ msg: string }>(`${baseUrl}/users/signup`, req.json());
        if (result.status === 200) {
            loggedUserInfo = true
        }

        return NextResponse.json({ staus: 200, userToken: decodeToken, loggedUserInfo: loggedUserInfo });

    } catch (error) {
        return NextResponse.json({ status: 401, error: error })
    }
} 