import { signInWithPopup } from "firebase/auth";
import { clientAuth, googleProvider } from "@/utils/firebaseClient";
import axios from "axios";

export const signInWithGoogle = async () => {
    try {
        const userObject = await signInWithPopup(clientAuth, googleProvider);
        const idToken = await userObject.user.getIdToken();

        // Send token to Next.js API for server-side verification
        const response = await axios.post("/api/auth/user/login", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
        });

        const data = await response.data
        if (!data.success) throw new Error("Authentication failed");

        return data.user;
    } catch (error) {
        console.error("Google sign-in error:", error);
        return null;
    }
};