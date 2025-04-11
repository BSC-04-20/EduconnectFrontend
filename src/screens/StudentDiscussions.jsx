import { useState } from "react";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import StudentSideBar from "../components/Student/SideBar";
import StudentDiscussions from "../components/Student/discussions/StudentDiscussions";
import StudentTopBar from "../components/Student/TopBar";

export default function StudentDiscussionsScreen(){
    return(
        <div className="flex flex-row gap-5">
            <StudentSideBar/>
            <section className="ml-[17%] w-[100%]">
                <StudentTopBar/>
                <StudentDiscussions/>
            </section>
        </div>
    )
}