import { HiUserGroup } from "react-icons/hi2";
import { MdOutlineMenuBook } from "react-icons/md";

export default function WhatWeOffer(){
    return(
       <div className="h-[60vh] bg-sky-800 pt-[5vh]">
           <div className="flex flex-col">
                <span className="text-white text-2xl font-bold text-center">What We Offer</span>
                <span className="text-white text-sm font-light text-center pt-[1vh]">Empowering Learning with Smart Collaboration and Seamless Access to Resources</span>
           </div>

           <div className="grid grid-cols-3 gap-10 pr-[15%] pl-[15%] pt-[4vh]">
                <div className="border-solid border-[0.5px] rounded-md pt-[2vh] pb-[3vh] pr-[5%] pl-[5%]">
                    <div className="bg-sky-900 rounded-full w-fit p-2">
                        <MdOutlineMenuBook className="text-white size-7"/>
                    </div>
                    <div className="">
                    <span className="text-white text-xl font-semibold">Resource Sharing</span>
                    <p className="text-white text-sm pt-[1vh]">Lecturers Upload, access, manage, and share academic resources seamlessly for efficient learning.</p>
                    </div>
                </div>
                <div className="border-[0.5px] border-solid border-[0.5px] rounded-md pt-[2vh] pb-[3vh] pr-[5%] pl-[5%]-md pt-[border-solid border-[0.5px] rounded-md pt-[2vh] pb-[3vh] pr-[5%] pl-[5%]">
                    <div className="bg-sky-900 rounded-full w-fit p-2">
                        <HiUserGroup className="text-white size-7"/>
                    </div>
                    <div>
                    <span className="text-white text-xl font-semibold">Real-Time Discussions</span>
                    <p className="text-white text-sm pt-[1vh]">Engage, collaborate, and exchange ideas instantly through interactive academic discussions.</p>
                    </div>
                </div>
                <div className="border-[0.5px] border-solid border-[0.5px] rounded-md pt-[2vh] pb-[3vh] pr-[5%] pl-[5%]-border-solid border-[0.5px] rounded-md pt-[2vh] pb-[3vh] pr-[5%] pl-[5%]">
                    <div className="bg-sky-900 rounded-full w-fit p-2">
                        <HiUserGroup className="text-white size-7"/>
                    </div>
                    <div>
                    <span className="text-white text-xl font-semibold">Classroom Management</span>
                    <p className="text-white text-sm pt-[1vh]">Create, organize, and manage digital classrooms for structured academic collaboration.</p>
                    </div>
                </div>
           </div>
       </div>
    )
}