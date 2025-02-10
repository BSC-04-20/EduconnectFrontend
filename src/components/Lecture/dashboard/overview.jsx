import { FaRegComment } from "react-icons/fa";
import { GoBook, GoCalendar, GoPeople } from "react-icons/go";

export default function Overview(){
    return(
        <div className="grid grid-cols-4 gap-2 w-[95%]">
            <div className="flex flex-row gap-5 justify-center items-center bg-slate-300 h-[30vh] rounded-lg">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-100">
                    <GoPeople className="text-slate-900 size-[1.5rem]"/>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-lg">Active Mentorships</span>
                    <span className="font-bold text-2xl">35</span>
                </div>
            </div>

            <div className="flex flex-row gap-5 justify-center items-center bg-pink-300 h-[30vh] rounded-lg">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-pink-100">
                    <GoCalendar className="text-pink-900 size-[1.5rem]"/>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-lg">Upcoming Events</span>
                    <span className="font-bold text-2xl">156</span>
                </div>
            </div>

            <div className="flex flex-row gap-5 justify-center items-center bg-amber-300 h-[30vh] rounded-lg">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-amber-100">
                    <GoBook className="text-amber-900 size-[1.5rem]"/>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-lg">Shared Resources</span>
                    <span className="font-bold text-2xl">12</span>
                </div>
            </div>

            <div className="flex flex-row gap-5 justify-center items-center bg-orange-300 h-[30vh] rounded-lg">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-orange-100">
                    <FaRegComment className="text-orange-900 size-[1.5rem]"/>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-lg">Open Discussions</span>
                    <span className="font-bold text-2xl">38</span>
                </div>
            </div>
        </div>
    )
}