import { ProductListProps } from "@/utils/interface/ProductList";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_SERVICE_LOCAL : process.env.DEALSBURST_SERVICE_PROD;

export async function GET(req: NextRequest) {
    try {
        const { callType, record } = req.url as unknown as { callType: string, record: string };
        const result: AxiosResponse<ProductListProps> = await axios.get<ProductListProps>(`${baseUrl}/deals/${callType}/${record}`);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}