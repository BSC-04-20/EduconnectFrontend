import React, { useEffect, useState } from "react";
import axios from "axios"; // If using axios
import { FaArrowRight } from "react-icons/fa6";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import { StudentAuthenticatedUserUrl } from "../../../config/urlFetcher";
import { Link } from "react-router-dom";

export default function StudentDiscussions() {
    const [discussions, setDiscussions] = useState([]); // Store discussions
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch the discussions from the API when the component mounts
        const fetchDiscussions = async () => {
            try {
                const response = await StudentAuthenticatedUserUrl.get("/classes/discussions/student");
                setDiscussions(response.data.discussions);
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching discussions:", error);
                setLoading(false);
            }
        };

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
                {discussions.map(({ id, meeting_name, start_time }) => {
                    // Format the start_time as needed
                    const date = new Date(start_time);
                    const formattedDate = date.toLocaleDateString();
                    const formattedTime = date.toLocaleTimeString();

                    return (
                        <Link to="/jitsi" state={{ id }} key={id} className="p-4 border rounded-lg flex justify-between items-center border-gray-300">
                            <div>
                                <h4 className="font-semibold text-gray-800">{meeting_name}</h4>
                                <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                                    <IoCalendarOutline />
                                    <span>{formattedDate}</span>
                                    <IoTimeOutline />
                                    <span>{formattedTime}</span>
                                </div>
                            </div>
                            <StatusBadge status="Active" /> {/* You can change the status based on your logic */}
                        </Link>
                    );
                })}
            </div>
            <button className="flex flex-row gap-2 bg-blue-600 py-1 px-3 mt-5 rounded-sm items-center ml-auto text-white">
                <FaArrowRight className="size-[1rem]" />
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
