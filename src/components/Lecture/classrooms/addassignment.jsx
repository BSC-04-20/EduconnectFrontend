import { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate, useParams } from "react-router-dom";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { Toaster, toast} from "react-hot-toast";

export default function AssignmentModal({ isOpen, onClose, classId }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [dueDate, setDueDate] = useState("");
    const [dueTime, setDueTime] = useState("");
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
        formData.append("class_id", classId);

        // Append each file to FormData
        files.forEach((file) => {
            formData.append("files[]", file);
        });

        try {
            // Send a POST request with the form data to the API
            const response = await AuthenticatedUserUrl.post("/assignment/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });

      if (response.status === 201) {
        toast.success("Assignment submitted successfully!");
        // Reset form after successful submission
        setTitle("");
        setDescription("");
        setFiles([]);
        setDueDate("");
        setDueTime("");
        navigator(`/lecture/classroom/${id.id}`);
      } else {
        toast.error("Error submitting the assignment.");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("Error submitting the assignment.");
    }
  };
  <Toaster/>

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Add an Assignment</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>
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
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-sky-700"
                        >
                            Submit Assignment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}