import React, { useState } from "react";
import axios from "axios";

function LeaveApply() {
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const username = localStorage.getItem("username");

  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/apply-leave/", {
        username,
        reason,
        start_date: fromDate,
        end_date: toDate
      });

      alert("Leave Applied Successfully");
    } catch (error) {
      console.error(error);
      alert("Error applying leave");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Apply Leave</h3>

      <input type="date" onChange={(e) => setFromDate(e.target.value)} />
      <input type="date" onChange={(e) => setToDate(e.target.value)} />

      <textarea
        placeholder="Reason"
        onChange={(e) => setReason(e.target.value)}
      />

      <button className="btn btn-primary mt-2" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default LeaveApply;