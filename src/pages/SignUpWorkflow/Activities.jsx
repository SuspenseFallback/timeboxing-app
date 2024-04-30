import React, { useEffect, useState } from "react";
import "./Activities.css";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Spinner from "@/components/Spinner";
import { Progress } from "@/components/ui/progress";

import { newSchedule } from "../../firebase/firebase";
import { Trash2 } from "lucide-react";

const Activities = ({ user, nextSlide, newData, setNewData }) => {
  const [option, setOption] = useState("yes");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const days_week = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const timeOpts = [
    "0:00",
    "0:30",
    "1:00",
    "1:30",
    "2:00",
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
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
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
  ];

  const [data, setData] = useState([
    { day: "", startTime: "", endTime: "", activity: "" },
  ]);

  useEffect(() => {
    if (newData && newData.activities) {
      setData(newData.activities);
    }
  }, []);

  const validate = () => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      if (
        item.startTime == "" ||
        item.endTime == "" ||
        item.activity == "" ||
        item.day == ""
      ) {
        return false;
      }
    }

    return true;
  };

  const changeDay = (index, day) => {
    const copy = [...data];
    copy[index].day = day;
    setData(copy);
  };

  const changeStartTime = (index, startTime) => {
    const copy = [...data];
    copy[index].startTime = startTime;
    setData(copy);
  };

  const changeEndTime = (index, endTime) => {
    const copy = [...data];
    copy[index].endTime = endTime;
    setData(copy);
  };

  const changeActivity = (index, activity) => {
    const copy = [...data];
    copy[index].activity = activity;
    setData(copy);
  };

  const addItem = () => {
    const copy = [...data];
    copy.push({ day: "", startTime: "", endTime: "", activity: "" });
    setData(copy);
  };

  const deleteItem = (index) => {};

  const submit = () => {
    newSchedule({ ...newData, activities: data }).then(() => {
      nextSlide();
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
      <div className="page first activities">
        <h1 className="header">Step 4:</h1>
        <Progress value={66} className="progress-bar" />
        <div className="question-container">
          <p className="question">Do you have any other fixed activities?</p>
          <div className="options">
            <RadioGroup value={option} onValueChange={setOption}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        {option == "yes" ? (
          <>
            <div className="data-container">
              {data.map((d, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="inputs-container">
                      <select
                        name="day"
                        id="day"
                        className=""
                        value={d.day}
                        onChange={(e) => changeDay(index, e.target.value)}
                      >
                        <option value="">Day</option>
                        {days_week.map((opt) => {
                          return <option value={opt}>{opt}</option>;
                        })}
                      </select>
                      <select
                        name="startTime"
                        id="startTime"
                        className=""
                        value={d.startTime}
                        onChange={(e) => changeStartTime(index, e.target.value)}
                      >
                        <option value="">Start time</option>
                        {timeOpts.map((opt) => {
                          return (
                            <option disabled={d.endTime == opt} value={opt}>
                              {opt}
                            </option>
                          );
                        })}
                      </select>
                      <select
                        name="endTime"
                        id="endTime"
                        value={d.endTime}
                        onChange={(e) => changeEndTime(index, e.target.value)}
                      >
                        <option value="">End time</option>
                        {timeOpts.map((opt) => {
                          return (
                            <option disabled={d.startTime == opt} value={opt}>
                              {opt}
                            </option>
                          );
                        })}
                      </select>
                      <input
                        type="text"
                        className="input-bottom"
                        placeholder="Activity name"
                        value={d.activity}
                        onChange={(e) => changeActivity(index, e.target.value)}
                      />
                      <div
                        className="trash-wrapper"
                        onClick={() => deleteItem(index)}
                      >
                        <Trash2 className="delete" color="red" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
        <div className="bottom-group">
          <p className="error">{error}</p>
          <button className="button button-block outline" onClick={addItem}>
            Add item +
          </button>
          <br />
          <button
            className="button button-block"
            onClick={() => {
              if (validate() || option == "no") {
                setError("");
                submit();
              } else {
                setError("Please fill in all fields.");
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Activities;
