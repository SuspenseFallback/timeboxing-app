import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewTimebox from "./pages/NewTimebox.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import Navbar from "./components/Navbar.jsx";
import NotFound from "./helpers/NotFound.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "non.geist";
import ReverseProtectedRoute from "./helpers/ReverseProtected.jsx";
import ProtectedRoute from "./helpers/Protected.jsx";

if ("serviceWorker" in navigator) {
  console.log(new URL("service-worker.js", import.meta.url));
  navigator.serviceWorker.register(
    new URL("service-worker.js", import.meta.url)
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <ReverseProtectedRoute>
            <Home />
          </ReverseProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/new-timebox",
        element: (
          <ProtectedRoute>
            <NewTimebox />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <ReverseProtectedRoute>
            <SignUp />
          </ReverseProtectedRoute>
        ),
      },
      {
        path: "/log-in",
        element: (
          <ReverseProtectedRoute>
            <LogIn />
          </ReverseProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
