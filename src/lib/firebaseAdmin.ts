import * as admin from 'firebase-admin';


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NODE_ENV
        })
    })
}