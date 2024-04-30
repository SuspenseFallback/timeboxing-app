import React, { useEffect, useState } from "react";
import "../WeeklyGoals.css";

import { useNavigate, useSearchParams } from "react-router-dom";
import { newWeeklyGoals } from "../../firebase/firebase";
import { Progress } from "@/components/ui/progress";

import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { DatePicker } from "@/components/ui/date-picker";

import { Trash2 } from "lucide-react";

import { Slider } from "@/components/ui/slider"

const WeeklyGoals = ({ user, nextSlide }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [goal, setGoal] = useState("");
  const [hoursRequired, setHoursRequired] = useState("");
  const [deadline, setDeadline] = useState("");

  const [tasks, setTasks] = useState([]);

  const [nextWeek, setNextWeek] = useState([]);
  const days_week = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (user && user.weekly_goals) {
      setTasks(user.weekly_goals.goals);
    }

    if (nextWeek.length == 0) {
      let date = new Date();
      const copy = [];

      for (let i = 0; i < 7; i++) {
        copy.push(date);
        date = new Date(date.setDate(date.getDate() + 1));
      }

      setNextWeek(copy);
    }
  }, []);

  const changeGoal = (index, new_text) => {
    const copy = [...tasks];
    copy[index].goal = new_text;
    setTasks(copy);
  };

  const deleteGoal = (index) => {
    const copy = [...tasks];
    copy.splice(index, 1);
    setTasks(copy);
  };

  const changeHours = (index, new_text) => {
    const copy = [...tasks];
    copy[index].hoursRequired = new_text;
    setTasks(copy);
  };

  const changeDeadline = (index, date) => {
    const copy = [...tasks];
    copy[index].deadline = date.toLocaleDateString("en-sg");
    setTasks(copy);
  };

  const nextQuestion = () => {
    if (questionIndex < 3) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const newRow = (end = false) => {
    setQuestionIndex(0);
    const copy = [...tasks];
    copy.push({ goal, hoursRequired, deadline });
    setTasks(copy);

    setGoal("");
    setHoursRequired("");
    setDeadline("");

    if (end) {
      submit(copy);
    }
  };

  const submit = (new_tasks = tasks) => {
    newWeeklyGoals({ goals: new_tasks, time: new Date().toString() }).then(
      () => {
        nextSlide();
      }
    );
  };

  return (
    <motion.div>
      <div className="page first weekly-goals workflow">
        <h1 className="header">Step 3:</h1>
        <h1 className="subheader">Set your tasks for the week</h1>
        <Progress value={50} className="progress-bar" />
        <div className="layout">
          <div className="button-row">
            <button
              className="button outline"
              onClick={nextQuestion}
              disabled={tasks.length == 20 || questionIndex != 0}
            >
              Add new +
            </button>
            {tasks.length > 0 ? (
              <button className="button" onClick={nextSlide}>
                Next
              </button>
            ) : null}
          </div>

          <div className="questions">
            {questionIndex > 0 ? (
              <div className="question question-1">
                <div className="question-row">
                  <p className="q-text">Define your task</p>
                  {/* <Dialog>
                    <DialogTrigger>
                      <span className="example">(Show example)</span>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Examples of SMART tasks</DialogTitle>
                        <DialogDescription>
                          Specific, Measurable, Achievable, Realistic, Tangible
                        </DialogDescription>
                      </DialogHeader>
                      <ul>
                        <li>To be able to run 10K in 2 hours in 6 months.</li>
                        <li>To pass my Advanced Python course in 1 month.</li>
                        <li>
                          To be able to form basic sentences in French in 1
                          year.
                        </li>
                        <li>To complete my first short film in 2 years.</li>
                      </ul>
                    </DialogContent>
                  </Dialog> */}
                </div>
                <input
                  type="text"
                  className="input-bottom"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
                {questionIndex == 1 ? (
                  <button
                    className="button"
                    disabled={!goal}
                    onClick={nextQuestion}
                  >
                    Next
                  </button>
                ) : null}
              </div>
            ) : null}
            {questionIndex > 1 ? (
              <div className="question question-2">
                {" "}
                <p className="q-text">
                  How many hours do you need to complete this?
                </p>
                <select
                  value={hoursRequired}
                  onChange={(e) => setHoursRequired(e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                  <option value={17}>17</option>
                  <option value={18}>18</option>
                  <option value={19}>19</option>
                  <option value={20}>20</option>
                  <option value={21}>21</option>
                  <option value={22}>22</option>
                  <option value={23}>23</option>
                  <option value={24}>24</option>
                  <option value={25}>25</option>
                </select>
                {questionIndex == 2 ? (
                  <button
                    className="button"
                    disabled={!hoursRequired || !goal}
                    onClick={nextQuestion}
                  >
                    Next
                  </button>
                ) : null}
              </div>
            ) : null}
            {questionIndex > 2 ? (
              <div className="question question-3">
                <p className="q-text">When is your deadline?</p>
                <select
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                >
                  <option value="">--Select--</option>
                  {nextWeek.map((day) => {
                    console.log(day.toLocaleDateString());
                    return (
                      <option value={day.toLocaleDateString()}>
                        {days_week[day.getDay()]}
                      </option>
                    );
                  })}
                </select>
                {questionIndex == 3 ? (
                  <div className="button-row">
                    <button
                      className="button"
                      disabled={!deadline || !hoursRequired || !goal}
                      onClick={newRow}
                    >
                      Submit, but I have more tasks
                    </button>
                    <button
                      className="button outline"
                      disabled={!deadline || !hoursRequired || !goal}
                      onClick={() => {
                        newRow(true);
                      }}
                    >
                      Submit - I have no more tasks
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        {tasks.length > 0 ? <p className="edit">Click boxes to edit</p> : null}
        <div className="table">
          <div className="body">
            {tasks.length > 0 ? (
              <div className="header row">
                <div className="col col-1">Define a task</div>
                <div className="col col-2">Hours required</div>
                <div className="col col-3">Deadline</div>
                <div className="col col-4">Hours per day</div>
              </div>
            ) : null}
            {tasks.map((task, index) => {
              const date_diff = Math.ceil(
                (new Date(
                  tasks[index].deadline.split("/")[2],
                  parseInt(tasks[index].deadline.split("/")[1]) - 1,
                  tasks[index].deadline.split("/")[0]
                ) -
                  new Date()) /
                  (1000 * 60 * 60 * 24)
              );

              return (
                <div className="row">
                  <div className="col col-1">
                    {index + 1}
                    <input
                      type="text"
                      className="input-bottom"
                      onChange={(e) => changeGoal(index, e.target.value)}
                      value={tasks[index].goal}
                    />
                    <div
                      className="trash-wrapper"
                      onClick={() => deleteGoal(index)}
                    >
                      <Trash2 className="delete" color="red" />
                    </div>
                  </div>
                  <div className="col col-2">
                    <input
                      className="input-bottom"
                      type="number"
                      onChange={(e) => changeHours(index, e.target.value)}
                      min={1}
                      max={168}
                      value={tasks[index].hoursRequired}
                    />
                  </div>
                  <div className="col col-3">
                    <p className="text">
                      <DatePicker
                        date={
                          new Date(
                            tasks[index].deadline.split("/")[2],
                            parseInt(tasks[index].deadline.split("/")[1]) - 1,
                            tasks[index].deadline.split("/")[0]
                          )
                        }
                        toDate={
                          new Date(new Date().setDate(new Date().getDate() + 7))
                        }
                        onSelect={(date) => changeDeadline(index, date)}
                      />
                    </p>
                  </div>
                  <div className="col col-4">
                    <p className="muted">
                      {(task.hoursRequired / date_diff).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyGoals;
