import React, { useEffect, useState } from "react";
import { getUser } from "../firebase/firebase";
import { useNavigate } from "react-router";

import Spinner from "../components/Spinner";

const ReverseProtectedRoute = ({ children }) => {
  const [loading, set_loading] = useState(true);
  const [user, set_user] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUser((data) => {
      if (data) {
        set_loading(false);
        navigate("/dashboard");
      } else {
        set_user(data);
        set_loading(false);
      }
    });
  }, []);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        user: user,
      });
    });
  };

  return loading ? (
    <div className="page">
      <Spinner />
    </div>
  ) : (
    <>{renderChildren()}</>
  );
};

export default ReverseProtectedRoute;
