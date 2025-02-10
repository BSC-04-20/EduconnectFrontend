import Overview from "../components/Lecture/dashboard/overview";
import LectureWelcome from "../components/Lecture/dashboard/Welcome";
import LectureSideBar from "../components/Lecture/SideBar";

export default function LectureDashboard(){
    return(
        <div className="flex flex-row gap-5">
            <LectureSideBar/>
            <section className="w-[100%]">
                <LectureWelcome/>
                <Overview/>
            </section>
        </div>
    )
}