import React, { useEffect, useState } from "react";
import "./FacultyPanel.css"; // <-- import the CSS

const FacultyPanel = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5001/api/faculty/students", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch student list");
        }

        const data = await res.json();
        setStudents(data.students);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleUpdate = async (id, field, value) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5001/api/faculty/students/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (!res.ok) {
        throw new Error("Failed to update student");
      }

      setStudents(prev =>
        prev.map(student =>
          student._id === id ? { ...student, [field]: value } : student
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading student list...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="faculty-panel">
      <h2>Faculty Panel</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <input
                  type="number"
                  value={student.marks ?? ""}
                  onChange={e => handleUpdate(student._id, "marks", Number(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={student.attendance ?? ""}
                  onChange={e => handleUpdate(student._id, "attendance", Number(e.target.value))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyPanel;
