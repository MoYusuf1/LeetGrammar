import type { FirebaseOptions } from 'firebase/app';

const productionDefaults: FirebaseOptions = {
  apiKey: 'AIzaSyAdwxw00X4RQ4IHU6T2342ycK3sEN26Ewo',
  authDomain: 'leetgrammar.firebaseapp.com',
  projectId: 'leetgrammar',
  storageBucket: 'leetgrammar.firebasestorage.app',
  messagingSenderId: '996693291000',
  appId: '1:996693291000:web:6df8b87c868f800fe4b00d',
};

/** Public Firebase web identifiers. Environment variables permit isolated preview projects. */
export function getFirebaseConfig(env: ImportMetaEnv = import.meta.env): FirebaseOptions {
  return {
    apiKey: env.VITE_FIREBASE_API_KEY || productionDefaults.apiKey,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || productionDefaults.authDomain,
    projectId: env.VITE_FIREBASE_PROJECT_ID || productionDefaults.projectId,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || productionDefaults.storageBucket,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || productionDefaults.messagingSenderId,
    appId: env.VITE_FIREBASE_APP_ID || productionDefaults.appId,
  };
}
