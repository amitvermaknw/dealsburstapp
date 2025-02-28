'use client'
import { signInWithPopup } from "firebase/auth";
import { clientAuth, googleProvider } from "@/utils/firebaseClient";
import axios from "axios";
import { uid } from "@/utils/Uid";

export const signInWithGoogle = async () => {
    try {
        const userObject = await signInWithPopup(clientAuth, googleProvider);
        const idToken = await userObject.user.getIdToken();

        const payload = {
            id: uid(),
            idToken: idToken,
            accessToken: userObject.user.refreshToken,
            displayName: userObject.user.displayName,
            email: userObject.user.email,
            emailVerified: userObject.user.emailVerified,
            isAnonymous: userObject.user.isAnonymous,
            metadata: userObject.user.metadata,
            phoneNumber: userObject.user.phoneNumber,
            photoURL: userObject.user.photoURL,
            providerId: userObject.user.providerId,
            uid: userObject.user.uid
        }

        // Send token to Next.js API for server-side verification
        const response = await axios.post("/api/auth/user/login", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.data
        if (data.status === 401)
            throw new Error("Authentication failed")

        if (data.status === 200 && data.loggedUserInfo) {
            return {
                accessToken: data.userToken,
                displayName: userObject.user.displayName,
                email: userObject.user.email,
                emailVerified: userObject.user.emailVerified,
                phoneNumber: userObject.user.phoneNumber,
                photoURL: userObject.user.photoURL,
                uid: userObject.user.uid
            }
        }
    } catch (error) {
        console.error("Google sign-in error:", error);
        return null;
    }
};