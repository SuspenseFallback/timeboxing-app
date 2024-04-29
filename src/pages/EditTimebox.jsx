import React, { useState, useEffect, useRef } from "react";
import "./EditTimebox.css";
import { Calendar } from "@/components/ui/calendar";
import { Trash2, ArrowRight, CircleHelp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { updateTimebox } from "../firebase/firebase.js";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useParams } from "react-router";
import Spinner from "../components/Spinner.jsx";

const EditTimebox = ({ user }) => {
  const navigate = useNavigate();
  const { day } = useParams();
  const date = day.replaceAll("-", "/");

  const [index, setIndex] = useState(1);

  const [items, setItems] = useState(null);
  const [times, setTimes] = useState(null);

  const [disabled, setDisabled] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = user.boxes.filter((b) => b.date == new Date().toDateString());

    if (today) {
      const box = today[0];
      setItems(box.items);
      setTimes(box.activities);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
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
    }
  }, [times, items]);

  const addItem = () => {
    const copy = [...items];
    copy.push("");
    setItems(copy);
  };

  const changeItem = (i, text) => {
    const copy = [...items];
    copy.splice(i, 1, text);
    setItems(copy);
  };

  const deleteItem = (i) => {
    const copy = [...items];
    copy.splice(i, 1);
    setItems(copy);
  };

  const changeTime = (i, text) => {
    const copy = [...times];
    copy[i].activity = text;
    setTimes(copy);
  };

  const submit = () => {
    updateTimebox({
      date: date,
      activities: times,
    }).then((res) => {
      navigate("/allow-notifications");
    });
  };

  return loading ? (
    <>
      <div className="page first">
        <Spinner />
      </div>
    </>
  ) : (
    <>
      <div className="page first edit-timebox">
        <div className={`slides index-${index}`}>
          <div className="slide slide-1">
            <div className="text-container">
              <h2 className="header">Step 1 of 2</h2>
              <p className="caption">Edit your goals</p>
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
          <div className="slide slide-2">
            <div className="text-container">
              <h2 className="header">Step 2 of 2</h2>
              <p className="caption">Edit timebox</p>
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

export default EditTimebox;
