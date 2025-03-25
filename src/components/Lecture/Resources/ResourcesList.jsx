import { AiOutlineSearch } from "react-icons/ai";
import { GoDownload } from "react-icons/go";
import { FaRegFileAlt } from "react-icons/fa";

export default function ResourcesList() {
    return (
        <div className="bg-white w-full md:w-[95%] p-4 rounded-lg shadow">
            <div className="mb-8">
                <form className="w-full md:w-[350px]">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Search resources..."
                            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full">
                            <AiOutlineSearch className="text-xl text-gray-500" />
                        </button>
                    </div>
                </form>
            </div>
            <div className="space-y-5">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row md:items-center bg-gray-50 p-4 rounded-lg hover:shadow hover:scale-[102%]"
                    >
                        <FaRegFileAlt className="text-5xl text-blue-900 mb-3 md:mb-0" />
                        <div className="md:ml-5 flex-1">
                            <span className="text-sm text-black">Calculus Study Guide</span>
                            <div>
                                <span className="text-xs font-light text-gray-500">
                                    PDF • 2.4 MB • Uploaded 2 days ago
                                </span>
                            </div>
                        </div>
                        <GoDownload className="text-3xl text-gray-500 mt-3 md:mt-0 md:ml-10 cursor-pointer" />
                    </div>
                ))}
            </div>
        </div>
    );
}
