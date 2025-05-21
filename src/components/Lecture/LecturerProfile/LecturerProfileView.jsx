import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const LecturerProfileView = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    description: "",
    profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  // Fetch current profile data
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files[0]) {
      setFormData(prev => ({ ...prev, profilePicture: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    data.append("description", formData.description);
    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture);
    }

    try {
      const response = await AuthenticatedUserUrl.put("/user/update", data);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Lecturer Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture */}
        <div>
          <label className="block font-semibold">Profile Picture</label>
          <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 h-24 w-24 rounded-full object-cover border"
            />
          )}
        </div>

        {/* Full Name */}
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Leave blank to keep current password"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="4"
            placeholder="Add a short bio or description"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default LecturerProfileView;
