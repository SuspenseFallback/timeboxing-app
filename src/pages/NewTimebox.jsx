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

const NewTimebox = () => {
  const [date, setDate] = useState(new Date());
  const [index, setIndex] = useState(1);
  const [items, setItems] = useState(["Free time", "Free time", "", "", ""]);

  const [disabled, setDisabled] = useState(true);
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
    const copy = [];

    console.log(copy);

    times.forEach((time) => {
      copy.push(time.activity);
    });

    if (copy.filter((t) => t == "Free time") < 2) {
      return setDisabled(true);
    }

    let dis = false;

    items.forEach((item) => {
      console.log(copy.includes(item));
      if (!copy.includes(item)) {
        dis = true;
        return;
      }
    });

    setDisabled(dis);
  }, [times]);

  const deleteItem = (i) => {
    const copy = [...items];
    copy.splice(i, 1);
    setItems(copy);
  };

  const changeItem = (i, text) => {
    const copy = [...items];
    copy.splice(i, 1, text);
    setItems(copy);
  };

  const addItem = () => {
    const copy = [...items];
    copy.push("");
    setItems(copy);
  };

  const changeTime = (i, text) => {
    const copy = [...times];
    copy[i].activity = text;
    setTimes(copy);
  };

  const submit = () => {
    newTimebox({
      date: date.toDateString(),
      activities: times,
    }).then((res) => {
      console.log(res);
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
              />
              <Button onClick={() => setIndex(index + 1)}>Next</Button>
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
                      value={items[index]}
                      onChange={(e) => changeItem(index, e.target.value)}
                      disabled={index <= 1}
                    />
                  </div>
                );
              })}
            </div>
            <div className="button-row">
              <Button
                className="outline"
                onClick={() => setItems(["Free time", "Free time", "", "", ""])}
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
              <Button
                onClick={() => setIndex(index + 1)}
                disabled={items.includes("")}
              >
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
                        {item}
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
