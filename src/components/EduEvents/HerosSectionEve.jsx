import Background from "../../assets/woman-free-photo.jpg";

export default function HerosSectionEvents() {
  return (
    <div
      className="relative h-[40vh] md:h-[50vh] lg:h-[40vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>

      <div className="relative px-6 md:px-16 pt-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Events</h2>
        <p className="text-white text-sm md:text-base lg:text-lg font-thin">EXPLORE YOUR INTERESTS</p>
      </div>
    </div>
  );
}
