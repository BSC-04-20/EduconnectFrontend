import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import PopUpEdit from "./PopUpEdit";
// import { AuthenticatedUserUrl } from "../../config/urlFetcher"; // Uncomment and update path as needed

const LecturerProfileView = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    description: "",
    profilePicture: null,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AuthenticatedUserUrl.get("/user");
        const { fullname, email, description, profilePicture } = response.data;
        setFormData(prev => ({
          ...prev,
          fullname,
          email,
          description: description || "",
        }));
        if (profilePicture) {
          setPreviewImage(profilePicture);
        }
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full h-40 bg-cover bg-center bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-500"></div>

      <div className="relative -top-24 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
        {previewImage ? (
          <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>

      <div className="-mt-16 text-center px-4">
        <h1 className="text-2xl font-bold text-gray-800">{formData.fullname || "Full Name"}</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">{formData.email || "Email"}</p>
        <p className="text-gray-500 text-sm mt-4 max-w-md mx-auto">
          {formData.description || "Add a short bio or description about yourself here."}
        </p>

        <button
          className="mt-4 inline-flex items-center text-blue-600 hover:underline"
          onClick={() => setIsModalOpen(true)}
        >
          <FiEdit className="mr-2" /> Edit
        </button>
      </div>

      <PopUpEdit
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        setPreviewImage={setPreviewImage}
      />
    </div>
  );
};

export default LecturerProfileView;
