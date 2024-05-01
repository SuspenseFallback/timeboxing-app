import React, { useState, useEffect, useRef } from "react";
import "../pages/EditTimebox.css";
import { Calendar } from "@/components/ui/calendar";
import { Trash2, ArrowRight, CircleHelp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { updateTimebox } from "../firebase/firebase.js";

import { useNavigate, useParams } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EditTimebox = ({ user }) => {
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
  const [showMenu, setShowMenu] = useState(false);

  const [free, setFree] = useState(0);
  const [sum, setSum] = useState(0);

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
    document.title = "Edit timebox";

    const box = user.boxes.filter((b) => b.date == day.replaceAll("-", "/"));

    if (box) {
      const new_box = box[0];

      new_box.activities.forEach((b, index) => {
        new_box.activities[index].id = index;
      });

      setTimes(box[0].activities);
    }

    const copy = [...items];
    let sum = 0;

    if (user.daily_goals) {
      user.daily_goals.goals.forEach((g) => {
        if (!g.reminder) {
          copy.push({
            item: g.goal,
            minutes: g.time,
            id: copy.length + 1,
            time: "",
          });
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
        const date1 = new Date();
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        copy.push({
          item: g.goal,
          minutes: (parseInt(g.hoursRequired) * 60) / diffDays,
          id: copy.length + 1,
          time: "",
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
            time: "",
          });
          sum += Math.round((parseInt(g.weeklyHours) * 60) / 7);
        } else if (g.days == "weekends" && new Date().getDay() % 6 == 0) {
          copy.push({
            item: g.goal,
            minutes: parseInt(g.weeklyHours) * 30,
            id: copy.length + 1,
            time: "",
          });
          sum += parseInt(g.weeklyHours) * 30;
        } else if (g.days == "weekdays" && new Date().getDay() % 6 != 0) {
          copy.push({
            item: g.goal,
            minutes: parseInt(g.weeklyHours) * 12,
            id: copy.length + 1,
            time: "",
          });
          sum += parseInt(g.weeklyHours) * 12;
        }
      });
    }

    let other = 0;
    if (copy) {
      copy.forEach((item) => {
        other += parseInt(item.minutes);
      });
    }

    let new_sum = 0;
    box[0].activities.forEach((time) => {
      if (time.activity == "") {
        new_sum += 30;
      }
    });

    console.log(new_sum);

    setFree(other);
    setSum(new_sum);
    setItems(copy);
  }, []);

  useEffect(() => {
    setFits(free <= sum);
  }, [times]);

  useEffect(() => {
    if (fits) {
      let dis = false;
      items.forEach((item) => {
        const required = Math.ceil(item.minutes / 30);
        const length = times.filter((i) => i.activity == item.item).length;

        if (length < required) {
          dis = true;
          return;
        }
      });

      setDisabled(dis);
    } else {
      setDisabled(false);
    }
  }, [times]);

  const changeTime = (i, text) => {
    const copy = [...times];
    copy[i].activity = text;
    setTimes(copy);
  };

  const changeItemTime = (i, text, activity) => {
    const copy = [...items];
    copy[i].time = text;
    setItems(copy);
  };

  const submit = () => {
    updateTimebox({
      date: date.toLocaleDateString("en-sg"),
      activities: times,
      items: items,
    }).then((res) => {
      navigate("/allow-notifications");
    });
  };

  return (
    <>
      <div className="page first edit-timebox">
        <div className={`slides index-${index}`}>
          <div className="slide slide-1">
            <div className="wrapper">
              <div className="left">
                <div className="text-group">
                  <p className="free-minutes">
                    You have {sum} minutes of free time.
                  </p>
                  <p className="work-minutes">
                    You have {free} minutes of work.
                  </p>
                </div>
                <ul>
                  {items.map((item, index) => {
                    console.log(times.filter((t) => t.time == item.time));
                    return (
                      <>
                        <li>
                          <div className="text">
                            {index + 1}. {item.item} - {item.minutes} minutes
                          </div>
                        </li>
                        <Separator />
                      </>
                    );
                  })}
                </ul>
                <p className="desc">Remember to include all of your tasks!</p>
                {false ? (
                  <div className="input-row">
                    <input
                      type="text"
                      className="input-bottom"
                      placeholder="Task name"
                    />
                    <select name="" id="">
                      <option value="">Start time</option>
                      {times.map((item, index) => {
                        if (item.activity == "") {
                          return <option value={item.time}>{item.time}</option>;
                        } else {
                          return null;
                        }
                      })}
                    </select>
                  </div>
                ) : null}
                <br />
                <div className="button-column">
                  <Button onClick={submit}>Save</Button>
                </div>
                <br />
                {fits ? null : (
                  <p className="error">
                    You don't have enough time to do all your tasks. Please
                    prioritize and put in the ones you need.
                  </p>
                )}
              </div>
              <div className="right">
                <Tabs defaultValue="free-time" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="free-time">Free time</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </TabsList>
                  <TabsContent value="free-time">
                    <ScrollArea className="time-scroll rounded-md border p-4">
                      <ul className="times-wrapper">
                        {times.map((item, index) => {
                          if (item.activity == "") {
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
                          } else {
                            return null;
                          }
                        })}
                      </ul>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="calendar">
                    <ScrollArea className="time-scroll rounded-md border p-4">
                      <ul className="times-wrapper">
                        {times.map((item, index) => {
                          if (item.activity != "") {
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
                          } else {
                            return null;
                          }
                        })}
                      </ul>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTimebox;
