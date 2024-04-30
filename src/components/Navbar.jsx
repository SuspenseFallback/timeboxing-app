import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { getUser, logOut } from "../firebase/firebase";
import Spinner from "./Spinner";

import { User, Settings, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();

  const [loading, set_loading] = useState(true);
  const [user, set_user] = useState(null);

  useEffect(() => {
    getUser((data) => {
      set_user(data);
      set_loading(false);
    });
  }, []);

  return loading ? (
    <div className="page">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="nav">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <p className="logo">Samayam</p>
        </div>
        <div className="nav-items">
          <div className="nav-item" onClick={() => navigate("/")}>
            Home
          </div>
          <div
            className="nav-item"
            onClick={() => {
              navigate(
                "/view-timebox/" +
                  new Date().toLocaleDateString("en-sg").replaceAll("/", "-")
              );
            }}
          >
            Today's timebox
          </div>
          <div
            className="nav-item"
            onClick={() => {
              navigate("/goal-setting");
            }}
          >
            Goals and tasks
          </div>
        </div>
        <div className="nav-buttons">
          <div className="nav-button" onClick={() => navigate("/daily-goals")}>
            New timebox
          </div>
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="nav-button">My account</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <p className="text">Settings</p>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      logOut(() => {
                        navigate("/");
                      })
                    }
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <p className="text">Log out</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <div
                className="nav-button"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Sign up
              </div>
              <div
                className="nav-button"
                onClick={() => {
                  navigate("/log-in");
                }}
              >
                Log in
              </div>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
