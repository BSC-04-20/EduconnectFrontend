import { AiOutlineSearch } from "react-icons/ai";
import { GoDownload} from "react-icons/go";
import { FaRegFileAlt } from "react-icons/fa";

export default function ResourcesList(){
    return(
        <div className="bg-white mr-10">
           <div className="mb-10">
           <form className="w-[350px] relateve">
                <div className="relative">
                    <input type="search" placeholder="Search resources..." className="text-center w-full p-4 rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-lg bg-white"/>
                    <button className="absolute left-1 top-1/2 -translate-y-1/2 p-4 bg-white rounded-full">
                        <AiOutlineSearch className="bg-transparent text-xl text-gray-500"/>
                    </button>
                </div>
            </form>
           </div>

            <div>
                <div className="mb-5 flex flex-rows">
                    <FaRegFileAlt className="text-5xl text-blue-900"/>
                    <div className="ml-5">
                        <div><span className="text-sm text-black">Calculus Study Guide</span></div>
                        <span className="text-xs font-light text-gray-500">PDF • 2.4 MB • Uploaded 2 days ago</span>
                    </div>
                    <GoDownload className="text-3xl text-gray-500 ml-10"/>
                </div>

                <div className="mb-5 flex flex-rows">
                    <FaRegFileAlt className="text-5xl text-blue-900"/>
                    <div className="ml-5">
                        <div><span className="text-sm text-black">Calculus Study Guide</span></div>
                        <span className="text-xs font-light text-gray-500">PDF • 2.4 MB • Uploaded 2 days ago</span>
                    </div>
                    <GoDownload className="text-3xl text-gray-500 ml-10"/>
                </div>

                <div className="mb-5 flex flex-rows">
                    <FaRegFileAlt className="text-5xl text-blue-900"/>
                    <div className="ml-5">
                        <div><span className="text-sm text-black">Calculus Study Guide</span></div>
                        <span className="text-xs font-light text-gray-500">PDF • 2.4 MB • Uploaded 2 days ago</span>
                    </div>
                    <GoDownload className="text-3xl text-gray-500 ml-10"/>
                </div>

                <div className="mb-5 flex flex-rows">
                    <FaRegFileAlt className="text-5xl text-blue-900"/>
                    <div className="ml-5">
                        <div><span className="text-sm text-black">Calculus Study Guide</span></div>
                        <span className="text-xs font-light text-gray-500">PDF • 2.4 MB • Uploaded 2 days ago</span>
                    </div>
                    <GoDownload className="text-3xl text-gray-500 ml-10"/>
                </div>

                <div className="mb-5 flex flex-rows">
                    <FaRegFileAlt className="text-5xl text-blue-900"/>
                    <div className="ml-5">
                        <div><span className="text-sm text-black">Calculus Study Guide</span></div>
                        <span className="text-xs font-light text-gray-500">PDF • 2.4 MB • Uploaded 2 days ago</span>
                    </div>
                    <GoDownload className="text-3xl text-gray-500 ml-10"/>
                </div>
            </div>
        </div>
    )
}