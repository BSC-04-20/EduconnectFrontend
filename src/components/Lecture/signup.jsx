import { useState } from "react";
import { MdPerson, MdPhone, MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UrlFetcher from "../../config/urlFetcher";
import { Dialog, CircularProgress } from "@mui/material"; // Import MUI Components
import { IoArrowBack } from "react-icons/io5"; // Back icon

export default function LecturerSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await UrlFetcher.post("/lecture/signup", {
        fullname: formData.fullname,
        phonenumber: formData.phonenumber,
        email: formData.email,
        password: formData.password,
      });

      console.log("Success:", response.data);
      alert("Signup successful!");
      navigate("/lecture/login");
    } catch (err) {
      alert(err.response.data.errors);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-4 pt-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 transition"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack className="mr-2 text-2xl" />
          Back
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-3/4 max-w-4xl">
          {/* Left Section */}
          <div className="w-1/3 bg-sky-900 text-white flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-bold">Hello Friend!</h2>
            <p className="text-sm text-gray-300 mt-2">
              Educate, Guide & Lead - Sign Up Today!
            </p>
            <button
              onClick={() => navigate("/lecture/login")}
              className="border border-white py-1 px-24 mt-3 rounded hover:bg-white hover:text-sky-900 transition"
            >
              Sign In
            </button>
          </div>

          {/* Right Section - Form */}
          <div className="w-2/3 p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Lecturer Signup Form
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex items-center border rounded px-3">
                <MdPerson className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full name"
                  className="w-full py-2 outline-none"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center border rounded px-3">
                <MdPhone className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="phonenumber"
                  placeholder="Phone number"
                  className="w-full py-2 outline-none"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center border rounded px-3">
                <MdEmail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full py-2 outline-none"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center border rounded px-3">
                <MdLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full py-2 outline-none"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center border rounded px-3">
                <MdLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full py-2 outline-none"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-900 text-white py-2 rounded hover:bg-sky-700 transition"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Loading Modal */}
      <Dialog
        open={loading}
        PaperProps={{
          style: { backgroundColor: "transparent", boxShadow: "none" },
        }}
      >
        <div className="flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-md">
          <CircularProgress color="primary" />
          <p className="mt-2 text-sky-700">Signing up...</p>
        </div>
      </Dialog>
    </div>
  );
}
