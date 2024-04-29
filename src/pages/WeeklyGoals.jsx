import React, { useEffect, useState } from "react";
import "./WeeklyGoals.css";
import Input from "../components/Input.jsx";
import { Checkbox } from "@/components/ui/checkbox";

import { useNavigate } from "react-router";
import { newWeeklyGoals } from "../firebase/firebase";

const WeeklyGoals = ({ user }) => {
  const navigate = useNavigate();

  const [goals, setGoals] = useState([
    { goal: "", weeklyHours: 1, days: "weekdays" },
    { goal: "", weeklyHours: 1, days: "weekdays" },
    { goal: "", weeklyHours: 1, days: "weekdays" },
  ]);

  useEffect(() => {
    if (user && user.weekly_goals) {
      setGoals(user.weekly_goals.goals);
    }
  }, []);

  useEffect(() => {
    console.log(goals);
  }, [goals]);

  const changeGoal = (index, new_text) => {
    const copy = [...goals];
    copy[index].goal = new_text;
    setGoals(copy);
  };

  const changeHours = (index, new_text) => {
    const copy = [...goals];
    copy[index].weeklyHours = new_text;
    setGoals(copy);
  };

  const checkWeekdays = (index, new_value) => {
    const copy = [...goals];
    if (new_value && goals[index].days == "weekends") {
      copy[index].days = "both";
    }

    if (new_value && goals[index].days == "") {
      copy[index].days = "weekdays";
    }

    if (!new_value) {
      copy[index].days = "weekends";
    }

    setGoals(copy);
  };

  const checkWeekends = (index, new_value) => {
    const copy = [...goals];
    if (new_value && goals[index].days == "weekdays") {
      copy[index].days = "both";
    }

    if (new_value && goals[index].days == "") {
      copy[index].days = "weekends";
    }

    if (!new_value) {
      copy[index].days = "weekdays";
    }

    setGoals(copy);
  };

  const addItem = () => {
    if (goals.length >= 20) {
      return;
    }

    const copy = [...goals];
    copy.push({ goal: "", weeklyHours: 0, days: "", numDays: 0 });
    setGoals(copy);
  };

  const submit = () => {
    newWeeklyGoals({ goals: goals, time: new Date().toString() }).then(() => {
      navigate("/goal-setting");
    });
  };

  return (
    <>
      <div className="page first weekly-goals">
        <h1 className="heade">Weekly goals</h1>
        <div className="table">
          <div className="header row">
            <div className="col col-1">What is your goal?</div>
            <div className="col col-2">Weekly hours</div>
            <div className="col col-3">On weekdays</div>
            <div className="col col-4">On weekends</div>
            <div className="col col-5">Hours per day</div>
          </div>
          <div className="body">
            {goals.map((goal, index) => {
              return (
                <div className="row">
                  <div className="col col-1">
                    <input
                      type="text"
                      className="input-bottom"
                      onChange={(e) => changeGoal(index, e.target.value)}
                      value={goals[index].goal}
                    />
                  </div>
                  <div className="col col-2">
                    <input
                      type="text"
                      className="input-bottom"
                      type="number"
                      onChange={(e) => changeHours(index, e.target.value)}
                      min={1}
                      max={168}
                      value={goals[index].weeklyHours}
                    />
                  </div>
                  <div className="col col-3">
                    <input
                      type="checkbox"
                      onChange={(e) => checkWeekdays(index, e.target.checked)}
                      checked={
                        goals[index].days == "weekdays" ||
                        goals[index].days == "both"
                      }
                    />
                  </div>
                  <div className="col col-4">
                    <input
                      type="checkbox"
                      onChange={(e) => checkWeekends(index, e.target.checked)}
                      checked={
                        goals[index].days == "weekends" ||
                        goals[index].days == "both"
                      }
                    />
                  </div>
                  <div className="col col-5">
                    <p className="muted">
                      {(
                        goals[index].weeklyHours /
                        (goals[index].days == "both"
                          ? 7
                          : goals[index].days == "weekdays"
                          ? 5
                          : 2)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="button-row">
              <button
                className="button button-block outline"
                onClick={addItem}
                disabled={goals.length == 20}
              >
                Add new
              </button>
            </div>
          </div>
        </div>
        <button className="button button-block submit" onClick={submit}>
          Submit
        </button>
        <p className="muted">
          You can change these once they have been submitted.
        </p>
      </div>
    </>
  );
};

export default WeeklyGoals;
