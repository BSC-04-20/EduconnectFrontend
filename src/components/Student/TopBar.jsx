import React, { useEffect, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { CiBellOn, CiCalendar, CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { AuthenticatedUserUrl, StudentAuthenticatedUserUrl } from "../../config/urlFetcher";
import { useDispatch } from "react-redux";
import { removeStudentToken, unAuthorize } from "../../redux/studentSlice";
import CircularProgress from "@mui/material/CircularProgress"; 
import Button from "@mui/material/Button"; 

const StudentTopBar = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Track logout loading state
  const dispatch = useDispatch();
  const [username, setUsername] = useState();

  const getUsername = async () => {
    try {
      const response = await StudentAuthenticatedUserUrl.get("/user");
      setUsername(response.data.fullname);
    } catch (error) {
      alert("Failed to get username");
    }
  }

  const handleLogout = async () => {
    setLoading(true); 
    try {
      const response = await StudentAuthenticatedUserUrl.post("/student/logout");

      if (response.status === 200) {
        dispatch(removeStudentToken());
        dispatch(unAuthorize());
        navigate("/student/login");
      } else {
        alert("Failed to logout");
      }
    } catch (error) {
      alert("Unauthorized");
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

  useEffect(()=>{
    getUsername()
  }, [])
  return (
    <>
      <div className="w-full sm:w-max ml-auto text-white p-4 mr-[5%] flex flex-wrap gap-4 items-center z-50 justify-center sm:justify-end">
        <span className="flex flex-row shadow-md px-4 py-2 rounded-lg items-center gap-2 text-slate-950">
      <CiUser className="size-[1.5rem]" />
          {username}
        </span>
        <span className="flex flex-row gap-2 px-4 py-2 shadow-md rounded-lg text-slate-950">
          <CiCalendar className="size-[1.5rem]" />
          {getCurrentDate()}
        </span>
        <span className="shadow-md rounded-lg px-4 py-2">
          <CiBellOn className="text-slate-950 size-[1.5rem]" />
        </span>
        <button
          className="flex flex-row items-center gap-2 bg-gray-700 hover:bg-sky-700 text-white py-2 px-4 rounded-lg"
          onClick={() => setIsDialogOpen(true)} // Open the dialog
        >
          <CgLogOut className="size-[1.5rem]" />
          Logout
        </button>
      </div>

     {/* Logout Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">Confirm Logout</h2>
            <p className="text-center mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setIsDialogOpen(false)}
                disabled={loading} // Disable cancel button when loading
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                disabled={loading} // Disable button while logging out
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null} // Show spinner
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
