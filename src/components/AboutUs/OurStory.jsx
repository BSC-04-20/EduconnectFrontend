import Pell from "/Users/bchil/Final Project/EduconnectFrontend/src/assets/Pell4.jpg"
export default function OurStory(){
    return(
        <div className="h-[70vh] grid grid-cols-2 pl-[4%]">
            <div className="pt-[5vh] flex flex-col pr-[8%] pl-[4%]">
                <span className="text-3xl font-bold text-cyan-700 mb-5">
                Our Story
                </span>
                <span className="text-black text-xl font-light mb-5">
                The idea for EduConnect was born out of the need for a better academic collaboration tool.
                 As students, we experienced firsthand the challenges of finding study resources, 
                 engaging with lecturers outside the classroom, and forming productive discussion groups.
                  This motivated us to develop EduConnect—a platform that simplifies learning 
                  interactions and empowers students with the tools they need to succeed.
                </span>
            </div>

            <div className="pl-[10%] pr-[10%] pt-10">
                <div className="mb-[3%] h-[50vh] bg-cover bg-bottom " style={{backgroundImage:`url(${Pell})`}}>
                    {/* <img src={Pell}/> */}
                </div>
            </div>

        </div>
    )
}