import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Cart } from "./pages/Cart";
import { Orders } from "./pages/Orders";
import { AuthContextProvider } from "./customContexts/authContext";
import { ItemsContextProvider } from "./customContexts/itemsContext";
import { useProtectedRoute } from "./customHooks/useProtectedRoute";
import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "", element: <Home /> },
        { path: "/login", element: <Login /> },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/orders",
          element: useProtectedRoute(<Orders />),
        },
        {
          path: "/cart",
          element: useProtectedRoute(<Cart />),
        },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <ItemsContextProvider>
        <RouterProvider router={router} />
      </ItemsContextProvider>
    </AuthContextProvider>
  );
};

export default App;
