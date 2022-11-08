/* eslint-disable import/no-duplicates */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from 'frontend/config';

const firebaseApp = initializeApp(FIREBASE_CONFIG);

export const authInstance = getAuth(firebaseApp);
export const databaseInstance = getDatabase(firebaseApp);
export const fireStoreInstance = getFirestore(firebaseApp);
