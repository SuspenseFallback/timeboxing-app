import React from "react";
import "./Input.css";

const Input = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="input-bottom"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
