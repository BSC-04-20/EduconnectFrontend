import { useState } from "react";

export default function AddResources() {
  const [fileQueue, setFileQueue] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleUpload = (e) => {
    e.preventDefault();
    if (fileQueue.length === 0) {
      alert("Please select a file first.");
      return;
    }
    fileQueue.forEach((file) => {
      console.log("Uploading:", file.name);
      // Upload logic here
    });
  };

  return (
    <div className="pt-40">
        <form
      onSubmit={handleUpload}
      className="w-full max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-center text-gray-800">Upload Resources</h2>

      {/* Custom file input display */}
      <div className="relative w-full mb-2">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 opacity-0 absolute inset-0 z-10 cursor-pointer"
        />
        <div
          className="flex items-center justify-between text-sm bg-white border border-gray-300 rounded-md px-4 py-2 cursor-pointer"
        >
          <span className="truncate text-gray-600">
            {selectedFile ? selectedFile.name : "Choose Files"}
          </span>
        </div>
      </div>
      
      {/* List of all files in the queue */}
      {fileQueue.length > 0 && (
        <div className="text-sm text-gray-600 space-y-1">
          {fileQueue.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
            >
              <span className="truncate max-w-[80%]">{file.name}</span>
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
