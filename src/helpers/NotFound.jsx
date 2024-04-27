import React from "react";
import Button from "../components/Button.jsx";
import "./NotFound.css";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="page first not-found">
        <div className="center">
          <h1 className="header">Page not found.</h1>
          <p className="caption">Perhaps you wanted to go somewhere else?</p>
          <div className="button-row">
            <Button onClick={() => navigate("/")}>Go home</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
