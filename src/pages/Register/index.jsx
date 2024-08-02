import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../customContexts/authContext";
import loginStyles from "./index.module.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, loading, error } = useAuth();
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
    if (password === confirmPassword) {
      signUp(email, password);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
      return;
    } else {
      alert("Confirm password did not match!");
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={loginStyles.container}>
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
          <Link to="/login">
            <p className={loginStyles.link}>Have an account already?</p>
          </Link>
        </div>
      )}
    </>
  );
};
