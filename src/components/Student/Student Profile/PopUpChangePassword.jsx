import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
// import { StudentAuthenticatedUserUrl } from "../../config/urlFetcher";

const PopUpChangePassword = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await StudentAuthenticatedUserUrl.put("/student/change-password", { password });
      toast.success("Password updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Change Password</h2>

        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Confirm Password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          fullWidth
          margin="normal"
        />

        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Password"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopUpChangePassword;
