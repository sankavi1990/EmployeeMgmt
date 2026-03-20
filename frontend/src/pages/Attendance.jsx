import React, { useEffect, useState } from "react";
import API from "../services/api";

function Attendance() {
 const username = localStorage.getItem("username")?.trim();
  const [attendance, setAttendance] = useState([]);
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState("");
  const role = localStorage.getItem("role");
  

  useEffect(() => {
  fetchAttendance();

  const today = new Date().toISOString().split("T")[0];
  setDate(today);
   }, []);

  const fetchAttendance = async () => {
  try {
    const username = localStorage.getItem("username")?.trim();
    const role = localStorage.getItem("role");

    let res;

    if (role === "admin") {
      // 👨‍💼 Admin → get ALL records
      res = await API.get("attendance/");
    } else {
      // 👨‍💻 Employee → get ONLY their records
      res = await API.get(`attendance-filter/?username=${username}`);
    }

    setAttendance(res.data);
  } catch (error) {
    console.error(error);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("mark-attendance/", {
        username,
        status,
        date
      });

      alert("Attendance marked ✅");
      fetchAttendance();
      setUsername("");
    } catch (error) {
      alert("Error marking attendance ❌");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Attendance</h3>

      {/* FORM */}
      {role === "employee" && (
  <form onSubmit={handleSubmit} className="mb-4">
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="form-control mb-2"
    required
  />

  <select
    className="form-control mb-2"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="Present">Present</option>
    <option value="Absent">Absent</option>
    <option value="Leave">Leave</option>
  </select>

  <button className="btn btn-primary">Mark Attendance</button>
</form>
      )}


      {/* TABLE */}
      <table className="table mt-4">
  <thead>
    <tr>
      <th>Employee</th>
      <th>Date</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {attendance.map((item, index) => (
      <tr key={index}>
        <td>{item.employee}</td>
        <td>{item.date}</td>
        <td>
          <span
            className={
              item.status === "Present"
                ? "badge bg-success"
                : item.status === "Absent"
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

export default Attendance;