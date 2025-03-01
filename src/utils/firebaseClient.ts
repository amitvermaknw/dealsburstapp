import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
}

initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const clientAuth = getAuth();

export { clientAuth, googleProvider };