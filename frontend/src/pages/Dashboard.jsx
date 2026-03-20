import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("dashboard/");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>

      <div className="row mt-4">

        <div className="col-md-4">
          <div className="card text-white bg-primary p-3">
            <h5>Total Employees</h5>
            <h2>{data.total_employees}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success p-3">
            <h5>Total Leaves</h5>
            <h2>{data.total_leaves}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning p-3">
            <h5>Pending Leaves</h5>
            <h2>{data.pending_leaves}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;