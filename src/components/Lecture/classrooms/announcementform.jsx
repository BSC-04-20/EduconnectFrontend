import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { useNavigate, useParams } from "react-router-dom";

export default function AnnouncementForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const navigator = useNavigate();
  const id = useParams();

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send form data including files
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("class_id", id.id)

    // Append each file to FormData
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await AuthenticatedUserUrl.post("/announcement/create", formData);

      if (response.status === 201) {
        alert("Announcement submitted successfully!");
        setTitle("");
        setDescription("");
        setFiles([]);
        navigator(`/lecture/classroom/${id.id}`)
      } else {
        alert("Error submitting the announcement.");
      }
    } catch (error) {
      console.error("Error submitting announcement:", error);
      alert("Error submitting the announcement.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Make an Announcement</h2>
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
          <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
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
        <button
          type="submit"
          className="w-full bg-sky-900 text-white py-2 rounded-lg hover:bg-sky-700"
        >
          Submit Announcement
        </button>
      </form>
    </div>
  );
}
