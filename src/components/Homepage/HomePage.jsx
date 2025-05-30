import { useNavigate } from "react-router-dom";
import SmilingStudent from "../../assets/Smiling student.png"

export default function HomePage(){
    const navigate = useNavigate();

    return(
        <div className="w-[100%] h-max md:h-[80vh] text-black bg-white bg-gradient-to-r from-sky-200 flex flex-col gap-10 md:flex-row items-center">
            <div className="flex flex-col gap-3 md:w-[45%] mx-[5%]">
                <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl">Empowering <span className="text-sky-700">Education</span> through <span className="text-sky-700">Collaboration & Innovation</span></h1>
                <p className="text-base md:text-xl">Connect with students and educators worldwide, access events, plan lessons, and enhance learning both online and offline.</p>
                <button
                    className="bg-sky-500 shadow-lg hover:bg-sky-700 px-5 py-2 w-[100%] md:w-[30%] text-white font-medium"
                    onClick={() => navigate("/signup/select")}
                >
                    Signup
                </button>
            </div>
            <div className="h-[50vh] md:h-[80vh] ml-[10%]">
                <img className="h-[100%] left-auto right-0" src={SmilingStudent}/>
            </div>
        </div>
    )
}