import React from "react";
import "./Button.css";

const Button = ({ disabled, className, onClick, children }) => {
  return (
    <button
      className={"button " + className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
