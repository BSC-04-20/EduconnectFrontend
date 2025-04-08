import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { StudentAuthenticatedUserUrl } from "../../../config/urlFetcher";

const AnnouncementPage = () => {
    const [classTitle, setClassTitle] = useState();
    const [lectureName, setLectureName] = useState();
    const [datePosted, setDatePosted] = useState();
    const [description, setDescription] = useState();

    const id = useParams();    

    useEffect(()=>{
      
      const fetchAnnouncement = async () =>{
        
        try {
          const response = await StudentAuthenticatedUserUrl.get(`/announcement/get/${id.id}`);
          setClassTitle(response.data.title);
          setLectureName(response.data.lecture_name);
          setDatePosted(response.data.posted);
          setDescription(response.data.description);
        } catch (error) {
          console.log(error)
        }
      }

      fetchAnnouncement()

    },[])

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
      {/* Class Name Header */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-sm text-gray-600 font-semibold">[2025] : Machine Learning</h2>
      </div>

      {/* Announcement Card */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mt-4">
        <div className="flex items-center gap-3">
          <FaBook className="text-gray-600 text-2xl" />
          <h2 className="text-xl font-bold text-gray-800">{classTitle}</h2>
        </div>
        <p className="text-gray-600 text-sm mt-1">{lectureName} • {datePosted}</p>
        <hr className="my-3" />
        <p className="text-gray-700 font-medium">{description}</p>
        <hr className="my-3" />
        {/* <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg shadow-sm">
          <AiOutlineFilePdf className="text-red-600 text-3xl" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Lesson 1 - Introduction to Machine Learning</p>
            <p className="text-xs text-gray-500">PDF</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AnnouncementPage;
