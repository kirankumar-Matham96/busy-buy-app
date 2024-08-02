import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [{ path: "", element: <Home /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
