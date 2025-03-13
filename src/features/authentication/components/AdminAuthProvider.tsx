import { createContext, useState } from "react"
import { useAdminAuth } from "../hooks/useAdminAuth";
import { toast } from "react-toastify";
import { LayoutProps, ResponseType } from "@/utils/types/CommonTypes";
import { useRouter } from "next/router";
//import useUrlAuth from "../../../hooks/useUrlAuth";

const defaultValues = {
    token: '',
    user: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginAction: (_data: { email: string, password: string }): Promise<ResponseType> => { return Promise.resolve({ code: 200, msg: "default" }) },
    logOut: () => { },
    alertMsg: ''
};



function isErrorResponse(response: { code: number; msg: string; } | { error: string }): response is { error: string } {
    return (response as { error: string }).error !== undefined;
}

type AuthenticatedUser = typeof defaultValues
export const AdminAuthContext = createContext<AuthenticatedUser>(defaultValues);

const AdminAuthProvider = ({ children }: LayoutProps) => {
    const [user, setUser] = useState<string>('');
    const [token, setToken] = useState<string>(localStorage.getItem('token') as string);
    const [alertMsg, setAlert] = useState<string>('')
    const router = useRouter();
    const [authenticate, removeToken] = useAdminAuth();

    const loginAction = async (data: { email: string, password: string }): Promise<ResponseType> => {
        try {
            const response: { code: number; msg: string; } | { error: string } = await authenticate(data);
            if (isErrorResponse(response)) {
                setAlert(response.error as string);
                return ({ code: 500, msg: "error" });
            }
            setToken(response.msg as string)
            router.push("/dashboard")
            return ({ code: 200, msg: "success" });

        } catch (err) {
            if (err instanceof Error) {
                setAlert(err.message as string);
                return ({ code: 500, msg: "error" });
            }
            return ({ code: 500, msg: "error" });

        }
    }

    const logOut = () => {
        setUser('');
        setToken('');
        localStorage.removeItem("token");
        removeToken()
        router.push("/login");
        toast("Logged out successfully");
    }

    return (
        <AdminAuthContext.Provider value={{ token, user, loginAction, logOut, alertMsg }}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export default AdminAuthProvider;