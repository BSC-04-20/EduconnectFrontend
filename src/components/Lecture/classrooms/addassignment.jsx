import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticatedUserUrl } from '../../../config/urlFetcher';
import toast from 'react-hot-toast';

export default function AssignmentModal({ isOpen, onClose, classId, setLoading, onSuccess }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [dueDate, setDueDate] = useState("");
    const [dueTime, setDueTime] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setLoading(true);

        const dueDateTime = `${dueDate} ${dueTime}:00`;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("due_date", dueDateTime);
        formData.append("class_id", classId);

        files.forEach((file) => {
            formData.append("files[]", file);
        });

        try {
            const response = await AuthenticatedUserUrl.post("/assignment/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                toast.success("Assignment created successfully!", {
                    duration: 3000,
                });
                onSuccess();
            } else {
                toast.error("Error creating the assignment.");
            }
        } catch (error) {
            console.error("Error creating assignment:", error);
            toast.error("Error creating the assignment.");
        } finally {
            setIsSubmitting(false);
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Add an Assignment</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                        disabled={isSubmitting}
                    >
                        ×
                    </button>
                </div>

                {isSubmitting && (
                    <div className="mb-4 text-center text-blue-600 font-medium">
                        Creating Assignment...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded-lg"
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-lg"
                            disabled={isSubmitting}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Files</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="mt-1 w-full p-2 border rounded-lg"
                            disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </>
                            ) : 'Create Assignment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
