import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
  try {
    const res = await API.get("leaves/");
    setLeaves(res.data);
  } catch (error) {
    console.error(error);
  }
};

 

const updateStatus = async (id, status) => {
  try {
    await API.post("update-leave/", {
      id,
      status
    });

    alert("Status updated successfully ✅");
    fetchLeaves();
  } catch (error) {
    alert("Error updating status ❌");
  }
};

  return (
    <div className="container mt-4">
      <h3>Leave Requests</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((item) => (
            <tr key={item.id}>
              <td>{item.employee}</td>
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
              <td>
                <button
                   className="btn btn-success btn-sm me-2"
                   onClick={() => updateStatus(item.id, "Approved")}
                >
                 Approve
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => updateStatus(item.id, "Rejected")}
                >
                Reject
               </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminLeaves;