import SelectedClassroom from "../components/Lecture/classrooms/SelectedClass";
import LectureSideBar from "../components/Lecture/SideBar";

export default function LectureClassScreen(){
    return(
        <div className="flex flex-row gap-5">
                <LectureSideBar/>
            <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
                <SelectedClassroom/>
            </section>
        </div>
    )
}