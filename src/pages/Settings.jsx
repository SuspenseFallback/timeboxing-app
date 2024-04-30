import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  return (
    <>
      <div className="settings">
        <h1 className="header">Settings</h1>
        <div className="container">
          <div className="col-1">
            <div className="group group-1">
              <p className="title">Change username</p>
            </div>
            <div className="group group-2">
              <p className="title">Change email</p>
            </div>
            <div className="group group-3">
              <p className="title">Recalibrate settings</p>
            </div>
            <div className="group group-4">
              <p className="title">Change password</p>
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
            <div className="group group-2">
              <input
                type="text"
                className="input-bottom"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="button button-block">Save</button>
            </div>
            <div className="group group-3">
              <button
                className="button"
                onClick={() =>
                  window.open("/sign-up-workflow", "_blank").focus()
                }
              >
                Open link in new tab
              </button>
            </div>
            <div className="group group-4">
              <input
                type="password"
                className="input-bottom"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
