import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check if Firebase config is properly set
const isFirebaseConfigValid = (): boolean => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];

  for (const field of requiredFields) {
    const value = firebaseConfig[field as keyof typeof firebaseConfig];
    if (value === undefined || value === null || value === '') {
      console.error(`Firebase configuration is missing required field: ${field}`);
      return false;
    }
  }

  return true;
};

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;

try {
  if (isFirebaseConfigValid()) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('Firebase initialized successfully');
  } else {
    console.error('Firebase initialization skipped due to invalid configuration');
    // Create a mock db object for development if Firebase is not configured
    // Using type assertion is necessary here as we can't create a full Firestore implementation
    db = {} as unknown as Firestore;
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Create a mock db object for development if Firebase initialization fails
  // Using type assertion is necessary here as we can't create a full Firestore implementation
  db = {} as unknown as Firestore;
}

export { db };
