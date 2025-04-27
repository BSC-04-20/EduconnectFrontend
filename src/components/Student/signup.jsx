import { useState } from "react";
import { useForm } from "react-hook-form"; // Added
import { MdPerson, MdPhone, MdEmail, MdLock } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UrlFetcher from "../../config/urlFetcher";
import { Dialog, CircularProgress } from "@mui/material"; // MUI Components

export default function StudentSignup() {
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: "onChange" });
  const password = watch("password");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await UrlFetcher.post("/student/signup", {
        fullname: data.fullname,
        phonenumber: data.phonenumber,
        email: data.email,
        password: data.password,
      });

      console.log("Success:", response.data);
      alert("Signup successful!");
      navigate("/student/login");
    } catch (err) {
      alert(err.response.data.errors);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Top Bar */}
      <div className="absolute top-6 left-6 flex gap-4 z-50 text-gray-600 hover:text-gray-900">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2">
          <IoMdArrowBack className="mr-1 text-xl" />
          <span>Back</span>
        </button>
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <span>Home</span>
        </button>
        <button onClick={() => navigate("/lecture/signup")} className="flex items-center gap-2">
          <span>Lecture</span>
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-3/4 max-w-4xl">
        {/* Left Section */}
        <div className="w-1/3 bg-sky-900 text-white flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl font-bold">Hello Friend!</h2>
          <p className="text-sm text-gray-300 mt-2">
            Educate, Guide & Lead - Sign Up Today!
          </p>
          <button
            onClick={() => navigate("/student/login")}
            className="border border-white py-1 px-24 mt-3 rounded hover:bg-white hover:text-sky-900 transition"
          >
            Sign In
          </button>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-2/3 p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Student Signup Form
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center border rounded px-3">
              <MdPerson className="text-gray-400 mr-2" />
              <input
                type="text"
                {...register("fullname", { required: "Full name is required" })}
                placeholder="Full name"
                className="w-full py-2 outline-none"
              />
            </div>
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}

            <div className="flex items-center border rounded px-3">
              <MdPhone className="text-gray-400 mr-2" />
              <input
                type="text"
                {...register("phonenumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must be digits only",
                  },
                })}
                placeholder="Phone number"
                className="w-full py-2 outline-none"
              />
            </div>
            {errors.phonenumber && (
              <p className="text-red-500 text-sm">{errors.phonenumber.message}</p>
            )}

            <div className="flex items-center border rounded px-3">
              <MdEmail className="text-gray-400 mr-2" />
              <input
                type="email"
                {...register("email", { 
                  required: "Email is required", 
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" }
                })}
                placeholder="Email"
                className="w-full py-2 outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <div className="flex items-center border rounded px-3">
              <MdLock className="text-gray-400 mr-2" />
              <input
                type="password"
                {...register("password", { 
                  required: "Password is required", 
                  minLength: { value: 8, message: "Password must be at least 8 characters" }
                })}
                placeholder="Password"
                className="w-full py-2 outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div className="flex items-center border rounded px-3">
              <MdLock className="text-gray-400 mr-2" />
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                placeholder="Confirm Password"
                className="w-full py-2 outline-none"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-sky-900 text-white py-2 rounded hover:bg-sky-700 transition"
            >
              Signup
            </button>
          </form>

          {/* Sign In Button - Only on small screens */}
          <button
            onClick={() => navigate("/student/login")}
            className="block lg:hidden w-full border border-sky-900 text-sky-900 py-2 mt-4 rounded hover:bg-sky-900 hover:text-white transition"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Loading Modal */}
      <Dialog open={loading} PaperProps={{ style: { backgroundColor: "transparent", boxShadow: "none" } }}>
        <div className="flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-md">
          <CircularProgress color="primary" />
          <p className="mt-2 text-sky-700">Signing up...</p>
        </div>
      </Dialog>
    </div>
  );
}
