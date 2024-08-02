import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../config/firestore.config";

export const useFirestoreAuth = () => {
  const auth = getAuth(app);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

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
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed In!");
      // setLoggedIn(true);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
      return false;
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // setLoggedIn(false);
      console.log("Signed Out!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  return { signUp, signIn, logOut, setLoggedIn, loading, error, loggedIn };
};
