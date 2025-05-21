
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { GoBook, GoCalendar, GoPeople } from "react-icons/go";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";

export default function Overview() {
    const [classCount, setClassCount] = useState(0);

    useEffect(() => {
        const fetchClassCount = async () => {
            try {
                const response = await AuthenticatedUserUrl.get(`/classes/count`, {
                    headers: {
                
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error("Failed to fetch class count");
                }

                const data = await response.json();
                setClassCount(data.count); // Adjust if the response structure is different
            } catch (error) {
                console.error("Error fetching class count:", error);
            }
        };

        fetchClassCount();
    }, []);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 w-[95%]">
            <Card
                icon={<GoPeople className="text-slate-900 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
                iconBg="bg-slate-100"
                bg="bg-slate-200"
                title="Number of Classes"
                value={classCount}
            />
            <Card
                icon={<GoCalendar className="text-pink-900 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
                iconBg="bg-pink-100"
                bg="bg-pink-200"
                title="Upcoming Events"
                value="156"
            />
            <Card
                icon={<GoBook className="text-amber-900 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
                iconBg="bg-amber-100"
                bg="bg-amber-200"
                title="Shared Resources"
                value="12"
            />
            <Card
                icon={<FaRegComment className="text-orange-900 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
                iconBg="bg-orange-100"
                bg="bg-orange-200"
                title="Open Discussions"
                value="38"
            />
        </div>
    );
}

function Card({ icon, iconBg, bg, title, value }) {
    return (
        <div className={`flex items-center ${bg} rounded-xl p-3 min-h-[12vh]`}>
            <div className={`flex items-center justify-center rounded-full aspect-square 
                w-10 sm:w-12 lg:w-14 ${iconBg} transition-all duration-300`}>
                {icon}
            </div>
            <div className="flex flex-col ml-3">
                <span className="text-sm font-medium text-gray-800">{title}</span>
                <span className="text-xl font-bold text-gray-900">{value}</span>
            </div>
        </div>
    );
}


























// import { FaRegComment } from "react-icons/fa";
// import { GoBook, GoCalendar, GoPeople } from "react-icons/go";
// import { AuthenticatedUserUrl } from "../../../config/urlFetcher";

// export default function Overview() {
//     return (
//         <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 w-[95%]">
//             <Card
//                 icon={<GoPeople className="text-slate-900 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
//                 iconBg="bg-slate-100"
//                 bg="bg-slate-200"
//                 title="Number of Classes"
//                 value="35"
//             />
//             <Card
//                 icon={<GoCalendar className="text-pink-900 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
//                 iconBg="bg-pink-100"
//                 bg="bg-pink-200"
//                 title="Upcoming Events"
//                 value="156"
//             />
//             <Card
//                 icon={<GoBook className="text-amber-900 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
//                 iconBg="bg-amber-100"
//                 bg="bg-amber-200"
//                 title="Shared Resources"
//                 value="12"
//             />
//             <Card
//                 icon={<FaRegComment className="text-orange-900 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
//                 iconBg="bg-orange-100"
//                 bg="bg-orange-200"
//                 title="Open Discussions"
//                 value="38"
//             />
//         </div>
//     );
// }

// function Card({ icon, iconBg, bg, title, value }) {
//     return (
//         <div className={`flex items-center ${bg} rounded-xl p-3 min-h-[12vh]`}>
//             <div className={`flex items-center justify-center rounded-full aspect-square 
//                 w-10 sm:w-12 lg:w-14 ${iconBg} transition-all duration-300`}>
//                 {icon}
//             </div>
//             <div className="flex flex-col ml-3">
//                 <span className="text-sm font-medium text-gray-800">{title}</span>
//                 <span className="text-xl font-bold text-gray-900">{value}</span>
//             </div>
//         </div>
//     );
// }

