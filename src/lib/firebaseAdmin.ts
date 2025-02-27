import * as admin from 'firebase-admin';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_PUBLIC_FIREBASE_PROJECT_ID : serverRuntimeConfig.DEALSBURST_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_PRIVATE_FIREBASE_CLIENT_EMAIL : serverRuntimeConfig.DEALSBURST_PRIVATE_FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.NODE_ENV === 'development' ? process.env.DEALSBURST_PRIVATE_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") : serverRuntimeConfig.DEALSBURST_PRIVATE_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
        })
    })
}

export const adminAuth = admin.auth();