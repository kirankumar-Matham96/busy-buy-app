import React from "react";
import { Outlet } from "react-router-dom";
import navStyles from "./index.module.css";

export const Navbar = () => {
  return (
    <>
      <div className={navStyles.container}>
        <div>
          <p className={navStyles.navBrand}>
            Busy
            <br /> Buy
          </p>
        </div>
        <div className={navStyles.navRight}>
          <button className={navStyles.btn}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/553/553416.png"
              alt="home"
            />
            Home
          </button>
          <button className={navStyles.btn}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/5044/5044655.png"
              alt="sign in"
            />
            SignIn
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};
