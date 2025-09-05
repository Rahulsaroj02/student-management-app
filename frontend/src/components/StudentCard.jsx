// components/StudentCard.jsx
export default function StudentCard({ student }) {
  return (
    <div style={{ border: "1px solid black", padding: "1rem", margin: "1rem" }}>
      <h3>{student.name}</h3>
      <p>Marks: {student.marks}</p>
      <p>Attendance: {student.attendance}%</p>
    </div>
  );
}
