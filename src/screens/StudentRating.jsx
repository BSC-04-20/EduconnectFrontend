import { useEffect, useState } from "react";
import StudentsSideBar from "../components/Student/SideBar";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import StudentSideBar2 from "../components/Student/SideBar2";
import { StudentAuthenticatedUserUrl } from "../config/urlFetcher";


export default function StudentRating() {

    


    const [lecturers, setLecturers] = useState([]);
    const [ratings, setRatings] = useState({0:0,1:0,2:0,3:0,4:0,5:0});
    const [rates, setRates] = useState({});

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await StudentAuthenticatedUserUrl.get(`/ratings/get`);
                // const data = await response.json();
                setRatings(response.data.average_rating);
            } catch (error) {
                alert('Error fetching rating:', error);
            }
        }
    },[])
    
    const handleRateClick = (index) => {
        setRates((prevRates) => ({
            ...prevRates,
            [index]: prevRates[index] === "Rate" ? "Give Rating" : "Rate"
        }));
    };
    const handleStarClick = (index, starValue) => {
        if (rates[index] === "Rate") { // Allow rating only when it's "Rate"
            setRatings((prevRatings) => ({
                ...prevRatings,
                [index]: starValue
            }));
        }
    };
    
    const teachers = [
        { name: "A", rating: {ratings}, image: "..\\src\\assets\\profile.jpg", datails:"A Computer Science lecturer teaches programming, algorithms, software development, and emerging technologies while mentoring students.",id:1 },
        { name: "B", rating: {ratings}, image: "..\\src\\assets\\profile.jpg", datails:"A Computer Science lecturer teaches programming, algorithms, software development, and emerging technologies while mentoring students.",id:2 },
        { name: "C", rating: {ratings}, image: "..\\src\\assets\\profile.jpg", datails:"A Computer Science lecturer teaches programming, algorithms, software development, and emerging technologies while mentoring students.",id:3 },
        { name: "D", rating: {ratings}, image: "..\\src\\assets\\profile.jpg", datails:"A Computer Science lecturer teaches programming, algorithms, software development, and emerging technologies while mentoring students.",id:4 },
        { name: "E", rating: {ratings}, image: "..\\src\\assets\\profile.jpg", datails:"A Computer Science lecturer teaches programming, algorithms, software development, and emerging technologies while mentoring students.",id:5 }
    ];

    const [showAll, setShowAll] = useState(false);

    return (
        <div className="flex flex-row gap-5">
        <StudentsSideBar/>
        <section className="mt-[5vh] md:mt-10 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
            <div className="bg-white rounded-md shadow-md w-[100%] h-[95%] mb-20">
        <div className="p-6">
            <h1 className="text-xl font-semibold text-blue-700">Your Teachers</h1>
            <p className="text-gray-600 mb-4">Tap on a teacher you want to rate</p>
            
            <div className="space-y-4">
                {(showAll ? teachers : teachers.slice(0, 3)).map((teacher, index) => (
                    <div key={index} className="flex items-center p-4 bg-white border rounded-lg shadow-sm w-[80%]-lg">
                        <img src={teacher.image} alt={teacher.name} className="w-12 h-12 rounded-full mr-4 object-cover scale-[1.35]-lg" />
                        <div className="flex flex-col ml-10-lg">
                        <div className="flex flex-row-lg flex-col-sm">
                            <h2 className="font-bold">{teacher.name}</h2>
                            <div className="flex gap-1 ml-auto pt-2-sm pb-1-sm pr-5 mr-5-sm mb-2 items-center">
                            {[...Array(5)].map((_, i) => (
                                <span 
                                    key={i} 
                                    className={`cursor-pointer text-xl ${i < (ratings[index] || 0) ? "text-yellow-500" : "text-gray-400"} 
                                        ${rates[index] === "Rate" ? "hover:text-yellow-600" : "cursor-not-allowed"}`}
                                    onClick={() => handleStarClick(index, i + 1)}
                                >
                                    {i < (ratings[index] || 0) ? <AiFillStar /> : <AiOutlineStar />}
                                </span>
                            ))}
                                </div>
                                <button 
                                    onClick={() => {
                                        handleRateClick(index)
                                        if(rates[index] === "Give Rating"){
                                            // alert("Rate Now")
                                        }
                                        else{
                                            //Alternative action
                                            // alert("Rate")
                                        }
                                    }} 
                                    disabled={ratings[index] === 0 && rates[index] === "Rate" === "Rate" ? true : false}
                                    className={`h-[1px] w-[10vw] h-[4.5vh] rounded-2xl border-2 
                                        ${rates[index] === "Rate" ? "text-sky-900 bg-white hover:bg-sky-900 hover:text-white  border-sky-900" 
                                        : "bg-sky-900 text-white hover:bg-white hover:text-sky-900 text-sky-900 hover:border-sky-900"}
                                        ${ratings[index] === 0 && rates[index] === "Rate" ? "opacity-50 hover:bg-stone-500 cursor-not-allowed" : ""}`}
                                >
                                    <p className="flex items-center justify-center">{rates[index] || "Give Rating"}</p>
                                </button>

                        </div>
                        <div> 
                            <p className="text-gray-500 text-sm w-[45vw]-lg">
                                {teacher.datails}
                            </p>
                        </div>
                        </div>
                    </div>
                ))}
            </div>

            {teachers.length > 3 && (
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
