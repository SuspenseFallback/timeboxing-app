import React, { useState, useEffect } from "react";
import "./SignUp.css";

import Button from "../components/Button.jsx";
import { Input } from "../components/ui/input";
import { signInWithEmail } from "../firebase/firebase";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Toggle } from "../components/ui/toggle";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setError("");
    }

    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = () => {
    signInWithEmail(email, password, (data, err) => {
      if (err) {
        console.error(err);
        setError("Invalid credentials");
        setDisabled(true);
      } else {
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="page login first">
      <div className="form">
        <h1 className="header">Log in</h1>
        <Input
          placeholder="Email goes here..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex w-full max-w-sm items-center space-x-1">
          <Input
            type={visible ? "text" : "password"}
            placeholder="Password goes here..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <Toggle
            aria-label="Toggle visibility"
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Toggle>
        </div>
        <p className="error">{error}</p>
        <Button onClick={handleSubmit} className="submit" disabled={disabled}>
          Submit
        </Button>
        <p className="sign-up">
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/sign-up")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
