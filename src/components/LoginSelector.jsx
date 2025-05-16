import React, { useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast} from "react-hot-toast";

const LoginSelector = () => {// null, 'student', or 'lecturer'
  const navigator = useNavigate();  

  const handleSubmit = (userType) => {
    if (userType === 'student') {
        navigator("/student/login")
    } else if (userType === 'lecturer') {
        navigator("/lecture/login")
    } else {
      toast.error("Please select a user type.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login As</h2>

        <div className="mb-4">
          <button
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-blue-500 hover:text-white focus:outline-none`}
            onClick={() => handleSubmit('student')}
          >
            <PiStudentBold className="w-5 h-5" /> {/* Student Icon */}
            Student
          </button>
        </div>

        <div className="mb-6">
          <button
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-blue-500 hover:text-white focus:outline-none`}
            onClick={() => handleSubmit('lecturer')}
          >
            <FaChalkboardTeacher className="w-5 h-5" /> {/* Lecturer Icon */}
            Lecturer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSelector;
