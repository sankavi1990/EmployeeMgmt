import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("login/", {
        username,
        password
      });

      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);
      // For now just redirect
      navigate("/home");

    } catch (error) {
      alert("Invalid Login");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-4">
          <div className="card shadow p-4">

            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleLogin}>

              <div className="mb-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-primary w-100">
                Login
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;