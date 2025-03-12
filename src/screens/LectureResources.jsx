import LectureSideBar from "../components/Lecture/SideBar";
import ResourcesHeader from "../components/Lecture/Resources/ResourcesHeader";
import ResourcesList from "../components/Lecture/Resources/ResourcesList";

export default function LectureResources(){
    return(
        <div className="flex flex-row gap-5">
            <LectureSideBar/>
            <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
                <ResourcesHeader/>
                <ResourcesList/>
            </section>
        </div>
    )
}