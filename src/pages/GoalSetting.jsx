import React from "react";
import "./GoalSetting.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useNavigate } from "react-router-dom";

const GoalSetting = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="page first goal-setting">
        <h1 className="header">Goal setting</h1>
        <Tabs defaultValue="daily" className="tabs-panel">
          <TabsList className="tab-panel-selector">
            <TabsTrigger value="daily">Daily goals</TabsTrigger>
            <TabsTrigger value="weekly">Weekly goals</TabsTrigger>
            <TabsTrigger value="6-month">6-monthly goals</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <div className="table">
              <div className="header row">
                <div className="col col-1">What is your goal?</div>
                <div className="col col-2">Weekly hours</div>
                <div className="col col-3">On weekdays</div>
                <div className="col col-4">On weekends</div>
                <div className="col col-5">Hours per day</div>
              </div>
              <div className="body">
                {user.daily_goals ? (
                  user.daily_goals.goals.map((goal, index) => {
                    return (
                      <div className="row">
                        <div className="col col-1">
                          <p>{goal.goal}</p>
                        </div>
                        <div className="col col-2">
                          <p>{goal.weeklyHours}</p>
                        </div>
                        <div className="col col-3">
                          {goal.days == "weekdays" || goal.days == "both"
                            ? "Yes"
                            : "No"}
                        </div>
                        <div className="col col-4">
                          {goal.days == "weekends" || goal.days == "both"
                            ? "Yes"
                            : "No"}
                        </div>
                        <div className="col col-5">
                          <p className="muted">
                            {(
                              goal.weeklyHours /
                              (goal.days == "both"
                                ? 7
                                : goal.days == "weekdays"
                                ? 5
                                : 2)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-goals">
                    <p>There are no goals.</p>
                  </div>
                )}
              </div>
            </div>
            <button
              className="button button-block submit"
              onClick={() => navigate("/daily-goals")}
            >
              Edit goals
            </button>
          </TabsContent>
          <TabsContent value="weekly">
            <div className="table">
              <div className="header row">
                <div className="col col-1">What is your goal?</div>
                <div className="col col-2">Weekly hours</div>
                <div className="col col-3">On weekdays</div>
                <div className="col col-4">On weekends</div>
                <div className="col col-5">Hours per day</div>
              </div>
              <div className="body">
                {user.weekly_goals ? (
                  user.weekly_goals.goals.map((goal, index) => {
                    return (
                      <div className="row">
                        <div className="col col-1">
                          <p>{goal.goal}</p>
                        </div>
                        <div className="col col-2">
                          <p>{goal.weeklyHours}</p>
                        </div>
                        <div className="col col-3">
                          {goal.days == "weekdays" || goal.days == "both"
                            ? "Yes"
                            : "No"}
                        </div>
                        <div className="col col-4">
                          {goal.days == "weekends" || goal.days == "both"
                            ? "Yes"
                            : "No"}
                        </div>
                        <div className="col col-5">
                          <p className="muted">
                            {(
                              goal.weeklyHours /
                              (goal.days == "both"
                                ? 7
                                : goal.days == "weekdays"
                                ? 5
                                : 2)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-goals">
                    <p>There are no goals.</p>
                  </div>
                )}
              </div>
            </div>
            <button
              className="button button-block submit"
              onClick={() => navigate("/weekly-goals")}
            >
              Edit goals
            </button>
          </TabsContent>
          <TabsContent value="6-month">
            <div className="table">
              <div className="header row">
                <div className="col col-1">What is your goal?</div>
                <div className="col col-2">Weekly hours</div>
                <div className="col col-3">On weekdays</div>
                <div className="col col-4">On weekends</div>
                <div className="col col-5">Hours per day</div>
              </div>
              <div className="body">
                {user.six_monthly_goals ? (
                  user.six_monthly_goals.goals.map((goal, index) => {
                    return (
                      <div className="row">
                        <div className="col col-1">
                          <p>{goal.goal}</p>
                        </div>
                        <div className="col col-2">
                          <p>{goal.weeklyHours}</p>
                        </div>
                        <div className="col col-3">
                          {goal.days == "weekdays" || goal.days == "both"
                            ? "Yes"
                            : "No"}
                        </div>
                        <div className="col col-4">
                          {goal.days == "weekends" || goal.days == "both"
                            ? "Yes"
                            : "No"}
                        </div>
                        <div className="col col-5">
                          <p className="muted">
                            {(
                              goal.weeklyHours /
                              (goal.days == "both"
                                ? 7
                                : goal.days == "weekdays"
                                ? 5
                                : 2)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-goals">
                    <p>There are no goals.</p>
                  </div>
                )}
              </div>
            </div>
            <button
              className="button button-block submit"
              onClick={() => navigate("/six-monthly-goals")}
            >
              Edit goals
            </button>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default GoalSetting;
