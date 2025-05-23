import React, { useState } from "react";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { useNavigate } from "react-router-dom";
import { Toaster, toast} from "react-hot-toast";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "Virtual", // Default location is Virtual
    type: "virtual",
  });

  const navigator = useNavigate();

  const [isVirtual, setIsVirtual] = useState(true); // Default to Virtual

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleVirtualChange = () => {
    setIsVirtual(true);
    setFormData({
      ...formData,
      type: "virtual",
      location: "Virtual", // Automatically set location as Virtual
    });
  };

  const handlePhysicalChange = () => {
    setIsVirtual(false);
    setFormData({ ...formData, type: "physical", location: "" }); // Reset location for physical input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await AuthenticatedUserUrl.post("/event/create", {
        name: formData.name,
        date: formData.date,
        time: formData.time,
        location: formData.location, // "Virtual" if virtual, user input if physical
        type: formData.type,
      })

      alert(response.data.message)
      navigator(-1)
    }
    catch(error){
      toast.error("Event upload failed")
    }
  };
<Toaster/>
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Event Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event Name"
              required
            />
          </div>

          {/* Date Field */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Time Field */}
          <div className="mb-4">
            <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Type Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Type</label>
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="type"
                  className="form-radio"
                  checked={isVirtual}
                  onChange={handleVirtualChange}
                />
                <span className="ml-2">Virtual</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  className="form-radio"
                  checked={!isVirtual}
                  onChange={handlePhysicalChange}
                />
                <span className="ml-2">Physical</span>
              </label>
            </div>
          </div>

          {/* Location Field */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={isVirtual ? "Virtual" : formData.location}
              onChange={handleChange}
              className={`w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isVirtual ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
              placeholder="Location Address"
              disabled={isVirtual}
              required={!isVirtual}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-sky-900 hover:bg-sky-700 w-full text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
