import { useContext, createContext } from "react";
import { useFirestoreAuth } from "../customHooks/useFirestoreAuth";

// create a context for authentication
const authContext = createContext();

// custom hook to use the authentication context
export const useAuth = () => {
  return useContext(authContext);
};

/**
 * AuthContextProvider component to wrap the part of the application that needs authentication context
 * @param {*} param0 - Contains children components that will have access to the authentication context
 * @returns JSX - Provides authentication context to its children
 */
export const AuthContextProvider = ({ children }) => {
  // using custom hook to get authentication functions and state from Firestore
  const {
    signUp,
    signIn,
    logOut,
    setLoggedIn,
    loading,
    error,
    loggedIn,
    currentUser,
  } = useFirestoreAuth();

  return (
    // providing authentication context to children components
    <authContext.Provider
      value={{
        signUp,
        signIn,
        logOut,
        setLoggedIn,
        loading,
        error,
        loggedIn,
        currentUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
