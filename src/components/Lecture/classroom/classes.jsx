import {GoPeople } from "react-icons/go";

export default function Classes(){
    return( 
        <div className="grid grid-cols-3 grid grid-rows-2 gap-2 w-[95%]  px-5">
            <div className="py-5 shadow-2xl px-4 lg:flex lg:flex-col flex flex-row place-content-end items-right h-[35vh] w-[50%] rounded-lg ">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-100">
                    <GoPeople className="text-slate-900 size-[1.5rem]"/>
                </div>

            </div>

            <div className=" py-5 shadow-2xl px-4 lg:flex lg:flex-col flex flex-row place-content-end items-right h-[35vh] w-[50%] rounded-lg ">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-100">
                <GoPeople className="text-slate-900 size-[1.5rem]"/>
                </div>

            </div>

            <div className="py-5 shadow-2xl px-4 lg:flex lg:flex-col flex flex-row place-content-end items-right  h-[35vh] w-[50%] rounded-lg gap-7">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-100">
                <GoPeople className="text-slate-900 size-[1.5rem]"/>
                </div>

            </div>

            <div className="py-6 shadow-2xl px-2 lg:flex lg:flex-col flex flex-row place-content-end items-right  h-[35vh] w-[50%] rounded-lg ">
                <div className=" flex flex-row items-start bg-sky-900 h-[20%] w-[95%] my-5 rounded-lg">

                </div>
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-100">
                <GoPeople className="text-slate-900 size-[1.5rem]"/>
                </div>

            </div>

            <div className="py-5 shadow-2xl px-4 lg:flex lg:flex-col flex flex-row place-content-end items-right  h-[35vh] w-[50%] rounded-lg ">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-100">
                <GoPeople className="text-slate-900 size-[1.5rem]"/>
                </div>

            </div>

            <div className=" py-5 shadow-2xl px-4 lg:flex lg:flex-col flex flex-row gap-5 place-content-end items-right h-[35vh] w-[50%] rounded-lg ">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-100">
                <GoPeople className="text-slate-900 size-[1.5rem]"/>
                </div>

            </div>

            

        </div>
          
    )
}            