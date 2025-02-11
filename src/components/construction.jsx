import ConstructionImage from "../assets/Hand coding-rafiki.svg"
import LectureSideBar from "./Lecture/SideBar"

export default function Construction(){
    return(
        <div>
            <LectureSideBar/>
            <div className="flex flex-col items-center">
                <img src={ConstructionImage} className="size-[30rem]"/>
                <span className="text-xl">
                    This page is under construction
                </span>
            </div>
        </div>
    )
}