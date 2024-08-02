import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useFirestoreAuth } from "../../customHooks/useFirestoreAuth";
import { useAuth } from "../../customContexts/authContext";
import loginStyles from "./index.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, signIn, loading, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const changeEmailHandle = (e) => {
    setEmail(e.target.value);
  };

  const changePasswordHandle = (e) => {
    setPassword(e.target.value);
  };

  const changeConfirmPasswordHandle = (e) => {
    setConfirmPassword(e.target.value);
  };

  const formSubmitHandle = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      password === confirmPassword
        ? signUp(email, password)
        : alert("Confirm password did not match!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    const isSignedIn = await signIn(email, password);
    setEmail("");
    setPassword("");
    isSignedIn && navigate("/");
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={loginStyles.container}>
          <p className={loginStyles.error}>{error}</p>
          <h1 className={loginStyles.heading}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </h1>
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
            {isSignUp ? (
              <input
                className={loginStyles.input}
                type="password"
                value={confirmPassword}
                onChange={changeConfirmPasswordHandle}
                placeholder="Confirm Password"
              />
            ) : null}
            <button className={loginStyles.btn}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p
            className={loginStyles.link}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Have an account already?" : "Or SignUp instead"}
          </p>
        </div>
      )}
    </>
  );
};
