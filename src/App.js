import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { AuthContextProvider } from "./customContexts/authContext";
import { ItemsContextProvider } from "./customContexts/itemsContext";

import "./App.css";
import { Login } from "./pages/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "", element: <Home /> },
        { path: "/login", element: <Login /> },
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
}

export default App;
