import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaUsers, FaClipboardCheck, FaPenFancy, FaRegTimesCircle } from "react-icons/fa";

const mockSubmissions = [
  { name: "Alice Mwale", grade: 87, time: "2025-05-10 14:32", marked: true },
  { name: "Brian Banda", grade: 74, time: "2025-05-10 15:00", marked: true },
  { name: "Chisomo Jere", grade: null, time: "2025-05-10 15:20", marked: false },
  { name: "Diana Phiri", grade: 91, time: "2025-05-10 16:10", marked: true },
];

const stats = [
  { label: "Students", value: 20, filter: "All", color: "blue", icon: <FaUsers /> },
  { label: "Submitted", value: 16, filter: "Submitted", color: "indigo", icon: <FaClipboardCheck /> },
  { label: "Marked", value: 12, filter: "Marked", color: "green", icon: <FaPenFancy /> },
  { label: "Missed", value: 4, filter: "Missed", color: "red", icon: <FaRegTimesCircle /> },
];

const ringColors = {
  blue: "ring-blue-600",
  indigo: "ring-indigo-600",
  green: "ring-green-600",
  red: "ring-red-600",
};

export default function Submissions() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredSubmissions = mockSubmissions.filter((s) => {
    if (activeFilter === "Marked") return s.marked;
    if (activeFilter === "Submitted") return s.grade !== null;
    if (activeFilter === "Missed") return s.grade === null;
    return true;
  });

  return (
    <div className="bg-white max-w-7xl mx-auto p-6 sm:p-10 rounded-lg shadow w-[95%]">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
        {stats.map((stat) => (
          <div
            key={stat.label}
            onClick={() => setActiveFilter(stat.filter)}
            className={`flex items-center gap-2 rounded cursor-pointer font-medium px-4 py-3 transition-all duration-150 bg-${stat.color}-100 text-${stat.color}-900 ${
              activeFilter === stat.filter ? `ring-2 ring-offset-2 ${ringColors[stat.color]}` : ""
            }`}
          >
            <span className="text-lg">{stat.icon}</span>
            <span className="hidden sm:inline">{stat.label}</span>
            <span>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Submissions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm sm:text-base">
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Grade (%)</th>
              <th className="py-3 px-4 border-b">Time</th>
              <th className="py-3 px-4 border-b">Marked</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission, index) => (
                <tr key={index} className="hover:bg-gray-50 text-sm sm:text-base">
                  <td className="py-3 px-4 border-b">{submission.name}</td>
                  <td className="py-3 px-4 border-b">
                    {submission.grade !== null ? `${submission.grade}%` : "-"}
                  </td>
                  <td className="py-3 px-4 border-b">{submission.time}</td>
                  <td className="py-3 px-4 border-b">
                    {submission.marked ? (
                      <FaCheckCircle className="text-green-500 text-lg" />
                    ) : (
                      <FaTimesCircle className="text-red-400 text-lg" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
