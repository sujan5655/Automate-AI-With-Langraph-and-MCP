import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "automateai-d4313.firebaseapp.com",
  projectId: "automateai-d4313",
  storageBucket: "automateai-d4313.firebasestorage.app",
  messagingSenderId: "273961081676",
  appId: "1:273961081676:web:7b0533243370bf07098de9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export default app;
