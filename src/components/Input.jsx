import React from "react";
import "./Input.css";

const Input = ({ value, onChange, disabled }) => {
  return (
    <input
      type="text"
      className="input-bottom"
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Input;
