import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings = ({ user }) => {
  const [username, setUsername] = useState(user.username);

  return (
    <>
      <div className="settings">
        <h1 className="header">Settings</h1>
        <div className="container">
          <div className="col-1">
            <div className="group group-1">
              <p className="title">Change username</p>
            </div>
          </div>
          <div className="col-2">
            <div className="group group-1">
              <input
                type="text"
                className="input-bottom"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="button button-block">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
