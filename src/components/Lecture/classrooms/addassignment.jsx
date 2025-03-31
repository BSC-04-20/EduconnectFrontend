import { useState } from "react";

export default function AssignmentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ title, description, files });
    alert("Assignment submitted!");
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
