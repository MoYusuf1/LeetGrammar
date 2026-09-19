import { describe, expect, it } from 'vitest';
import { getFirebaseConfig } from '@/infrastructure/firebase/config';

describe('Firebase configuration', () => {
  it('uses an isolated project supplied by preview environment variables', () => {
    const config = getFirebaseConfig({
      VITE_FIREBASE_API_KEY: 'preview-key',
      VITE_FIREBASE_AUTH_DOMAIN: 'preview.example',
      VITE_FIREBASE_PROJECT_ID: 'preview-project',
      VITE_FIREBASE_STORAGE_BUCKET: 'preview-bucket',
      VITE_FIREBASE_MESSAGING_SENDER_ID: '123',
      VITE_FIREBASE_APP_ID: 'preview-app',
    } as unknown as ImportMetaEnv);
    expect(config).toEqual({
      apiKey: 'preview-key', authDomain: 'preview.example', projectId: 'preview-project',
      storageBucket: 'preview-bucket', messagingSenderId: '123', appId: 'preview-app',
    });
  });

  it('keeps the production project usable when Vercel has no overrides', () => {
    expect(getFirebaseConfig({} as unknown as ImportMetaEnv).projectId).toBe('leetgrammar');
  });
});
