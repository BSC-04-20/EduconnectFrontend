import LectureSideBar from "../components/Lecture/SideBar";
import ResourcesHeader from "../components/Lecture/Resources/ResourcesHeader";
import ResourcesList from "../components/Lecture/Resources/ResourcesList";

export default function Resources(){
    return(
        <div className="flex flex-row gap-5">
            <LectureSideBar/>
            <section className="ml-[17%] w-[100%]">
                <ResourcesHeader/>
                <ResourcesList/>
            </section>
        </div>
    )
}