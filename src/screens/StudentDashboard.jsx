import StudentSideBar from "../components/Student/SideBar";

export default function StudentDashboard(){
    return(
        <div className="flex flex-row gap-5">
            <StudentSideBar/>
            <section className="ml-[17%] w-[100%]">
                
            </section>
        </div>
    )
}