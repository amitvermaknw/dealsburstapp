import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from "next/headers";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const auth = (await cookies()).get("admin_session")
    if (auth) {
        res.status(200).json({ isAuthenticated: true });
    } else {
        res.status(200).json({ isAuthenticated: false });
    }
}