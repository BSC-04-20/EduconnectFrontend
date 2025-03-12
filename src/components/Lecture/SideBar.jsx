import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdGroup, MdOutlineSpaceDashboard, MdMenu, MdClose } from "react-icons/md";
import { IoBookOutline, IoCalendarClearOutline, IoPeopleOutline, IoStarOutline, IoTimeOutline } from "react-icons/io5";

const navLinks = [
    { to: "/lecture/dashboard", label: "Dashboard", icon: <MdOutlineSpaceDashboard className="size-[1.5rem]" /> },
    { to: "/lecture/mentorship", label: "Mentorship", icon: <IoPeopleOutline className="size-[1.5rem]" /> },
    { to: "/lecture/events", label: "Events", icon: <IoCalendarClearOutline className="size-[1.5rem]" /> },
    { to: "/lecture/timetable", label: "Timetable", icon: <IoTimeOutline className="size-[1.5rem]" /> },
    { to: "/lecture/resources", label: "Resources", icon: <IoBookOutline className="size-[1.5rem]" /> },
    { to: "/lecture/ratings", label: "Ratings", icon: <IoStarOutline className="size-[1.5rem]" /> },
    { to: "/lecture/classroom", label: "Classroom", icon: <MdGroup className="size-[1.5rem]" /> },
];

export default function LectureSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Burger Menu Button for Small Screens */}
            <button className="lg:hidden fixed top-4 left-4 z-50 text-2xl" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <MdClose /> : <MdMenu />}
            </button>

            {/* Sidebar for Small to Medium Screens */}
            <aside className={`fixed top-0 left-0 h-full bg-white w-full md:w-full shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden transition-transform duration-300 ease-in-out`}>                
                <div className="my-5 text-center">
                    <span className="font-bold text-xl">EduConnect</span>
                </div>
                <nav className="flex flex-col gap-3">
                    {navLinks.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-slate-200 flex bg-sky-900 flex-row items-center gap-3 py-2 pl-4"
                                    : "text-black flex flex-row items-center gap-3 py-2 pl-4"
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {icon}
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Sidebar for Large Screens */}
            <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full bg-white w-[15%] shadow-lg">                
                <div className="my-5 text-center">
                    <span className="font-bold text-xl">EduConnect</span>
                </div>
                <nav className="flex flex-col gap-3">
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
                </nav>
            </aside>
        </>
    );
}
