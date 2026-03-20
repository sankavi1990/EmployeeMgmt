import React, { useEffect, useState } from "react";
import API from "../services/api";

function MySalary() {

  const [salary, setSalary] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchSalary();
  }, []);

  const fetchSalary = async () => {
    try {
      const res = await API.get(`salary/?username=${username}`);
      setSalary(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const downloadPayslip = (item) => {
  const username = localStorage.getItem("username");

  const url = `http://127.0.0.1:8000/api/download-payslip/?username=${username}&month=${item.month}&year=${item.year}`;

  window.open(url, "_blank");
};

  return (
    <div className="container mt-4">

      <h3>My Salary</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payslip</th>
          </tr>
        </thead>

        <tbody>
          {salary.map((item, index) => (
            <tr key={index}>
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
  <button
    className="btn btn-primary btn-sm"
    onClick={() => downloadPayslip(item)}
  >
    Download Payslip
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default MySalary;