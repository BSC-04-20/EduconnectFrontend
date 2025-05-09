import SelectedAnnouncement from "../components/Lecture/classrooms/Announcement/SelectedAnnouncement";
import LectureSideBar from "../components/Lecture/SideBar";
import TopBar from "../components/Lecture/TopBar";

export default function LectureSelectedAnnouncementScreen(){
    return(
        <div className="flex flex-row gap-5">
            <LectureSideBar/>
            <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
                <TopBar/>
                <SelectedAnnouncement/>
            </section>
        </div>
    )
}