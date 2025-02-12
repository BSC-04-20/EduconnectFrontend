import { NavLink } from "react-router-dom";
import { MdGroup, MdOutlineSpaceDashboard } from "react-icons/md";
import { IoBookOutline, IoCalendarClearOutline, IoPeopleOutline, IoStarOutline, IoTimeOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";

const navLinks = [
    { to: "/student/dashboard", label: "Dashboard", icon: <MdOutlineSpaceDashboard className="size-[1.5rem]" /> },
    { to: "/student/mentorship", label: "Mentorship", icon: <IoPeopleOutline className="size-[1.5rem]" /> },
    { to: "/student/events", label: "Events", icon: <IoCalendarClearOutline className="size-[1.5rem]" /> },
    { to: "/student/timetable", label: "Timetable", icon: <IoTimeOutline className="size-[1.5rem]" /> },
    { to: "/student/discussions", label: "Discussions", icon: <GrGroup className="size-[1.5rem]" /> },
    { to: "/student/resources", label: "Learning Materials", icon: <IoBookOutline className="size-[1.5rem]" /> },
    { to: "/student/ratings", label: "Ratings", icon: <IoStarOutline className="size-[1.5rem]" /> },
    { to: "/student/classroom", label: "Classroom", icon: <MdGroup className="size-[1.5rem]" /> },
];

export default function StudentSideBar() {
    return (
        <aside className="fixed w-[15%] flex flex-col gap-3 bg-white h-[100vh]">
            <div className="my-5 text-center">
                <span className="font-bold text-xl">EduConnect</span>
            </div>
            {navLinks.map(({ to, label, icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        isActive
                            ? "text-slate-200 flex bg-sky-900 flex-row items-center gap-3 py-2 pl-4"
                            : "text-black flex flex-row items-center gap-3 py-2 pl-4"
                    }
                >
                    {icon}
                    {label}
                </NavLink>
            ))}
        </aside>
    );
}
