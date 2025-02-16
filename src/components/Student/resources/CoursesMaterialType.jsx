import { BiBookOpen } from "react-icons/bi";
import { Bs2Circle } from "react-icons/bs";
import { Bs4Circle } from "react-icons/bs";
import { BiDockBottom } from "react-icons/bi";
import { BiSlideshow } from "react-icons/bi";
import { BiVideo } from "react-icons/bi";
import { IoFunnelOutline } from "react-icons/io5";
import { BiChalkboard } from "react-icons/bi";


export default function LearningMaterials(){
    return(

        <div className="grid grid-cols-2 gap-5 px-5">
              <div className="bg-white place-content-start  h-[60vh] w-[80%] rounded-lg ">
              <div className="flex flex-col px-5">

                
                    <h1 className="font-semibold text-sky-900"> Courses
                     <BiBookOpen className="text-sky-900 size-[1.5rem]"  />
                     </h1>
                    <span className=" ">Mathematics</span>
                    <span className=" ">Physics</span>
                    <span className=" ">Chemistry</span>
                    <span className=" ">Biology</span>
                    <span className=" ">Computer Science</span>
                
                </div>

              </div>

              <div className="bg-white place-content-start  h-[35vh] w-[80%] rounded-lg  ">
              <div className="flex flex-col px-5">
                    <h1 className="font-semibold text-sky-900"> Material Type
                    <IoFunnelOutline className="text-sky-900 size-[1.5rem]"  /> 
                     </h1>
                    <span className=" ">Slides</span>
                    <span className=" ">Books</span>
                    <span className=" ">Videos</span>
                </div> 

              </div>
            
        </div>
    )


}   