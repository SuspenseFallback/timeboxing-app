import React, { useEffect, useState } from "react";
import "./SixMonthlyGoals.css";

import { useNavigate, useSearchParams } from "react-router-dom";
import { newSixMonthlyGoals } from "../firebase/firebase";

import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

const SixMonthlyGoals = ({ user }) => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [isNew, setIsNew] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [goal, setGoal] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [days, setDays] = useState("");

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (user && user.six_monthly_goals) {
      setGoals(user.six_monthly_goals.goals);
    }

    if (searchParams.get("new")) {
      setIsNew(true);
    }
  }, []);

  useEffect(() => {
    console.log(goal, weeklyHours, days);
  }, [goal, weeklyHours, days]);

  useEffect(() => {
    console.log(goals);
  }, [goals]);

  const changeGoal = (index, new_text) => {
    const copy = [...goals];
    copy[index].goal = new_text;
    setGoals(copy);
  };

  const deleteGoal = (index) => {
    const copy = [...goals];
    copy.splice(index, 1);
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

  const nextQuestion = () => {
    if (questionIndex < 3) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const newRow = () => {
    setQuestionIndex(0);
    const copy = [...goals];
    copy.push({ goal, weeklyHours, days });
    setGoal("");
    setWeeklyHours("");
    setDays("");

    setGoals(copy);
  };

  const submit = () => {
    newSixMonthlyGoals({ goals: goals, time: new Date().toString() }).then(
      () => {
        if (isNew) {
          navigate("/weekly-goals?new=true");
        } else {
          navigate("/dashboard");
        }
      }
    );
  };

  useEffect(() => {
    document.title = "Long-term goals | Samayam";
  }, []);

  return (
    <motion.div>
      <div className="page first six-monthly-goals">
        <h1 className="header">Set your goals for the next six months</h1>
        <div className="layout">
          <div className="button-row">
            <button
              className="button outline"
              onClick={nextQuestion}
              disabled={goals.length == 20 || questionIndex != 0}
            >
              Add new +
            </button>
          </div>

          <div className="questions">
            {questionIndex > 0 ? (
              <div className="question question-1">
                <div className="question-row">
                  <p className="q-text">
                    Define your SMART goal (Specific, Measurable, Achievable,
                    Realistic, Tangible)
                  </p>
                  <Dialog>
                    <DialogTrigger>
                      <span className="example">(Show example)</span>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Examples of SMART goals</DialogTitle>
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
                  </Dialog>
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
                  How many hours are you going to commit weekly?
                </p>
                <select
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(e.target.value)}
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
                    disabled={!weeklyHours || !goal}
                    onClick={nextQuestion}
                  >
                    Next
                  </button>
                ) : null}
              </div>
            ) : null}
            {questionIndex > 2 ? (
              <div className="question question-3">
                <p className="q-text">What days can you work on your goal?</p>
                <select value={days} onChange={(e) => setDays(e.target.value)}>
                  <option value="">--Select--</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="both">Both</option>
                </select>
                {questionIndex == 3 ? (
                  <div className="button-row">
                    <button
                      className="button"
                      disabled={!days || !weeklyHours || !goal}
                      onClick={newRow}
                    >
                      Submit, but I have more goals
                    </button>
                    <button
                      className="button outline"
                      disabled={!days || !weeklyHours || !goal}
                      onClick={() => {
                        newRow();
                        submit();
                      }}
                    >
                      Submit - I have no more goals
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        {goals.length > 0 ? <p className="edit">Click boxes to edit</p> : null}
        <div className="table">
          <div className="body">
            {goals.length > 0 ? (
              <div className="header row">
                <div className="col col-1">Define a SMART goal</div>
                <div className="col col-2">Committed weekly hours</div>
                <div className="col col-3">On weekdays</div>
                <div className="col col-4">On weekends</div>
                <div className="col col-5">Hours per day</div>
              </div>
            ) : null}
            {goals.map((goal, index) => {
              return (
                <div className="row">
                  <div className="col col-1">
                    {index + 1}
                    <input
                      type="text"
                      className="input-bottom"
                      onChange={(e) => changeGoal(index, e.target.value)}
                      value={goals[index].goal}
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
          </div>
        </div>
        {/* <button className="button button-block submit" onClick={submit}>
          {isNew ? "Next" : "Submit"}
        </button>
        <p className="muted">
          You can change these once they have been submitted.
        </p> */}
      </div>
    </motion.div>
  );
};

export default SixMonthlyGoals;
