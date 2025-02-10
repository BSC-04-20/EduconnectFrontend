import Overview from "../components/Lecture/dashboard/overview";
import LectureUpcomingEvents from "../components/Lecture/dashboard/upcoming";
import LectureWelcome from "../components/Lecture/dashboard/Welcome";
import LectureSideBar from "../components/Lecture/SideBar";

export default function LectureDashboard(){
    return(
        <div className="flex flex-row gap-5">
            <LectureSideBar/>
            <section className="ml-[17%] w-[100%]">
                <LectureWelcome/>
                <Overview/>
                <LectureUpcomingEvents/>
            </section>
        </div>
    )
}