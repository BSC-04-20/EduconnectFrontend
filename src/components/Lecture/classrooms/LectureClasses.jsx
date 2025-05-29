import { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa6";
import { Link} from "react-router-dom";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { GoPeople } from "react-icons/go";
import { PiPlus } from "react-icons/pi";
import Empty from "../../../assets/Empty-pana.svg";

export default function LectureClasses() {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [classAddLoading, setClassAddLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const navigator = useNavigate();

  const handleAddClick = () => {
    setIsDialogOpen(true);
  };

  const fetchClasses = async () => {
    try {
      const response = await AuthenticatedUserUrl.get("/classes/get");
      setClasses(response.data.data);
    } catch (err) {
      setError("Failed to fetch classes. Please try again.");
      console.log(err)
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
        setClassName("");
        setIsDialogOpen(false);
        fetchClasses();
      }
    } catch (error) {
      alert("Failed to add class, try again later");
      console.log(error)
    } finally {
      setClassAddLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      {loading && <p className="text-center text-gray-600">Loading classes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Empty state */}
      {!loading && classes.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-12 space-y-6 text-center">
          <img src={Empty} alt="No Classes" className="w-64 max-w-full mx-auto" />
          <p className="text-gray-600 text-lg">No classes found.</p>
          <p className="text-sm text-gray-500">Click the + button to create your first class.</p>
        </div>
      )}

      {/* Classes grid */}
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

      {/* Add class button */}
      <button
        onClick={handleAddClick}
        className="fixed bottom-16 right-6 bg-white text-sky-500 p-4 rounded-full shadow-lg hover:bg-gray-100 z-50 transition-all"
      >
        <PiPlus size={30} />
      </button>

      {/* Add class dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-all px-4">
          <div className="w-full max-w-xl bg-white p-6 shadow-lg rounded-lg">
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
              <div className="flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="py-3 px-4 text-red-500 hover:text-red-700 hover:bg-gray-50 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 px-4 bg-sky-900 hover:bg-sky-700 text-white font-semibold rounded-lg"
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
