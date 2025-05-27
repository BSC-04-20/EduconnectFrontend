import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineAssignmentLate } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { StudentAuthenticatedUserUrl } from "../../../config/urlFetcher";

function StatCard({ icon, label, count, color }) {
    return (
        <div className="flex items-center gap-3 border-2 p-4 rounded-lg min-w-[30%] sm:min-w-0">
            <div className={`text-3xl ${color}`}>{icon}</div>
            <div className="flex flex-col">
                <span className="text-sm text-gray-700">{label}</span>
                <span className="text-3xl font-semibold text-gray-700">{count}</span>
            </div>
        </div>
    );
}

export default function StudentsAssignments() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await StudentAuthenticatedUserUrl.get("/assignment/student");
                setAssignments(res.data || []); // ✅ Use top-level array
                setError(null);
            } catch (err) {
                console.error("Error fetching assignments:", err);
                setError("Failed to load assignments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    const getStatus = (assignment) => {
        if (assignment.status === "not submitted") return "not submitted";
        if (assignment.status === "submitted") return "completed";
        if (assignment.status === "missed") return "missed";
        return "unknown";
    };

    

    const incomplete = assignments.filter((a) => getStatus(a) === "not submitted").length;
    const completed = assignments.filter((a) => getStatus(a) === "completed").length;
    const missed = assignments.filter((a) => getStatus(a) === "missed").length;

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg mt-5 w-full md:w-[95%]">
            <h2 className="text-xl font-bold text-sky-900 mb-4">Assignments</h2>

            {/* Stat Cards */}
            <div className="flex flex-wrap sm:grid sm:grid-cols-3 sm:gap-3 gap-4 mb-4">
                <StatCard icon={<CiViewList />} label="Incomplete" count={incomplete} color="text-blue-600" />
                <StatCard icon={<IoMdCheckmarkCircleOutline />} label="Completed" count={completed} color="text-green-600" />
                <StatCard icon={<MdOutlineAssignmentLate />} label="Missed" count={missed} color="text-red-600" />
            </div>

            <h3 className="text-md font-semibold text-gray-600 mb-2">Uncompleted</h3>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="space-y-2">
                    {assignments.filter((a) => getStatus(a) === "not submitted").length === 0 ? (
                        <div className="text-gray-500">No uncompleted assignments found.</div>
                    ) : (
                        assignments
                            .filter((a) => getStatus(a) === "not submitted")
                            .map(({ id, class: course_code, title, due_date }) => (
                                <div
                                    key={id}
                                    className="p-4 border border-gray-300 rounded-lg flex justify-between items-center flex-wrap"
                                >
                                    <div>
                                        <span className="text-sm text-gray-600">{course_code || "Unknown Course"}</span>
                                        <h4 className="font-semibold text-gray-800">{title}</h4>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {due_date ? `Due: ${due_date}` : "No deadline"}
                                    </span>
                                </div>
                            ))
                    )}
                </div>
            )}

            <div className="mt-4 text-right">
                <button className="flex flex-row gap-2 bg-blue-600 py-1 px-3 rounded-sm items-center text-white ml-auto">
                    <FaArrowRight className="size-[1rem]" />
                    View All
                </button>
            </div>
        </div>
    );
}








































