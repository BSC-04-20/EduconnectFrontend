import { useState } from "react";

export default function AboutUsNavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="">
            <nav className="py-2 flex justify-between items-center p-6 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-blue-900">EduConnect</h1>

                <ul className="hidden md:flex space-x-6 text-gray-700">
                    <li className="hover:bg-sky-500 py-2"><a href="#">About Us</a></li>
                    <li className="hover:bg-sky-500 py-2"><a href="#">Events</a></li>
                    <li className="hover:bg-sky-500 py-2"><a href="#">Log In</a></li>
                    <li className="hover:bg-sky-500 py-2"><a href="#">Sign Up</a></li>
                </ul>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {isOpen && (
                <ul className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-gray-700">
                    <li className="hover:bg-sky-500 py-2"><a href="#">About Us</a></li>
                    <li className="hover:bg-sky-500 py-2"><a href="#">Events</a></li>
                    <li className="hover:bg-sky-500 py-2"><a href="#">Log In</a></li>
                    <li className="hover:bg-sky-500 py-2"><a href="#">Sign Up</a></li>
                </ul>
            )}
        </div>
    );
}
