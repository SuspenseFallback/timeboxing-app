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
import GoalSetting from "./pages/GoalSetting.jsx";
import Settings from "./pages/Settings.jsx";
import DailyGoals from "./pages/DailyGoals.jsx";
import WeeklyGoals from "./pages/WeeklyGoals.jsx";
// import School from "./pages/School.jsx";
import SignUpWorkflow from "./pages/SignUpWorkflow/SignUpWorkflow.jsx";
import Sleep from "./pages/SignUpWorkflow/Sleep.jsx";
import SixMonthlyGoals from "./pages/SixMonthlyGoals.jsx";
import Navbar from "./components/Navbar.jsx";
import NotFound from "./helpers/NotFound.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "non.geist";
import ReverseProtectedRoute from "./helpers/ReverseProtected.jsx";
import ProtectedRoute from "./helpers/Protected.jsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/", type: "module" });
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
        path: "/sign-up-workflow",
        element: (
          <ProtectedRoute>
            <SignUpWorkflow />
          </ProtectedRoute>
        ),
      },
      {
        path: "/goal-setting",
        element: (
          <ProtectedRoute>
            <GoalSetting />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sleep",
        element: (
          <ProtectedRoute>
            <Sleep />
          </ProtectedRoute>
        ),
      },
      {
        path: "/daily-goals",
        element: (
          <ProtectedRoute>
            <DailyGoals />
          </ProtectedRoute>
        ),
      },
      {
        path: "/weekly-goals",
        element: (
          <ProtectedRoute>
            <WeeklyGoals />
          </ProtectedRoute>
        ),
      },
      {
        path: "/six-monthly-goals",
        element: (
          <ProtectedRoute>
            <SixMonthlyGoals />
          </ProtectedRoute>
        ),
      },
      {
        path: "/new-timebox/:day",
        element: (
          <ProtectedRoute>
            <EditTimebox />
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
  <RouterProvider router={router} />
);
