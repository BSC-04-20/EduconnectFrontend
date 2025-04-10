import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthenticatedUserUrl } from '../../../config/urlFetcher';
import ClassCode from './selected/classCode';
import RegisteredStudents from './selected/StudentsNumber';
import PostedResources from './selected/classResourcesNumber';
import ClassroomFeed from './selected/announcements';
import { FaBullhorn } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { BiBookOpen } from 'react-icons/bi';

export default function SelectedClassroom() {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [enrolled, setEnrolled] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await AuthenticatedUserUrl(`/classes/get/${id}`);
        const data = response.data.data;

        if (response.status === 200) {
          setClassData(data);
          setEnrolled(response.data.total);
          setAnnouncements(response.data.announcements);
        } else {
          console.error('Class not found');
        }
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    fetchClassData();
  }, [id]);

  if (!classData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-5">
      <ClassWallpaper name={classData.name} />

      <div className="flex flex-col md:grid md:grid-cols-[15%_75%] md:gap-10">
        <div className="flex flex-row md:flex-col gap-2 mt-5 mr-[5%] md:mr-0">
          <ClassCode code={classData.class_code} />
          <RegisteredStudents total={enrolled} />
          <PostedResources />
        </div>
        <ClassroomFeed announcements={announcements} />
      </div>

      {/* Floating Action Menu */}
      <div className="fixed bottom-24 right-5 flex flex-col items-end space-y-3 z-50">
        {open && (
          <>
            <Link
              to={`/lecture/classroom/${id}/assignment`}
              className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
            >
              <MdLibraryBooks className="text-sky-600" size={20} />
            </Link>
            <Link
              to={`/lecture/classroom/${id}/announcement`}
              className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
            >
              <FaBullhorn className="text-sky-600" size={20} />
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
            >
              <BiBookOpen className="text-sky-600" size={20} />
            </button>
          </>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="w-16 h-16 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg flex items-center justify-center transition duration-300 text-3xl"
        >
          {open ? '×' : '+'}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <AddResources classId={id} closeModal={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

function ClassWallpaper({ name }) {
  return (
    <div className="h-[20vh] md:h-[30vh] bg-gradient-to-r from-sky-700 to-pink-200 mr-[5%] py-5 px-2 rounded-md">
      <h1 className="text-3xl">{name}</h1>
    </div>
  );
}

function AddResources({ classId, closeModal }) {
  const [fileQueue, setFileQueue] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const exists = fileQueue.some((f) => f.name === file.name);
      if (!exists) {
        setFileQueue((prev) => [...prev, file]);
        setSelectedFile(file);
      } else {
        alert("This file is already selected.");
      }
    }
    e.target.value = "";
  };

  const handleRemove = (index) => {
    const updatedQueue = fileQueue.filter((_, i) => i !== index);
    setFileQueue(updatedQueue);
    setSelectedFile(updatedQueue[updatedQueue.length - 1] || null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a title.");
      return;
    }

    if (fileQueue.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    if (!selectedFile) {
      alert("Please choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description || "");
    formData.append("class_id", classId);

    fileQueue.forEach((file) => {
      formData.append("files[]", file);
    });

    try {
      const response = await AuthenticatedUserUrl.post("/resources/create", formData);
      if (response.status !== 200) {
        throw new Error("Upload failed.");
      }
      alert("Upload successful!");
      setFileQueue([]);
      setSelectedFile(null);
      setTitle("");
      setDescription("");
      closeModal(); // close modal on success
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="flex flex-col gap-4"
    >
      <h2 className="text-lg sm:text-xl font-bold text-center text-gray-800">
        Upload Resources
      </h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
        rows={3}
      />

      <div className="relative w-full mb-2">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 opacity-0 absolute inset-0 z-10 cursor-pointer"
        />
        <div className="flex items-center justify-between text-sm bg-white border border-gray-300 rounded-md px-4 py-2 cursor-pointer">
          <span className="truncate text-gray-600">
            {selectedFile ? selectedFile.name : "Choose Files"}
          </span>
        </div>
      </div>

      {fileQueue.length > 0 && (
        <div className="text-sm text-gray-600 space-y-1">
          {fileQueue.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
            >
              <span className="truncate max-w-[70%] sm:max-w-[80%]">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="ml-2 text-red-600 hover:text-red-400 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
      >
        Upload
      </button>
    </form>
  );
}
