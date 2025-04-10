import React, { useState } from 'react';
import { FaChalkboardTeacher, FaArrowLeft } from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const LoginSelector = () => {
  const navigator = useNavigate();  // Correct naming

  const handleSubmit = (userType) => {
    if (userType === 'student') {
      navigator("/student/login");
    } else if (userType === 'lecturer') {
      navigator("/lecture/login");
    } else {
      alert("Please select a user type.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Back Button */}
      <button
        onClick={() => navigator(-1)}  // Fixed from navigate(-1) to navigator(-1)
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login As</h2>

        <div className="mb-4">
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-blue-500 hover:text-white focus:outline-none"
            onClick={() => handleSubmit('student')}
          >
            <PiStudentBold className="w-5 h-5" />
            Student
          </button>
        </div>

        <div className="mb-6">
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-blue-500 hover:text-white focus:outline-none"
            onClick={() => handleSubmit('lecturer')}
          >
            <FaChalkboardTeacher className="w-5 h-5" />
            Lecturer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSelector;
