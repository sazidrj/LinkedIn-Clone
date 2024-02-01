// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkXVp7Llgy9uYFyF9TDKVDfZBOOh0amIw",
  authDomain: "linkedin-clone-d7e98.firebaseapp.com",
  projectId: "linkedin-clone-d7e98",
  storageBucket: "linkedin-clone-d7e98.appspot.com",
  messagingSenderId: "641561320930",
  appId: "1:641561320930:web:e1183e1c52b3deab892dbb",
  measurementId: "G-P4QNF2BR47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {auth, app, firestore, storage};

