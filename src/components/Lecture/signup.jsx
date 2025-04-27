import { useState } from "react";
import { MdPerson, MdPhone, MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UrlFetcher from "../../config/urlFetcher";
import { Dialog, CircularProgress } from "@mui/material";
import { IoArrowBack } from "react-icons/io5";
import { useForm } from "react-hook-form";

export default function LecturerSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await UrlFetcher.post("/lecture/signup", {
        fullname: data.fullname,
        phonenumber: data.phonenumber,
        email: data.email,
        password: data.password,
      });

      alert("Signup successful!");
      navigate("/lecture/login");
    } catch (err) {
      alert(err.response.data.errors);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-4 pt-6">
      {/* Top Bar with Back, Home, and Lecture Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 transition"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack className="mr-2 text-2xl" />
          Back
        </button>
        <button
          onClick={() => navigate("/lecture/dashboard")}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/student/signup")}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          Student
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-3/4 max-w-4xl">
          {/* Left Section */}
          <div className="w-1/3 bg-sky-900 text-white flex-col items-center justify-center p-6 hidden md:flex">
            <h2 className="text-2xl font-bold">Hello Friend!</h2>
            <p className="text-sm text-gray-300 mt-2">
              Educate, Guide & Lead - Sign Up Today!
            </p>
            <button
              onClick={() => navigate("/lecture/login")}
              className="border border-white py-1 px-8 mt-3 rounded hover:bg-white hover:text-sky-900 transition"
            >
              Sign In
            </button>
          </div>

          {/* Right Section - Form */}
          <div className="w-full md:w-2/3 p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Lecturer Signup
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center border rounded px-3">
                <MdPerson className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full py-2 outline-none"
                  {...register("fullname", { required: "Full name is required" })}
                />
              </div>
              {errors.fullname && (
                <p className="text-red-500 text-sm">{errors.fullname.message}</p>
              )}

              <div className="flex items-center border rounded px-3">
                <MdPhone className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="w-full py-2 outline-none"
                  {...register("phonenumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must be digits only",
                    },
                  })}
                />
              </div>
              {errors.phonenumber && (
                <p className="text-red-500 text-sm">{errors.phonenumber.message}</p>
              )}

              <div className="flex items-center border rounded px-3">
                <MdEmail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full py-2 outline-none"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <div className="flex items-center border rounded px-3">
                <MdLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full py-2 outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              <div className="flex items-center border rounded px-3">
                <MdLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full py-2 outline-none"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-sky-900 text-white py-2 rounded hover:bg-sky-700 transition"
              >
                Signup
              </button>
            </form>

            {/* Sign In button for small screens */}
            <div className="mt-4 block md:hidden text-center">
              <button
                onClick={() => navigate("/lecture/login")}
                className="border border-gray-400 py-2 px-6 rounded hover:bg-gray-200 transition"
              >
                Sign In
              </button>
            </div>
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
