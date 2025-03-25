import { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate, useParams } from "react-router-dom";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";

export default function AssignmentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const id = useParams();
  const navigator = useNavigate();

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dueDateTime = `${dueDate} ${dueTime}:00`;
    console.log(dueDateTime);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_date", dueDateTime);
    formData.append("class_id", id.id);

    // Append each file to FormData
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      // Send a POST request with the form data to the API
      const response = await AuthenticatedUserUrl.post("/assignment/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      if (response.status === 201) {
        alert("Assignment submitted successfully!");
        // Reset form after successful submission
        setTitle("");
        setDescription("");
        setFiles([]);
        setDueDate("");
        setDueTime("");
        navigator(`/lecture/classroom/${id.id}`);
      } else {
        alert("Error submitting the assignment.");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("Error submitting the assignment.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add an Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-1 w-full p-2 border rounded-lg"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Due Time</label>
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-sky-900 text-white py-2 rounded-lg hover:bg-sky-700"
        >
          Submit Assignment
        </button>
      </form>
    </div>
  );
}
