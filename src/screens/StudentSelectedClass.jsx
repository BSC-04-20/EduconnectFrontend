import StudentSelectedClass from "../components/Student/classroom/selected/SelectedClass";
import StudentSideBar from "../components/Student/SideBar";
import StudentTopBar from "../components/Student/TopBar";

// Showing student selected class
export default function StudentClassScreen(){
    return(
        <div className="flex flex-row gap-5">
                <StudentSideBar/>
            <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
                <StudentTopBar/>
                <StudentSelectedClass/>
            </section>
        </div>
    )
}