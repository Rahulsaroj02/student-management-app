import React, { useEffect, useState } from "react";

const StudentPanel = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in");
          setLoading(false);
          return;
        }

        const res = await fetch("https://student-management-app-j0mf.onrender.com/api/student/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch student details");
        }
        const data = await res.json();
        // const dataa=await 
        console.log("student data",data);
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <p>Loading your details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }} >
      <h2>Welcome, {student.name}</h2>
      <p><strong>Roll No:</strong> {student.rollNo}</p>
      <p><strong>Marks:</strong> {student.marks ?? "Not updated yet"}</p>
      <p><strong>Attendance:</strong> {student.attendance ?? "Not updated yet"}</p>
    </div>
  );
};

export default StudentPanel;
