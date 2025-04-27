import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";

export default function AnnouncementForm() {
  const navigator = useNavigate();
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [toast, setToast] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const allowedTypes = [
      "application/pdf", 
      "image/jpeg", 
      "image/png", 
      "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
      "application/vnd.ms-excel", 
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];

    const invalidFiles = selectedFiles.filter(file => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setFileError("Only PDF, Word, Excel, JPG, and PNG files are allowed.");
      setFiles([]);
    } else {
      setFileError("");
      setFiles(selectedFiles);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("class_id", id);

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("announcement_files[]", file);
      });
    }

    try {
      const response = await AuthenticatedUserUrl.post("/announcement/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      });

      if (response.status === 201) {
        setToast("Announcement submitted successfully!");
        reset();
        setFiles([]);
        setFileError("");
        setTimeout(() => {
          setToast("");
          navigator(`/lecture/classroom/${id}`);
        }, 3000);
      } else {
        setToast("Error submitting the announcement.");
        setTimeout(() => setToast(""), 3000);
      }
    } catch (error) {
      console.error("Error submitting announcement:", error);
      setToast("Error submitting the announcement.");
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <div className="relative">
      {toast && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
        <h2 className="text-2xl font-semibold mb-4">Make an Announcement</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="mt-1 p-2 w-full border rounded-lg"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
            <textarea
              {...register("description")}
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Files</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-1 w-full p-2 border rounded-lg"
            />
            {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-sky-900 text-white py-2 rounded-lg hover:bg-sky-700"
          >
            Submit Announcement
          </button>
        </form>
      </div>
    </div>
  );
}
