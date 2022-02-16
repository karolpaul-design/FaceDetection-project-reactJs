// Import the functions you need from the SDKs you need
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRvBaP_1ZMeGmHNaE_llT6o1HuMmkF9CM",
  authDomain: "clarifai-api.firebaseapp.com",
  databaseURL: "https://clarifai-api-default-rtdb.firebaseio.com",
  projectId: "clarifai-api",
  storageBucket: "clarifai-api.appspot.com",
  messagingSenderId: "814827255657",
  appId: "1:814827255657:web:99587f7199f0ccbab9aff8",
  measurementId: "G-5X039WZMYS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export async function signUp(name, email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, { displayName: name }).catch((err) =>
    console.log(err)
  );
}
export async function signIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}
export function logOut() {
  return signOut(auth);
}
//Custom hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
}
