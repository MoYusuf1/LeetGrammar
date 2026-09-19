import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';

// Firebase web configuration is public by design. Keep environment overrides for
// previews, but never ship a production build with authentication silently
// disabled because an environment variable was omitted.
const config: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAdwxw00X4RQ4IHU6T2342ycK3sEN26Ewo',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'leetgrammar.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'leetgrammar',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'leetgrammar.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '996693291000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:996693291000:web:6df8b87c868f800fe4b00d',
};

export const firebaseConfigured = Object.values(config).every(Boolean);
const app = firebaseConfigured ? initializeApp(config) : undefined;
export const auth = app ? getAuth(app) : undefined;
export const db = app
  ? initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    })
  : undefined;
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
