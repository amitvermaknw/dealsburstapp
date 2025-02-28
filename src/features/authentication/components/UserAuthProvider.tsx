import { createContext, useState } from "react"
import { toast } from 'react-toastify';
import { UserToken } from "../Interface/userTokenInterface";
import localForage from 'localforage';
import { useRouter } from "next/router";
import { signInWithGoogle } from "@/services/googleAuthProvider";
import { AuthContextType } from "../Interface/AuthContextType";
import { LayoutProps } from "@/utils/types/CommonTypes";

const defaultValue = {
    userInfo: {
        uId: '',
        accessToken: '',
        displayName: '',
        email: '',
        emailVerified: false,
        phoneNumber: '',
        photoURL: '',
    },
    signIn: (): Promise<boolean> => Promise.resolve(false),
    logOut: () => { }
};

export const UserAuthContext = createContext<AuthContextType>(defaultValue);

const UserAuthProvider = ({ children }: LayoutProps) => {
    const [userInfo, setUserInfo] = useState<UserToken>(() => {
        const storedUserToken = localStorage.getItem('loggedInUser')
        return storedUserToken ? JSON.parse(storedUserToken) as UserToken : {} as UserToken
    });
    const router = useRouter();

    const signIn = async (): Promise<boolean> => {
        try {
            const userObject = await signInWithGoogle();
            if (userObject) {
                const userInfoObject = {
                    uId: userObject.uid,
                    accessToken: userObject.accessToken,
                    displayName: userObject.displayName || "",
                    email: userObject.email || "",
                    emailVerified: userObject.emailVerified || false,
                    phoneNumber: userObject.phoneNumber || '',
                    photoURL: userObject.photoURL || '',
                }
                setUserInfo(userInfoObject);
                await localForage.setItem("loggedInUser", userInfoObject);
                localStorage.setItem("loggedInUser", JSON.stringify(userInfoObject));
                return true;
            } else {
                toast.error("Not able to varify user details");
                localStorage.removeItem("loggedInUser");
            }
            return false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
            return false;
        }
    };

    const logOut = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUserInfo({} as UserToken);
        router.push("/login");
        toast("Logged out successfully");
        setTimeout(() => window.location.reload(), 500);
    }

    return (
        <UserAuthContext.Provider value={{ userInfo, signIn, logOut }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthProvider;