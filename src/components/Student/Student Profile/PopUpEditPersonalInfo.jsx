import React from "react";
import { Button, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { StudentAuthenticatedUserUrl } from "../../../config/urlFetcher";

const PopUpEditPersonalInfo = ({ isOpen, onClose, formData, setFormData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, email, phone } = formData;

    // Basic email validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Build payload conditionally
    const payload = {};
    if (fullname?.trim()) payload.fullname = fullname.trim();
    if (email?.trim()) payload.email = email.trim();
    if (phone?.trim()) payload.phonenumber = phone.trim(); // map to backend key

    if (Object.keys(payload).length === 0) {
      toast.error("Please provide at least one valid field to update.");
      return;
    }

    try {
      await StudentAuthenticatedUserUrl.post("/student/updateProfile", payload);
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Edit Personal Info</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpEditPersonalInfo;
