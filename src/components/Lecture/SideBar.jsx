import { NavLink } from "react-router-dom";
import { MdGroup, MdOutlineSpaceDashboard } from "react-icons/md";
import { IoBookOutline, IoCalendarClearOutline, IoPeopleOutline, IoStar, IoStarOutline, IoTimeOutline } from "react-icons/io5";

export default function LectureSideBar(){
    return(
        <aside className="w-[15%] flex flex-col gap-3 bg-white h-[100vh]">
            <div className="my-5 text-center">
                <span className="font-bold text-xl">EduConnect</span>
            </div>
            <NavLink to="/" className={({isActive}) => isActive ? "text-slate-200 flex bg-sky-900 flex-row items-center gap-3 py-2 pl-4" : "text-black flex flex-row items-center gap-3 py-2 pl-4"}>
                <MdOutlineSpaceDashboard className="size-[1.5rem]"/>
                Dashboard
            </NavLink>
            
            <NavLink to="/mentorship" className={({isActive}) => isActive ? "text-slate-200 flex bg-sky-900 flex-row items-center gap-3 pl-4" : "text-black flex flex-row items-center gap-3 pl-4"}>
                <IoPeopleOutline className="size-[1.5rem]"/>
                Mentorship
            </NavLink>

            <NavLink to="/mentorship" className={({isActive}) => isActive ? "text-slate-200 flex bg-sky-900 flex-row items-center gap-3 pl-4" : "text-black flex flex-row items-center gap-3 pl-4"}>
                <IoCalendarClearOutline className="size-[1.5rem]"/>
                Events
            </NavLink>

            <NavLink to="/mentorship" className={({isActive}) => isActive ? "text-slate-200 flex bg-sky-900 flex-row items-center gap-3 pl-4" : "text-black flex flex-row items-center gap-3 pl-4"}>
                <IoTimeOutline className="size-[1.5rem]"/>
                Timetable
            </NavLink>

            <NavLink to="/mentorship" className={({isActive}) => isActive ? "text-slate-200 flex bg-sky-900 flex-row items-center gap-3 pl-4" : "text-black flex flex-row items-center gap-3 pl-4"}>
                <IoBookOutline className="size-[1.5rem]"/>
                Resources
            </NavLink>

            <NavLink to="/mentorship" className={({isActive}) => isActive ? "text-slate-200 flex bg-sky-900 flex-row items-center gap-3 pl-4" : "text-black flex flex-row items-center gap-3 pl-4"}>
                <IoStarOutline className="size-[1.5rem]"/>
                Ratings
            </NavLink>

            <NavLink to="/mentorship" className={({isActive}) => isActive ? "text-slate-200 flex bg-sky-900 flex-row items-center gap-3 pl-4" : "text-black flex flex-row items-center gap-3 pl-4"}>
                <MdGroup className="size-[1.5rem]"/>
                Classroom
            </NavLink>
        </aside>
    )
}