import React from "react";

const Spinner = () => {
  return (
    <div
      className="spinner"
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50px",
        borderLeft: "2px solid #000",
        borderRight: "2px solid #000",
        borderTop: "2px solid #000",
        animation: "spin 1s infinite",
      }}
    ></div>
  );
};

export default Spinner;
