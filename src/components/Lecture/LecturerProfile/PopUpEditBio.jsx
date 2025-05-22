import React from "react";
import { toast } from "react-hot-toast";

const PopUpEditBio = ({ isOpen, onClose, formData, setFormData, onSave }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave();
      toast.success("Bio updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update bio");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Bio</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Bio</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              required
            ></textarea>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpEditBio;
