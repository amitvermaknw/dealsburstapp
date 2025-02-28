import { UserToken } from "./userTokenInterface";

export interface AuthContextType {
    userInfo: UserToken;
    signIn: () => Promise<boolean>;
    logOut: () => void;
}