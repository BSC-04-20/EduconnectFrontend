import { useEffect, useState } from "react";
import { StudentAuthenticatedUserUrl } from "../../../config/urlFetcher";
import { GrGroup } from "react-icons/gr";
import { Link } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import NoClass from "./no_class";
import { Toaster, toast} from "react-hot-toast";

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
                toast.success("Successfully joined the class!");
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
            {/* Floating Action Button */}
            <button
                onClick={openModal}
                title="Join a new classroom"
                className="fixed bottom-16 right-6 bg-white text-sky-500 p-4 rounded-full shadow-lg hover:bg-gray-100 z-50 transition-all"
            >
                <PiPlus size={30} />
            </button>

            {/* Loading State */}
            <Toaster/>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <div>
                    {classes.length === 0 ? <NoClass/> :
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
                    </div>}
                </div>
            )}

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50 transition-all">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 mx-4 animate-fade-in">
                        <h2 className="text-2xl font-semibold text-gray-800">Join a class</h2>
                        <p className="text-sm text-gray-600 mt-1 mb-4">Ask your teacher for the class code, then enter it below.</p>

                        <input
                            type="text"
                            placeholder="Enter class code"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <div className="flex justify-end space-x-2 mt-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleJoinClass}
                                disabled={joining}
                                className={`px-4 py-2 text-white rounded-lg shadow ${
                                    joining
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-sky-800 hover:bg-sky-700"
                                } transition`}
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
