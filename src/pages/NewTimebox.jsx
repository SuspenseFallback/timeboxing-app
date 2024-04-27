import React, { useState, useEffect } from "react";
import "../pages/NewTimebox.css";
import { Calendar } from "@/components/ui/calendar";
import { ChevronRight, Trash2 } from "lucide-react";

import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";

const NewTimebox = () => {
  const [date, setDate] = useState(new Date());
  const [index, setIndex] = useState(1);
  const [items, setItems] = useState(["", "", "", "", ""]);

  const deleteItem = (i) => {
    const copy = [...items];
    copy.splice(i, 1);
    setItems(copy);
  };

  const addItem = () => {
    const copy = [...items];
    copy.push("");
    setItems(copy);
  };

  return (
    <>
      <div className="page first new-timebox">
        <div className={`slides index-${index}`}>
          <div className="slide slide-1">
            <div className="text-container">
              <h2 className="header">Step 1 of 4</h2>
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
              <Button className="outline" onClick={() => setIndex(index + 1)}>
                Next
              </Button>
            </div>
          </div>
          <div className="slide slide-2">
            <div className="text-container">
              <h2 className="header">Step 2 of 4</h2>
              <p className="caption">What do you need to do on this day?</p>
            </div>
            <div className="items-wrapper">
              {items.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <button
                      className="icon"
                      disabled={items.length == 1}
                      onClick={() => deleteItem(index)}
                    >
                      <Trash2 />
                    </button>
                    <p className="index">{index + 1}</p>
                    <Input />
                  </div>
                );
              })}
            </div>
            <Button
              className="outline"
              onClick={addItem}
              disabled={items.length >= 24}
            >
              Add item
            </Button>
          </div>
          <div className="slide slide-3">
            <h2 className="header">Step 3 of 4</h2>
          </div>
          <div className="slide slide-4">
            <h2 className="header">Step 4 of 4</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTimebox;
