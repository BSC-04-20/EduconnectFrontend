import { useState } from "react";
import StudentSideBar from "../components/Student/SideBar";

export default function StudentDiscussions() {
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.getTime();

    const discussions = [
        { name: "Performance Optimization in Mobile Apps", date: date, time: time, activity: "Pending" },
        {name: "Performance Optimization in Mobile Apps", date: date, time: time, activity:"Pending" },
        {name: "Performance Optimization in Mobile Apps", date: date, time: time, activity:"Done" },
        {name: "Performance Optimization in Mobile Apps", date: date, time: time, activity:"Active" },
        
    ];


    const [showAll, setShowAll] = useState(false);

    return (
        <div className="flex flex-row gap-5">
            <StudentSideBar />
            <section className="ml-[17%] w-[100%] mb-20">
                <div className="bg-white w-[97%] h-[95%] mt-9 mr-auto rounded-3xl ">
                    <h1 className="text-sky-900 text-xl font-semibold ml-10 pt-2">Discussions</h1>
                    <div className="grid grid-cols-1 gap-2 mt-2 grid-row-4">
                        {
                            (showAll ? discussions : discussions.slice(0, 4)).map((discussion, index) => (
                                <div key={index} className="bg-white rounded-md overflow-hidden w-[85%] ml-10 mr-auto flex flex-col border-gray-300 border-2 pt-2 pb-4">
                                    <h2 className="mr-auto ml-4">{discussion.name}</h2>
                                    <div className="grid grid-cols-2 flex flex-col">
                                        <div className="grid grid-cols-2 gap-1 mt-3">
                                            <h5 className="ml-4">Date: {discussion.date}</h5>
                                            <h5>Time: {discussion.time}</h5>
                                        </div>
                                        <span
                                            className={`ml-auto mr-6 border-2 rounded-3xl pl-4 pr-4 pt-1 pb-1 align-middle ${
                                                discussion.activity === "Pending"
                                                    ? "border-blue-300 bg-blue-100 text-blue-500"
                                                    : discussion.activity === "Done"
                                                    ? "border-red-300 bg-red-100 text-red-500"
                                                    : discussion.activity === "Active"
                                                    ? "border-green-300 bg-green-100 text-green-500"
                                                    : "border-gray-300 bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            <h3>{discussion.activity}</h3>
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {discussions.length > 4 && (
                        <div className="text-right mt-4 mr-10">
                            <button 
                                onClick={() => setShowAll(!showAll)} 
                                className="text-blue-400 font-semibold hover: text-blue-900"
                            >
                                {showAll ? "Show Less" : "View More"}
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
