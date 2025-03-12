import { UserToken } from "./userTokenInterface";

export interface AuthContextType {
    setUserSchema(): unknown;
    userInfo: UserToken;
    signIn: () => Promise<boolean>;
    logOut: () => void;
}