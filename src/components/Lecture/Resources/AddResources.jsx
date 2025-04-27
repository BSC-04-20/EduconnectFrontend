import { useState } from "react";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddResources() {
  const [fileQueue, setFileQueue] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [toast, setToast] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  
  const navigate = useNavigate();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({mode: "onChange"});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const exists = fileQueue.some((f) => f.name === file.name);
      if (!exists) {
        setFileQueue((prev) => [...prev, file]);
        setSelectedFile(file);
      } else {
        setToast("This file is already selected.");
        setTimeout(() => setToast(""), 3000);
      }
    }
    e.target.value = "";
  };

  const handleRemove = (index) => {
    const updated = fileQueue.filter((_, i) => i !== index);
    setFileQueue(updated);
    setSelectedFile(updated[updated.length - 1] || null);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleUpload = async (data) => {
    if (!data.title.trim()) return showToast("Please provide a title.");
    if (fileQueue.length === 0) return showToast("Please select at least one file.");
    if (!selectedFile) return showToast("Please choose a file to upload.");

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("class_id", id);
    fileQueue.forEach((file) => formData.append("files[]", file));

    try {
      const res = await AuthenticatedUserUrl.post("/resources/create", formData);
      if (res.status !== 200) throw new Error();
      showToast("Upload successful!");
      setFileQueue([]); setSelectedFile(null);
      setValue("title", ""); setValue("description", "");

      
      navigate(`/lecture/classroom/${id}`);
    } catch {
      showToast("Error uploading file. File too big");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 px-4 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 max-w-max">
          {toast}
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleUpload)}
        className="w-full max-w-md mx-auto bg-white shadow-md rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center text-gray-800">Upload Resources</h2>

        {/* Title Input */}
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Title"
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        {errors.title  && <p className="text-red-500 text-xs">{errors.title.message}</p>}

        {/* Description Input */}
        <textarea
          {...register("description")}
          placeholder="Description (optional)"
          className="border border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          rows={3}
        />

        {/* File Input */}
        <div className="relative w-full mb-2">
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 text-sm">
            <span className="truncate text-gray-600">
              {selectedFile ? selectedFile.name : "Choose Files"}
            </span>
          </div>
        </div>
        {/* Validation Error for File */}
        {fileQueue.length === 0 && <p className="text-red-500 text-xs">At least one file must be selected.</p>}

        {fileQueue.length > 0 && (
          <div className="space-y-1 text-sm text-gray-600">
            {fileQueue.map((file, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
              >
                <span className="truncate max-w-[70%]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="text-red-600 hover:text-red-400 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-sky-900 text-white py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
