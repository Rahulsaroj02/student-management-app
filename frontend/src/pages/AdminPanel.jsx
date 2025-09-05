import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setapprovedUser]= useState([]);
  
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchPendingUsers = async () => {
    
    setLoading(true);
    try {
      const res = await fetch("https://student-management-app-j0mf.onrender.com/api/admin/pending-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("admin token",localStorage.getItem("token"));
      const data = await res.json();
      console.log("Fetched users:",data);
      console.log("Fetched pending users:", Array.isArray(data));
      setPendingUsers(data.pendingUsers);


    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchapproved = async () => {
  setLoading(true);
  try {
    const res = await fetch("https://student-management-app-j0mf.onrender.com/api/admin/approved-users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("Fetched approved users:", data);
    setapprovedUser(data.approvedUsers);  // <-- note plural key here
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
};


  useEffect(() => {
    fetchPendingUsers();
    fetchapproved();
  }, []);
  const handleDelete = async (userId, action) => {
    try {
      const res = await fetch(`https://student-management-app-j0mf.onrender.com/api/admin/${action}/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMessage(data.message);
      await fetchPendingUsers(); 
      await fetchapproved()// Refresh list
    } catch (err) {
      console.error("this is error",err);
    }
  };

  const handleApproval = async (userId, action) => {
    try {
      const res = await fetch(`https://student-management-app-j0mf.onrender.com/api/admin/${action}/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMessage(data.message);
      await fetchPendingUsers(); 
      await fetchapproved()// Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container mt-4" style={ { color: "#3682a2ff" }}  >
      <h2 style={ { color: "#8368e5b3" }}>Admin Panel</h2>
      {message && <p className="alert alert-info">{message}</p>}

      <h3 style={ { color: "#000000ff" }}>Approved Users</h3>
      {approvedUsers.length === 0 ? (
        <p>No approved users</p>
      ) : (
        <table className="table table-bordered mt-3" >
          <thead>
            <tr style={ { color: "#a23694ff" }}>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {approvedUsers.map((user) => (
              <tr key={user._id}>
                <td style={{ padding: '7px' }}>{user.name}</td>
                <td style={{ padding: '7px' }}>{user.role}</td>
                <td style={{ padding: '7px' }}>{user.email}</td>
                <td style={{ padding: '7px' }}>
                  <button onClick={()=>handleDelete(user._id,"delete")}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 className="mt-4" style={ { color: "#000000ff" }}>Pending Users</h3>
      {pendingUsers.length === 0 ? (
        <p style={ { color: "#a23694ff" }}>No pending users</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td style={{ padding: '7px' }}>{user.name}</td>
                <td style={{ padding: '7px' }}>{user.role}</td>
                <td style={{ padding: '7px' }}>{user.email}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApproval(user._id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleApproval(user._id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}