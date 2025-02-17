import { GoPeople } from "react-icons/go";
import LectureSideBar from "../SideBar";

export default function LectureClasses(){

    const classes = [
        {name:"Angellah khumula" , code: "COM411",},
        {name:"Angellah khumula" , code: "COM411",},
        {name:"Angellah khumula" , code: "COM411",},
        {name:"Angellah khumula" , code: "COM411",},
        {name:"Angellah khumula" , code: "COM411",},
        {name:"Angellah khumula" , code: "COM411",},
    
    ]
    return(
        <>
            <LectureSideBar/>
            <h1>Classes</h1>
            <div className="h-[90%] grid grid-cols-3 grid-rows-2 gap-x-3 gap-y-2 bg-white w-[80%] px-5 mr-4 ml-auto mb-20">
                {classes.map((classy, index)=>(
                    
                    <div key={index} className="mt-2 bg-white drop-shadow-md h-[40vh] w-[80%] rounded-lg flex flex-col">
                        <div key={index} className= " flex flex-row-2 grid grid-row px-5 bg-sky-900 w-[100%] h-[20%] text-white rounded-lg items-center pl-2"> 
                            <h1 className="font-bold">{classy.code}</h1>
                            <h1>{classy.name}</h1>
                        </div>
                        <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#C7D6DA] ml-auto mr-2 mt-auto mb-2">
                            <GoPeople className="text-slate-900  size-[1.5rem]"/>
                        </div>
                        
                    </div>
                ))}
            </div>
        </>
    );
}

    