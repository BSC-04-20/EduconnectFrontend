import { FaDownload } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";

export default function LecturePostedResources() {
    // List of posted resources
    const resources = [
        { name: "Data Structures & Algorithms", size: "PDF 3.2mb", uploaded: "3 days ago" },
        { name: "Operating Systems Notes", size: "PDF 4.1mb", uploaded: "1 week ago" },
        { name: "Computer Networks Guide", size: "PDF 2.8mb", uploaded: "5 days ago" },
        { name: "Artificial Intelligence Overview", size: "PDF 5.0mb", uploaded: "2 weeks ago" },
        { name: "Database Management Systems", size: "PDF 3.5mb", uploaded: "4 days ago" },
    ];

    return (
        <div className="flex flex-col gap-3 bg-white rounded-lg w-[95%] py-10 px-5">
            {resources.map(({ name, size, uploaded }, index) => (
                <div key={index} className="flex flex-row gap-3 items-center w-[65%]">
                    <div className="bg-sky-200 p-1 rounded-lg">
                        <MdOutlineDescription className="size-[2rem] text-sky-900"/>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold text-lg">{name}</span>
                        <span className="text-gray-400 text-base">{size} uploaded {uploaded}</span>
                    </div>

                    <div className="ml-auto">
                        <FaDownload className="text-gray-600"/>
                    </div>
                </div>
            ))}
        </div>
    );
}