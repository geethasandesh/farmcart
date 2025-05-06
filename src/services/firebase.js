// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (Replace with your Firebase project credentials)
const firebaseConfig = {
  apiKey: "AIzaSyBWFrBSFWKF_hMZEAlVmsqoWz8X4OHRskk",
  authDomain: "farmcart-1b8ec.firebaseapp.com",
  projectId: "farmcart-1b8ec",
  storageBucket: "farmcart-1b8ec.appspot.com",
  messagingSenderId: "724563975504",
  appId: "1:724563975504:web:4c89b8b8015fe9b9f9e055",
  measurementId: "G-11E0CMH8JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore Database
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase services for use in the app
export { auth, db };
