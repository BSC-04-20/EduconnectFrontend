import { useState } from "react";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";

export default function AddResources({ isOpen, onClose, classId }) {
  const [fileQueue, setFileQueue] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false); // New state

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

    if (!selectedFile) {
      alert("Please choose a file to upload.");
      return;
    }

    setIsUploading(true); // Start loading

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description || "");
    formData.append("class_id", classId);

    fileQueue.forEach((file) => {
      formData.append("files[]", file);
    });

    try {
      const response = await AuthenticatedUserUrl.post("/resources/create", formData);
      if (response.status !== 200) {
        throw new Error("Upload failed.");
      }
      alert("Upload successful!");
      clearForm();
      onClose();
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error uploading file.");
    } finally {
      setIsUploading(false); // End loading
    }
  };

  const clearForm = () => {
    setFileQueue([]);
    setSelectedFile(null);
    setTitle("");
    setDescription("");
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Upload Resources</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            disabled={isUploading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            disabled={isUploading}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
            rows={3}
            disabled={isUploading}
          />

          <div className="relative w-full mb-2">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 opacity-0 absolute inset-0 z-10 cursor-pointer"
              disabled={isUploading}
            />
            <div className="flex items-center justify-between text-sm bg-white border border-gray-300 rounded-md px-4 py-2 cursor-pointer">
              <span className="truncate text-gray-600">
                {selectedFile ? selectedFile.name : "Choose Files"}
              </span>
            </div>
          </div>

          {fileQueue.length > 0 && (
            <div className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
              {fileQueue.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                >
                  <span className="truncate max-w-[70%]">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="ml-2 text-red-600 hover:text-red-400 text-xs"
                    disabled={isUploading}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-900 text-white rounded-md hover:bg-sky-700 transition disabled:opacity-60"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
