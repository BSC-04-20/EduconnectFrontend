import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/events", label: "Events" },
];

const authLinks = [
    { to: "/login", label: "Log In" },
    { to: "/signup", label: "Sign Up" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="hidden lg:flex justify-between items-center bg-gray-100 px-8 py-4 shadow-md">
                <NavLink to="/" className="text-2xl font-bold text-sky-800">
                    EduConnect
                </NavLink>
                <div className="flex gap-6 text-gray-700">
                    {navLinks.map(({ to, label }) => (
                        <NavLink 
                            key={to} 
                            to={to} 
                            className={({ isActive }) => isActive ? "text-sky-600 font-semibold" : "hover:text-sky-600"}
                        >
                            {label}
                        </NavLink>
                    ))}
                    {authLinks.map(({ to, label }) => (
                        <NavLink 
                            key={to} 
                            to={to} 
                            className={({ isActive }) => isActive ? "text-sky-600 font-semibold" : "hover:text-sky-600"}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className="lg:hidden flex justify-between items-center bg-gray-100 px-6 py-4 shadow-md">
                <NavLink to="/" className="text-2xl font-bold text-sky-800">
                    EduConnect
                </NavLink>
                <button onClick={() => setIsOpen(true)} className="text-3xl">
                    <MdMenu />
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-gray-100 flex flex-col items-center pt-20 space-y-6 text-lg transition-transform ${isOpen ? "translate-y-0" : "-translate-y-full"} duration-300 ease-in-out`}>
                {/* Close Button */}
                <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-3xl text-gray-700">
                    <MdClose />
                </button>

                {navLinks.map(({ to, label }) => (
                    <NavLink 
                        key={to} 
                        to={to} 
                        className={({ isActive }) => isActive ? "text-sky-600 font-semibold" : "hover:text-sky-600"} 
                        onClick={() => setIsOpen(false)}
                    >
                        {label}
                    </NavLink>
                ))}
                {authLinks.map(({ to, label }) => (
                    <NavLink 
                        key={to} 
                        to={to} 
                        className={({ isActive }) => isActive ? "text-sky-600 font-semibold" : "hover:text-sky-600"} 
                        onClick={() => setIsOpen(false)}
                    >
                        {label}
                    </NavLink>
                ))}
            </div>
        </>
    );
}
