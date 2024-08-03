import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../customContexts/authContext";
import navStyles from "./index.module.css";

/**
 * JSX component to render the navigation bar.
 * It includes links for home, orders, cart, and sign in/sign out based on authentication status.
 * @returns JSX - Navbar component
 */
export const Navbar = () => {
  // retrieving authentication status and logOut function from context
  const { loggedIn, logOut } = useAuth();
  // hook to programmatically navigate
  const navigate = useNavigate();

  // handler function for logging out the user
  const logoutHandle = () => {
    // calling logOut function from context
    logOut();
    // redirect to home page after logout
    navigate("/");
  };

  return (
    <>
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

          {loggedIn && (
            <>
              {/* Links shown only when user is logged in */}
              <Link to="/orders">
                <button className={navStyles.btn}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9422/9422816.png"
                    alt="orders"
                  />
                  My Orders
                </button>
              </Link>

              <Link to="/cart">
                <button className={navStyles.btn}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png"
                    alt="cart"
                  />
                  Cart
                </button>
              </Link>
            </>
          )}

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
      <Outlet />
      {/* Outlet for nested routes */}
    </>
  );
};
