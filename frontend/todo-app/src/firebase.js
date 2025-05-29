// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXSF8k_chNsC-9lhp3eCmNS45Rk_G3J2I",
  authDomain: "todo-33298.firebaseapp.com",
  projectId: "todo-33298",
  storageBucket: "todo-33298.firebasestorage.app",
  messagingSenderId: "367745872442",
  appId: "1:367745872442:web:2c2b98cf656d3d8e85fb03",
  measurementId: "G-4DDQQLVZPV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  githubProvider,
  app
};

