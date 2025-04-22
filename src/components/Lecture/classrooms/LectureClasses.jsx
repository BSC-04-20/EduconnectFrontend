import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { GoPeople } from "react-icons/go";

export default function LectureClasses() {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [classAddLoading, setClassAddLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigator = useNavigate();

  const handleAddClick = () => {
    setIsDialogOpen(true);
  };

  // Define fetchClasses function outside useEffect to make it reusable
  const fetchClasses = async () => {
    try {
      const response = await AuthenticatedUserUrl.get("/classes/get");
      setClasses(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      setError("Failed to fetch classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setClassAddLoading(true);
    try {
      const response = await AuthenticatedUserUrl.post("/classes/create", {
        name: className,
      });

      if (response.status === 201 || response.status === 200) {
        alert("Class added successfully!");
        setClassName(""); // Reset form
        setIsDialogOpen(false);

        // Refetch the classes after adding a new one
        fetchClasses();
      }
    } catch (error) {
      alert("Failed to add class, try again later");
    } finally {
      setClassAddLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses(); // Call the fetchClasses function on mount
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      {loading && <p className="text-center text-gray-600">Loading classes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {classes.map((classItem) => (
          <Link
            to={`/lecture/classroom/${classItem.id}`}
            key={classItem.id}
            className="bg-white drop-shadow-md rounded-xl flex flex-col min-h-[200px] hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="bg-sky-900 text-white px-4 py-3 rounded-t-xl">
              <h1 className="font-bold text-lg">{classItem.name}</h1>
            </div>
            <div className="flex-grow flex items-end justify-end p-3">
              <div className="flex items-center justify-center rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-[#C7D6DA]">
                <GoPeople className="text-slate-900 size-[1.5rem]" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={handleAddClick}
        className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 bg-sky-600 rounded-full p-4 sm:p-5 text-sky-900 shadow-md hover:bg-sky-700 transition-colors"
      >
        <FaPlus className="w-10 h-10 text-white rounded-full flex items-center justify-center transition duration-300" />
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-all">
          <div className="max-w-[55%] min-w-[35%] my-auto mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
              Create New Class
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="className">
                  Class Name
                </label>
                <input
                  type="text"
                  id="className"
                  name="className"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  placeholder="Enter class name"
                  required
                />
              </div>
              <div className="flex flex-row flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="py-3 px-3 text-red-500 hover:text-red-700 hover:bg-gray-50 font-semibold rounded-lg mt-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 px-3 hover:bg-sky-700 bg-sky-900 text-white font-semibold rounded-lg mt-4"
                  disabled={classAddLoading}
                >
                  {classAddLoading ? "Adding..." : "Add Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
