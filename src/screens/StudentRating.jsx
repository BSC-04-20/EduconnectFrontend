import { useEffect, useState } from "react";
import StudentsSideBar from "../components/Student/SideBar";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import StudentTopBar from "../components/Student/TopBar";
import { StudentAuthenticatedUserUrl } from "../config/urlFetcher";
import { Toaster, toast} from "react-hot-toast";


export default function StudentRating() {
  const [lecturers, setLecturers] = useState([]);
  const [ratings, setRatings] = useState({});
  const [rates, setRates] = useState({});

  // const id = useParams();

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await StudentAuthenticatedUserUrl.get(`/ratings/get`);
        // const data = await response.json();
        setRatings(response.data.average_rating);
      } catch (error) {
        toast.error("Error fetching rating:", error);
      }
    };
    fetchRating();
  }, []);

  const handleRateClick = (index) => {
    setRates((prevRates) => ({
      ...prevRates,
      [index]: prevRates[index] === "Rate" ? "Give Rating" : "Rate",
    }));
  };
  const handleStarClick = (index, starValue) => {
    if (rates[index] === "Rate") {
      // Allow rating only when it's "Rate"
      setRatings((prevRatings) => ({
        ...prevRatings,
        [index]: starValue,
      }));
    }
  };
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await StudentAuthenticatedUserUrl.get(
          `/student/lecturers`
        );
        const lecturersData = response.data.lecturers;

        // Transform the object into an array of lecturer objects
        const formattedLecturers = Object.entries(lecturersData).map(
          ([name, id]) => ({
            fullname: name,
            id: id,
          })
        );

        setLecturers(formattedLecturers);
      } catch (error) {
        toast.error("Error fetching lecturers: " + error);
      }
    };

    fetchLecturers();
  }, []);

  const postRating = async (lecturerId, ratingValue) => {
    try {
      const response = await StudentAuthenticatedUserUrl.post(
        `/ratings/rate/${lecturerId}`,
        {
          rating: ratingValue,
        }
      );

      if (response.status === 200) {
        toast.success("Rating submitted successfully!");
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch (error) {
      toast.error("Error submitting rating: " + error.message);
    }
  };

  const [showAll, setShowAll] = useState(false);


  return (
    <div className="flex flex-row gap-5">
      <StudentsSideBar />
      <section className="mt-[5vh] md:mt-10 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
      <StudentTopBar/>
        <div className="bg-white rounded-md shadow-md w-[100%] h-[95%] mb-20">
          <div className="p-6">
            <h1 className="text-xl font-semibold text-blue-700">
              Your Teachers
            </h1>
            <p className="text-gray-600 mb-4">
              Tap on Give a rating to rate a lecturer
            </p>
            <Toaster/>
            <div className="space-y-4">
              {(showAll ? lecturers : lecturers.slice(0, 3)).map(
                (lecturer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm w-full"
                  >
                    {/* Profile image */}
                    <img
                      src={`..\\assets\\profile.png`}
                      alt={lecturer.fullname}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    {/* Lecturer name (left content) */}
                    <div className="ml-4 flex-1">
                      <h2 className="font-bold">{lecturer.fullname}</h2>
                    </div>

                    {/* Right section: stars and button */}
                    <div className="flex items-center space-x-4 ml-auto">
                      {/* Stars */}
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`cursor-pointer text-xl ${
                              i < (ratings[index] || 0)
                                ? "text-yellow-500"
                                : "text-gray-400"
                            } ${
                              rates[index] === "Rate"
                                ? "hover:text-yellow-600"
                                : "cursor-not-allowed"
                            }`}
                            onClick={() => handleStarClick(index, i + 1)}
                          >
                            {i < (ratings[index] || 0) ? (
                              <AiFillStar />
                            ) : (
                              <AiOutlineStar />
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Button */}
                      <button
                        onClick={() => {
                            // alert(ratings[index]); 
                            handleRateClick(index);
                          if((ratings[index] || ratings[index] !== 0) && rates[index] === "Rate"){
                          postRating(lecturer.id, ratings[index]);
                          }
                      }}
                        disabled={(ratings[index] === '0'|| ratings[index] === '.' || ratings[index] === 0 || !ratings[index]) 
                          && rates[index] === "Rate"}
                        className={` w-[10vw] h-[4.5vh] rounded-2xl border-2 
                            ${rates[index] === "Rate" ? "text-sky-900 bg-white hover:bg-sky-900 hover:text-white  border-sky-900" 
                            : "bg-sky-900 text-white hover:bg-white hover:text-sky-900 hover:border-sky-900"}
                            ${(ratings[index] === '0'|| ratings[index] === '.'  || ratings[index] === 0 || !ratings[index]) 
                              && rates[index] === "Rate" ? "opacity-50 hover:bg-stone-500 cursor-not-allowed" : ""}`}


                      >
                        {rates[index] === "Rate" ? "Rate" : "Give Rating"}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            {lecturers.length > 3 && (
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
      </section>
    </div>
  );
}
