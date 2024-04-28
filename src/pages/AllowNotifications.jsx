import React, { useEffect } from "react";

const AllowNotifications = () => {
  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }

  useEffect(() => {
    setTimeout(requestPermission, 2000);
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
