import React, { useEffect, useState } from "react";
import API from "../services/api";

function LeaveStatus() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
  try {
    const username = localStorage.getItem("username");

    const res = await API.get(`leaves/?username=${username}`);
    setLeaves(res.data);
  } catch (error) {
    console.error(error);
  }
 };

  return (
    <div className="container mt-4">
      <h3>My Leave Status</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((item) => (
            <tr key={item.id}>
              <td>{item.reason}</td>
              <td>{item.start_date}</td>
              <td>{item.end_date}</td>
              <td>
                <span
                  className={
                    item.status === "Approved"
                      ? "badge bg-success"
                      : item.status === "Rejected"
                      ? "badge bg-danger"
                      : "badge bg-warning text-dark"
                  }
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveStatus;