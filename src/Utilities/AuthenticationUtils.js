import { getFirebaseAuth, getFirebaseDb } from "./FirebaseUtils";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

export const createUser = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(
    getFirebaseAuth(),
    email?.toLowerCase(),
    password
  );
};

export const signInUser = async (email, password) => {
  return await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
};

export const signOutUser = async () => {
  return await signOut(getFirebaseAuth());
};

export const addUserToFirestore = async (email) => {
  return await setDoc(doc(getFirebaseDb(), "User", email?.toLowerCase()), {
    savedBoards: [],
  });
};

export const sendResetEmail = async (email) => {
  return await sendPasswordResetEmail(getFirebaseAuth(), email);
};
