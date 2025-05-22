import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
// import { StudentAuthenticatedUserUrl } from "../../config/urlFetcher";

const PopUpEditPersonalInfo = ({ isOpen, onClose, formData, setFormData }) => {
  const [localData, setLocalData] = useState({ ...formData });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await StudentAuthenticatedUserUrl.put("/student/update-profile", {
        fullname: localData.fullname,
        email: localData.email,
      });
      toast.success("Profile updated successfully");
      setFormData(localData);
      onClose();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Personal Info</h2>

        <TextField
          label="Full Name"
          name="fullname"
          value={localData.fullname}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          name="email"
          value={localData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopUpEditPersonalInfo;
