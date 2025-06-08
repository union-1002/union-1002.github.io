// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4YfPevLAf9R2-APmhoMmOY_svLMZd2lY",
  authDomain: "union-1002.firebaseapp.com",
  projectId: "union-1002",
  storageBucket: "union-1002.firebasestorage.app",
  messagingSenderId: "1015948149642",
  appId: "1:1015948149642:web:af2b18c2d032c480363e73",
  measurementId: "G-XHM3Y4581G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);