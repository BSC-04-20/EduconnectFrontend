import StudentClasses from "../components/Student/classroom/classes";
// import NoClass from "../components/Student/classroom/no_class";
import StudentSideBar from "../components/Student/SideBar";
import StudentTopBar from "../components/Student/TopBar";

export default function StudentClassroomsScreen(){
    return(
    <div className="flex flex-row gap-5">
        <StudentSideBar/>
        <section className="ml-[17%] w-[100%]">
            <StudentTopBar/>
            {/* <NoClass/> */}
            <StudentClasses/>
        </section>
    </div>
    )
}