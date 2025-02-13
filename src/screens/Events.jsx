import LectureSideBar from "../components/Lecture/SideBar";
import EventsHeader from "../components/Lecture/Events/EventsHeader";
import EventsOverview from "../components/Lecture/Events/EventsOverview";

export default function Events(){
    return(
        <div className="flex flex-row gap-5">
            <LectureSideBar/>
            <section className="ml-[17%] w-[100%]">
                <EventsHeader/>
                <EventsOverview/>
            </section>
        </div>
    )
}