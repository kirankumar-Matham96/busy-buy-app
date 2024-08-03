import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../config/firestore.config";

/**
 * Custom hook for handling Firebase authentication operations.
 * @returns {Object} - Contains authentication methods and state variables.
 */
export const useFirestoreAuth = () => {
  const auth = getAuth(app);

  // state variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

   /**
   * Effect hook to monitor authentication state changes.
   * Sets up a listener to handle user login and logout events.
   * @returns {Function} - Cleanup function to unsubscribe from the auth state listener.
   */
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setCurrentUser(user.email);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

   /**
   * Signs up a new user with email and password.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   */
  const signUp = async (email, password) => {
    setLoading(true);
    setError(false);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  /**
   * Signs in an existing user with email and password.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @returns {boolean} - Returns true if sign-in is successful, otherwise false.
   */
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
      return false;
    }
  };

  /**
   * To log out the current user.
   */
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setCurrentUser("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  return {
    signUp,
    signIn,
    logOut,
    setLoggedIn,
    loading,
    error,
    loggedIn,
    currentUser,
  };
};
