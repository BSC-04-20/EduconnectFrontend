import { useEffect } from "react";
import { GrGroup } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"

export default function TotalStudents({total}){
    const id = useParams();

    return(
        <Link to={`/lecture/classroom/${id.id}/students`} className="shadow-sm w-[100%] p-2 bg-white rounded-sm flex justify-between items-center hover:scale-105">
            <div>
                <h1 className="text-sm text-sky-900">Students</h1>
                <span className="font-semibold">{total}</span>
            </div>
            <div className="text-gray-500 hover:text-sky-900">
                <GrGroup size={18}/>
            </div>
        </Link>
    )
}