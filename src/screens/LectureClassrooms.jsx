import LectureClasses from "../components/Lecture/classrooms/LectureClasses";
import LectureSideBar from "../components/Lecture/SideBar";
import TopBar from "../components/Lecture/TopBar";

export default function LectureClassroomScreen(){
    return(
        <div className="flex flex-row gap-5">
            <LectureSideBar/>
            <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
                <TopBar/>
                <LectureClasses/>
            </section>
        </div>
    )
}