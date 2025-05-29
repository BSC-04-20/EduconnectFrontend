import React, { useState } from 'react';
import { AuthenticatedUserUrl } from '../../../config/urlFetcher';

export default function AnnouncementModal({ isOpen, onClose, classId }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object to send form data including files
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("class_id", classId)

        // Append each file to FormData
        files.forEach((file) => {
            formData.append("announcement_files[]", file);
        });

        try {
            const response = await AuthenticatedUserUrl.post("/announcement/create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });

            if (response.status === 201) {
                alert("Announcement submitted successfully!");
                setTitle("");
                setDescription("");
                setFiles([]);
                onClose(); // Close the modal
                // Optionally refresh the page or update the announcements list
                window.location.reload();
            } else {
                alert("Error submitting the announcement.");
            }
        } catch (error) {
            console.error("Error submitting announcement:", error);
            alert("Error submitting the announcement.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
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
                            rows="3"
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
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-sky-700"
                        >
                            Submit Announcement
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}