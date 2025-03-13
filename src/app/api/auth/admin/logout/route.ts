import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_SERVICE_LOCAL : process.env.DEALSBURST_SERVICE_PROD;

export async function DELETE() {
    try {
        const result: AxiosResponse<{ token: string, msg?: string }> = await axios.post<{ token: string, msg?: string }>(`${baseUrl}/admintoken`, {
            status: false,
            timestamp: new Date().toISOString()
        }
        );
        if (result.status === 200) {
            (await cookies()).delete("admin_session");
            return NextResponse.json({ staus: 200, message: "Admin session removed" });
        } else {
            return NextResponse.json({ staus: 200, message: result.data.msg });
        }

    } catch (error) {
        return NextResponse.json({ status: 401, error: error })
    }
} 