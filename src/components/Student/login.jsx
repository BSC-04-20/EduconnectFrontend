import { useState } from "react";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UrlFetcher from "../../config/urlFetcher";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStudentAuth, setStudentToken } from "../../redux/studentSlice";
import { useForm } from "react-hook-form";

const StudentLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const sanctumUrl = import.meta.env.VITE_SANCTUM_URL;
      await axios.get(sanctumUrl);

      const response = await UrlFetcher.post("/student/login", data);
      const token = response.data.studToken;

      dispatch(setStudentAuth(token));
      dispatch(setStudentToken());

      reset(); // clear form
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
        {/* Navigation Buttons */}
        <div className="absolute top-4 left-4 flex gap-4 z-50 text-gray-600 hover:text-gray-900">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2">
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <span>Home</span>
          </button>
          <button onClick={() => navigate("/lecture/login")} className="flex items-center gap-2">
            <span>Lecture</span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-3xl relative">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format"
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4 relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
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

            {/* Mobile Sign Up */}
            <div className="mt-4 block md:hidden text-center">
              <button
                type="button"
                onClick={() => navigate("/student/signup")}
                className="border border-sky-900 text-sky-900 py-2 px-4 rounded hover:bg-sky-900 hover:text-white transition w-full"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* Right Section */}
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
