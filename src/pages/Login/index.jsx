import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../customContexts/authContext";
import loginStyles from "./index.module.css";
import { LoaderSpinner } from "../../components/LoaderSpinner";
import { Toaster } from "../../components/Toaster";

/**
 * JSX component to render the login page.
 * This component provides a form for user authentication and handles login state and navigation.
 * @returns JSX - login page
 */
export const Login = () => {
  // state to manage the email input
  const [email, setEmail] = useState("");
  // state to manage the password input
  const [password, setPassword] = useState("");
  // destructure signIn function, loading state, error message, and currentUser from useAuth context (custom hook)
  const { signIn, loading, error, currentUser } = useAuth();
  // hook to programmatically navigate to different routes
  const navigate = useNavigate();

  //  To redirect authenticated users to the home page if the user is loggedin.
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  /**
   * Handle changes in the email input field.
   * Updates the email state with the new value from the input.
   * @param {Object} e - The event object from the input change event
   */
  const changeEmailHandle = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Handle changes in the password input field.
   * Updates the password state with the new value from the input.
   * @param {Object} e - The event object from the input change event
   */
  const changePasswordHandle = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Handle form submission for user login.
   * Prevents the default form submission, calls the signIn function, and handles navigation.
   * @param {Object} e - The event object from the form submission event
   */
  const formSubmitHandle = async (e) => {
    e.preventDefault();

    // sign in with email and password
    const isSignedIn = await signIn(email, password);

    // clear the email and password input fields
    setEmail("");
    setPassword("");

    // navigate to home page on successful sign-in
    isSignedIn && navigate("/");
  };

  return (
    <>
    {/* conditionally render content based on loading state */}
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className={loginStyles.container}>
          {/* toaster component for displaying notifications */}
          <Toaster />

          {/* display error message if there is any */}
          <p className={loginStyles.error}>{error}</p>
          <h1 className={loginStyles.heading}>Sign In</h1>
          
          {/* form for user login */}
          <form className={loginStyles.form} onSubmit={formSubmitHandle}>
            <input
              className={loginStyles.input}
              type="email"
              value={email}
              onChange={changeEmailHandle}
              placeholder="Enter Email"
            />
            <input
              className={loginStyles.input}
              type="password"
              value={password}
              onChange={changePasswordHandle}
              placeholder="Enter Password"
            />
            <button className={loginStyles.btn}>Sign In</button>
          </form>

          {/* link to navigate to the registration page */}
          <Link to="/register">
            <p className={loginStyles.link}>Or SignUp instead</p>
          </Link>
        </div>
      )}
    </>
  );
};
