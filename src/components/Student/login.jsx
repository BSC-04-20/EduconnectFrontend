import { useState } from "react";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa"; // Added back icon
import { useNavigate } from "react-router-dom";
import UrlFetcher from "../../config/urlFetcher";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStudentAuth, setStudentToken } from "../../redux/studentSlice";

const StudentLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const sanctumUrl = import.meta.env.VITE_SANCTUM_URL;
      await axios.get(sanctumUrl);
      
      const response = await UrlFetcher.post("/student/login", formData);
      const token = response.data.studToken;

      dispatch(setStudentAuth(token));
      dispatch(setStudentToken());

      navigate("/student/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-3xl relative">

        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              type="submit"
              className="w-full bg-sky-900 text-white py-2 rounded hover:bg-sky-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </button>

            <p className="text-sm text-gray-600 mt-3 text-center">Forgot your password?</p>
            
            {/* Sign Up button appears below on small screens */}
            <div className="mt-4 block md:hidden text-center">
              <button
                type="button"
                onClick={() => navigate("/student/signup")}
                className="sm:hidden border border-sky-900 text-sky-900 py-2 px-4 rounded hover:bg-sky-900 hover:text-white transition w-full"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* Right Section - Hidden on small screens */}
        <div className="hidden md:flex w-1/2 bg-sky-900 text-white p-8 flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
          <p className="text-sm mb-6">Log In & Pick Up Where You Left Off!</p>
          <button
            onClick={() => navigate("/student/signup")}
            className="border border-white py-2 px-4 rounded hover:bg-white hover:text-sky-900 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginForm;





