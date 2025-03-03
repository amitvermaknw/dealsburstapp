
import { SubscriberFormProps } from "@/utils/types/SubscriberType";
import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

type props = {
    timestamp: string,
    location: unknown,
    device: unknown
}

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_SERVICE_LOCAL : process.env.DEALSBURST_SERVICE_PROD;

export async function submitSubscribe(payload: SubscriberFormProps & props) {
    try {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (payload.semail.value.match(mailformat)) {
            const userAgent = (await headers()).get("user-agent") || "";
            const device = /mobile/i.test(userAgent) ? "Mobile" : "Desktop";
            payload.device = device;
            const result: AxiosResponse<{ msg: string }> = await axios.post<{ msg: string }>(`${baseUrl}/subscribe`, payload);
            if (result.status == 200) {
                return NextResponse.json({ status: 200, msg: result.data });
                // localStorage.setItem("is_subscribed", "true");
            } else {
                return NextResponse.json({ status: 400, msg: result.statusText });
            }
        } else {
            // toast.error("Email id is not correct");
            return NextResponse.json({ status: 400, msg: "Email id is not correct" });
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ status: 500, msg: error.message }, { status: 500 });
        }
        return NextResponse.json({ status: 500, msg: error }, { status: 500 });
    }
}