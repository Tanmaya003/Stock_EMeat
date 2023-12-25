// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "stockemeat-f56eb.firebaseapp.com",
  projectId: "stockemeat-f56eb",
  storageBucket: "stockemeat-f56eb.appspot.com",
  messagingSenderId: "810672535046",
  appId: "1:810672535046:web:fc3a159c2f7472bf71f587"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);