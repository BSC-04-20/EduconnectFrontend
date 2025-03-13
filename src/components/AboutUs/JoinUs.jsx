import GettyImages from "/Users/bchil/Final Project/EduconnectFrontend/src/assets/GettyImages.jpg"
export default function JoinUs(){
    return(
        <div className="h-[70vh] grid grid-cols-2 pl-[4%]">
            <div className="pl-[10%] pr-[10%] pt-10">
                <div className="mb-[3%] h-[50vh] bg-cover bg-bottom " style={{backgroundImage:`url(${GettyImages})`}}>
                    {/* <img src={Pell}/> */}
                </div>
            </div>

            <div className="pt-[5vh] flex flex-col pr-[31%] pl-[4%]">
                <span className="text-3xl font-bold text-sky-900 mb-5">Join Us in 
                    Transforming Learning!
                </span>
                <span className="text-gray-800 text-xl font-light mb-5">
                    We believe in the power of education and digital innovation. Whether you’re a student 
                    looking for study support or a lecturer seeking an efficient way to share materials, 
                    MADISS is here for you.
                </span>
                <div className="grid grid-cols-2 gap-8 pr-[10%]">
                    <button className="text-white py-3 bg-sky-500 text-xl font-bold">
                        Lecturer
                    </button>
                    <button className="text-white py-3 bg-sky-500 text-xl font-bold">
                        Student
                    </button>
                </div>
            </div>

        </div>
    )
}