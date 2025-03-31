import Background from "../../assets/0x0.jpg"

export default function HerosSection() {
  return (
    <div
      className="h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="h-full bg-gray-950/50 flex items-center justify-center px-4 sm:px-10 md:px-20">
        <span className="text-white w-[60%] font-bold text-xl sm:text-2xl md:text-3xl text-center leading-relaxed">
          Enhancing academic collaboration through seamless learning, discussion,
          and engagement.
        </span>
      </div>
    </div>
  )
}
