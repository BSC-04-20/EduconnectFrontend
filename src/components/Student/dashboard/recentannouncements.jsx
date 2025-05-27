import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { StudentAuthenticatedUserUrl } from "../../../config/urlFetcher";

export default function RecentAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [showAll, setShowAll] = useState(false); // toggle state

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await StudentAuthenticatedUserUrl.get("/announcement/student");

                const data = response.data;

                if (Array.isArray(data.announcements)) {
                    setAnnouncements(data.announcements);
                } else {
                    setAnnouncements([]);
                }

            } catch (error) {
                console.error("Error fetching announcements:", error);
                setAnnouncements([]);
            }
        };

        fetchAnnouncements();
    }, []);

    // Determine which announcements to display
    const visibleAnnouncements = showAll ? announcements : announcements.slice(0, 2);

    return (
        <div className="flex flex-col gap-3 bg-white rounded-lg w-full md:w-[95%] px-4 md:px-10 py-5">
            <span className="text-sky-900 font-bold text-xl">Recent Announcements</span>

            {announcements.length === 0 ? (
                <span className="text-gray-500">No announcements available.</span>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {visibleAnnouncements.map((announcement, index) => (
                        <div key={index} className="flex flex-col gap-1 border-2 p-3 rounded-lg">
                            <span className="text-sm text-sky-600">
                                {announcement.class_name || "No Course Code"}
                            </span>
                            <span className="font-semibold text-2xl">
                                {announcement.title || "No Title"}
                            </span>
                            <span className="text-lg">
                                {announcement.description?.slice(0, 100) || "No content provided"}...
                            </span>
                            <span className="text-sm text-sky-500">Read More</span>
                        </div>
                    ))}
                </div>
            )}

            {announcements.length > 2 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="flex flex-row gap-2 bg-blue-600 py-1 px-3 rounded-sm items-center self-end text-white mt-2"
                >
                    <FaArrowRight className="size-[1rem]" />
                    {showAll ? "Show Less" : "View All"}
                </button>
            )}
        </div>
    );
}





































// import { BiArrowFromLeft, BiArrowToRight } from "react-icons/bi";
// import { FaArrowRight } from "react-icons/fa6";

// export default function RecentAnnouncements() {
//     return (
//         <div className="flex flex-col gap-3 bg-white rounded-lg w-full md:w-[95%] px-4 md:px-10 py-5">
//             <span className="text-sky-900 font-bold text-xl">Recent Announcements</span>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="flex flex-col gap-1 border-2 p-3 rounded-lg">
//                     <span className="text-sm text-sky-600">COM411</span>
//                     <span className="font-semibold text-2xl">Exams Date</span>
//                     <span className="text-lg">The exams are scheduled to begin on Monday, May 6, 2024.......</span>
//                     <span className="text-sm text-sky-500">Read More</span>
//                 </div>

//                 <div className="flex flex-col gap-1 border-2 p-3 rounded-lg">
//                     <span className="text-sm text-sky-600">COM411</span>
//                     <span className="font-semibold text-2xl">Exams Date</span>
//                     <span className="text-lg">The exams are scheduled to begin on Monday, May 6, 2024.......</span>
//                     <span className="text-sm text-sky-500">Read More</span>
//                 </div>
//             </div>

//             <button className="flex flex-row gap-2 bg-blue-600 py-1 px-3 rounded-sm items-center self-end text-white">
//                 <FaArrowRight className="size-[1rem]" />
//                 View All
//             </button>
//         </div>
//     );
// }
