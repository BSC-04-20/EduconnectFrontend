import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar(){
    return(
        <div className=" w-full md:w-[95%] p-4">
            <div className="">
                <form className="w-full md:w-[70%]">
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
        </div>
    )
}