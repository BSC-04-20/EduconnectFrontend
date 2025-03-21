import Pell from "../../assets/Pell4.jpg"

export default function OurStory() {
  return (
    <div className="h-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-[4%] py-10">
      <div className="flex flex-col md:pr-[8%]">
        <span className="text-2xl sm:text-3xl font-bold text-cyan-700 mb-5">
          Our Story
        </span>
        <span className="text-black text-base sm:text-lg font-light mb-5 leading-relaxed">
          The idea for EduConnect was born out of the need for a better academic collaboration tool.
          As students, we experienced firsthand the challenges of finding study resources, 
          engaging with lecturers outside the classroom, and forming productive discussion groups.
          This motivated us to develop EduConnect—a platform that simplifies learning 
          interactions and empowers students with the tools they need to succeed.
        </span>
      </div>

      <div className="flex justify-center items-center">
        <div 
          className="w-full h-[40vh] sm:h-[50vh] bg-cover bg-bottom rounded-lg shadow-lg" 
          style={{ backgroundImage: `url(${Pell})` }}
        />
      </div>
    </div>
  )
}
