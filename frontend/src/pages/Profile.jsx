import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

  const [profile, setProfile] = useState({});

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get(`my-profile/?username=${username}`);
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  return (
    <div classname="text-center">
    <div className="container mt-4">

      <h2>My Profile</h2>

      <div className="card p-3 mt-3">
                {/* Profile Image */}
                {profile.photo && (
                <img
                src={`http://127.0.0.1:8000${profile.photo}`}
                alt="Profile"
                style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" }}
                className="mb-3"
                />
                )}


        <p><strong>Username:</strong> {profile.user}</p>
        <p><strong>Employee ID:</strong> {profile.employee_id}</p>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone Number:</strong> {profile.phone}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Qualification:</strong> {profile.qualification}</p>
        <p><strong>Department:</strong> {profile.department}</p>
        <p><strong>Designation:</strong> {profile.designation}</p>
        <p><strong>Joining Date:</strong> {profile.joining_date}</p>
        

      </div>

    </div>
    </div>
  );
}

export default Profile;