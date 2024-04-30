import React, { useState, useEffect } from "react";
import SixMonthlyWorkflow from "./SixMonthlyWorkflow.jsx";
import WeeklyWorkflow from "./WeeklyWorkflow.jsx";
import School from "./School.jsx";
import Sleep from "./Sleep.jsx";
import Activities from "./Activities.jsx";
import "./SignUpWorkflow.css";

const SignUpWorkflow = ({ user }) => {
  const [index, setIndex] = useState(1);
  const [newData, setNewData] = useState({ ...user.schedule });

  const nextSlide = () => {
    setIndex(index + 1);
  };

  return (
    <>
      <div className="page sign-up-workflow first">
        <div className={"slides index-" + index.toString()}>
          <div className="slide slide-1">
            <h1 className="header">Set up</h1>
            <p className="desc">
              We need to ask you some questions so that we can start effectively
              managing your time.
            </p>
            <button className="button" onClick={nextSlide}>
              Continue
            </button>
          </div>
          <div className="slide slide-2">
            <SixMonthlyWorkflow user={user} nextSlide={nextSlide} />
          </div>
          <div className="slide slide-3">
            <School
              user={user}
              nextSlide={nextSlide}
              newData={newData}
              setNewData={setNewData}
            />
          </div>
          <div className="slide slide-4">
            <Sleep
              user={user}
              nextSlide={nextSlide}
              newData={newData}
              setNewData={setNewData}
            />
          </div>
          <div className="slide slide-5">
            <Activities
              user={user}
              nextSlide={nextSlide}
              newData={newData}
              setNewData={setNewData}
            />
          </div>
          <div className="slide slide-6">
            <p>
              Thank you for answering those questions about your goals and your
              schedule. Now, let's start the timeboxing journey!
            </p>
            <button className="button" onClick={nextSlide}>
              Continue
            </button>
          </div>
          <div className="slide slide-7">
            <WeeklyWorkflow user={user} nextSlide={nextSlide} />
          </div>
          <div className="slide slide-8"></div>
        </div>
      </div>
    </>
  );
};

export default SignUpWorkflow;
