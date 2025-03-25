export default function SkeletonSideBar() {
    return (
        <>
            <aside className="fixed w-[15%] md:flex hidden flex-col gap-3 bg-white h-[100vh] animate-pulse">
                <div className="my-5 text-center">
                    <div className="h-6 w-[80%] bg-gray-400 rounded mx-auto"></div>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-row items-center gap-1 py-2 pl-4"
                    >
                        <div className="w-[15%] h-6 bg-gray-400 rounded"></div>
                        <div className="h-4 w-[70%] py-3 bg-gray-400 rounded"></div>
                    </div>
                ))}
            </aside>

            <div className="fixed top-5 left-5 md:hidden flex flex-col gap-2 animate-pulse">
                <div className="w-8 h-1 bg-gray-400 rounded"></div>
                <div className="w-8 h-1 bg-gray-400 rounded"></div>
                <div className="w-8 h-1 bg-gray-400 rounded"></div>
            </div>
        </>
    );
}
