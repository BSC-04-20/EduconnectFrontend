import { NavLink } from "react-router-dom";

export default function HomeNavBar() {
    return (

        <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-end bg-white lg:space-x-5 lg:text-lg lg:text-white lg:h-[10vh] lg:w-full lg:mr-10 lg:ml-auto">
                        <span className="lg:text-4xl text-sky-900 font-bold mr-auto px-5">Educonnect</span>
                        
                        <NavLink to="/Abous Us" className={({isActive}) => isActive ? "hover:bg-sky-700 bg-red-700 font-medium h-full p-1 hover:rounded-lg" : "hover:bg-sky-500 font-medium p-1 rounded-lg text-black"}>About Us</NavLink>
                        <NavLink to="/Events" className={({isActive}) => isActive ? "hover:bg-sky-700 bg-sky-700 font-medium h-full p-1 hover:rounded-lg" : "hover:bg-sky-500 font-medium p-1 rounded-lg text-black"}>Events</NavLink>
                        <NavLink to="/Sign Up" className={({isActive}) => isActive ? "hover:bg-sky-700 bg-red-700 font-medium h-full p-1 hover:rounded-lg" : "hover:bg-sky-500 font-medium p-1 rounded-lg text-sky-600"}>Sign Up</NavLink>
                        <NavLink to="/Log In" className={({isActive}) => isActive ? "hover:bg-sky-700 bg-red-800 font-medium h-full p-1 hover:rounded-lg" : "hover:bg-sky-500 font-medium p-1 rounded-lg text-sky-600"}>Log In</NavLink>
                </div>
    )
}