import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, type Firestore } from 'firebase/firestore';
import { decodeProgressDocument, PROGRESS_COLLECTION, PROGRESS_SCHEMA_VERSION } from '@/domain/progress/document';
import type { UserProgress } from '@/domain/progress/types';
import type { ProgressRepository } from '@/application/sync/ports';

export class FirestoreProgressRepository implements ProgressRepository {
  private readonly firestore: Firestore;
  private readonly userId: string;

  constructor(firestore: Firestore, userId: string) {
    this.firestore = firestore;
    this.userId = userId;
  }

  private reference() { return doc(this.firestore, PROGRESS_COLLECTION, this.userId); }

  async load(): Promise<UserProgress | undefined> {
    const snapshot = await getDoc(this.reference());
    return snapshot.exists() ? decodeProgressDocument(snapshot.data()) : undefined;
  }

  save(progress: UserProgress): Promise<void> {
    return setDoc(this.reference(), {
      schemaVersion: PROGRESS_SCHEMA_VERSION,
      progress,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }

  watch(apply: (progress: UserProgress, fromCache: boolean) => void, fail: () => void): () => void {
    return onSnapshot(this.reference(), { includeMetadataChanges: true }, (snapshot) => {
      if (!snapshot.exists() || snapshot.metadata.hasPendingWrites) return;
      try {
        apply(decodeProgressDocument(snapshot.data()), snapshot.metadata.fromCache);
      } catch {
        fail();
      }
    }, fail);
  }
}
