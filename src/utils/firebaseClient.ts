import { algoliasearch } from "algoliasearch";
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
}

initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const clientAuth = getAuth();

const algoliaSearchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
)

export { clientAuth, googleProvider, algoliaSearchClient };