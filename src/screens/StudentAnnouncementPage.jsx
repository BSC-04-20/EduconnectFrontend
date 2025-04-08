import AnnouncementPage from "../components/Student/classroom/AnnouncementPage";
import StudentSideBar from "../components/Student/SideBar";

export default function StudentAnnouncementScreen(){
    return(
    <div className="flex flex-row gap-5">
        <StudentSideBar/>
        <section className="ml-[17%] w-[100%]">
            <AnnouncementPage/>
        </section>
    </div>
    )
}