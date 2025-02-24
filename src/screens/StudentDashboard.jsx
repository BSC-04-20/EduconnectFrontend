import Board from "../components/shared/page_board";
import StudentSideBar from "../components/Student/SideBar";
import CollegeStudents from "../assets/college students-amico.svg"
import RecentAnnouncements from "../components/Student/dashboard/recentannouncements";
import StudentsAssignments from "../components/Student/dashboard/assignments";
import StudentTopBar from "../components/Student/TopBar";

export default function StudentDashboard(){

    return(
        <div className="flex flex-row gap-5">
            <StudentSideBar/>
            <section className="ml-[17%] w-[100%]">
                <StudentTopBar/>
                {/* <Board 
                    title="Welcome Back Weston" 
                    secondaryTxt="Here's what's happening in your learning journey"
                    url={CollegeStudents}
                /> */}
                <RecentAnnouncements/>
                <StudentsAssignments/>
            </section>
        </div>
    )
}