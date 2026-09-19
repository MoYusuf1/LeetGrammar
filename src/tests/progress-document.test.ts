import { describe, expect, it } from 'vitest';
import {
  decodeProgressDocument,
  InvalidProgressDocumentError,
  PROGRESS_SCHEMA_VERSION,
} from '@/domain/progress/document';
import { defaultProgress } from '@/domain/progress/types';

const document = (progress: unknown = defaultProgress) => ({
  schemaVersion: PROGRESS_SCHEMA_VERSION,
  progress,
  updatedAt: 'adapter-owned',
});

describe('progress document decoder', () => {
  it('accepts the complete schema v8 progress shape', () => {
    expect(decodeProgressDocument(document())).toEqual(defaultProgress);
  });

  it.each([7, 9, undefined])('rejects unsupported schema version %s', (schemaVersion) => {
    expect(() => decodeProgressDocument({ ...document(), schemaVersion })).toThrow(InvalidProgressDocumentError);
  });

  it('rejects malformed remote fields before they reach merge logic', () => {
    expect(() => decodeProgressDocument(document({ ...defaultProgress, streak: 'three' })))
      .toThrow('invalid shape');
  });

});
