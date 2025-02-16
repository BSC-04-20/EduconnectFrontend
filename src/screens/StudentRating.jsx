import { useState } from "react";
import StudentsSideBar from "../components/Student/SideBar";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


export default function StudentRating() {
    const teachers = [
        { name: "Dr Mwakabira", rating: 5, image: "..\\src\\assets\\profile.jpg", datails:"A Computer Science lecturer teaches programming, algorithms, software development, and emerging technologies while mentoring students." },
        { name: "Dr Mwakabira", rating: 4, image: "..\\src\\assets\\profile.jpg", datails:"A Computer Science lecturer teaches programming, algorithms, software development, and emerging technologies while mentoring students." },
        { name: "Dr Mwakabira", rating: 4, image: "..\\src\\assets\\profile.jpg", datails:"A Computer Science lecturer teaches programming, algorithms, software development, and emerging technologies while mentoring students." },
        { name: "Dr Mwakabira", rating: 3, image: "..\\src\\assets\\profile.jpg", datails:"A Computer Science lecturer teaches programming, algorithms, software development, and emerging technologies while mentoring students." },
        { name: "Dr Mwakabira", rating: 4, image: "..\\src\\assets\\profile.jpg", datails:"A Computer Science lecturer teaches programming, algorithms, software development, and emerging technologies while mentoring students." }
    ];

    const [showAll, setShowAll] = useState(false);

    return (
        <>
        <StudentsSideBar/>
        <section className="ml-[17%] w-[80%] pt-6">
            <div className="bg-white rounded-md shadow-md w-[100%] h-[95%] mb-20">
        <div className="p-6">
            <h1 className="text-xl font-semibold text-blue-700">Your Teachers</h1>
            <p className="text-gray-600 mb-4">Tap on a teacher you want to rate</p>
            
            <div className="space-y-4">
                {(showAll ? teachers : teachers.slice(0, 3)).map((teacher, index) => (
                    <div key={index} className="flex items-center p-4 bg-white border rounded-lg shadow-sm w-[80%]">
                        <img src={teacher.image} alt={teacher.name} className="w-12 h-12 rounded-full mr-4 object-cover scale-[1.35]" />
                        <div className="flex flex-col ml-10">
                        <div className="flex flex-row">
                            <h2 className="font-bold">{teacher.name}</h2>
                            <div className="flex gap-1 ml-auto pt-2 pb-1">
                                    {[...Array(5)].map((_, i) => (
                                    i < teacher.rating ? (
                                        <AiFillStar key={i} className="text-yellow-500 text-xl"/>
                                    ) : (
                                        <AiOutlineStar key={i} className="text-gray-400 text-xl"/>
                                    )
                                    ))}
                                </div>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm w-[45vw]">
                                {teacher.datails}
                            </p>
                        </div>
                        </div>
                    </div>
                ))}
            </div>

            {teachers.length > 3 && (
                <div className="text-right mt-4">
                    <button 
                        onClick={() => setShowAll(!showAll)} 
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        {showAll ? "Show Less" : "View More"}
                    </button>
                </div>
            )}
        </div>
        </div>
        </section>
        </>
    
    );
}
