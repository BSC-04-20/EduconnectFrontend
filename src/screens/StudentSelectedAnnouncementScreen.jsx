import SelectedAnnouncement from "../components/Student/classroom/Announcement.jsx/SelectedAnnouncement";
import StudentSideBar from "../components/Student/SideBar";
import StudentTopBar from "../components/Student/TopBar";

export default function StudentSelectedAnnouncementScreen(){
    return(
        <div className="flex flex-row gap-5">
            <StudentSideBar/>
            <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
                <StudentTopBar/>
                <SelectedAnnouncement/>
            </section>
        </div>
    )
}