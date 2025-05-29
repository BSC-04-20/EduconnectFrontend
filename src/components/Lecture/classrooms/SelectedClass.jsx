import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthenticatedUserUrl } from '../../../config/urlFetcher';
import ClassCode from './selected/classCode';
import RegisteredStudents from './selected/StudentsNumber';
import PostedResources from './selected/classResourcesNumber';
import ClassroomFeed from './selected/announcements';
import { FaBullhorn } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { BiBookOpen, BiGroup } from 'react-icons/bi';
import { Toaster, toast} from "react-hot-toast";

export default function SelectedClassroom() {
    const { id } = useParams();
    const [classData, setClassData] = useState(null);
    const [enrolled, setEnrolled] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [open, setOpen] = useState(false); // State for floating action button
    const [showAddModal, setShowAddModal] = useState(false); // State for Add Discussion Modal
    const [discussionData, setDiscussionData] = useState({
        name: '',
        time: '',
    });

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

    const handleCreateDiscussion = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('meeting_name', discussionData.name);
        formData.append('start_time', discussionData.time);
        
        try {
            const response = await AuthenticatedUserUrl.post(`/classes/${id}/discussion`, formData);

            if (response.status === 201) {
                // Success: Discussion created
                toast.success('Discussion created successfully!');
                setShowAddModal(false); // Close the modal
            } else {
                // Failure: Something went wrong
                toast.error('Failed to create discussion. Please try again.');
            }
        } catch (error) {
            // Catch any errors
            console.error('Error creating discussion:', error);
            toast.error('Error creating discussion. Please try again.');
        }
    };


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
            <Toaster/>
            {/* Floating Action Menu */}
            <div className="fixed bottom-24 right-5 flex flex-col items-end space-y-3">
                {open && (
                    <>
                        <div
                            className={`transition-opacity transition-transform duration-500 ease-in-out transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                        >
                            <div className="group relative">
                                <Link
                                    to={`/lecture/classroom/${id}/assignment`}
                                    className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                >
                                    <MdLibraryBooks className="text-sky-600" size={20} />
                                </Link>
                                {/* Tooltip */}
                                <span className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Create Assignment
                                </span>
                            </div>
                        </div>

                        <div
                            className={`transition-opacity transition-transform duration-500 ease-in-out transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                        >
                            <div className="group relative">
                                <Link
                                    to={`/lecture/classroom/${id}/announcement`}
                                    className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                >
                                    <FaBullhorn className="text-sky-600" size={20} />
                                </Link>
                                {/* Tooltip */}
                                <span className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Create Announcement
                                </span>
                            </div>
                        </div>

                        <div
                            className={`transition-opacity transition-transform duration-500 ease-in-out transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                        >
                            <div className="group relative">
                                <Link
                                    to={`/lecture/classroom/${id}/addresources`}
                                    className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                >
                                    <BiBookOpen className="text-sky-600" size={20} />
                                </Link>
                                {/* Tooltip */}
                                <span className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Upload Resources
                                </span>
                            </div>
                        </div>

                        {/* This is for adding a discussion */}
                        <div
                            className={`transition-opacity transition-transform duration-500 ease-in-out transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                        >
                            <div className="group relative">
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                >
                                    <BiGroup className="text-sky-600" size={20} />
                                </button>
                                {/* Tooltip */}
                                <span className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Add Discussion
                                </span>
                            </div>
                        </div>
                    </>
                )}

                {/* Toggle Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="w-16 h-16 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg flex items-center justify-center transition duration-300 text-3xl"
                    title="Open/Close Actions"
                >
                    {open ? '×' : '+'}
                </button>
            </div>

            {/* Add Discussion Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-2xl mb-4">Add a Discussion</h2>
                        <form onSubmit={handleCreateDiscussion}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Discussion Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={discussionData.name}
                                    onChange={(e) => setDiscussionData({ ...discussionData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                                    Time
                                </label>
                                <input
                                    type="datetime-local"
                                    id="time"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={discussionData.time}
                                    onChange={(e) => setDiscussionData({ ...discussionData, time: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-sky-600 text-white rounded-md"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
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
