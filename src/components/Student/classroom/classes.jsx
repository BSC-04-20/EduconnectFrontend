import { useEffect, useState } from "react";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { GrGroup } from "react-icons/gr";

export default function StudentClasses() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch classes from API
        AuthenticatedUserUrl.get("/classes/get/student")
            .then(response => {
                setClasses(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching classes:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6">
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 z-0">
                    {classes.map((cls, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden border cursor-pointer transition-transform transform hover:scale-105">
                            {/* Header */}
                            <div className="bg-sky-800 h-16 flex flex-col items-start px-4 text-white">
                                <span className="font-semibold text-lg">{cls.class_name}</span>
                                <span className="font-light text-sm">{cls.lecture_name}</span>
                            </div>
                            
                            {/* Body */}
                            <div className="p-4 flex flex-col justify-between h-28">
                                {/* Bottom Right Icon */}
                                <div className="flex justify-end mt-auto">
                                    <div className="bg-sky-100 p-2 rounded-full shadow-md">
                                        <GrGroup size={20} className="text-sky-700" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
