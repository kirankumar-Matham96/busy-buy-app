import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useFirestoreAuth } from "../../customHooks/useFirestoreAuth";
import { useAuth } from "../../customContexts/authContext";
import loginStyles from "./index.module.css";
import { LoaderSpinner } from "../../components/LoaderSpinner";
import { Toaster } from "../../components/Toaster";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading, error, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const changeEmailHandle = (e) => {
    setEmail(e.target.value);
  };

  const changePasswordHandle = (e) => {
    setPassword(e.target.value);
  };

  const formSubmitHandle = async (e) => {
    e.preventDefault();
    const isSignedIn = await signIn(email, password);
    setEmail("");
    setPassword("");
    isSignedIn && navigate("/");
  };

  return (
    <>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className={loginStyles.container}>
          <Toaster />
          <p className={loginStyles.error}>{error}</p>
          <h1 className={loginStyles.heading}>Sign In</h1>
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
          <Link to="/register">
            <p className={loginStyles.link}>Or SignUp instead</p>
          </Link>
        </div>
      )}
    </>
  );
};
