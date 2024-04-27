import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="nav">
        <div className="nav-logo">
          <p className="logo">Timeboxing</p>
        </div>
        <div className="nav-items">
          <div className="nav-item">Home</div>
          <div className="nav-item">Today's timebox</div>
        </div>
        <div className="nav-buttons">
          <div className="nav-button">New timebox</div>
          <div className="nav-button">Sign up</div>
          <div className="nav-button">Log in</div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
