import { useEffect, useState } from "react";
import { StudentAuthenticatedUserUrl } from "../../../config/urlFetcher";
import { GrGroup } from "react-icons/gr";
import { Link } from "react-router-dom";
import { PiPlus } from "react-icons/pi";

export default function StudentClasses() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [classCode, setClassCode] = useState("");
    const [error, setError] = useState("");
    const [joining, setJoining] = useState(false);

    useEffect(() => {
        StudentAuthenticatedUserUrl.get("/classes/student-classes")
            .then(response => {
                setClasses(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching classes:", error);
                setLoading(false);
            });
    }, []);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setClassCode("");
        setError("");
    };

    const handleJoinClass = async () => {
        if (!classCode.trim()) {
            setError("Class code is required.");
            return;
        }

        setJoining(true);
        setError("");

        try {
            const response = await StudentAuthenticatedUserUrl.post("/classes/join", { code: classCode });
            if (response.status === 201) {
                alert("Successfully joined the class!");
                closeModal();
                setLoading(true);
                StudentAuthenticatedUserUrl.get("/classes/student-classes").then(response => {
                    setClasses(response.data.data);
                    setLoading(false);
                });
            } else {
                setError("Failed to join the class. Please check the code.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setJoining(false);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            {/* Floating Button */}
            <button
                onClick={openModal}
                className="fixed bottom-16 right-6 bg-white text-sky-500 p-4 rounded-full shadow-lg hover:bg-gray-100 z-50"
            >
                <PiPlus size={30} />
            </button>

            {/* Loading State */}
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-0">
                    {classes.map((cls, index) => (
                        <Link
                            to={`/student/classroom/${cls.class_id}`}
                            key={index}
                            className="bg-white shadow-md rounded-lg overflow-hidden border cursor-pointer transition-transform transform hover:scale-105"
                        >
                            <div className="bg-sky-800 h-16 flex flex-col justify-center px-4 text-white">
                                <span className="font-semibold text-lg truncate">{cls.class_name}</span>
                                <span className="font-light text-sm truncate">{cls.lecture_name}</span>
                            </div>
                            <div className="p-4 flex flex-col justify-end h-28">
                                <div className="flex justify-end mt-auto">
                                    <div className="bg-sky-100 p-2 rounded-full shadow-md">
                                        <GrGroup size={20} className="text-sky-700" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 mx-4">
                        <h2 className="text-xl font-bold mb-4">Join Classroom</h2>
                        <input
                            type="text"
                            placeholder="Enter classroom code"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                            className="w-full p-2 border rounded-lg mb-2"
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="flex justify-end space-x-2 mt-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleJoinClass}
                                disabled={joining}
                                className={`px-4 py-2 text-white rounded-lg ${
                                    joining ? "bg-gray-500" : "bg-sky-900 hover:bg-sky-700"
                                }`}
                            >
                                {joining ? "Joining..." : "Join"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
