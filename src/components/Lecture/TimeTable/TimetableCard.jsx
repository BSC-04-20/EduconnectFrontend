import { FaRunning, FaLaptop, FaBook, FaChalkboardTeacher, FaGlasses, FaTv } from "react-icons/fa";

const iconMap = {
  walk: <FaRunning className="text-xl" />,
  laptop: <FaLaptop className="text-xl" />,
  books: <FaBook className="text-xl" />,
  chalkboard: <FaChalkboardTeacher className="text-xl" />,
  glasses: <FaGlasses className="text-xl" />,
  monitor: <FaTv className="text-xl" />,
  reading: <FaBook className="text-xl" />,
};

export default function TimetableCard({ day, time, course, topic, color, icon }) {
  return (
    <div className={`flex justify-between items-center p-4 rounded shadow ${color}`}>
      <div className="flex items-center gap-4">
        {iconMap[icon]}
        <div>
          <p className="font-semibold">{course}</p>
          <p className="text-sm">{topic}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">{time.split(" - ")[0]}</p>
        <p className="font-semibold">{time.split(" - ")[1]}</p>
      </div>
    </div>
  );
}
