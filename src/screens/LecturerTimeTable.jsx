import { useState, useEffect } from "react";
import LectureSideBar from "../components/Lecture/SideBar";
import { AuthenticatedUserUrl } from "../config/urlFetcher";

// Helper functions
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function pad(n) {
  return n < 10 ? `0${n}` : n;
}

export default function LecturerTimeTable() {
  const today = new Date();
  const [view, setView] = useState("month"); // "month" or "day"
  const [selectedDate, setSelectedDate] = useState(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [monthlyEvents, setMonthlyEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  // Fetch all classes for the lecturer
  const fetchClasses = async () => {
    try {
      const response = await AuthenticatedUserUrl.get("/classes/get");
      setClasses(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch classes:", err);
      alert("Failed to fetch classes. Please try again.");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Fetch announcements and discussions for all classes and build events for the calendar
  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true);
      let events = [];
      try {
        // For each class, fetch announcements and discussions
        await Promise.all(
          classes.map(async (cls) => {
            // Announcements
            try {
              const classRes = await AuthenticatedUserUrl(`/classes/get/${cls.id}`);
              const announcements = classRes.data.announcements || [];
              announcements.forEach(a => {
                if (a.posted) {
                  const date = new Date(a.posted);
                  events.push({
                    date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
                    type: "event",
                    title: a.title || "Announcement",
                    time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  });
                }
              });
            } catch (err) {
              // Ignore errors for individual classes
            }

            // Discussions
            try {
              const discRes = await AuthenticatedUserUrl(`/classes/${cls.id}/discussions`);
              const discussions = discRes.data.discussions || [];
              discussions.forEach(d => {
                if (d.start_time) {
                  const start = new Date(d.start_time);
                  events.push({
                    date: `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`,
                    type: "discussion",
                    title: d.meeting_name || "Discussion",
                    time: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  });
                }
              });
            } catch (err) {
              // Ignore errors for individual classes
            }
          })
        );
      } catch (err) {
        // General error
        console.error("Failed to fetch events for timetable:", err);
      }
      setMonthlyEvents(events);
      setLoading(false);
    };

    if (classes.length > 0) {
      fetchAllEvents();
    }
  }, [classes, year, month]);

  // Helper: get events for a specific day
  const getEventsForDay = (dateStr) =>
    monthlyEvents.filter(ev => ev.date === dateStr);

  // Calendar grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(<div key={`empty-${i}`} />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${pad(month + 1)}-${pad(d)}`;
    const events = getEventsForDay(dateStr);

    // Get unique types for this date
    const uniqueTypes = Array.from(new Set(events.map(ev => ev.type)));

    calendarCells.push(
      <button
        key={dateStr}
        className={`rounded-lg border p-2 flex flex-col items-center justify-center transition
          ${selectedDate === dateStr ? "bg-sky-700 text-white border-sky-700" : "bg-white hover:bg-sky-100 border-gray-200"}
        `}
        onClick={() => {
          setSelectedDate(dateStr);
          setView("day");
        }}
      >
        <span className="font-bold">{d}</span>
        <div className="flex flex-row gap-1 mt-1">
          {uniqueTypes.map((type) => (
            <span
              key={type}
              className={`w-2 h-2 rounded-full ${
                type === "event"
                  ? "bg-blue-500"
                  : type === "discussion"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
              title={type.charAt(0).toUpperCase() + type.slice(1)}
            />
          ))}
        </div>
      </button>
    );
  }

  // Get daily schedule from monthlyEvents
  const dailySchedule = getEventsForDay(selectedDate)
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  return (
    <div className="flex flex-row gap-5">
      <LectureSideBar />
      <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
        <div className="bg-white rounded-md shadow-md w-[100%] h-[95%] mb-3 mt-[10vh] p-6">
          <h1 className="text-2xl font-bold text-sky-900 mb-4">Lecturer Timetable</h1>
          {view === "month" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 rounded bg-sky-100 hover:bg-sky-200"
                    onClick={() => setYear(y => y - 1)}
                  >
                    &lt;
                  </button>
                  <span className="font-semibold">{year}</span>
                  <button
                    className="px-2 py-1 rounded bg-sky-100 hover:bg-sky-200"
                    onClick={() => setYear(y => y + 1)}
                  >
                    &gt;
                  </button>
                </div>
                <select
                  className="border rounded px-2 py-1"
                  value={month}
                  onChange={e => setMonth(Number(e.target.value))}
                >
                  {months.map((m, idx) => (
                    <option key={m} value={idx}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-7 gap-2 bg-sky-50 p-2 rounded">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center font-semibold text-sky-700">{day}</div>
                ))}
                {calendarCells}
              </div>
              <div className="mt-4 flex gap-4">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block" /> Event</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> Discussion</span>
                {/* If you add assignments, add here */}
              </div>
            </>
          )}

          {view === "day" && (
            <div className="mt-4">
              <button
                className="mb-4 px-3 py-1 rounded bg-sky-100 hover:bg-sky-200"
                onClick={() => setView("month")}
              >
                &larr; Back to Month
              </button>
              <h2 className="text-xl font-semibold mb-2">
                {months[Number(selectedDate.split("-")[1]) - 1]} {Number(selectedDate.split("-")[2])}, {selectedDate.split("-")[0]}
              </h2>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="space-y-3">
                  {dailySchedule.length === 0 ? (
                    <div className="text-gray-500">No scheduled items for this day.</div>
                  ) : (
                    dailySchedule.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-4 p-3 rounded border-l-4 shadow-sm ${
                          item.type === "event"
                            ? "border-blue-500 bg-blue-50"
                            : item.type === "discussion"
                            ? "border-green-500 bg-green-50"
                            : "border-yellow-500 bg-yellow-50"
                        }`}
                      >
                        <span className="font-bold w-16">{item.time}</span>
                        <span className="capitalize font-semibold">{item.type}</span>
                        <span>{item.title}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}