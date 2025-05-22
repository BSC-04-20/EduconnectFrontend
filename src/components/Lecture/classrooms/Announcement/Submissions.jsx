import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaUsers, FaClipboardCheck, FaPenFancy, FaRegTimesCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AuthenticatedUserUrl } from "../../../../config/urlFetcher";

const ringColors = {
  blue: "ring-blue-600",
  indigo: "ring-indigo-600",
  green: "ring-green-600",
  red: "ring-red-600",
};

export default function Submissions() {
  const { selectedId } = useParams(); // assignment ID
  const { id } = useParams(); // class ID (not used in current logic, but could be useful for future endpoints)
  const [assignmentName, setAssignmentName] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    AuthenticatedUserUrl
      .get(`/assignment/submissions/${selectedId}`)
      .then((res) => {
        const { assignment, total_students, students: allStudents, submissions: subs } = res.data;
        setAssignmentName(assignment);
        setTotalStudents(total_students);
        setStudents(allStudents);
        setSubmissions(subs);
      })
      .catch((err) => console.error("Failed to fetch submissions:", err));
  }, [selectedId]);

  const filteredStudents = students.filter((student) => {
    if (activeFilter === "Submitted") {
      return submissions.some(sub => sub.student.id === student.id);
    }
    if (activeFilter === "Missed") {
      return !submissions.some(sub => sub.student.id === student.id);
    }
    return true; // "All" shows all students
  });

  const stats = [
    { label: "Students", value: totalStudents, filter: "All", color: "blue", icon: <FaUsers /> },
    { label: "Submitted", value: submissions.length, filter: "Submitted", color: "indigo", icon: <FaClipboardCheck /> },
    { label: "Marked", value: submissions.filter(s => s.marked).length, filter: "Marked", color: "green", icon: <FaPenFancy /> },
    { label: "Missed", value: totalStudents - submissions.length, filter: "Missed", color: "red", icon: <FaRegTimesCircle /> },
  ];

  return (
    <div className="bg-white max-w-7xl mx-auto p-6 sm:p-10 rounded-lg shadow w-[95%]">
      <h2 className="text-2xl font-bold mb-4">Submissions for: {assignmentName}</h2>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
        {stats.map((stat) => (
          <div
            key={stat.label}
            onClick={() => setActiveFilter(stat.filter)}
            className={`flex items-center gap-2 rounded cursor-pointer font-medium px-4 py-3 transition-all duration-150 bg-${stat.color}-100 text-${stat.color}-900 ${activeFilter === stat.filter ? `ring-2 ring-offset-2 ${ringColors[stat.color]}` : ""}`}
          >
            <span className="text-lg">{stat.icon}</span>
            <span className="hidden sm:inline">{stat.label}</span>
            <span>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm sm:text-base">
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Submission Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => {
                const hasSubmitted = submissions.some(sub => sub.student.id === student.id);
                const submissionStatus = hasSubmitted ? (
                  <FaCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <FaTimesCircle className="text-red-400 text-lg" />
                );

                return (
                  <tr key={index} className={`hover:bg-gray-50 ${hasSubmitted ?'hover:cursor-pointer' : ""} text-sm sm:text-base`}>
                    <td className="py-3 px-4 border-b">{student.fullname}</td>
                    <td className="py-3 px-4 border-b">{student.email}</td>
                    <td className="py-3 px-4 border-b">{student.phonenumber}</td>
                    <td className="py-3 px-4 border-b">{submissionStatus}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
