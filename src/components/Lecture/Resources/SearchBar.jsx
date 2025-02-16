import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar(){
    return(
        <form className="w-[500px] relateve">
            <div className="relative">
                <input type="search" placeholder="Search here..." className=" w-full p-4 rounded-full bg-gray-300"/>
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-gray-400 rounded-full">
                    <AiOutlineSearch/>
                </button>
            </div>
        </form>
    )
}