import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();


const firebaseConfig = {
    apiKey: process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_PUBLIC_FIREBASE_API_KEY : serverRuntimeConfig.DEALSBURST_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_PUBLIC_FIREBASE_AUTH_DOMAIN : serverRuntimeConfig.DEALSBURST_PUBLIC_FIREBASE_AUTH_DOMAIN,
}

initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const clientAuth = getAuth();

export { clientAuth, googleProvider };