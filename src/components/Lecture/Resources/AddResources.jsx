import { useState } from "react";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { useParams } from "react-router-dom";

export default function AddResources() {
  const [fileQueue, setFileQueue] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {id} = useParams()
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const exists = fileQueue.some((f) => f.name === file.name);
      if (!exists) {
        setFileQueue((prev) => [...prev, file]);
        setSelectedFile(file);
      } else {
        alert("This file is already selected.");
      }
    }

    e.target.value = ""; // Reset so same file can be reselected
  };

  const handleRemove = (index) => {
    const updatedQueue = fileQueue.filter((_, i) => i !== index);
    setFileQueue(updatedQueue);
    setSelectedFile(updatedQueue[updatedQueue.length - 1] || null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please provide a title.");
      return;
    }

    if (fileQueue.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    // Check if file is selected in the file input
    if (!selectedFile) {
      alert("Please choose a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description || "");
    formData.append("class_id", id)

    fileQueue.forEach((file) => {
      formData.append("files[]", file); // Multiple files with the same key
    });

    try {
      const response = await AuthenticatedUserUrl.post("/resources/create", formData);
      if (response.status !== 200) {
        throw new Error("Upload failed.");
      }
      alert("Upload successful!");

      // Clear form
      setFileQueue([]);
      setSelectedFile(null);
      setTitle("");
      setDescription("");

    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="pt-20 sm:pt-20 md:pt-20 px-4">
      <form
        onSubmit={handleUpload}
        className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white shadow-md rounded-xl flex flex-col gap-4"
      >
        <h2 className="text-lg sm:text-xl font-bold text-center text-gray-800">
          Upload Resources
        </h2>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        {/* Description Input */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          rows={3}
        />

        {/* File Input */}
        <div className="relative w-full mb-2">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 opacity-0 absolute inset-0 z-10 cursor-pointer"
          />
          <div className="flex items-center justify-between text-sm bg-white border border-gray-300 rounded-md px-4 py-2 cursor-pointer">
            <span className="truncate text-gray-600">
              {selectedFile ? selectedFile.name : "Choose Files"}
            </span>
          </div>
        </div>

        {/* File Queue List */}
        {fileQueue.length > 0 && (
          <div className="text-sm text-gray-600 space-y-1">
            {fileQueue.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
              >
                <span className="truncate max-w-[70%] sm:max-w-[80%]">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="ml-2 text-red-600 hover:text-red-400 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <button
          type="submit"
          className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
