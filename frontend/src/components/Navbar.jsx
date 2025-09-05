// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {role === "student" && <Link to="/student">My Details</Link>}
      {role === "faculty" && <Link to="/faculty">Faculty Panel</Link>}
      {role === "admin" && <Link to="/admin">Admin Panel</Link>}
      {role ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
