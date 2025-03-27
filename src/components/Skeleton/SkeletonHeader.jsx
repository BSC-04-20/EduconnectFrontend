export default function SkeletonHeader() {
    return (
        <div className="flex flex-col md:flex-row items-center bg-gray-400 h-auto md:h-[30vh] w-[95%] my-5 rounded-lg p-5 animate-pulse">
            <div className="flex flex-col gap-3 text-slate-100 w-full md:w-1/2">
                <div className="h-8 w-40 bg-gray-300 rounded"></div> 
                <div className="h-4 w-60 bg-gray-300 rounded"></div> 
            </div>

            <div className="h-48 w-full md:w-1/2 md:h-full flex justify-center items-center mt-5 md:mt-0">
                <div className="h-full w-full bg-gray-300 rounded"></div> 
            </div>
        </div>
    );
}
