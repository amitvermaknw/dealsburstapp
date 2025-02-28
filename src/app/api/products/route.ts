import { ProductListProps } from "@/utils/interface/ProductList";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_SERVICE_LOCAL : process.env.DEALSBURST_SERVICE_PROD;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const callType = searchParams.get("callType");
        const record = searchParams.get("record");
        console.log("callType", req.url)
        // return NextResponse.json({ status: 200, callType: callType, record: record })
        const result: AxiosResponse<ProductListProps> = await axios.get<ProductListProps>(`${baseUrl}/deals/${callType}/${record}`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}