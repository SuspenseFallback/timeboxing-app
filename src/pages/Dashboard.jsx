import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

import "./Dashboard.css";
import { useNavigate } from "react-router";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date());
  const [activities, setActivities] = useState(null);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTimebox, setIsTimebox] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  useEffect(() => {
    const now = new Date();

    const new_times = [
      `${now.getHours()}:00`,
      `${now.getHours() + 1}:00`,
      `${now.getHours() + 2}:00`,
      `${now.getHours() + 3}:00`,
    ];

    setTimes(new_times);

    const today = user.boxes.filter((b) => b.date == new Date().toDateString());

    console.log(today);

    if (today.length > 0) {
      const copy = [];

      today[0].activities.forEach((item, index) => {
        const hour = parseInt(item.time.split(":")[0]);
        const time_hour = parseInt(new_times[0].split(":")[0]);

        if (hour >= time_hour) {
          if (item.activity) {
            copy.push(item);
          } else {
            copy.push({ time: item.time, activity: "-" });
          }
        }
      });

      setActivities(copy);
    } else {
      setIsTimebox(false);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const today = new Date();

    today.setDate(today.getDate() + 1);
    setDate(today);
  }, []);

  return loading ? (
    <div className="page first">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="page first dashboard">
        <div className="left">
          <div className="time">
            <p className="time-bold">{time}</p>
            <p className="activity">
              <p className="semibold">Current activity:</p>{" "}
              {activities ? activities[0].activity : "-"}
            </p>
          </div>
          <div className="next-activities">
            <p className="title semibold">Next activities</p>

            <ul>
              <li>
                <p>{times[1]}</p>
                <p>{activities ? activities[1].activity : "-"}</p>
              </li>
              <li>
                <Separator />
              </li>
              <li>
                <p>{times[2]}</p>
                <p>{activities ? activities[2].activity : "-"}</p>
              </li>
              <li>
                <Separator />
              </li>
              <li>
                <p>{times[3]}</p>
                <p>{activities ? activities[3].activity : "-"}</p>
              </li>
              <li>
                <Separator />
              </li>
            </ul>
          </div>
          <div className="buttons">
            {isTimebox ? (
              <>
                <Button>View timebox</Button>
                <Button>Edit timebox</Button>
              </>
            ) : (
              <Button>Create timebox for today</Button>
            )}
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
          <p className="text">There is no timebox for the selected date.</p>
          <Button onClick={() => navigate("/new-timebox")}>
            Create timebox
          </Button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
