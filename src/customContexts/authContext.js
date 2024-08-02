import { useContext, createContext } from "react";
import { useFirestoreAuth } from "../customHooks/useFirestoreAuth";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthContextProvider = ({ children }) => {
  const { signUp, signIn, logOut, setLoggedIn, loading, error, loggedIn } =
    useFirestoreAuth();

  return (
    <authContext.Provider
      value={{ signUp, signIn, logOut, setLoggedIn, loading, error, loggedIn }}
    >
      {children}
    </authContext.Provider>
  );
};
