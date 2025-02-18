import LectureSideBar from "../components/Lecture/SideBar";
import LectureClasses from "../components/Lecture/classrooms/LectureClasses";
import StudentSideBar from "../components/Student/SideBar";

export default function LectureClassrooms(){
    return(
        <div className="flex flex-row gap-5">
            <LectureSideBar/>
            <section className="ml-[17%] w-[100%]">
                <LectureClasses/>
                
            </section>
        </div>
    )
}
 

