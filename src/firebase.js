// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLtiXd942-qQi6tMt7m5atGFhzP-c66LM",
  authDomain: "my-to-do-list-f3b50.firebaseapp.com",
  projectId: "my-to-do-list-f3b50",
  storageBucket: "my-to-do-list-f3b50.appspot.com",
  messagingSenderId: "312947979865",
  appId: "1:312947979865:web:e53f087c08e9a17b362348",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
