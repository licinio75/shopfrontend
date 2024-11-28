// src/components/RequireAuth.js
import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", {
        state: {
          message: "You must be logged in to access this page.",
          from: location,
        },
      });
    }
  }, [user, loading, navigate, location]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return children;
};

export default RequireAuth;
