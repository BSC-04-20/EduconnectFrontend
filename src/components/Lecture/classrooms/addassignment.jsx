import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { useForm } from "react-hook-form";

export default function AssignmentForm() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateTimeError, setDateTimeError] = useState("");
  const [toastMessage, setToastMessage] = useState(""); // NEW

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length === 0) {
      setFileError("");
      setFiles([]);
    } else {
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      const invalidFiles = selectedFiles.filter(
        (file) => !allowedTypes.includes(file.type)
      );

      if (invalidFiles.length > 0) {
        setFileError("Only PDF, Word, Excel, JPG, or PNG files are allowed");
        setFiles([]);
      } else {
        setFileError("");
        setFiles(selectedFiles);
      }
    }
  };

  const onSubmit = async (data) => {
    if (fileError) {
      return;
    }

    const selectedDateTime = new Date(`${data.dueDate}T${data.dueTime}`);
    const now = new Date();

    if (isNaN(selectedDateTime.getTime())) {
      setDateTimeError("Invalid date or time selected.");
      return;
    }

    if (selectedDateTime <= now) {
      setDateTimeError("Due date and time must be in the future.");
      return;
    }

    setDateTimeError("");
    setIsSubmitting(true);

    const dueDateTimeFormatted = selectedDateTime
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("due_date", dueDateTimeFormatted);
    formData.append("class_id", id);

    files.forEach((file) => {
      formData.append("files[]", file);
    });

    try {
      const response = await AuthenticatedUserUrl.post(
        "/assignment/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setToastMessage("Assignment submitted successfully!");
        reset();
        setFiles([]);
        setFileError("");
        setTimeout(() => {
          setToastMessage("");
          navigator(`/lecture/classroom/${id}`);
        }, 3000);
      } else {
        alert("Error submitting the assignment.");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("Error submitting the assignment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg animate-fadeIn">
          {toastMessage}
        </div>
      )}

      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
        <h2 className="text-2xl font-semibold mb-4">Add an Assignment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="mt-1 p-2 w-full border rounded-lg"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 p-2 w-full border rounded-lg"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Files (optional)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-1 w-full p-2 border rounded-lg"
            />
            {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                {...register("dueDate", { required: "Due Date is required" })}
                className="mt-1 p-2 w-full border rounded-lg"
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Due Time
              </label>
              <input
                type="time"
                {...register("dueTime", { required: "Due Time is required" })}
                className="mt-1 p-2 w-full border rounded-lg"
              />
              {errors.dueTime && (
                <p className="text-red-500 text-sm">{errors.dueTime.message}</p>
              )}
            </div>
          </div>

          {dateTimeError && (
            <p className="text-red-500 text-sm">{dateTimeError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-900 text-white py-2 rounded-lg hover:bg-sky-700 disabled:opacity-50"
          >
            Submit Assignment
          </button>
        </form>
      </div>
    </div>
  );
}
