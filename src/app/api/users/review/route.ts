import { UserToken } from "@/features/authentication/Interface/userTokenInterface";
import { DealsReview } from "@/utils/interface/DealReview";
import axios, { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_SERVICE_LOCAL : process.env.DEALSBURST_SERVICE_PROD;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const callType = searchParams.get("callType");
        const record = searchParams.get("record");

        const matchingDocs: UserToken | null = await sessionStorage.getItem("loggedInUser");

        const payload = {
            userId: searchParams.get("userId"),
            dealsId: searchParams.get("dealsId"),
            page: searchParams.get("page"),
            state: searchParams.get("state")
        }
        const result: AxiosResponse<Array<DealsReview>> = await axios.post<Array<DealsReview>>(`${baseUrl}/deals/comments`, payload, { headers: { Authorization: matchingDocs?.accessToken, uid: searchParams.get("userId") } });
        if (result.status === 200) {
            return NextResponse.json(result.data);
        }

        return NextResponse.json({ status: 400, msg: "No Result found" });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return "error";
    }
}