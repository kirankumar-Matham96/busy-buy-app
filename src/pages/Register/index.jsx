import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../customContexts/authContext";
import { LoaderSpinner } from "../../components/LoaderSpinner";
import { Toaster } from "../../components/Toaster";
import loginStyles from "./index.module.css";

/**
 * JSX component for the registration page.
 * Allows users to create a new account by providing an email, password, and confirming the password.
 * @returns JSX - Registration page
 */
export const Register = () => {
  // state variables for email, password, and confirm password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // destructure signUp function, loading state, and error from useAuth context (custom hook)
  const { signUp, loading, error } = useAuth();
  // hook to programmatically navigate
  const navigate = useNavigate();

  /**
   * Handler for email input change event.
   * @param {Object} e - Event object
   */
  const changeEmailHandle = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Handler for password input change event.
   * @param {Object} e - Event object
   */
  const changePasswordHandle = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Handler for confirm password input change event.
   * @param {Object} e - Event object
   */
  const changeConfirmPasswordHandle = (e) => {
    setConfirmPassword(e.target.value);
  };

  /**
   * Handler for form submission.
   * Validates password and confirm password match, then calls signUp function.
   * @param {Object} e - Event object
   */
  const formSubmitHandle = async (e) => {
    e.preventDefault();
    // check if password and confirm password match
    if (password === confirmPassword) {
      // calling signUp function from auth context
      signUp(email, password);

      // clearing inputs
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // redirecting to login page after successful registration
      navigate("/login");
      return;
    } else {
      alert("Confirm password did not match!");
    }
  };

  return (
    <>
      {/* Display loading spinner while registration is in progress */}
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className={loginStyles.container}>
          <Toaster />
          {/* Show error message if any */}
          <p className={loginStyles.error}>{error}</p>
          <h1 className={loginStyles.heading}>Sign Up</h1>
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
            <input
              className={loginStyles.input}
              type="password"
              value={confirmPassword}
              onChange={changeConfirmPasswordHandle}
              placeholder="Confirm Password"
            />
            <button className={loginStyles.btn}>Sign Up</button>
          </form>
          {/* Link to navigate to the login page */}
          <Link to="/login">
            <p className={loginStyles.link}>Have an account already?</p>
          </Link>
        </div>
      )}
    </>
  );
};
