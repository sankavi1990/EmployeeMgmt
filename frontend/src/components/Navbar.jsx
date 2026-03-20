import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/home">
          EmployeeMgmt
        </Link>

        <div>

          {/* Admin Menu */}
          {role === "admin" && (
            <>
              <Link className="btn btn-light me-2" to="/employees">
                Employees
              </Link>
              <Link className="btn btn-light me-2" to="/attendance">
                Attendance
              </Link>
              <Link to="/admin-leaves" className="btn btn-light me-2">
              Leave Requests
              </Link>
              <Link to="/admin-updates" className="btn btn-light me-2">
               Daily Updates
              </Link>
              <Link to="/dashboard" className="btn btn-light me-2">
               Dashboard
              </Link>
              <Link to="/salary-admin" className="btn btn-light me-2">
              Salary
              </Link>
            </>
          )}

          {/* Employee Menu */}
          {role === "employee" && (
            <>
              <Link className="btn btn-light me-2" to="/profile">
                My Profile
              </Link>
              <Link to="/apply-leave" className="btn btn-light me-2">
               Apply Leave
              </Link>
              <Link className="btn btn-light me-2" to="/leave-status">
                Leave Status
              </Link>
              <Link to="/daily-update" className="btn btn-light me-2">
                Daily Update
              </Link>
              <Link to="/attendance" className="btn btn-light me-2">
               Attendance
              </Link>
              <Link to="/my-salary" className="btn btn-light me-2">
               My Salary
              </Link>
            </>
          )}

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;