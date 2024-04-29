import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewTimebox from "./pages/NewTimebox.jsx";
import EditTimebox from "./pages/EditTimebox.jsx";
import ViewTimebox from "./pages/ViewTimebox.jsx";
import AllowNotifications from "./pages/AllowNotifications.jsx";
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
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/" });
  });
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
        path: "/new-timebox/:day",
        element: (
          <ProtectedRoute>
            <NewTimebox />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-timebox/:day",
        element: (
          <ProtectedRoute>
            <EditTimebox />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-timebox/:day",
        element: (
          <ProtectedRoute>
            <ViewTimebox />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allow-notifications",
        element: <AllowNotifications />,
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
