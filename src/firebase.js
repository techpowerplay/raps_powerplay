// src/firebase.js

// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Direct Firebase config (your actual credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDeqzYMXRIQfu_Np9UT_sBWcCd46GjWe5w",
  authDomain: "raps-powerplay.firebaseapp.com",
  projectId: "raps-powerplay",
  storageBucket: "raps-powerplay.appspot.com", // ✅ CORRECT
  messagingSenderId: "770779405923",
  appId: "1:770779405923:web:ad51e08c569fbc47abe256",
  measurementId: "G-96PNFVERXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (Database)
const db = getFirestore(app);

// Initialize Analytics (only in browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export the Firebase services
export { db, analytics };
