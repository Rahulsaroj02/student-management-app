
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("🔐 ProtectedRoute: role =", role, "allowedRoles =", allowedRoles);

  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return (
  <div>
    <p style={{ fontWeight: "bold" }}>Access granted for: {role}</p>
    {children}
  </div>
);


}
