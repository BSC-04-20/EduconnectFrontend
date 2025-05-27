import { FaChalkboardTeacher, FaUsers, FaCalendarAlt, FaBook, FaStar, FaRobot } from "react-icons/fa";

const KeyFeatures = () => {
  const features = [
    {
      icon: <FaChalkboardTeacher className="w-8 h-8" />,
      title: "Online meetings",
      description: "Virtual classrooms, mentoring, and access to past recordings for flexible learning.",
    },
    {
      icon: <FaCalendarAlt className="w-8 h-8" />,
      title: "Smart Timetabling",
      description: "Avoid schedule clashes and manage class loads efficiently across multiple locations.",
    },
    {
      icon: <FaBook className="w-8 h-8" />,
      title: "Resource Sharing",
      description: "Upload and download slides, books, and study materials in one place.",
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-start text-start"
            >
              <div className="mb-4 text-sky-600">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;