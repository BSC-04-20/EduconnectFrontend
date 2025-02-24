import StudentSideBar from "../components/Student/SideBar";
import StudentDiscussions from "../components/Student/discussions/StudentDiscussions";

export default function StudentDiscussionsScreen(){
    return(
        <div className="flex flex-row gap-5">
            <StudentSideBar/>
            <section className="ml-[17%] w-[100%]">
                <StudentDiscussions/>
            </section>
        </div>
    )
}