export default function ErrorPage() {
    return (
        <section className="flex items-center justify-center min-h-screen p-6 dark:bg-gray-50 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 text-center">
                <div className="max-w-md">
                    <h1 className="mr-0 md:mr-28">
                        <p className="text-sky-900 text-2xl">ERROR</p>
                    </h1>

                    <h2 className="font-bold text-7xl md:text-9xl py-4 text-sky-900">
                        <span className="sr-only">Error</span>404
                    </h2>

                    <p className="text-lg md:text-2xl text-sky-900 mx-4 md:mx-8 py-2">
                        Sorry, we are unable to find this page.
                    </p>

                    <button className="w-[80%] md:w-auto px-8 py-4 mt-4 mb-8 bg-sky-900 font-semibold rounded-3xl text-white">
                        Go to Home
                    </button>
                </div>
            </div>
        </section>
    );
}
