import React, { useState, useEffect, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-hot-toast";
import PopUpEditPersonalInfo from "./PopUpEditPersonalInfo";
import { MdDriveFileRenameOutline, MdEmail  } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import PopUpEditBio from "./PopUpEditBio";
import PopUpChangePassword from "./PopUpChangePassword";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import { IoKeyOutline } from "react-icons/io5";


const LecturerProfileView = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    description: "",
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
        const { fullname, email, phonenumber, description, profilePicture } = response.data;
        setFormData(prev => ({
          ...prev,
          fullname,
          email,
          phonenumber: phonenumber || "",
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
        <h1 className="text-xl font-bold text-gray-800 mb-6">Lecturer Profile</h1>

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
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-700">Personal Info</h2>
              <button
                onClick={() => openEdit("personal")}
                className="text-blue-600 hover:underline text-sm flex items-center"
              >
                <FiEdit className="mr-1" /> Edit
              </button>
            </div>
  
            {/* Full Name */}
            <div className="flex items-center gap-4 mb-3">
              <MdDriveFileRenameOutline className="size-6" />
              <div>
                <p className="font-bold">Full Name</p>
                <p className="">{formData.fullname}</p>
              </div>
            </div>
  
            {/* Email */}
            <div className="flex items-center gap-4 mb-3">
              <MdEmail className="size-6" />
              <div>
                <p className="font-bold">Email</p>
                <p className="">{formData.email}</p>
              </div>
            </div>
  
            {/* Phone */}
            <div className="flex items-center gap-4">
              <FaMobileAlt className="size-6" />
              <div>
                <p className=" font-bold ">Phone</p>
                <p className="">{formData.phonenumber}</p>
              </div>
            </div>
          </div>

        {/* Bio */}
        <div className="bg-gray-100 rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700">Bio</h2>
            <button
              onClick={() => openEdit("bio")}
              className="text-blue-600 hover:underline text-sm flex items-center"
            >
              <FiEdit className="mr-1" /> Edit
            </button>
          </div>
          <p className="text-gray-700">
            {formData.description || "No bio added yet."}
          </p>
        </div>

        {/* Change Password */}
          <div className="bg-gray-100 rounded-md p-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-700">Password</h2>
              <button
                onClick={() => openEdit("password")}
                className="text-blue-600 hover:underline text-sm flex items-center"
              >
                <FiEdit className="mr-1" /> Edit
              </button>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <IoKeyOutline className="size-6"/>
            <p className="text-gray-700">********</p>
              </div>
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

        {isModalOpen && editSection === "bio" && (
          <PopUpEditBio
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

export default LecturerProfileView;
