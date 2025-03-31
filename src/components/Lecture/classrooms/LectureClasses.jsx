import { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom"; // Ensure Axios instance is imported
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { GoPeople } from "react-icons/go";

export default function LectureClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await AuthenticatedUserUrl.get("/classes/get"); // Make API call
        setClasses(response.data.data);
        console.log(response.data.data)
      } catch (err) {
        setError("Failed to fetch classes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      {loading && <p className="text-center text-gray-600">Loading classes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-3 gap-4 bg-white w-[95%] rounded-lg p-5 mt-5 flex-wrap">
        {classes.map((classItem) => (
          <Link to={`/lecture/classroom/${classItem.id}`} key={classItem.id} className="mt-2 bg-white drop-shadow-md h-[40vh] w-[80%] rounded-lg flex flex-col">
            <div key={classItem.id} className= "grid grid-row px-5 bg-sky-900 w-[100%] h-[20%] text-white rounded-lg items-center pl-2"> 
              <h1 className="font-bold">{classItem.name}</h1>
            </div>
            <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#C7D6DA] ml-auto mr-2 mt-auto mb-2">
              <GoPeople className="text-slate-900  size-[1.5rem]"/>
            </div>
          
          </Link>
        ))}
      </div>

      <Link to="/lecture/classroom/add" className="fixed bottom-16 right-24 bg-sky-200 rounded-full p-5 text-sky-900 shadow-md hover:bg-sky-500">
        <FaPlus className="size-[2rem]" />
      </Link>
    </div>
  );
}
