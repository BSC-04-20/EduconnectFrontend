import StudentSideBar from "../components/Student/SideBar";

export default function StudentDashboard(){
    return(
        <div className="flex flex-row gap-5">
            <StudentSideBar/>
            <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
                
            </section>
        </div>
    )
}