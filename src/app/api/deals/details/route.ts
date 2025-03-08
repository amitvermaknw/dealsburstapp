import { ProductListProps } from "@/utils/types/ProductList";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_SERVICE_LOCAL : process.env.DEALSBURST_SERVICE_PROD;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const pId = searchParams.get("pId");
        const result: AxiosResponse<ProductListProps> = await axios.get<ProductListProps>(`${baseUrl}/deals/product/details/${pId}`);
        if (result.hasOwnProperty("data")) {
            if (result.data.length) {
                return NextResponse.json(result.data);
            }
        }
        return NextResponse.json({ status: 400, msg: "No Result found" });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return "error";
    }
}