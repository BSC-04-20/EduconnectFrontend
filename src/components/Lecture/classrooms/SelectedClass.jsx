import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
    const [discussions, setDiscussions] = useState([]);
    const [open, setOpen] = useState(false); // State for floating action button
    const [showAddModal, setShowAddModal] = useState(false); // State for Add Discussion Modal
    const [discussionData, setDiscussionData] = useState({
        name: '',
        time: '',
    });
    const [activeTab, setActiveTab] = useState('resources'); // 'resources' or 'discussions'
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showParticipantsModal, setShowParticipantsModal] = useState(false);
    const [participantsData, setParticipantsData] = useState(null);
    const [loadingParticipants, setLoadingParticipants] = useState(false);
    const navigate = useNavigate();

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

        const fetchDiscussions = async () => {
            try {
                const response = await AuthenticatedUserUrl(`/classes/${id}/discussions`);
                if (response.status === 200) {
                    setDiscussions(response.data.discussions || []);
                }
            } catch (error) {
                console.error('Error fetching discussions:', error);
            }
        };

        fetchClassData();
        fetchDiscussions();
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
            console.error('Error creating discussion:', error);
            toast.error('Error creating discussion. Please try again.');
        }
    };
    <Toaster/>

    // Handler for clicking a discussion
    const handleDiscussionClick = (discussion) => {
        setSelectedDiscussion(discussion);
        setShowJoinModal(true);
    };

    // Handler for joining meeting
    const handleJoinMeeting = () => {
        setShowJoinModal(false);
        navigate(`/lecture/classroom/${id}/meeting/${selectedDiscussion.id}`, {
            state: {
                id: selectedDiscussion.id,
                meeting_name: selectedDiscussion.meeting_name,
                start_time: selectedDiscussion.start_time
            }
        });
    };

    // Handler for viewing participants
    const handleViewParticipants = async () => {
        setLoadingParticipants(true);
        setShowJoinModal(false);
        setShowParticipantsModal(true);
        try {
            // Fetch participant summary (should return attended and not_attended arrays)
            const res = await AuthenticatedUserUrl(`/classes/discussion/summary/${selectedDiscussion.id}`);
            // Example expected response:
            // {
            //   attended: [{ fullname: "John Doe" }, { fullname: "Jane Smith" }],
            //   not_attended: [{ fullname: "Alice" }]
            // }
            setParticipantsData(res.data);
        } catch (error) {
            setParticipantsData({ attended: [], not_attended: [] });
            console.log(error)
        }
        setLoadingParticipants(false);
    };

    // Handler to close participants modal
    const handleCloseParticipants = () => {
        setShowParticipantsModal(false);
        setParticipantsData(null);
        setSelectedDiscussion(null);
    };

    return (
        <>
            {/* Main content, blurred when participants modal is open */}
            <div className={`my-5 transition-all duration-200 ${showParticipantsModal ? 'blur-sm pointer-events-none select-none' : ''}`}>
                <ClassWallpaper name={classData.name} />
                <div className="flex flex-col md:grid md:grid-cols-[15%_75%] md:gap-10">
                    <div className="flex flex-row md:flex-col gap-2 mt-5 mr-[5%] md:mr-0">
                        <ClassCode code={classData.class_code} />
                        <RegisteredStudents total={enrolled} />
                        <PostedResources />
                    </div>
                    <div>
                        {/* Tabs */}
                        <div className="flex gap-2 mb-4 mt-5">
                            <button
                                className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === 'resources' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => setActiveTab('resources')}
                            >
                                Announcements
                            </button>
                            <button
                                className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === 'discussions' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => setActiveTab('discussions')}
                            >
                                Discussions
                            </button>
                        </div>
                        {/* Tab Content */}
                        <div className="bg-white rounded-b-md shadow p-4 min-h-[200px]">
                            {activeTab === 'resources' ? (
                                <ClassroomFeed announcements={announcements} />
                            ) : (
                                <div>
                                    {discussions.length === 0 ? (
                                        <div className="text-gray-500">No discussions yet.</div>
                                    ) : (
                                        <ul className="space-y-3">
                                            {discussions.map(discussion => {
                                                const date = new Date(discussion.start_time);
                                                const formattedDate = date.toLocaleDateString();
                                                const formattedTime = date.toLocaleTimeString();

                                                // Timing logic for join button
                                                const now = new Date();
                                                const start = new Date(discussion.start_time);
                                                const fiveMinutesBefore = new Date(start.getTime() - 5 * 60 * 1000);
                                                const oneDayAfter = new Date(start.getTime() + 24 * 60 * 60 * 1000);
                                                const canJoin = now >= fiveMinutesBefore && now <= oneDayAfter;

                                                // Tooltip logic
                                                let tooltipText = "";
                                                if (now < fiveMinutesBefore) {
                                                  tooltipText = "You may join 5 minutes before the meeting starts.";
                                                } else if (now > oneDayAfter) {
                                                  tooltipText = "You can no longer join this meeting (more than a day late).";
                                                } else if (canJoin && now <= start) {
                                                  tooltipText = "You can join this meeting now.";
                                                } else if (now >= start && now <= oneDayAfter) {
                                                  tooltipText = "The meeting is live.";
                                                } else {
                                                  tooltipText = "You cannot join this meeting.";
                                                }

                                                return (
                                                    <li key={discussion.id}>
                                                        <div className="relative group">
                                                          {/* Tooltip */}
                                                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                                            {tooltipText}
                                                          </div>
                                                          {/* Join/Participants Button */}
                                                          {canJoin ? (
                                                            <button
                                                              onClick={() => handleDiscussionClick(discussion)}
                                                              className="w-full text-left block p-4 border rounded-lg hover:bg-sky-50 transition"
                                                            >
                                                              <div className="font-semibold text-gray-800">{discussion.meeting_name}</div>
                                                              <div className="text-sm text-gray-500">
                                                                {formattedDate} &middot; {formattedTime}
                                                              </div>
                                                            </button>
                                                          ) : (
                                                            <div
                                                              className="w-full text-left block p-4 border rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                                                              title={tooltipText}
                                                            >
                                                              <div className="font-semibold">{discussion.meeting_name}</div>
                                                              <div className="text-sm">
                                                                {formattedDate} &middot; {formattedTime}
                                                              </div>
                                                            </div>
                                                          )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

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

                {/* Join/Participants Modal */}
                {showJoinModal && selectedDiscussion && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">{selectedDiscussion.meeting_name}</h2>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleJoinMeeting}
                                    className="px-4 py-2 bg-sky-600 text-white rounded-md font-semibold"
                                >
                                    Join Meeting
                                </button>
                                <button
                                    onClick={handleViewParticipants}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold"
                                >
                                    See Participants
                                </button>
                                <button
                                    onClick={() => setShowJoinModal(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-500 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Participants Modal rendered OUTSIDE the blurred area */}
            {showParticipantsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]">
                    <div className="bg-white p-6 rounded-lg w-[90vw] max-w-lg shadow-lg relative">
                        <button
                            onClick={handleCloseParticipants}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Participants</h2>
                        {loadingParticipants ? (
                            <div>Loading...</div>
                        ) : participantsData ? (
                            <div>
                                <div className="mb-3">
                                    <span className="font-semibold">Attended:</span>
                                    <div>
                                        {participantsData.attended && participantsData.attended.length > 0 ? (
                                            <ul className="list-disc ml-5">
                                                {participantsData.attended.map((user, idx) => (
                                                    <li key={idx}>{user.fullname}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>None</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <span className="font-semibold">Not Attended:</span>
                                    <div>
                                        {participantsData.not_attended && participantsData.not_attended.length > 0 ? (
                                            <ul className="list-disc ml-5">
                                                {participantsData.not_attended.map((user, idx) => (
                                                    <li key={idx}>{user.fullname}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>None</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No data available.</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

import PropTypes from 'prop-types';

function ClassWallpaper({ name }) {
    return (
        <div className="h-[20vh] md:h-[30vh] bg-gradient-to-r from-sky-700 to-pink-200 mr-[5%] py-5 px-2 rounded-md">
            <h1 className="text-3xl">{name}</h1>
        </div>
    );
}

ClassWallpaper.propTypes = {
    name: PropTypes.string.isRequired,
};
