import { FaArrowRight } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineAssignmentLate } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

const assignments = [
    { id: 1, course: "COM411", title: "Native vs Hybrid", remaining: "10 days remaining", status: "pending" },
    { id: 2, course: "COM411", title: "Native vs Hybrid", remaining: "4 hours remaining", status: "urgent" },
    { id: 3, course: "COM411", title: "Native vs Hybrid", remaining: "3 days remaining", status: "pending" },
];

export default function StudentsAssignments() {
    return (
        <div className="bg-white p-4 md:p-6 rounded-lg mt-5 w-full md:w-[95%]">
            <h2 className="text-xl font-bold text-sky-900 mb-4">Assignments</h2>

            {/* Stat Cards Section */}
            <div className="flex flex-wrap sm:grid sm:grid-cols-3 sm:gap-3 gap-4 mb-4">
                <StatCard icon={<CiViewList />} label="Incomplete" count={10} color="text-blue-600" />
                <StatCard icon={<IoMdCheckmarkCircleOutline />} label="Completed" count={10} color="text-green-600" />
                <StatCard icon={<MdOutlineAssignmentLate />} label="Missed" count={5} color="text-red-600" />
            </div>

            <h3 className="text-md font-semibold text-gray-600 mb-2">Uncompleted</h3>

            <div className="space-y-2">
                {assignments.map(({ id, course, title, remaining, status }) => (
                    <div
                        key={id}
                        className={`p-4 border rounded-lg flex justify-between items-center flex-wrap ${
                            status === "urgent" ? "bg-red-100 border-red-400" : "border-gray-300"
                        }`}
                    >
                        <div>
                            <span className="text-sm text-gray-600">{course}</span>
                            <h4 className="font-semibold text-gray-800">{title}</h4>
                        </div>
                        <span
                            className={`text-sm ${status === "urgent" ? "text-red-500" : "text-gray-500"}`}
                        >
                            {remaining}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-right">
                <button className="flex flex-row gap-2 bg-blue-600 py-1 px-3 rounded-sm items-center text-white ml-auto">
                    <FaArrowRight className="size-[1rem]" />
                    View All
                </button>
            </div>
        </div>
    );
}

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
