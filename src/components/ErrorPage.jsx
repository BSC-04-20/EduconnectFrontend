import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <section className="min-h-screen p-6 ml-4 md:ml-20 dark:text-gray-800">
            <div className="container flex flex-col gap-4 items-start">
                    <p className="text-sky-900 text-2xl">ERROR</p>

                    <h2 className="font-bold text-7xl md:text-9xl text-sky-900">
                        <span className="sr-only">Error</span>404
                    </h2>

                    <p className="text-lg md:text-2xl text-sky-900">
                        Sorry, we are unable to find this page.
                    </p>

                    <Link to="/" className="md:w-auto px-5 py-2 mt-4 mb-8 hover:bg-sky-600 bg-sky-900 font-semibold rounded-lg text-white">
                        Go to Home
                    </Link>
            </div>
        </section>
    );
}
