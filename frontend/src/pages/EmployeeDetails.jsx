import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeDetails() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await API.get("employees/");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Employee List</h2>
      <input
  type="text"
  placeholder="Search by username..."
  className="form-control mb-3"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
        {/* <button className="btn btn-primary mb-3">
           Add Employee
        </button> */}

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Joining Date</th>
          </tr>
        </thead>

        <tbody>
          {employees
  .filter((emp) =>
    emp.user.toLowerCase().includes(search.toLowerCase())
  )
  .map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.user}</td>
              <td>{emp.email}</td>
              <td>{emp.joining_date}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default EmployeeDetails;