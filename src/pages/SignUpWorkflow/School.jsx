import React, { useEffect, useState } from "react";
import "./School.css";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Spinner from "@/components/Spinner";
import { Progress } from "@/components/ui/progress";

import { newSchedule } from "../../firebase/firebase";

const School = ({ user, nextSlide, newData, setNewData }) => {
  const [option, setOption] = useState("yes");
  const [isCopy, setIsCopy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numOfChecks, setNumOfChecks] = useState(0);

  const [error, setError] = useState("");

  const [data, setData] = useState([
    { day: "Monday", active: false, startTime: "", endTime: "", activity: "" },
    { day: "Tuesday", active: false, startTime: "", endTime: "", activity: "" },
    {
      day: "Wednesday",
      active: false,
      startTime: "",
      endTime: "",
      activity: "",
    },
    {
      day: "Thursday",
      active: false,
      startTime: "",
      endTime: "",
      activity: "",
    },
    { day: "Friday", active: false, startTime: "", endTime: "", activity: "" },
    {
      day: "Saturday",
      active: false,
      startTime: "",
      endTime: "",
      activity: "",
    },
    { day: "Sunday", active: false, startTime: "", endTime: "", activity: "" },
  ]);

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

  useEffect(() => {
    if (Boolean(user.schedule && user.schedule.fixed)) {
      setData(user.schedule.fixed);

      let sum = 0;

      const copy = [...user.schedule.fixed];
      copy.forEach((c, index) => {
        if (c.active) {
          sum += 1;
        }

        if (index > 0 && c.active == true && isCopy) {
          c.startTime = copy[0].startTime;
          c.endTime = copy[0].endTime;
        }
      });

      console.log(sum);

      setData(copy);
      setNumOfChecks(sum);
    } else {
      const copy = [...data];
      if (isCopy) {
        copy.forEach((c, index) => {
          if (index > 0 && c.active == true) {
            c.startTime = copy[0].startTime;
            c.endTime = copy[0].endTime;
          }
        });
      }

      setData(copy);
    }
  }, [isCopy]);

  // useEffect(() => {}, [isCopy]);

  const validate = () => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      if (
        (item.startTime == "" || item.endTime == "" || item.activity == "") &&
        item.active
      ) {
        return false;
      }
    }

    return true;
  };

  const checkBox = (index, checked) => {
    const copy = [...data];
    copy[index].active = checked;
    setData(copy);
    setNumOfChecks(numOfChecks + (checked ? 1 : -1));
  };

  const changeStartTime = (index, startTime) => {
    const copy = [...data];
    copy[index].startTime = startTime;
    setData(copy);

    if (isCopy) {
      copy.forEach((c, index) => {
        if (index > 0 && c.active) {
          c.startTime = copy[0].startTime;
          c.endTime = copy[0].endTime;
        }
      });
    }

    setData(copy);
  };

  const changeEndTime = (index, endTime) => {
    const copy = [...data];
    copy[index].endTime = endTime;
    setData(copy);

    if (isCopy) {
      copy.forEach((c, index) => {
        if (index > 0 && c.active) {
          c.startTime = copy[0].startTime;
          c.endTime = copy[0].endTime;
        }
      });
    }

    setData(copy);
  };

  const changeActivity = (index, activity) => {
    const copy = [...data];
    copy[index].activity = activity;
    setData(copy);

    if (isCopy) {
      copy.forEach((c, index) => {
        if (index > 0 && c.active) {
          c.startTime = copy[0].startTime;
          c.endTime = copy[0].endTime;
        }
      });
    }

    setData(copy);
  };

  const submit = () => {
    const final =
      option == "yes"
        ? { ...user.schedule, fixed: data }
        : { ...user.schedule, fixed: false };
    newSchedule(
      option == "yes"
        ? { ...user.schedule, fixed: data }
        : { ...user.schedule, fixed: false }
    ).then(() => {
      setNewData(final);
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
      <div className="page first school">
        <h1 className="header">Step 2:</h1>
        <Progress value={33} className="progress-bar" />
        <div className="question-container">
          <p className="question">
            Do you have a fixed schedule (work/college/school) for the next 6
            months?
          </p>
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
                    <div className="day-container">
                      <input
                        type="checkbox"
                        checked={d.active}
                        className={d.day[0].toLowerCase()}
                        onChange={(e) => checkBox(index, e.target.checked)}
                      />
                    </div>
                    <div className="inputs-container">
                      <select
                        name="startTime"
                        id="startTime"
                        className=""
                        value={d.startTime}
                        disabled={!d.active || (index != 0 && isCopy)}
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
                        className=""
                        disabled={!d.active || (index != 0 && isCopy)}
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
                        disabled={!d.active}
                        className="input-bottom"
                        placeholder="Activity name"
                        value={d.activity}
                        onChange={(e) => changeActivity(index, e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {numOfChecks > 1 ? (
              <div className="check">
                <input
                  type="checkbox"
                  name="copy"
                  id="copy"
                  value={isCopy}
                  onChange={(e) => setIsCopy(e.target.checked)}
                />
                <p className="label">Copy time to all days</p>
              </div>
            ) : null}
          </>
        ) : null}
        <div className="bottom-group">
          <p className="error">{error}</p>
          <button
            className="button"
            disabled={numOfChecks == 0 && option == "yes"}
            onClick={() => {
              if (validate()) {
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

export default School;
