export default function ErrorPage(){

    return(
        <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
            
            <div className="mr-28">
            <span className="text-sky-900"> ERROR</span>
            </div>
            
			<h2 className="mb-8 font-bold text-9xl  text-sky-900">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-2xl  md:text-2xl">Sorry, we are unable to find this page.</p>
			
			<button className="px-8 py-4 mt-4 mb-8 bg-sky-900 font-semibold rounded-3xl text-white"> Go to Home </button>
		</div>
	</div>
</section>
    )

}