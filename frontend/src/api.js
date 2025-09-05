import axios from "axios";

const API = axios.create({ baseURL: "https://student-management-app-j0mf.onrender.com/api" });

// Attach token to every request if present
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
