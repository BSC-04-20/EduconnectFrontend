import { IoLocationSharp } from "react-icons/io5";
import Hall from "../../assets/confre.jpg";

export default function FeaturedEvents() {
  return (
    <div className="pb-10">
      <div className="text-center pt-2 pb-2">
        <span className="text-3xl font-semibold">Featured Events</span>
      </div>

      <div className="ml-6 mr-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-48 object-cover" src={Hall} alt="Event" />
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-800 text-white text-xs px-3 py-1 rounded-full">UNIMA</span>
                  <span className="text-gray-500 text-sm">02/01/2025</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Virtual classes for every joined student</h4>
                <div className="flex items-center mt-4">
                  <IoLocationSharp className="text-red-600 mr-2" />
                  <p className="text-red-600 text-sm font-medium">Brown Chimpamba</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}
