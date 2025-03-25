export default function SkeletonOverview() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-[95%] animate-pulse">
            <div className="flex flex-row gap-5 justify-center items-center bg-gray-400 h-[30vh] rounded-lg">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-300"></div>
                <div className="flex flex-col gap-3">
                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                    <div className="h-7 w-16 bg-gray-300 rounded"></div>
                </div>
            </div>

            <div className="flex flex-row gap-5 justify-center items-center bg-gray-400 h-[30vh] rounded-lg">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-300"></div>
                <div className="flex flex-col gap-3">
                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                    <div className="h-7 w-16 bg-gray-300 rounded"></div>
                </div>
            </div>

            <div className="flex flex-row gap-5 justify-center items-center bg-gray-400 h-[30vh] rounded-lg">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-300"></div>
                <div className="flex flex-col gap-3">
                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                    <div className="h-7 w-16 bg-gray-300 rounded"></div>
                </div>
            </div>

            <div className="flex flex-row gap-5 justify-center items-center bg-gray-400 h-[30vh] rounded-lg">
                <div className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-300"></div>
                <div className="flex flex-col gap-3">
                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                    <div className="h-7 w-16 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    );
}
