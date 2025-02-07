// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "course-generator-ai-a4de7.firebaseapp.com",
  projectId: "course-generator-ai-a4de7",
  storageBucket: "course-generator-ai-a4de7.firebasestorage.app",
  messagingSenderId: "958765817551",
  appId: "1:958765817551:web:cd9ac5540f5851ec9161ba",
  measurementId: "G-4VXHK4VL8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage=getStorage(app);