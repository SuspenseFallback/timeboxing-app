import React, { useState, useEffect, useRef } from "react";
import "../pages/NewTimebox.css";
import { Calendar } from "@/components/ui/calendar";
import { Trash2, ArrowRight, CircleHelp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { newTimebox } from "../firebase/firebase.js";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useParams } from "react-router";
import { SortableList } from "../components";

const NewTimebox = ({ user }) => {
  const navigate = useNavigate();

  const { day } = useParams();

  const [date, setDate] = useState(
    new Date(
      parseInt(day.split("-")[2]),
      parseInt(day.split("-")[1]) - 1,
      parseInt(day.split("-")[0])
    )
  );

  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);

  const [fits, setFits] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [stage1Error, setStage1Error] = useState("");
  const [stage1Disabled, setStage1Disabled] = useState(false);
  const [free, setFree] = useState(0);

  const [fixed, setFixed] = useState(true);

  const [times, setTimes] = useState([
    { time: "6:00", activity: "" },
    { time: "7:00", activity: "" },
    { time: "8:00", activity: "" },
    { time: "9:00", activity: "" },
    { time: "10:00", activity: "" },
    { time: "11:00", activity: "" },
    { time: "12:00", activity: "" },
    { time: "13:00", activity: "" },
    { time: "14:00", activity: "" },
    { time: "15:00", activity: "" },
    { time: "16:00", activity: "" },
    { time: "17:00", activity: "" },
    { time: "18:00", activity: "" },
    { time: "19:00", activity: "" },
    { time: "20:00", activity: "" },
    { time: "21:00", activity: "" },
    { time: "22:00", activity: "" },
  ]);

  useEffect(() => {
    let sum = 0;
    times.forEach((time) => {
      if (time.activity == "") {
        sum += 30;
      }
    });

    setFits(free <= sum);
  }, [times]);

  useEffect(() => {
    document.title = "New timebox";

    const copy = [...items];
    let sum = 0;

    if (Object.keys(user.daily_goals) > 0) {
      user.daily_goals.goals.forEach((g) => {
        if (!g.reminder) {
          copy.push({ item: g.goal, minutes: g.time, id: copy.length + 1 });
          sum += g.time;
        }
      });
    }

    if (user.weekly_goals) {
      user.weekly_goals.goals.forEach((g) => {
        const date2 = new Date(
          g.deadline.split("/")[2],
          g.deadline.split("/")[1] - 1,
          g.deadline.split("/")[0]
        );
        console.log(date2);
        const date1 = new Date();
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        copy.push({
          item: g.goal,
          minutes: (parseInt(g.hoursRequired) * 60) / diffDays,
          id: copy.length + 1,
        });
        sum += parseInt(g.hoursRequired) * 60;
      });
    }

    if (user.six_monthly_goals) {
      user.six_monthly_goals.goals.forEach((g) => {
        if (g.days == "both") {
          copy.push({
            item: g.goal,
            minutes: Math.round((parseInt(g.weeklyHours) * 60) / 7),
            id: copy.length + 1,
          });
          sum += Math.round((parseInt(g.weeklyHours) * 60) / 7);
        } else if (g.days == "weekends" && new Date().getDay() % 6 == 0) {
          copy.push({
            item: g.goal,
            minutes: parseInt(g.weeklyHours) * 30,
            id: copy.length + 1,
          });
          sum += parseInt(g.weeklyHours) * 30;
        } else if (g.days == "weekdays" && new Date().getDay() % 6 != 0) {
          copy.push({
            item: g.goal,
            minutes: parseInt(g.weeklyHours) * 12,
            id: copy.length + 1,
          });
          sum += parseInt(g.weeklyHours) * 12;
        }
      });
    }

    setItems(copy);
  }, []);

  useEffect(() => {
    if (user.schedule && user.schedule.sleep) {
      const [wakeUpHour, wakeUpMinutes] =
        user.schedule.sleep.wakeUpTime.split(":");

      const [bedTimeHour, bedTimeMinutes] =
        user.schedule.sleep.bedTime.split(":");

      const today = new Date();

      let wakeUpDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        parseInt(wakeUpHour),
        parseInt(wakeUpMinutes)
      );

      const bedTimeDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        parseInt(bedTimeHour),
        parseInt(bedTimeMinutes)
      );

      const new_times = [];

      while (wakeUpDate <= bedTimeDate) {
        new_times.push({
          time: wakeUpDate.toLocaleTimeString().slice(0, 5),
          activity: "",
        });
        console.log(new_times);
        wakeUpDate = new Date(
          wakeUpDate.setTime(wakeUpDate.getTime() + 1000 * 60 * 30)
        );
      }

      if (user.schedule && user.schedule.fixed && fixed) {
        const copy = [...user.schedule.fixed];

        copy.splice(0, 0, copy[copy.length - 1]);
        copy.splice(copy.length - 1, 1);

        const today = copy[new Date().getDay()];
        if (!today.active) {
          return;
        }

        const [startHour, startMinutes] = today.startTime.split(":");
        const [endHour, endMinutes] = today.endTime.split(":");

        let startDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          parseInt(startHour),
          parseInt(startMinutes)
        );

        const endDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          parseInt(endHour),
          parseInt(endMinutes)
        );

        const times_copy = [...new_times];

        while (startDate <= endDate) {
          times_copy.forEach((i, index) => {
            if (i.time == startDate.toLocaleTimeString().slice(0, 5)) {
              times_copy[index].activity = today.activity;
            }
          });

          startDate = new Date(
            startDate.setTime(startDate.getTime() + 1000 * 60 * 30)
          );
        }

        let other = 0;
        if (items) {
          items.forEach((item) => {
            other += item.minutes;
          });
        }
        setFree(other);
        setTimes(times_copy);
      }
    }
  }, [fixed]);

  useEffect(() => {
    const cur_date = date.toLocaleDateString("en-sg");

    const box = user.boxes.filter((b) => b.date == cur_date);
    console.log(box);

    if (box.length > 0) {
      setStage1Error("You already have a timebox for this day.");
      setStage1Disabled(true);
    } else {
      setStage1Error("");
      setStage1Disabled(false);
    }
  }, [date]);

  useEffect(() => {
    let dis = false;
    items.forEach((item) => {
      const required = Math.ceil(item.minutes / 30);
      const length = times.filter((i) => i.activity == item.item).length;

      console.log(length < required);

      if (length < required) {
        dis = true;
        return;
      }
    });

    setDisabled(dis);
  }, [times]);

  const changeTime = (i, text) => {
    const copy = [...times];
    copy[i].activity = text;
    setTimes(copy);
  };

  const submit = () => {
    newTimebox({
      date: date.toLocaleDateString("en-sg"),
      activities: times,
      items: items,
    }).then((res) => {
      navigate("/allow-notifications");
    });
  };

  return (
    <>
      <div className="page first new-timebox">
        <div className={`slides index-${index}`}>
          <div className="slide slide-1">
            <div className="text-container">
              <h2 className="header">Step 1 of 2</h2>
              <p className="caption">Pick a date</p>
            </div>
            <div className="calendar-wrapper">
              <Calendar
                mode="single"
                fromDate={new Date()}
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                fixedWeeks
                defaultMonth={date}
              />
              {stage1Error ? <br /> : null}
              <p className="error">{stage1Error}</p>
              <Button
                onClick={() => setIndex(index + 1)}
                disabled={stage1Disabled}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="slide slide-2">
            <div className="text-container">
              <h2 className="header">Step 2 of 2</h2>
              <p className="caption">Create timebox</p>
            </div>
            <div className="wrapper">
              <div className="left">
                <ScrollArea className="item-scroll rounded-md border p-4">
                  <SortableList
                    items={items}
                    onChange={setItems}
                    renderItem={(item, index) => (
                      <SortableList.Item id={item.id}>
                        {item.item}
                        <div className="row">
                          <p className="time">{item.minutes} min</p>
                          <SortableList.DragHandle />
                        </div>
                      </SortableList.Item>
                    )}
                  />
                </ScrollArea>
              </div>
              <div className="right">
                <ScrollArea className="time-scroll rounded-md border p-4">
                  <ul className="times-wrapper">
                    {times.map((item, index) => {
                      return (
                        <>
                          <li className="time-item">
                            <p className="time">{item.time}</p>
                            <Input
                              value={times[index].activity}
                              onChange={(e) =>
                                changeTime(index, e.target.value)
                              }
                            />
                          </li>
                          <li>
                            <Separator />
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </ScrollArea>
                <div className="row">
                  <input
                    type="checkbox"
                    name="fixed"
                    id="fixed"
                    checked={fixed}
                    onChange={(e) => setFixed(e.target.checked)}
                  />
                  <p className="label">Set fixed schedule today</p>
                </div>
              </div>
            </div>
            {fits ? (
              <p className="desc">
                Remember to include both free time slots and all of your goals!
              </p>
            ) : (
              <p className="error">
                You don't have enough time to do all your tasks. Please
                prioritize and put in the ones you need.
              </p>
            )}
            <div className="button-row">
              <Button className="outline" onClick={() => setIndex(index - 1)}>
                Back
              </Button>
              <Button onClick={submit} disabled={disabled}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTimebox;
