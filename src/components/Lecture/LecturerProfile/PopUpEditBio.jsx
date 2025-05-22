import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
// import { StudentAuthenticatedUserUrl } from "../../config/urlFetcher";

const PopUpEditBio = ({ isOpen, onClose, formData, setFormData }) => {
  const [localData, setLocalData] = useState({ description: "" });
  const [loading, setLoading] = useState(false);

  // Sync localData with formData when popup opens
  useEffect(() => {
    if (isOpen) {
      setLocalData({ description: formData.description || "" });
    }
  }, [isOpen, formData]);

  const handleChange = (e) => {
    setLocalData({ ...localData, description: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call, replace with your actual endpoint
      // await StudentAuthenticatedUserUrl.put("/student/update-bio", { description: localData.description });

      // For demonstration, simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Bio updated successfully");
      setFormData((prev) => ({ ...prev, description: localData.description }));
      onClose();
    } catch (error) {
      toast.error("Failed to update bio");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Edit Bio</h2>

        <textarea
          name="description"
          value={localData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          rows={4}
          required
          disabled={loading}
        />

        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopUpEditBio;
