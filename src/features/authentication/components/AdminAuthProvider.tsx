'use client';
import { createContext, useState } from "react"
import { useAdminAuth } from "../hooks/useAdminAuth";
import { toast } from "react-toastify";
import { LayoutProps, ResponseType } from "@/utils/types/CommonTypes";
import { useRouter } from "next/navigation";
//import useUrlAuth from "../../../hooks/useUrlAuth";
import { UserInfo } from '@/utils/types/UserInfoType';
import { loggedInAdmin } from "../util/helper";
// import { BehaviorSubject } from "rxjs";

const defaultUser = {
    displayName: '',
    email: '',
    emailVerified: false,
    uId: ''
}

const defaultValues = {
    user: defaultUser,
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
    const [user, setUser] = useState<UserInfo>(defaultUser);
    const [alertMsg, setAlert] = useState<string>('')
    const router = useRouter();
    const [authenticate, removeToken] = useAdminAuth();

    const loginAction = async (data: { email: string, password: string }): Promise<ResponseType> => {
        try {
            const response: { code: number; msg: string; } | { error: string } = await authenticate(data);
            if (isErrorResponse(response)) {
                setAlert(response.error as string);
                toast.error(response.error);
                return ({ code: 500, msg: "error" });
            }

            const adminInfo: UserInfo = {
                displayName: 'Admin',
                email: data.email,
                emailVerified: true,
                uId: (Math.floor(Math.random() * 200)).toString()
            }

            loggedInAdmin.next(adminInfo);
            setUser(adminInfo);
            router.push("/dashboard");
            return ({ code: 200, msg: "success" });

        } catch (err) {
            if (err instanceof Error) {
                setAlert(err.message as string);
                toast.error(err.message);
                return ({ code: 500, msg: "error" });
            }
            toast.error("Error while login");
            return ({ code: 500, msg: "error" });

        }
    }

    const logOut = () => {
        setUser(defaultUser);
        localStorage.removeItem("token");
        removeToken()
        router.push("/login");
        toast("Logged out successfully");
    }

    return (
        <AdminAuthContext.Provider value={{ user, loginAction, logOut, alertMsg }}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export default AdminAuthProvider;

export const loggedInAdmin$ = loggedInAdmin.asObservable(); 