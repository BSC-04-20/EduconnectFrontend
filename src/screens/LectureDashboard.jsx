import Overview from "../components/Lecture/dashboard/overview";
import LectureUpcomingEvents from "../components/Lecture/dashboard/upcoming";
import LectureSideBar from "../components/Lecture/SideBar";
import Board from "../components/shared/page_board";
import ResearchPaoer from "../assets/Research paper-amico.svg"
import { useAuthGuard } from "../security/sessionChecker";
import TopBar from "../components/Lecture/TopBar";

export default function LectureDashboard(){
 return(
        <div className="flex flex-row gap-5">
            <LectureSideBar/>
            <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
                <TopBar/>
                <Board
                    title="Welcome Back Professor"
                    secondaryTxt="Here's what's happening in your educational network"
                    url={ResearchPaoer}
                />
                <LectureWelcome/>
                <Overview/>
                <LectureUpcomingEvents/>
            </section>
        </div>
    )
}