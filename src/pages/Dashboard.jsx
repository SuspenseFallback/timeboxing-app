import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import Button from "../components/Button";

import "./Dashboard.css";

const Dashboard = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <>
      <div className="page first dashboard">
        <div className="left">
          <div className="time">
            <p className="time-bold">{time}</p>
            <p className="activity">
              <p className="semibold">Current activity:</p> ???
            </p>
          </div>
          <div className="next-activities">
            <p className="title semibold">Next activities</p>

            <ul>
              <li>
                <p>11:00</p>
                <p>???</p>
              </li>
              <li>
                <Separator />
              </li>
              <li>
                <p>12:00</p>
                <p>???</p>
              </li>
              <li>
                <Separator />
              </li>
              <li>
                <p>13:00</p>
                <p>???</p>
              </li>
              <li>
                <Separator />
              </li>
            </ul>
          </div>
          <div className="buttons">
            <Button>View full timebox</Button>
            <Button>Edit timebox</Button>
          </div>
        </div>
        <div className="v-sep"></div>
        <div className="right">
          <Calendar
            mode="single"
            fromDate={new Date()}
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            fixedWeeks
          />
          <p className="text">There is no timebox for today.</p>
          <Button>Create timebox</Button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
