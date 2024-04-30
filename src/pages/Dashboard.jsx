import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

import { newDailyGoals } from "../firebase/firebase";

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

  const [rightIsTimebox, setRightIsTimebox] = useState(false);

  useEffect(() => {
    if (user) {
      if (!user.six_monthly_goals) {
        navigate("/six-monthly-goals");
      }

      if (!user.weekly_goals) {
        navigate("/weekly-goals");
      }

      if (!user.daily_goals) {
        navigate("/daily-goals");
      }

      if (
        new Date().toLocaleDateString() !=
        new Date(user.daily_goals.time).toLocaleDateString()
      ) {
        newDailyGoals({}).then(window.location.replace("/daily-goals"));
      }
    }
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  useEffect(() => {
    const date_str = date.toLocaleDateString("en-sg");

    const box = user.boxes.filter((b) => b.date == date_str);

    setRightIsTimebox(box.length != 0);
  }, [date]);

  useEffect(() => {
    const now = new Date();

    const new_times = [`${now.getHours()}:00`];

    now.setHours(now.getHours() + 1);
    new_times.push(`${now.getHours()}:00`);

    now.setHours(now.getHours() + 1);
    new_times.push(`${now.getHours()}:00`);

    now.setHours(now.getHours() + 1);
    new_times.push(`${now.getHours()}:00`);

    setTimes(new_times);

    const today = user.boxes.filter(
      (b) => b.date == new Date().toLocaleDateString("en-sg")
    );

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
              {activities && activities[0] ? activities[0].activity : "-"}
            </p>
          </div>
          <div className="next-activities">
            <p className="title semibold">Next activities</p>

            <ul>
              <li>
                <p>{times[1]}</p>
                <p>
                  {activities && activities[1] ? activities[1].activity : "-"}
                </p>
              </li>
              <li>
                <Separator />
              </li>
              <li>
                <p>{times[2]}</p>
                <p>
                  {activities && activities[2] ? activities[2].activity : "-"}
                </p>
              </li>
              <li>
                <Separator />
              </li>
              <li>
                <p>{times[3]}</p>
                <p>
                  {activities && activities[3] ? activities[3].activity : "-"}
                </p>
              </li>
              <li>
                <Separator />
              </li>
            </ul>
          </div>
          <div className="buttons">
            {isTimebox ? (
              <>
                <Button
                  onClick={() => {
                    const date = new Date()
                      .toLocaleDateString("en-sg")
                      .replaceAll("/", "-");
                    navigate("/view-timebox/" + date);
                  }}
                >
                  View timebox
                </Button>
                <Button
                  onClick={() => {
                    const date = new Date()
                      .toLocaleDateString("en-sg")
                      .replaceAll("/", "-");
                    navigate("/edit-timebox/" + date);
                  }}
                >
                  Edit timebox
                </Button>
              </>
            ) : (
              <>
                <p>You have not created a timebox for today.</p>
                <Button>Create timebox</Button>
              </>
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
          {rightIsTimebox ? (
            <>
              <p className="text">
                There is a timebox for {date.toLocaleDateString("en-sg")}!
              </p>
              <Button onClick={() => navigate("/new-timebox")}>
                View timebox
              </Button>
            </>
          ) : (
            <>
              <p className="text">
                There is no timebox for {date.toLocaleDateString("en-sg")}.
              </p>
              <Button onClick={() => navigate("/new-timebox")}>
                Create timebox
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
