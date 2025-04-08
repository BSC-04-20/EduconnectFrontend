import React, { useEffect, useState } from "react";
import { AuthenticatedUserUrl, StudentAuthenticatedUserUrl } from "../../../../config/urlFetcher";
import { useParams } from "react-router-dom";

const ClassmatesStudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = useParams()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await StudentAuthenticatedUserUrl.get(`/classes/get/${id.id}/students`);
        setStudents(response.data.students);
        setClassName(response.data.name);
      } catch (err) {
        setError("Failed to load students. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-start text-sky-900">{className} Students</h2>

      {loading && <p className="text-center text-blue-500">Loading students...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student.id} className="border-b hover:bg-gray-100 text-gray-500">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{student.fullname}</td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">{student.phonenumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClassmatesStudentsTable;
