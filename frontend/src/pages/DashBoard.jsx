// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      navigate("/login"); // Not logged in
    } else {
      if (role === "student") {
        navigate("/student");
      } else if (role === "faculty") {
        navigate("/faculty");
      } else if (role === "admin") {
        navigate("/admin");
      }
    }
  }, [navigate]);

  return <div>Loading dashboard...</div>;
};

export default Dashboard;
