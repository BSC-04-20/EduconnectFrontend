import { BiBookOpen } from "react-icons/bi"

export default function PostedResources(){
    return(
        <div className="shadow-sm w-[100%] p-2 bg-white rounded-sm flex justify-between items-center">
            <div>
                <h1 className="text-sm text-sky-900">Resources</h1>
                <span className="font-semibold">10</span>
            </div>
            <div className="text-gray-500 hover:text-sky-900">
                <BiBookOpen size={18}/>
            </div>
        </div>
    )
}