import React, { useState, useEffect } from "react";
import "./Settings.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const Settings = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    document.title = "Settings | Samayam";
  }, []);

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
              {username ? (
                <Dialog>
                  <DialogTrigger>
                    <div
                      className={
                        "button button-block " + (username ? "" : "disabled")
                      }
                    >
                      Save
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to change your username?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <button className="button outline">Cancel</button>
                      <button className="button">Proceed</button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : null}
            </div>
            <div className="group group-2">
              <input
                type="text"
                className="input-bottom"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {username ? (
                <Dialog>
                  <DialogTrigger>
                    <div
                      className={
                        "button button-block " + (username ? "" : "disabled")
                      }
                    >
                      Save
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to change your email?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <button className="button outline">Cancel</button>
                      <button className="button">Proceed</button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : null}
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
