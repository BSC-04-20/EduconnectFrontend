import { BiArrowFromLeft, BiArrowToRight } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";

export default function RecentAnnouncements(){
    return(
        <div className="flex flex-col gap-3 bg-white rounded-lg w-[95%] px-10 py-5">
            <span className="text-sky-900 font-bold text-xl">Recent Announcements</span>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1 border-2 p-3 rounded-lg">
                    <span className="text-sm text-sky-600">COM411</span>
                    <span className="font-semibold text-2xl">Exams Date</span>
                    <span className="text-lg">The exams are scheduled to begin on Monday, May 6, 2024.......</span>
                    <span className="text-sm text-sky-500">Read More</span>
                </div>

                
                <div className="flex flex-col gap-1 border-2 p-3 rounded-lg">
                    <span className="text-sm text-sky-600">COM411</span>
                    <span className="font-semibold text-2xl">Exams Date</span>
                    <span className="text-lg">The exams are scheduled to begin on Monday, May 6, 2024.......</span>
                    <span className="text-sm text-sky-500">Read More</span>
                </div>
            </div>
            <button className="flex flex-row gap-2 bg-blue-600 py-1 px-3 rounded-sm items-center ml-auto text-white">
                <FaArrowRight text className="size-[1rem]"/>
                View All
            </button>
        </div>
    )
}