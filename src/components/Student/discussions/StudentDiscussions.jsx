import { FaArrowRight } from "react-icons/fa6";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";

const discussions = [
    { id: 1, title: "Performance Optimization in Mobile Apps", date: "17 Jan 2025", time: "17:30", status: "Pending" },
    { id: 2, title: "Explore key UI/UX design principles in mobile app development", date: "17 Jan 2025", time: "17:30", status: "Pending" },
    { id: 3, title: "Investigate common security threats in mobile applications", date: "17 Jan 2025", time: "17:30", status: "Done" },
    { id: 4, title: "Discuss frameworks used for integrating AI/ML in mobile development", date: "17 Jan 2025", time: "17:30", status: "Active" },
];

export default function StudentDiscussions() {
    return (
        <div className="bg-white p-6 rounded-lg w-[95%] mt-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Discussions</h2>
            <div className="space-y-2">
                {discussions.map(({ id, title, date, time, status }) => (
                    <div key={id} className="p-4 border rounded-lg flex justify-between items-center border-gray-300">
                        <div>
                            <h4 className="font-semibold text-gray-800">{title}</h4>
                            <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                                <IoCalendarOutline />
                                <span>{date}</span>
                                <IoTimeOutline />
                                <span>{time}</span>
                            </div>
                        </div>
                        <StatusBadge status={status} />
                    </div>
                ))}
            </div>
            <button className="flex flex-row gap-2 bg-blue-600 py-1 px-3 mt-5 rounded-sm items-center ml-auto text-white">
                <FaArrowRight text className="size-[1rem]"/>
                View All
            </button>
        </div>
    );
}

function StatusBadge({ status }) {
    const statusColors = {
        Pending: "bg-blue-100 text-blue-500",
        Done: "bg-red-100 text-red-500",
        Active: "bg-green-100 text-green-500",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status] || "bg-gray-100 text-gray-500"}`}>
            {status}
        </span>
    );
}
