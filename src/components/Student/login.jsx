import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UrlFetcher from "../../config/urlFetcher";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDispatch} from "react-redux";
import {setAuth, setToken } from "../../redux/slice";

const StudentLoginForm = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Redux functions
  const dispatch = useDispatch()

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      // CSRF Protection
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");

      // Send login request
      const response = await UrlFetcher.post("/student/login", formData);
      const token = response.data.token

      dispatch(setAuth(token))
      dispatch(setToken())

      // Redirect on success
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
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-3xl">
        {/* Left Section */}
        <div className="w-1/2 p-8">
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

            {/* Show error message */}
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              type="submit"
              className="w-full bg-sky-900 text-white py-2 rounded hover:bg-sky-700 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </button>

            <p className="text-sm text-gray-600 mt-3 text-center">Forgot your password?</p>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-sky-900 text-white p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
          <p className="text-sm mb-6">Log In & Pick Up Where You Left Off!</p>
          <button
            onClick={() => navigate("/lecture/signup")}
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
