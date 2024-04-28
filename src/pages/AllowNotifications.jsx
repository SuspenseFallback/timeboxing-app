import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const AllowNotifications = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      console.log("Requesting permission...");
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          navigate("/");
        }
      });
    }, 2000);
  }, []);

  return (
    <>
      <div className="page">
        <p>Please allow notifications so that the app functions properly.</p>
      </div>
    </>
  );
};

export default AllowNotifications;
