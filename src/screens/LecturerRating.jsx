import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import LectureSideBar from "../components/Lecture/SideBar";
import { AuthenticatedUserUrl } from "../config/urlFetcher";
import TopBar from "../components/Lecture/TopBar";

export default function LecturerRatings() {
//   const [showAll, setShowAll] = useState(false);
  const [ratings, setRatings] = useState();
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


  return (
    <div>
      <LectureSideBar />
      <div className="flex flex-col ml-[20%] min-h-screen bg-gray-100 p-6">
        <TopBar />
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-blue-700 mb-2">
            Your Class Ratings
          </h1>
          <p className="text-gray-600 mb-6">
            This shows your average rating for each class you teach.
          </p>

          <div className="space-y-3">
              <div
                className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm"
              >
                <div className="text-lg font-semibold">
                    This is your current rating
                </div>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < Math.round(ratings)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      {i < Math.round(ratings) ? (
                        <AiFillStar />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </span>
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    {ratings}
                  </span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
