import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/updates/");
      setUpdates(response.data);
    } catch (error) {
      console.error("Error fetching updates", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Employee Daily Updates</h3>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Update</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {updates.map((item, index) => (
            <tr key={index}>
              <td>{item.user}</td>
              <td>{item.content}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUpdates;