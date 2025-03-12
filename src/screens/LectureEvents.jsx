import LectureSideBar from "../components/Lecture/SideBar";
import EventsHeader from "../components/Lecture/Events/EventsHeader";
import EventsOverview from "../components/Lecture/Events/EventsOverview";

export default function LectureEvents(){
    return(
        <div className="flex flex-row gap-5">
            <LectureSideBar/>
            <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
                <EventsHeader/>
                <EventsOverview/>
            </section>
        </div>
    )
}