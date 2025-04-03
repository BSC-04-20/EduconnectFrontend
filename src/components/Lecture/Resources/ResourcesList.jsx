import { useState } from "react";
import { FaDownload, FaTrash } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";

export default function LecturePostedResources() {
    // List of posted resources
    const resources = [
        { name: "Data Structures & Algorithms", size: "PDF 3.2mb", uploaded: "3 days ago" },
        { name: "Operating Systems Notes", size: "PDF 4.1mb", uploaded: "1 week ago" },
        { name: "Computer Networks Guide", size: "PDF 2.8mb", uploaded: "5 days ago" },
        { name: "Artificial Intelligence Overview", size: "PDF 5.0mb", uploaded: "2 weeks ago" },
        { name: "Database Management Systems", size: "PDF 3.5mb", uploaded: "4 days ago" },
    ];

    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [downloadConfirmation, setDownloadConfirmation] = useState(null);

    const handleDownload = (name) => {
        setDownloadConfirmation(name);
    };

    const confirmDownload = () => {
        console.log(`Downloading: ${downloadConfirmation}`);
        setDownloadConfirmation(null);
        
    };

    const handleDelete = (name) => {
        setDeleteConfirmation(name);
    };

    const confirmDelete = () => {
        console.log(`Deleting: ${deleteConfirmation}`);
        setDeleteConfirmation(null);
        
    };

    return (
        <div className="flex flex-col gap-3 bg-white rounded-lg w-[95%] py-10 px-5 overflow-x-auto md:overflow-hidden">
            {resources.map(({ name, size, uploaded }, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-3 items-center w-full md:w-[65%]">
                    <div className="bg-sky-200 p-1 rounded-lg">
                        <MdOutlineDescription className="size-[2rem] text-sky-900"/>
                    </div>

                    <div className="flex flex-col text-center md:text-left">
                        <span className="font-semibold text-lg">{name}</span>
                        <span className="text-gray-400 text-base">{size} uploaded {uploaded}</span>
                    </div>

                    <div className="mt-2 md:mt-0 ml-auto flex gap-2 justify-center md:justify-end">
                        <button onClick={() => handleDownload(name)} className="text-gray-600 hover:text-blue-600">
                            <FaDownload />
                        </button>
                        <button onClick={() => handleDelete(name)} className="text-gray-600 hover:text-red-600">
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}

            {downloadConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <p>Are you sure you want to download {downloadConfirmation}?</p>
                        <div className="flex justify-end gap-2 mt-3">
                            <button onClick={() => setDownloadConfirmation(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button onClick={confirmDownload} className="px-4 py-2 bg-blue-600 text-white rounded">Download</button>
                        </div>
                    </div>
                </div>
            )}

            {deleteConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <p>Are you sure you want to delete {deleteConfirmation}?</p>
                        <div className="flex justify-end gap-2 mt-3">
                            <button onClick={() => setDeleteConfirmation(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
