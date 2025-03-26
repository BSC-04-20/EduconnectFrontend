import { BiBookOpen, BiDockBottom, BiSlideshow, BiVideo, BiChalkboard } from "react-icons/bi";
import { Bs2Circle } from "react-icons/bs";
import { IoFunnelOutline } from "react-icons/io5";

export default function LearningMaterials() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5">
            
            
            <div className="bg-white place-content-start h-auto md:h-[60vh] w-full md:w-[80%] rounded-lg p-4">
                <div className="flex flex-col">
                    <div className="flex py-1">
                        <BiBookOpen className="text-sky-900 size-[1.5rem]" />
                        <h1 className="font-semibold text-sky-900 px-2">Courses</h1>
                    </div>

                    {["Mathematics", "Physics", "Chemistry", "Biology", "Computer science"].map((course, index) => (
                        <div key={index} className="flex py-1">
                            <p className="px-2">{course}</p>
                            <Bs2Circle className="text-[#6B7280] ml-auto size-[1.5rem]" />
                        </div>
                    ))}
                </div>
            </div>

        
            <div className="bg-white place-content-start h-auto md:h-[35vh] w-full md:w-[80%] rounded-lg p-4">
                <div className="flex flex-col">
                    <div className="flex py-2">
                        <IoFunnelOutline className="text-sky-900 size-[1.5rem]" />
                        <h1 className="font-semibold text-sky-900 px-2">Material Type</h1>
                    </div>

                    {[
                        { name: "Slides", icon: <BiChalkboard className="text-slate-900 size-[1.5rem]" /> },
                        { name: "Books", icon: <BiDockBottom className="text-slate-900 size-[1.5rem]" /> },
                        { name: "Videos", icon: <BiVideo className="text-slate-900 size-[1.5rem]" /> }
                    ].map((item, index) => (
                        <div key={index} className="flex py-1">
                            {item.icon}
                            <p className="px-2">{item.name}</p>
                            <Bs2Circle className="text-[#6B7280] ml-auto size-[1.5rem]" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
