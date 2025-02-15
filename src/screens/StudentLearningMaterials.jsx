import StudentSideBar from "../components/Student/SideBar";
import LearningMaterials from "../components/Student/resources/LearningMaterials";

export default function StudentLearningMaterials(){
    return(
        <div className="flex flex-row gap-5">
            <StudentSideBar/>
        <section className="ml-[17%] w-[100%]">
                <LearningMaterials/>
                        
        </section>
            
            
             </div>

    )
}   