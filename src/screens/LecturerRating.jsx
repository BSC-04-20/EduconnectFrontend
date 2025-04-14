import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import LectureSideBar from "../components/Lecture/SideBar";
import { AuthenticatedUserUrl } from "../config/urlFetcher";

export default function LecturerRatings() {
  const [showAll, setShowAll] = useState(false);
  const [ratings, setRatings] = useState({});
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await AuthenticatedUserUrl.get(`/ratings/get`);
        // const data = await response.json();
        setRatings(response.data.average_rating);
      } catch (error) {
        alert("Error fetching rating:", error);
      }
    };
    fetchRating();
  }, []);

  // 👇 Mock data: Replace this with real class data later
  const classes = [
    { id: 1, name: "Intro to Programming", averageRating: 4.2 },
    { id: 2, name: "Data Structures", averageRating: 3.7 },
    { id: 3, name: "Operating Systems", averageRating: 4.8 },
    { id: 4, name: "Databases", averageRating: 3.3 },
    { id: 5, name: "Web Development", averageRating: 4.1 },
    { id: 6, name: "Computer Networks", averageRating: 4.0 },
    { id: 7, name: "AI & Machine Learning", averageRating: 4.5 },
  ];

  const visibleClasses = showAll ? classes : classes.slice(0, 5);

  return (
    <div>
      <LectureSideBar />
      <div className="flex flex-col ml-[20%] min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-blue-700 mb-2">
            Your Class Ratings
          </h1>
          <p className="text-gray-600 mb-6">
            This shows your average rating for each class you teach.
          </p>

          <div className="space-y-3">
            {visibleClasses.map((cls, index) => (
              <div
                key={cls.id}
                className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm"
              >
                <div className="text-lg font-semibold">{cls.name}</div>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < Math.round(cls.averageRating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      {i < Math.round(cls.averageRating) ? (
                        <AiFillStar />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </span>
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    ({cls.averageRating.toFixed(1)})
                  </span>
                </div>
              </div>
            ))}
          </div>

          {classes.length > 5 && (
            <div className="text-right mt-4">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 font-semibold hover:underline"
              >
                {showAll ? "Show Less" : "View More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
