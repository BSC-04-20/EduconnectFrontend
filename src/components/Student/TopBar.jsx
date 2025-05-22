import React, { useEffect, useState, useRef } from "react";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { CiBellOn, CiCalendar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { StudentAuthenticatedUserUrl } from "../../config/urlFetcher";
import { useDispatch } from "react-redux";
import { removeStudentToken, unAuthorize } from "../../redux/studentSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Toaster, toast } from "react-hot-toast";

const StudentTopBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const getUsername = async () => {
    try {
      const response = await StudentAuthenticatedUserUrl.get("/user");
      setUsername(response.data.fullname);
    } catch (error) {
      toast.error("Failed to get username");
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await StudentAuthenticatedUserUrl.post("/student/logout");
      if (response.status === 200) {
        dispatch(removeStudentToken());
        dispatch(unAuthorize());
        navigate("/student/login");
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      toast.error("Unauthorized");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return today.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <>
      <div className="w-full sm:w-max ml-auto text-white p-4 sm:mr-[5%] flex flex-wrap gap-4 items-center z-50 justify-end">
        <span className="hidden sm:flex sm:flex-row gap-2 px-4 py-2 shadow-sm rounded-lg text-slate-950">
          <CiCalendar className="size-[1.5rem]" />
          {getCurrentDate()}
        </span>

        <span className="shadow-sm rounded-lg px-4 py-2">
          <CiBellOn className="text-slate-950 size-[1.5rem]" />
        </span>

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full bg-sky-700 text-white flex items-center justify-center font-bold uppercase hover:bg-sky-800"
          >
            {username?.charAt(0)}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50 py-2">
              <button
                onClick={() => {
                  navigate("/student/studentprofile");
                  setMenuOpen(false);
                }}
                className="flex items-center justify-start gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              >
                <CgProfile className="size-5" />
                Profile
              </button>

              <button
                className="flex items-center justify-start gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                onClick={() => {
                  setIsDialogOpen(true);
                  setMenuOpen(false);
                }}
              >
                <CgLogOut className="size-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <Toaster />

      {/* Logout Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50 transition-all">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-center">Confirm Logout</h2>
            <p className="text-center mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setIsDialogOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? "Logging Out..." : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentTopBar;
