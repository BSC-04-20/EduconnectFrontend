import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthenticatedUserUrl } from '../../../config/urlFetcher';
import ClassCode from './selected/classCode';
import RegisteredStudents from './selected/StudentsNumber';
import PostedResources from './selected/classResourcesNumber';
import ClassroomFeed from './selected/announcements';
import AddResources from '../Resources/AddResources';
import AssignmentModal from '../classrooms/addassignment';
import AnnouncementModal from '../classrooms/announcementform'; // Import the separated component
import { FaBullhorn } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { BiBookOpen, BiGroup } from 'react-icons/bi';

export default function SelectedClassroom() {
    const { id } = useParams();
    const [classData, setClassData] = useState(null);
    const [enrolled, setEnrolled] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [open, setOpen] = useState(false); // State for floating action button
    const [showAddModal, setShowAddModal] = useState(false); // State for Add Discussion Modal
    const [showResourcesModal, setShowResourcesModal] = useState(false); // State for Add Resources Modal
    const [showAssignmentModal, setShowAssignmentModal] = useState(false); // State for Assignment Modal
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false); // State for Announcement Modal
    const [isSubmittingDiscussion, setIsSubmittingDiscussion] = useState(false); // Loading state for discussion
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
        setIsSubmittingDiscussion(true); // Set loading

        const formData = new FormData();
        formData.append('meeting_name', discussionData.name);
        formData.append('start_time', discussionData.time);
        
        try {
            const response = await AuthenticatedUserUrl.post(`/classes/${id}/discussion`, formData);

            if (response.status === 201) {
                // Success: Discussion created
                alert('Discussion created successfully!');
                setDiscussionData({ name: '', time: '' }); // Reset form
                setShowAddModal(false); // Close the modal
            } else {
                // Failure: Something went wrong
                alert('Failed to create discussion. Please try again.');
            }
        } catch (error) {
            // Catch any errors
            console.error('Error creating discussion:', error);
            alert('Error creating discussion. Please try again.');
        } finally {
            setIsSubmittingDiscussion(false); // Reset loading
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

            {/* Floating Action Menu */}
            <div className="fixed bottom-24 right-5 flex flex-col items-end space-y-3">
                {open && (
                    <>
                        <div
                            className={`transition-opacity transition-transform duration-500 ease-in-out transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                        >
                            <div className="group relative">
                                <button
                                    onClick={() => setShowAssignmentModal(true)}
                                    className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                >
                                    <MdLibraryBooks className="text-sky-600" size={20} />
                                </button>
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
                                <button
                                    onClick={() => setShowAnnouncementModal(true)}
                                    className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                >
                                    <FaBullhorn className="text-sky-600" size={20} />
                                </button>
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
                                <button
                                    onClick={() => setShowResourcesModal(true)}
                                    className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                >
                                    <BiBookOpen className="text-sky-600" size={20} />
                                </button>
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
                                    disabled={isSubmittingDiscussion}
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
                                    disabled={isSubmittingDiscussion}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                    disabled={isSubmittingDiscussion}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-60"
                                    disabled={isSubmittingDiscussion}
                                >
                                    {isSubmittingDiscussion ? "Creating..." : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Assignment Modal */}
            <AssignmentModal 
                isOpen={showAssignmentModal} 
                onClose={() => setShowAssignmentModal(false)} 
                classId={id} 
            />

            {/* Add Resources Modal Component */}
            <AddResources 
                isOpen={showResourcesModal} 
                onClose={() => setShowResourcesModal(false)}
                classId={id}
            />

            {/* Announcement Modal */}
            <AnnouncementModal
                isOpen={showAnnouncementModal}
                onClose={() => setShowAnnouncementModal(false)}
                classId={id}
            />
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