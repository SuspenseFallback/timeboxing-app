import React, { useState, useEffect } from "react";
import "./Sleep.css";

import { Progress } from "@/components/ui/progress";
import { newSchedule } from "../../firebase/firebase";

const Sleep = ({ user, nextSlide, newData, setNewData }) => {
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [bedTime, setBedTime] = useState("");

  useEffect(() => {
    if (user.schedule && user.schedule.sleep) {
      setWakeUpTime(user.schedule.sleep.wakeUpTime);
      setBedTime(user.schedule.sleep.bedTime);
    }
  }, []);

  const timeOpts = [
    "2:30",
    "3:00",
    "3:30",
    "4:00",
    "4:30",
    "5:00",
    "5:30",
    "6:00",
    "6:30",
    "7:00",
    "7:30",
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
  ];

  const sleepTimeOpts = [
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "0:00",
    "0:30",
    "1:00",
    "1:30",
    "2:00",
  ];

  const submit = () => {
    const data = { wakeUpTime, bedTime };
    const schedule = { ...newData, sleep: data };
    newSchedule(schedule).then(() => {
      setNewData(schedule);
      nextSlide();
    });
  };

  return (
    <>
      <div className="page first sleep">
        <div className="container">
          <div className="text-container">
            <h1 className="header">Step 3:</h1>
            <h1 className="subheader">Sleep cycle</h1>
            <Progress value={50} className="progress-bar" />
          </div>
          <div className="wake-up">
            <p className="title">Wake up time</p>
            <select
              name="wakeUpTime"
              id="wakeUpTime"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
            >
              <option value="">--Select--</option>
              {timeOpts.map((opt) => {
                return <option value={opt}>{opt}</option>;
              })}
            </select>
          </div>

          <div className="bed-time">
            <p className="title">Bed time</p>
            <select
              name="bedTime"
              id="bedTime"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
            >
              <option value="">--Select--</option>
              {sleepTimeOpts.map((opt) => {
                return <option value={opt}>{opt}</option>;
              })}
            </select>
          </div>

          <button
            className="button"
            onClick={submit}
            disabled={!wakeUpTime || !bedTime}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Sleep;
