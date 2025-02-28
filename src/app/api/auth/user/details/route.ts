import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_SERVICE_LOCAL : process.env.DEALSBURST_SERVICE_PROD;

export async function POST(req: NextRequest) {
    try {
        const result: AxiosResponse<{ msg: string }> = await axios.post<{ msg: string }>(`${baseUrl}/users/signup`, req.json());
        return NextResponse.json(result);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        }
        return false;
    }
}