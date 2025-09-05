import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentPanel from "./pages/StudentPanel";
import FacultyPanel from "./pages/FacultyPanel";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Student */}
                <Route path="/student" element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <StudentPanel />
                    </ProtectedRoute>
                } />

                {/* Faculty */}
                <Route path="/faculty" element={
                    <ProtectedRoute allowedRoles={["faculty"]}>
                        <FacultyPanel />
                    </ProtectedRoute>
                } />

                {/* Admin */}
                
                <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminPanel />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
