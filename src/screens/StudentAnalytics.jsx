import StudentAnalyticsDashboard from "../components/Student/Analytics/StudentAnalytics";
import StudentSideBar from "../components/Student/SideBar";
import StudentTopBar from "../components/Student/TopBar";

export default function StudentAnalytics(){
    return(
        <div className="flex flex-row gap-5">
            <StudentSideBar/>
            <section className="ml-[17%] w-[100%]">
                <StudentTopBar/>
                <StudentAnalyticsDashboard/>
            </section>
        </div>
    )
}