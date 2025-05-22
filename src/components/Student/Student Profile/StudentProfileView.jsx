import React, { useState, useEffect, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-hot-toast";
import PopUpEditPersonalInfo from "./PopUpEditPersonalInfo";
import PopUpChangePassword from "./PopUpChangePassword";
// import { AuthenticatedUserUrl } from "../../config/urlFetcher";

const StudentProfileView = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AuthenticatedUserUrl.get("/user");
        const { fullname, email, phone, profilePicture } = response.data;
        setFormData(prev => ({
          ...prev,
          fullname,
          email,
          phone: phone || "",
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

  const openEdit = (section) => {
    setEditSection(section);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditSection(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      setFormData(prev => ({
        ...prev,
        profilePicture: file,
      }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-3xl mx-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Student Profile</h1>

        {/* Profile Picture and Upload */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-8 text-center sm:text-left">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200"></div>
            )}
          </div>
          <div>
            <button
              onClick={handleUploadClick}
              className="border px-4 py-1 rounded text-sm font-medium"
            >
              Upload new photo
            </button>
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              At least 800x800 px recommended. JPG or PNG is allowed
            </p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-gray-100 rounded-md p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700">Personal Info</h2>
            <button
              onClick={() => openEdit("personal")}
              className="text-blue-600 hover:underline text-sm flex items-center"
            >
              <FiEdit className="mr-1" /> Edit
            </button>
          </div>
          <p><span className="font-medium">Full Name:</span> {formData.fullname}</p>
          <p><span className="font-medium">Email:</span> {formData.email}</p>
          <p><span className="font-medium">Phone:</span> {formData.phone}</p>
        </div>

        {/* Change Password */}
        <div className="bg-gray-100 rounded-md p-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700">Change Password</h2>
            <button
              onClick={() => openEdit("password")}
              className="text-blue-600 hover:underline text-sm flex items-center"
            >
              <FiEdit className="mr-1" /> Edit
            </button>
          </div>
          <p className="text-gray-700">********</p>
        </div>

        {/* Modals */}
        {isModalOpen && editSection === "personal" && (
          <PopUpEditPersonalInfo
            isOpen={isModalOpen}
            onClose={closeModal}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {isModalOpen && editSection === "password" && (
          <PopUpChangePassword
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default StudentProfileView;
