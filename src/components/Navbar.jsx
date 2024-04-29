import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="nav">
        <div className="nav-logo">
          <p className="logo">Timeboxing</p>
        </div>
        <div className="nav-items">
          <div className="nav-item" onClick={() => navigate("/")}>
            Home
          </div>
          <div
            className="nav-item"
            onClick={() => {
              navigate("/");
            }}
          >
            Today's timebox
          </div>
        </div>
        <div className="nav-buttons">
          <div
            className="nav-button"
            onClick={() =>
              navigate(
                "/new-timebox/" +
                  new Date().toLocaleDateString().replaceAll("/", "-")
              )
            }
          >
            New timebox
          </div>
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
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
