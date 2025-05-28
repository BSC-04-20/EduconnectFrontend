import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import { MdVideoCameraFront } from "react-icons/md";
import { StudentAuthenticatedUserUrl } from "../../../config/urlFetcher";
import { Link } from "react-router-dom";

export default function StudentDiscussions() {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscussions() {
      try {
        const response = await StudentAuthenticatedUserUrl.get("/classes/discussions/student");
        setDiscussions(response.data.discussions || []);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDiscussions();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg w-[95%] mt-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Discussions</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg w-[95%] mt-10">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Discussions</h2>
      <div className="space-y-2">
        {discussions.length === 0 ? (
          <div className="text-gray-500">No discussions available.</div>
        ) : (
          discussions.map(({ id, meeting_name, start_time }) => {
            const date = new Date(start_time);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();

            return (
              <div className="relative group" key={id}>
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  Join video conferencing session
                </div>

                {/* Discussion Link */}
                <Link
                  to={`/student/meeting/${id}`}
                  state={{ id, meeting_name, start_time }}
                  className="p-4 border rounded-lg flex items-center gap-4 border-gray-300 hover:bg-sky-50 transition"
                >
                  {/* Large Video Icon */}
                  <MdVideoCameraFront className="text-[2rem] text-sky-700 shrink-0" />

                  {/* Meeting Info */}
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800">{meeting_name}</h4>
                    <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                      <IoCalendarOutline />
                      <span>{formattedDate}</span>
                      <IoTimeOutline />
                      <span>{formattedTime}</span>
                    </div>
                  </div>

                  {/* Forward Icon */}
                  <FaArrowRight className="text-gray-400" />
                </Link>
              </div>
            );
          })
        )}
      </div>

      <button className="flex flex-row gap-2 bg-blue-600 py-1 px-3 mt-5 rounded-sm items-center ml-auto text-white">
        <FaArrowRight className="size-[1rem]" />
        View All
      </button>
    </div>
  );
}
