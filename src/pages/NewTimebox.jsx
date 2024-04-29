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

  const [index, setIndex] = useState(1);
  const [items, setItems] = useState([
    { item: "Free time", hours: 1 },
    { item: "Free time", hours: 1 },
  ]);

  const [disabled, setDisabled] = useState(true);
  const [sum, setSum] = useState(2);

  const [stage1Error, setStage1Error] = useState("");
  const [stage1Disabled, setStage1Disabled] = useState(false);

  const [times, setTimes] = useState([
    { time: "6:00", activity: "Free time" },
    { time: "7:00", activity: "Free time" },
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
    document.title = "New timebox";

    const copy = [...items];

    if (user.daily_goals) {
      user.daily_goals.goals.forEach((g) => {
        if (g.days == "both") {
          copy.push({
            item: g.goal,
            hours: Math.ceil(
              g.weeklyHours /
                (g.days == "both" ? 7 : g.days == "weekdays" ? 5 : 2)
            ),
          });
        } else {
          const num = new Date().getDate();

          if (num % 6 == 0 && g.days == "weekends") {
            copy.push({
              item: g.goal,
              hours: Math.ceil(
                g.weeklyHours /
                  (g.days == "both" ? 7 : g.days == "weekdays" ? 5 : 2)
              ),
            });
          } else if (num % 6 != 0 && g.days == "weekdays") {
            copy.push({
              item: g.goal,
              hours: Math.ceil(
                g.weeklyHours /
                  (g.days == "both" ? 7 : g.days == "weekdays" ? 5 : 2)
              ),
            });
          }
        }
      });
    }

    if (user.weekly_goals) {
      user.weekly_goals.goals.forEach((g) => {
        if (g.days == "both") {
          copy.push({
            item: g.goal,
            hours: Math.ceil(
              g.weeklyHours /
                (g.days == "both" ? 7 : g.days == "weekdays" ? 5 : 2)
            ),
          });
        } else {
          const num = new Date().getDate();

          if (num % 6 == 0 && g.days == "weekends") {
            copy.push({
              item: g.goal,
              hours: Math.ceil(
                g.weeklyHours /
                  (g.days == "both" ? 7 : g.days == "weekdays" ? 5 : 2)
              ),
            });
          } else if (num % 6 != 0 && g.days == "weekdays") {
            copy.push({
              item: g.goal,
              hours: Math.ceil(
                g.weeklyHours /
                  (g.days == "both" ? 7 : g.days == "weekdays" ? 5 : 2)
              ),
            });
          }
        }
      });
    }

    if (user.six_monthly_goals) {
      user.six_monthly_goals.goals.forEach((g) => {
        if (g.days == "both") {
          copy.push({
            item: g.goal,
            hours: Math.ceil(
              g.weeklyHours /
                (g.days == "both" ? 7 : g.days == "weekdays" ? 5 : 2)
            ),
          });
        } else {
          const num = new Date().getDate();

          if (num % 6 == 0 && g.days == "weekends") {
            copy.push({
              item: g.goal,
              hours: Math.ceil(
                g.weeklyHours /
                  (g.days == "both" ? 7 : g.days == "weekdays" ? 5 : 2)
              ),
            });
          } else if (num % 6 != 0 && g.days == "weekdays") {
            copy.push({
              item: g.goal,
              hours: Math.ceil(
                g.weeklyHours /
                  (g.days == "both" ? 7 : g.days == "weekdays" ? 5 : 2)
              ),
            });
          }
        }
      });
    }

    setItems(copy);
  }, []);

  useEffect(() => {
    const cur_date = date.toLocaleDateString();

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
    const copy = [];

    times.forEach((time) => {
      copy.push(time.activity);
    });

    if (copy.filter((t) => t == "Free time") < 2) {
      return setDisabled(true);
    }

    let dis = false;

    items.forEach((item) => {
      if (!copy.includes(item.item)) {
        dis = true;
        return;
      }
    });

    setDisabled(dis);
  }, [times]);

  useEffect(() => {
    let acc = 0;

    items.forEach((i) => {
      acc += i.hours;
    });

    setSum(acc);
  }, [items]);

  const deleteItem = (i) => {
    const copy = [...items];
    copy.splice(i, 1);
    setItems(copy);
  };

  const changeItem = (i, text) => {
    const copy = [...items];
    copy[i].item = text;
    setItems(copy);
  };

  const addItem = () => {
    const copy = [...items];
    copy.push({ item: "", hours: 1 });
    setItems(copy);
  };

  const changeTime = (i, text) => {
    const copy = [...times];
    copy[i].activity = text;
    setTimes(copy);
  };

  const toStage3 = () => {
    const copy = [...times];
    const items_copy = [...items];

    items_copy.forEach((item, index) => {
      for (var i = 0; i < item.hours - 1; i++) {
        items_copy.splice(index, 0, item);
      }
    });

    if (items_copy.length < copy.length) {
      items_copy.forEach((item, index) => {
        copy[index].activity = item.item;
      });
    }

    console.log(copy, items_copy);
    setTimes(copy);
    setIndex(index + 1);
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
              <h2 className="header">Step 1 of 3</h2>
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
              <h2 className="header">Step 2 of 3</h2>
              <p className="caption">What are your goals for today?</p>
            </div>
            <div className="items-wrapper">
              {items.map((item, index) => {
                return (
                  <div
                    className={"item " + (index <= 1 ? "wide" : "")}
                    key={index}
                  >
                    {index <= 1 ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="help">
                              <CircleHelp />{" "}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              You need at least 2 free hours.{" "}
                              <span className="link">Learn more</span>
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : null}
                    <button
                      className="icon"
                      disabled={index <= 1 ? true : items.length == 3}
                      onClick={() => deleteItem(index)}
                    >
                      <Trash2 />
                    </button>
                    <p className="index">{index + 1}</p>
                    <Input
                      value={items[index].item}
                      onChange={(e) => changeItem(index, e.target.value)}
                      disabled={index <= 1}
                    />
                  </div>
                );
              })}
            </div>
            <p className="hours">Hours: {sum}</p>
            <div className="button-row">
              <Button
                className="outline"
                onClick={() =>
                  setItems([
                    { item: "Free time", hours: 1 },
                    { item: "Free time", hours: 1 },
                    { item: "", hours: 1 },
                    { item: "", hours: 1 },
                    { item: "", hours: 1 },
                  ])
                }
              >
                Reset
              </Button>
              <Button onClick={addItem} disabled={items.length >= 24}>
                Add item
              </Button>
            </div>

            <br />
            <div className="button-row">
              <Button className="outline" onClick={() => setIndex(index - 1)}>
                Back
              </Button>
              <Button onClick={toStage3} disabled={items.includes("")}>
                Next
              </Button>
            </div>
          </div>
          <div className="slide slide-3">
            <div className="text-container">
              <h2 className="header">Step 3 of 3</h2>
              <p className="caption">Create timebox</p>
            </div>
            <div className="wrapper">
              <div className="left">
                <ol className="og-list">
                  {items.map((item, index) => {
                    return (
                      <li key={index + 1000}>
                        <span>{index + 1}. </span>
                        {item.item}, hours: {item.hours}
                      </li>
                    );
                  })}
                </ol>
              </div>
              <ArrowRight />
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
              </div>
            </div>
            <p className="desc">
              Remember to include both free time slots and all of your goals!
            </p>
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
