import { useState } from "react";
import API from "../services/api";

function DailyUpdate() {

  const [content, setContent] = useState("");

  const username = localStorage.getItem("username");

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting:", username, content);  // ✅ DEBUG

  try {
    const response = await API.post("add-update/", {
      username,
      content
    });

    console.log("Response:", response.data);  // ✅ DEBUG

    alert("Update submitted!");
    setContent("");

  } catch (error) {
    console.error("Error:", error);  // ✅ DEBUG
    alert("Error submitting update");
  }
};

  return (
    <div className="container mt-4">

      <h2>Daily Update</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <textarea
            className="form-control"
            rows="4"
            placeholder="What did you work on today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">
          Submit
        </button>

      </form>

    </div>
  );
}

export default DailyUpdate;