import { GrGroup } from "react-icons/gr"

export default function RegisteredStudents({total}){
    return(
        <div className="shadow-sm w-[100%] p-2 bg-white rounded-sm flex justify-between items-center">
            <div>
                <h1 className="text-sm text-sky-900">Students</h1>
                <span className="font-semibold">{total}</span>
            </div>
            <div className="text-gray-500 hover:text-sky-900">
                <GrGroup size={18}/>
            </div>
        </div>
    )
}