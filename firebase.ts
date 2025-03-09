// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoNLo3day_0WtBzLAdHR2jD8zB1-wZw4A",
  authDomain: "studymat-33d40.firebaseapp.com",
  projectId: "studymat-33d40",
  storageBucket: "studymat-33d40.firebasestorage.app",
  messagingSenderId: "152650986047",
  appId: "1:152650986047:web:55cba4f2b8fc109faabe8a",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
