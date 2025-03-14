import { UserInfo } from "@/utils/types/UserInfoType";
import { BehaviorSubject } from "rxjs";

export const loggedInAdmin = new BehaviorSubject<UserInfo>({
    displayName: '',
    email: '',
    emailVerified: false,
    uId: ''
});