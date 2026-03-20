import { useEffect, useState } from "react";
import API from "../services/api";

function ViewUpdates() {

  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    const response = await API.get("updates/");
    setUpdates(response.data);
  };

  return (
    <div className="container mt-4">

      <h2>Employee Daily Updates</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {updates.map((u, index) => (
            <tr key={index}>
              <td>{u.user}</td>
              <td>{u.date}</td>
              <td>{u.content}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default ViewUpdates;