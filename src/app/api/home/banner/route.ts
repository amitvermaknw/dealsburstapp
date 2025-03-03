
import { BannerListProps } from "@/utils/types/BannerType";
import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_SERVICE_LOCAL : process.env.DEALSBURST_SERVICE_PROD;

export async function getBanner(callType: string, record: number) {
    try {
        const result: AxiosResponse<BannerListProps[]> = await axios.get<BannerListProps[]>(`${baseUrl}/banner/${callType}/${record}`);
        if (result.status === 200) {
            return NextResponse.json({ status: 200, msg: result.data });
        }
        return NextResponse.json({ status: 400, msg: result.statusText });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ status: 500, msg: error.message }, { status: 500 });
        }

        return NextResponse.json({ status: 500, msg: error }, { status: 500 });
    }
}