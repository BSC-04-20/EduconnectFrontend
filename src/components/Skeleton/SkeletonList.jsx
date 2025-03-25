export default function SkeletonList() {
    return (
        <div className="flex flex-col gap-3 bg-white pt-5 pb-10 my-10 w-[95%] px-5 rounded-lg animate-pulse">
            <div className="h-6 w-40 bg-gray-300 rounded"></div>

            <div className="flex flex-col gap-2">
                <div className="h-5 w-[80%] sm:w-52 bg-gray-300 rounded"></div>
                <div className="flex gap-5 text-gray-400">
                    <div className="h-4 w-[60%] sm:w-32 bg-gray-300 rounded"></div>
                    <div className="h-4 w-[40%] sm:w-24 bg-gray-300 rounded"></div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="h-5 w-[80%] sm:w-52 bg-gray-300 rounded"></div>
                <div className="flex gap-5 text-gray-400">
                    <div className="h-4 w-[60%] sm:w-32 bg-gray-300 rounded"></div>
                    <div className="h-4 w-[40%] sm:w-24 bg-gray-300 rounded"></div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="h-5 w-[80%] sm:w-52 bg-gray-300 rounded"></div>
                <div className="flex gap-5 text-gray-400">
                    <div className="h-4 w-[60%] sm:w-32 bg-gray-300 rounded"></div>
                    <div className="h-4 w-[40%] sm:w-24 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    );
}
