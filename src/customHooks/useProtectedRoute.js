import React from "react";
import { Navigate } from "react-router-dom";
import { useFirestoreAuth } from "./useFirestoreAuth";

export const useProtectedRoute = (props) => {
  const { loggedIn } = useFirestoreAuth();
  return loggedIn ? props : <Navigate to="/login" />;
};
