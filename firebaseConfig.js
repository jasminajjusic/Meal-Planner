import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAn8mnfSRxne7bNK9kmB-o2opWV7RiXyUk",
  authDomain: "meal-planner-8aed9.firebaseapp.com",
  projectId: "meal-planner-8aed9",
  storageBucket: "meal-planner-8aed9.appspot.com",
  messagingSenderId: "615280925579",
  appId: "1:615280925579:web:3d5022b434eff9dc892d8e",
  measurementId: "G-FXRWPSMRP9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};
