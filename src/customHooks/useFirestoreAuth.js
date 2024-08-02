import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firestore.config";

export const useFirestoreAuth = () => {
  const auth = getAuth(app);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signUp = async (email, password) => {
    setLoading(true);
    setError(false);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed Up!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed In!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };
  return { signUp, signIn, loading, error };
};
