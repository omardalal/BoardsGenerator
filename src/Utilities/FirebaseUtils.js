import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGNCp_4dIqY6iFIPA34JfXkKNCqidSQWU",
  authDomain: "boards-cd514.firebaseapp.com",
  projectId: "boards-cd514",
  storageBucket: "boards-cd514.appspot.com",
  messagingSenderId: "833865047439",
  appId: "1:833865047439:web:a435df38e7edc915c4fffa",
  measurementId: "G-BTMHJ1DKMW",
};
let auth = null;
let db = null;

const initFirebase = () => {
  if (!auth || !db) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
};

export const getFirebaseAuth = () => {
  initFirebase();
  return auth;
};

export const getFirebaseDb = () => {
  initFirebase();
  return db;
};
