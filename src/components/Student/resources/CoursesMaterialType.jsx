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

                <div className="flex py-1">
                <BiBookOpen className="text-sky-900 size-[1.5rem]"  />
                <h1 className="font-semibold text-sky-900 px-2"> Courses</h1>
                </div>

                <div className="flex py-1">
                <p className=" px-2">Mathematics</p>
                <Bs2Circle className="text-[#6B7280] mx-20 size-[1.5rem]"  />
                </div>


                <div className="flex py-1">
                <p className=" px-2">Physics</p>
                <Bs2Circle className="text-[#6B7280] mx-20 size-[1.5rem]"  />
                </div>

                <div className="flex py-1">
                <p className=" px-2">Chemistry</p>
                <Bs2Circle className="text-[#6B7280] mx-20 size-[1.5rem]"  />
                </div>

                <div className="flex py-1">
                <p className=" px-2">Biology</p>
                <Bs2Circle className="text-[#6B7280] mx-20 size-[1.5rem]"  />
                </div>


                <div className="flex py-1">
                <p className=" px-2">Computer science</p>
                <Bs2Circle className="text-[#6B7280] mx-20 size-[1.5rem]"  />
                </div>

                
                </div>

              </div>

              <div className="bg-white place-content-start  h-[35vh] w-[80%] rounded-lg  ">
              <div className="flex flex-col px-5">
                 
                 <div className="flex py-2">
                    <IoFunnelOutline className="text-sky-900 size-[1.5rem]"  />
                     <h1 className="font-semibold text-sky-900 px-2 "> Material Type </h1>
                 </div>
                    
                    
                 <div className="flex py-1">
                    <BiChalkboard className="text-slate-900 size-[1.5rem]"/>
                    <p className="px-2">Slides</p>
                    <Bs2Circle className="text-[#6B7280] mx-20 size-[1.5rem]"  />
                </div>
            
                
                        <div className="flex py-1">
                           <BiDockBottom className="text-slate-900 size-[1.5rem]"/>
                           <p className="px-2"> Books</p>
                           <Bs2Circle className="text-[#6B7280] mx-20 size-[1.5rem]"  />
                        </div>
                    
                    <div className="flex py-1">
                        <BiVideo className="text-slate-900 size-[1.5rem]"/>
                        <p className="px-2"> videos</p>
                        <Bs2Circle className="text-[#6B7280] mx-20 size-[1.5rem]"  />
                       
                    </div>
                    
                </div> 

              </div>
            
        </div>
    )


}   