import React, { useEffect, useState } from "react";
import "../DailyGoals.css";
import { newDailyGoals } from "../../firebase/firebase";
import { Trash2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const DailyGoalsWorkflow = ({ user, nextSlide }) => {
  const [tasks, setTasks] = useState([
    { goal: "", time: 30, reminder: false },
    { goal: "", time: 30, reminder: false },
    { goal: "", time: 30, reminder: false },
  ]);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (user && user.daily_goals) {
      return setTasks(user.daily_goals.goals);
    }

    // if (user && Object.keys(user.daily_goals.goals).length > 0) {
    //   return setTasks(user.daily_goals.goals);
    // }
  }, []);

  useEffect(() => {
    for (let i = 0; i < tasks.length; i++) {
      const item = tasks[i];

      console.log("goal", item.goal);
      if (item.goal == "") {
        return setDisabled(true);
      }
    }

    setDisabled(false);
  }, [tasks]);

  const changeGoal = (index, new_text) => {
    const copy = [...tasks];
    copy[index].goal = new_text;
    setTasks(copy);
  };

  const changeHours = (index, new_text) => {
    const copy = [...tasks];
    copy[index].time = new_text;
    setTasks(copy);
  };

  const checkReminder = (index, new_value) => {
    const copy = [...tasks];
    copy[index].reminder = new_value;

    setTasks(copy);
  };

  const deleteGoal = (index) => {
    const copy = [...tasks];
    copy.splice(index, 1);

    setTasks(copy);
  };

  const addItem = () => {
    if (tasks.length >= 20) {
      return;
    }

    const copy = [...tasks];
    copy.push({ goal: "", time: 0 });
    setTasks(copy);
  };

  const submit = () => {
    newDailyGoals({ goals: tasks, time: new Date().toString() }).then(() => {
      nextSlide();
    });
  };

  return (
    <>
      <div className="page first daily-goals">
        <h1 className="header">Brain dump of all tasks for today</h1>
        <div className="table">
          <div className="header row">
            <div className="col col-1">What is your task?</div>
            <div className="col col-2">Is this a reminder?</div>
            <div className="col col-3">No. of hours</div>
          </div>
          <div className="body">
            {tasks.map((task, index) => {
              return (
                <div className="row">
                  <div className="col col-1">
                    {index + 1}
                    {"  "}
                    <input
                      type="text"
                      className="input-bottom"
                      onChange={(e) => changeGoal(index, e.target.value)}
                      value={task.goal}
                    />
                    <button
                      className="trash-wrapper"
                      onClick={() => deleteGoal(index)}
                      disabled={tasks.length == 1}
                    >
                      <Trash2 className="delete" color="red" />
                    </button>
                  </div>
                  <div className="col col-2">
                    <input
                      type="checkbox"
                      value={task.reminder}
                      className="checkbox"
                      onChange={(e) => {
                        checkReminder(index, e.target.checked);
                      }}
                    />
                  </div>
                  <div
                    className={"col col-3 " + (task.reminder ? "disabled" : "")}
                  >
                    <div className={"slider-wrapper"}>
                      <Slider
                        defaultValue={[30]}
                        max={960}
                        min={30}
                        step={30}
                        value={[task.time]}
                        onValueChange={(e) => changeHours(index, e)}
                        disabled={task.reminder}
                      />
                    </div>
                    {task.time} minutes
                  </div>
                </div>
              );
            })}
            <div className="button-column">
              <button
                className="button  outline"
                onClick={addItem}
                disabled={tasks.length == 20}
              >
                Add new +
              </button>
              <button className="button" disabled={disabled} onClick={submit}>
                I have no more tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyGoalsWorkflow;
