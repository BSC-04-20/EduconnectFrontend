import { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { GoPeople } from "react-icons/go";

export default function LectureClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [className, setClassName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await AuthenticatedUserUrl.get("/classes/get");
        setClasses(response.data.data);
      } catch (err) {
        setError("Failed to fetch classes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!className) {
      setErrorMessage("Class name is required!");
      return;
    }

    setSubmitLoading(true);
    setErrorMessage("");

    try {
      const response = await AuthenticatedUserUrl.post("/classes/create", {
        name: className,
      });

      if (response.status === 201 || response.status === 200) {
        alert("Class added successfully!");
        setClassName("");
        setShowModal(false);
        navigator("/lecture/classroom");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error adding class. Try again."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="p-4">
      {loading && <p className="text-center text-gray-600">Loading classes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white w-full sm:w-[95%] rounded-lg p-5 mt-5">
        {classes.map((classItem) => (
          <Link
            to={`/lecture/classroom/${classItem.id}`}
            key={classItem.id}
            className="mt-2 bg-white drop-shadow-md h-[40vh] w-full sm:w-[80%] mx-auto rounded-lg flex flex-col"
          >
            <div className="grid grid-rows px-5 bg-sky-900 w-full h-[20%] text-white rounded-lg items-center pl-2">
              <h1 className="font-bold">{classItem.name}</h1>
            </div>
            <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#C7D6DA] ml-auto mr-2 mt-auto mb-2">
              <GoPeople className="text-slate-900 size-[1.5rem]" />
            </div>
          </Link>
        ))}
      </div>

      {/* FAB to open modal */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 sm:bottom-16 sm:right-24 bg-sky-200 rounded-full p-5 text-sky-900 shadow-md hover:bg-sky-500"
      >
        <FaPlus className="size-[2rem]" />
      </button>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
              Create New Class
            </h2>
            {errorMessage && (
              <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
            )}

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
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-900 text-white font-semibold rounded-lg mt-4"
                disabled={submitLoading}
              >
                {submitLoading ? "Adding..." : "Add Class"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
