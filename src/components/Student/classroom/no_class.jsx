import { useState } from "react";
import { Link } from "react-router-dom";
import Fisherman from "../../../assets/ice fishing-amico.svg";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";

export default function NoClass() {
    const [isOpen, setIsOpen] = useState(false);
    const [classCode, setClassCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setClassCode("");  // Reset input on close
        setError("");       // Clear errors
    };

    const handleJoinClass = async () => {
        if (!classCode.trim()) {
            setError("Class code is required.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await AuthenticatedUserUrl.post("/classes/join", { code: classCode });

            if (response.status === 201) {
                alert("Successfully joined the class!");
                closeModal();
            } else {
                setError("Failed to join the class. Please check the code.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col text-center text-lg items-center">
            <div>
                <img src={Fisherman} className="size-[30rem]" alt="No Class" />
            </div>
            <div className="flex flex-col">
                <span>You don't have any class</span>
                <Link onClick={openModal} className="text-blue-500 cursor-pointer">
                    Click Here to join
                </Link>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Join Classroom</h2>
                        <input
                            type="text"
                            placeholder="Enter classroom code"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                            className="w-full p-2 border rounded-lg mb-2"
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="flex justify-end space-x-2">
                            <button onClick={closeModal} className="px-4 py-2 rounded-lg hover:bg-gray-200">
                                Cancel
                            </button>
                            <button 
                                onClick={handleJoinClass} 
                                disabled={loading}
                                className={`px-4 py-2 text-white rounded-lg ${loading ? "bg-gray-500" : "bg-sky-900 hover:bg-sky-700"}`}
                            >
                                {loading ? "Joining..." : "Join"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
