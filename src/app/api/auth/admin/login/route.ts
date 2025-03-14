import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";


const baseUrl = process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_SERVICE_LOCAL : process.env.DEALSBURST_SERVICE_PROD;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json();
        const result: AxiosResponse<{ token: string, msg?: string }> = await axios.post<{ token: string, msg?: string }>(`${baseUrl}/login`, formData);
        if (result.status === 200) {
            (await cookies()).set({
                name: "admin_session",
                value: result.data.token,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 27 * 7,
                path: "/"
            });


            const addAdminData: AxiosResponse<{ msg: string }> = await axios.post<{ msg: string }>(`${baseUrl}/admintoken`, {
                token: result.data.token,
                status: true,
                timestamp: new Date().toISOString()
            });

            if (addAdminData.status === 200) {
                return NextResponse.json({ staus: 200, msg: "logged In" });
            } else {
                return NextResponse.json({ staus: 200, msg: "logged In, But issue while adding admin data in db" });
            }
        } else {
            return NextResponse.json({ staus: 200, msg: result.data.msg });
        }

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ status: 401, error: error.message })
        }

        return NextResponse.json({ status: 401, error: error })

    }
}
