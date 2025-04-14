import React from "react";
import TopBar from "../components/Lecture/TopBar";
import LectureSideBar from "../components/Lecture/SideBar";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = Array.from({ length: 24 }, (_, i) => 0 + i); // 00:00 to 23:00

const events = [
  { id: 1, title: "Math Class", day: "Monday", start: "08:00", end: "10:00" },
  { id: 2, title: "Physics", day: "Wednesday", start: "13:00", end: "15:00" },
  { id: 3, title: "Chemistry", day: "Monday", start: "09:00", end: "10:30" },
];

const TimeTable = () => {
  return (
    <>
    
    <LectureSideBar/>
    <div className="flex flex-col ml-[20%] min-h-screen bg-gray-100 p-6">
      <TopBar/>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-[80px_repeat(7,1fr)] border border-gray-300 w-[100%] ">
          {/* Header Row */}
          <div className="bg-gray-100 border-b border-r h-12 flex items-center justify-center font-bold">
            Time
          </div>
          {days.map((day) => (
            <div
              key={day}
              className="bg-gray-100 border-b border-r h-12 flex items-center justify-center font-bold"
            >
              {day}
            </div>
          ))}

          {/* Time Rows */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              {/* Time Label */}
              <div className="border-r h-16 flex items-center justify-center text-sm">
                {hour}:00
              </div>

              {/* Day Columns */}
              {days.map((day) => (
                <div
                  key={day + hour}
                  className="relative border-r h-16 border-b"
                >
                  {events
                    .filter(
                      (e) =>
                        e.day === day &&
                        parseInt(e.start.split(":")[0]) === hour
                    )
                    .map((e) => (
                      <div
                        key={e.id}
                        className="absolute top-0 left-0 right-0 bg-blue-400 text-white text-xs p-1 rounded"
                        style={{
                          height: `${
                            (parseInt(e.end.split(":")[0]) -
                              parseInt(e.start.split(":")[0])) *
                            100
                          }%`,
                        }}
                      >
                        {e.title}
                      </div>
                    ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default TimeTable;
