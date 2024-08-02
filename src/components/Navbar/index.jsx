import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
// import { useFirestoreAuth } from "../../customHooks/useFirestoreAuth";
import { useAuth } from "../../customContexts/authContext";
import navStyles from "./index.module.css";

export const Navbar = () => {
  const { loggedIn, loading, logOut } = useAuth();
  console.log("loggedIn ===> ", loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("loggedIn in nav => ", loggedIn);
  }, [loggedIn]);

  const logoutHandle = () => {
    // setLoggedIn(false);
    logOut();
    navigate("/");
  };

  return (
    <>
      {console.log("loggedIn => ", loggedIn)}
      <div className={navStyles.container}>
        <div>
          <Link to="/">
            <p className={navStyles.navBrand}>
              Busy
              <br /> Buy
            </p>
          </Link>
        </div>
        <div className={navStyles.navRight}>
          <Link to="/">
            <button className={navStyles.btn}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/553/553416.png"
                alt="home"
              />
              Home
            </button>
          </Link>

          <Link to="/">
            <button className={navStyles.btn}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/9422/9422816.png"
                alt="orders"
              />
              My Orders
            </button>
          </Link>

          <Link to="/">
            <button className={navStyles.btn}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png"
                alt="cart"
              />
              Cart
            </button>
          </Link>

          {!loggedIn ? (
            <Link to="/login">
              <button className={navStyles.btn}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5044/5044655.png"
                  alt="sign in"
                />
                SignIn
              </button>
            </Link>
          ) : (
            <button className={navStyles.btn} onClick={logoutHandle}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/14722/14722724.png"
                alt="sign in"
              />
              SignOut
            </button>
          )}
        </div>
      </div>
      {loading ? "Loading..." : null}
      <Outlet />
    </>
  );
};
