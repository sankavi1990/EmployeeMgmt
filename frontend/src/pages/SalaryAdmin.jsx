import React, { useEffect, useState } from "react";
import API from "../services/api";

function SalaryAdmin() {

  const [username, setUsername] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [amount, setAmount] = useState("");
  const [salary, setSalary] = useState([]);

  useEffect(() => {
    fetchSalary();
  }, []);

  const fetchSalary = async () => {
    try {
      const res = await API.get("salary/");
      setSalary(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("add-salary/", {
        username,
        month,
        year,
        amount
      });

      alert("Salary added ✅");
      fetchSalary();

      setUsername("");
      setMonth("");
      setYear("");
      setAmount("");
    } catch (error) {
      alert("Error ❌");
    }
  };

   const markPaid = async (id) => {
  try {
    await API.post("update-salary/", {
      id,
      status: "Paid"
    });

    alert("Salary marked as Paid ✅");
    fetchSalary();
  } catch (error) {
    alert("Error ❌");
  }
};

  return (
    <div className="container mt-4">

      <h3>Salary Management</h3>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-4">

        <input
          type="text"
          placeholder="Employee Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-2"
          required
        />

        <input
          type="text"
          placeholder="Month (e.g. March)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="form-control mb-2"
          required
        />

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="form-control mb-2"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control mb-2"
          required
        />

        <button className="btn btn-primary">Add Salary</button>
      </form>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Month</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {salary.map((item, index) => (
            <tr key={index}>
              <td>{item.employee}</td>
              <td>{item.month}</td>
              <td>{item.year}</td>
              <td>₹ {item.amount}</td>
              <td>
                 <span
                    className={
                    item.status === "Paid"
                     ? "badge bg-success"
                    : "badge bg-warning text-dark"
                }
               >
                {item.status}
                </span>
            </td>

            <td>
              {item.status !== "Paid" && (
                <button
                className="btn btn-success btn-sm"
                onClick={() => markPaid(item.id)}
                >
                Mark as Paid
                </button>
                 )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default SalaryAdmin;