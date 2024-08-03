import { Navigate } from "react-router-dom";
import { useFirestoreAuth } from "./useFirestoreAuth";

/**
 * Higher-order component (HOC) to protect routes based on authentication status.
 * Redirects to the login page if the user is not logged in.
 * @param {React.ReactNode} props - The component or element to render if the user is authenticated.
 * @returns {React.ReactNode} - The protected component if logged in, otherwise redirects to "/login".
 */
export const useProtectedRoute = (props) => {
  const { loggedIn } = useFirestoreAuth();
  return loggedIn ? props : <Navigate to="/login" />;
};
