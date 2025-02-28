import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();


const firebaseConfig = {
    apiKey: publicRuntimeConfig.firebaseApiKey,
    authDomain: publicRuntimeConfig.firebaseAuthDomain
}

initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const clientAuth = getAuth();

export { clientAuth, googleProvider };