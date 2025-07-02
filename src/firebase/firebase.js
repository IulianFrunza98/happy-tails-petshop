import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4PaSIw8E5pX7wO0YILEXGaadwL6mLDOg",
  authDomain: "happy-tails-f26e5.firebaseapp.com",
  projectId: "happy-tails-f26e5",
  storageBucket: "happy-tails-f26e5.firebasestorage.app",
  messagingSenderId: "204709549678",
  appId: "1:204709549678:web:23d7385973ab237ed4b87f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
