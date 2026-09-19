# Backend architecture

LeetGrammar has no standalone server. Its backend surface is Firebase Authentication,
Cloud Firestore, and local-first client domain logic.

## Boundaries

- `src/domain/progress/`: persisted progress types, schema version, and runtime decoder.
  This layer has no Firebase or React dependency.
- `src/application/sync/`: ports that describe progress persistence and store access.
- `src/infrastructure/firebase/`: Firebase config/client initialization and the Firestore
  repository adapter. Untrusted Firestore data is decoded here before entering the domain.
- `src/lib/sync-engine.ts`: synchronization orchestration over injected edges. It owns the
  first-sign-in merge, remote-echo guard, lifecycle, and sync-state transitions.
- `src/contexts/AuthSyncContext.tsx`: thin React/auth/browser wiring.
- `src/stores/progress-store.ts`: local Zustand state and learner commands. Persisted type
  ownership lives in the domain layer; the old type exports remain for compatibility.

## Persisted contract

- Firestore path: `/users/{firebaseAuthUid}`
- Document fields: `schemaVersion`, `progress`, `updatedAt`
- Current schema: `8`
- Local storage key: `leet-somali-progress-v8`

There is no migration in this architecture pass. The Firestore path, document shape, local
storage key, and field merge rules are unchanged. `firestore.rules` denies non-owners,
unknown top-level fields, and any schema other than v8. The runtime decoder independently
rejects malformed or unsupported remote documents.

## Offline and sync behavior

Firestore uses persistent multi-tab cache. Zustand remains the immediate local source so the
learning flow works without a network. On sign-in, local and remote progress merge field by
field, the merged snapshot is saved, and later local or server changes stay synchronized.
Snapshots with pending writes are local echoes and are not re-applied as remote state.

## Verification

`pnpm gates` runs TypeScript/build, Vitest, course validation, and lint. Contract tests pin
runtime schema v8 to the checked-in Firestore rule and test malformed remote-data rejection.
A signed-in production check is still required to prove deployed rules/configuration match the
repository and that a real account can round-trip progress.

## Official references

- Rules conditions and `request.resource`: https://firebase.google.com/docs/firestore/security/rules-conditions
- Field allowlists with `hasOnly`: https://firebase.google.com/docs/firestore/security/rules-fields
- Web offline persistence and multi-tab cache: https://firebase.google.com/docs/firestore/manage-data/enable-offline
- Snapshot metadata and pending writes: https://firebase.google.com/docs/firestore/query-data/listen
- Firestore emulator/rules testing: https://firebase.google.com/docs/emulator-suite/connect_firestore
