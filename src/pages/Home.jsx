import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home | Samayam";
  }, []);

  return (
    <div className="page first home">
      <div className="left">
        <h1 className="question first">
          Are you a student who thinks big but struggles to break it into
          smaller, tangible actions?
        </h1>
        <h1 className="question">
          Are you a student who struggles with having to do too many things and
          miss the important ones?
        </h1>
        <h1 className="header">Samayam can help you.</h1>
      </div>
      <div className="right">
        <p className="caption">Samayam is a timeboxing app</p>
        <br />
        <p className="desc">
          Timeboxing is a technique that many successful leaders like Elon Musk
          use to organise and prioritise time
        </p>
        <button className="button" onClick={() => navigate("/sign-up")}>
          Get started
        </button>
      </div>
    </div>
  );
};

export default Home;
