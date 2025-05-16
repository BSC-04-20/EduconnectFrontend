import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Added useNavigate
import { MdGroup, MdOutlineSpaceDashboard, MdMenu, MdClose } from "react-icons/md";
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
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // Added navigate hook

    return (
        <>
            {/* Burger Menu Button for Small Screens */}
            <button className="lg:hidden fixed top-4 left-4 z-50 text-2xl" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <MdClose/> : <MdMenu />}
            </button>

            {/* Back Button */}
            <button
                className="fixed top-4 left-[15%] z-50 bg-sky-800 text-white px-4 py-2 rounded shadow-md hover:bg-sky-700"
                onClick={() => navigate(-1)}
            >
                Back
            </button>

            {/* Sidebar for Small to Medium Screens */}
            <aside className={`fixed top-0 left-0 h-full bg-white w-full md:w-full shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden transition-transform duration-300 ease-in-out z-40`}>                
                <div className="my-5 text-center text-sky-900">
                    <span className="font-bold text-xl text-sky-900">EduConnect</span>
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
                    <Link to="/" className="font-bold text-xl text-sky-900">EduConnect</Link>
                </div>
                <nav className="flex flex-col gap-3">
                    {navLinks.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-slate-200 flex bg-sky-900 flex-row items-center gap-3 py-2 pl-4"
                                    : "text-black hover:bg-sky-200 hover:text-sky-900 flex flex-row items-center gap-3 py-2 pl-4"
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
