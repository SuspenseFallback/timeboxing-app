import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log(import.meta.env);
  }, []);

  return (
    <div className="page first">
      <h1>Home</h1>
    </div>
  );
};

export default Home;
