import React from "react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { CgCalendar } from "react-icons/cg";

// Dummy assets
// import Avatar from "../assets/professor-avatar.svg";
// import WalkIcon from "../assets/walk-icon.svg";
// import ComputerIcon from "../assets/computer-icon.svg";
// import LightIcon from "../assets/light-icon.svg";
// import DeskIcon from "../assets/desk-icon.svg";
// import LaptopIcon from "../assets/laptop-icon.svg";

const timetableData = [
  {
    day: "Monday",
    sessions: [
      { icon: WalkIcon, course: "COM424", title: "Machine Learning", time: "08:30 - 09:30", bg: "bg-slate-200" },
      { icon: ComputerIcon, course: "COM424", title: "Machine Learning", time: "08:30 - 09:30", bg: "bg-pink-200" },
      { icon: LightIcon, course: "COM424", title: "Machine Learning", time: "08:30 - 09:30", bg: "bg-yellow-300" }
    ]
  },
  {
    day: "Tuesday",
    sessions: [
      { icon: DeskIcon, course: "COM424", title: "Machine Learning", time: "08:30 - 09:30", bg: "bg-yellow-300" },
      { icon: WalkIcon, course: "COM424", title: "Machine Learning", time: "08:30 - 09:30", bg: "bg-slate-200" }
    ]
  },
  {
    day: "Wednesday",
    sessions: [
      { icon: LaptopIcon, course: "COM424", title: "Machine Learning", time: "08:30 - 09:30", bg: "bg-pink-200" },
      { icon: LightIcon, course: "COM424", title: "Machine Learning", time: "08:30 - 09:30", bg: "bg-yellow-300" }
    ]
  }
];

export default function LecturerTimetableDashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-5 md:p-10 grid md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="flex items-center gap-4 mb-6">
          {/* <img src={Avatar} alt="Professor Avatar" className="w-14 h-14 rounded-full" /> */}
          <div>
            <h2 className="text-xl font-semibold">Professor Band</h2>
            <p className="text-sm text-gray-500">professorBD6@gmail.com</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Timetable</h3>
          <button className="bg-gray-200 rounded-full px-4 py-1 flex items-center gap-2 text-sm">
            <FaPlus /> Add
          </button>
        </div>

        {timetableData.map((dayData, i) => (
          <div key={i} className="mb-6">
            <h4 className="font-semibold mb-2">{dayData.day}</h4>
            <div className="flex flex-col gap-2">
              {dayData.sessions.map((session, j) => (
                <div key={j} className={`flex items-center justify-between p-3 rounded-lg ${session.bg}`}>
                  <div className="flex items-center gap-3">
                    <img src={session.icon} alt="icon" className="w-10 h-10" />
                    <div>
                      <p className="font-bold text-sm">{session.course}</p>
                      <p className="text-xs">{session.title}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-sm">{session.time}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-medium mb-4">Calendar</h3>
        <CgCalendar onChange={setDate} value={date} className="mb-6" />
        <h3 className="text-lg font-medium mb-2">All Courses</h3>
        <div className="flex flex-col gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border p-2 rounded-md text-sm">COM411 Machine Learning</div>
          ))}
        </div>
      </div>
    </div>
  );
}
