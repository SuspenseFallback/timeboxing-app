import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Separator } from "@/components/ui/separator";
import "./ViewTimebox.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams, useNavigate } from "react-router";

import Button from "../components/Button.jsx";

const ViewTimebox = ({ user }) => {
  const { day } = useParams();
  const date = day.replaceAll("-", "/");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const today = user.boxes.filter((b) => b.date == date);

    if (today.length > 0) {
      setActivities(today[0].activities);
    }

    setLoading(false);
  }, []);

  return loading ? (
    <div className="page first">
      <Spinner />
    </div>
  ) : (
    <div className="page first view-timebox">
      <h1 className="header">View timebox for {date}</h1>
      {activities ? (
        <>
          <ScrollArea className="time-scroll rounded-md border p-4">
            <ul className="times-wrapper">
              {activities.map((item, index) => {
                return (
                  <>
                    <li className="time-item">
                      <p className="time">{item.time}</p>
                      <p className="activity">{item.activity}</p>
                    </li>
                    <li>
                      <Separator />
                    </li>
                  </>
                );
              })}
            </ul>
          </ScrollArea>
          <br />
          <Button onClick={() => navigate("/edit-timebox/" + day)}>
            Edit timebox
          </Button>
        </>
      ) : (
        <>
          <p>There is no timebox for today.</p>
          <br />
          <Button onClick={() => navigate("/new-timebox")}>
            Create timebox
          </Button>
        </>
      )}
    </div>
  );
};

export default ViewTimebox;
