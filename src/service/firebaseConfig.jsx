// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSjRLF6ItZWAppmNEPwvIQqToPUN6zkJc",
  authDomain: "travelmate-af527.firebaseapp.com",
  projectId: "travelmate-af527",
  storageBucket: "travelmate-af527.firebasestorage.app",
  messagingSenderId: "886186043803",
  appId: "1:886186043803:web:3cd0688bb7348224f3193e",
  measurementId: "G-W6192KXCV8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
