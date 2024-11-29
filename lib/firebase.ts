import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getFunctions } from 'firebase/functions';
import { getMessaging } from 'firebase/messaging';

export type firebaseConfig = {
  apiKey: "AIzaSyBBwlMc6lGz2Ic3h1JlwXSt5QmojNASX28",
  authDomain: "fetchchat-425d1.firebaseapp.com",
  projectId: "fetchchat-425d1",
  storageBucket: "fetchchat-425d1.firebasestorage.app",
  messagingSenderId: "160306174123",
  appId: "1:160306174123:web:27419bda7b4369f87b7fee",
  measurementId: "G-XQNRSKT5MY"
};

let firebaseApp = getApps().length ? getApps()[0] : null;

export const initializeFirebase = (config: FirebaseConfig) => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(config);
  }
  return firebaseApp;
};

export const getFirebaseServices = () => {
  if (!firebaseApp) throw new Error('Firebase not initialized');

  return {
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    database: getDatabase(firebaseApp),
    functions: getFunctions(firebaseApp),
    messaging: typeof window !== 'undefined' ? getMessaging(firebaseApp) : null,
  };
};