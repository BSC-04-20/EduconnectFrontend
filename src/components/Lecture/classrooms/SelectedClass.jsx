import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthenticatedUserUrl } from '../../../config/urlFetcher';
import ClassCode from './selected/classCode';
import RegisteredStudents from './selected/StudentsNumber';
import PostedResources from './selected/classResourcesNumber';
import ClassroomFeed from './selected/announcements';
import { FaBullhorn } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { BiBookOpen, BiGroup } from 'react-icons/bi';
import { Toaster, toast } from 'react-hot-toast';
import DiscussionFeed from './selected/discussions';

export default function SelectedClassroom() {
    const { id } = useParams();
    const [classData, setClassData] = useState(null);
    const [enrolled, setEnrolled] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [open, setOpen] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showResourcesModal, setShowResourcesModal] = useState(false);
    const [showAssignmentModal, setShowAssignmentModal] = useState(false);
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
    const [discussionData, setDiscussionData] = useState({ name: '', time: '' });
    const [assignmentData, setAssignmentData] = useState({ title: '', description: '', due_date: '', file: null });
    const [announcementData, setAnnouncementData] = useState({ title: '', content: '' });
    const [resourceData, setResourceData] = useState({ title: '', file: null });
    const [activeTab, setActiveTab] = useState('resources');
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showParticipantsModal, setShowParticipantsModal] = useState(false);
    const [participantsData, setParticipantsData] = useState(null);
    const [loadingParticipants, setLoadingParticipants] = useState(false);
    const [loadingStates, setLoadingStates] = useState({
        discussion: false,
        assignment: false,
        resource: false,
        announcement: false
    });
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

    // --- Discussion Modal Logic ---
    const handleCreateDiscussion = async (e) => {
        e.preventDefault();
        setLoadingStates(prev => ({ ...prev, discussion: true }));
        const formData = new FormData();
        formData.append('meeting_name', discussionData.name);
        formData.append('start_time', discussionData.time);
        try {
            const response = await AuthenticatedUserUrl.post(`/classes/${id}/discussion`, formData);
            if (response.status === 201) {
                toast.success('Discussion created successfully!');
                setShowAddModal(false);
                const res = await AuthenticatedUserUrl(`/classes/${id}/discussions`);
                setDiscussions(res.data.discussions || []);
            } else {
                toast.error('Failed to create discussion. Please try again.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error creating discussion. Please try again.');
        } finally {
            setLoadingStates(prev => ({ ...prev, discussion: false }));
        }
    };

    // --- Assignment Modal Logic ---
    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        setLoadingStates(prev => ({ ...prev, assignment: true }));
        try {
            const formData = new FormData();
            formData.append('title', assignmentData.title);
            formData.append('description', assignmentData.description);
            formData.append('due_date', assignmentData.due_date);
            if (assignmentData.file) formData.append('file', assignmentData.file);

            const response = await AuthenticatedUserUrl.post(`/classes/${id}/assignment`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 201) {
                toast.success('Assignment created successfully!');
                setShowAssignmentModal(false);
            } else {
                toast.error('Failed to create assignment. Please try again.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error creating assignment. Please try again.');
        } finally {
            setLoadingStates(prev => ({ ...prev, assignment: false }));
        }
    };

    // --- Announcement Modal Logic ---
    const handleCreateAnnouncement = async (e) => {
        e.preventDefault();
        setLoadingStates(prev => ({ ...prev, announcement: true }));
        try {
            const response = await AuthenticatedUserUrl.post(`/classes/${id}/announcement`, announcementData);
            if (response.status === 201) {
                toast.success('Announcement created successfully!');
                setShowAnnouncementModal(false);
            } else {
                toast.error('Failed to create announcement. Please try again.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error creating announcement. Please try again.');
        } finally {
            setLoadingStates(prev => ({ ...prev, announcement: false }));
        }
    };

    // --- Resource Modal Logic ---
    const handleCreateResource = async (e) => {
        e.preventDefault();
        setLoadingStates(prev => ({ ...prev, resource: true }));
        const formData = new FormData();
        formData.append('title', resourceData.title);
        if (resourceData.file) formData.append('file', resourceData.file);
        try {
            const response = await AuthenticatedUserUrl.post(`/classes/${id}/resource`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 201) {
                toast.success('Resource uploaded successfully!');
                setShowResourcesModal(false);
            } else {
                toast.error('Failed to upload resource. Please try again.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error uploading resource. Please try again.');
        } finally {
            setLoadingStates(prev => ({ ...prev, resource: false }));
        }
    };

    // --- Other handlers ---
    const handleDiscussionClick = (discussion) => {
        setSelectedDiscussion(discussion);
        setShowJoinModal(true);
    };
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
    const handleViewParticipants = async () => {
        setLoadingParticipants(true);
        setShowJoinModal(false);
        setShowParticipantsModal(true);
        try {
            const res = await AuthenticatedUserUrl(`/classes/discussion/summary/${selectedDiscussion.id}`);
            setParticipantsData(res.data);
        } catch (error) {
            console.log(error);
            setParticipantsData({ attended: [], not_attended: [] });
            toast.error('Failed to load participants');
        }
        setLoadingParticipants(false);
    };
    const handleCloseParticipants = () => {
        setShowParticipantsModal(false);
        setParticipantsData(null);
        setSelectedDiscussion(null);
    };

    if (!classData) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>;
    }

    return (
        <>
            <div className={`my-5 transition-all duration-200 ${showParticipantsModal ? 'blur-sm pointer-events-none select-none' : ''}`}>
                <ClassWallpaper name={classData.name} />
                <div className="flex flex-col md:grid md:grid-cols-[15%_75%] md:gap-10">
                    <div className="flex flex-row md:flex-col gap-2 mt-5 mr-[5%] md:mr-0">
                        <ClassCode code={classData.class_code} />
                        <RegisteredStudents total={enrolled} />
                        {/* <PostedResources /> */}
                    </div>
                    <div>
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
                        <div className="bg-white rounded-b-md shadow p-4 min-h-[200px]">
                            {activeTab === 'resources' ? (
                                <ClassroomFeed announcements={announcements} />
                            ) : (
                                <DiscussionFeed discussions={discussions} handleDiscussionClick={handleDiscussionClick}/>
                            )}
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-24 right-5 flex flex-col items-end space-y-3">
                    {open && (
                        <>
                            {/* Assignment Modal Button */}
                            <div className={`transition-opacity transition-transform duration-500 ease-in-out transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                                <div className="group relative">
                                    <button
                                        onClick={() => setShowAssignmentModal(true)}
                                        className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                        disabled={loadingStates.assignment}
                                    >
                                        {loadingStates.assignment ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600"></div>
                                        ) : (
                                            <MdLibraryBooks className="text-sky-600" size={20} />
                                        )}
                                    </button>
                                    <span className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Create Assignment
                                    </span>
                                </div>
                            </div>
                            {/* Announcement Modal Button */}
                            <div className={`transition-opacity transition-transform duration-500 ease-in-out transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                                <div className="group relative">
                                    <button
                                        onClick={() => setShowAnnouncementModal(true)}
                                        className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                        disabled={loadingStates.announcement}
                                    >
                                        {loadingStates.announcement ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600"></div>
                                        ) : (
                                            <FaBullhorn className="text-sky-600" size={20} />
                                        )}
                                    </button>
                                    <span className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Create Announcement
                                    </span>
                                </div>
                            </div>
                            {/* Resource Modal Button */}
                            <div className={`transition-opacity transition-transform duration-500 ease-in-out transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                                <div className="group relative">
                                    <button
                                        onClick={() => setShowResourcesModal(true)}
                                        className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                        disabled={loadingStates.resource}
                                    >
                                        {loadingStates.resource ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600"></div>
                                        ) : (
                                            <BiBookOpen className="text-sky-600" size={20} />
                                        )}
                                    </button>
                                    <span className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Upload Resources
                                    </span>
                                </div>
                            </div>
                            {/* Discussion Modal Button */}
                            <div className={`transition-opacity transition-transform duration-500 ease-in-out transform ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                                <div className="group relative">
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center"
                                        disabled={loadingStates.discussion}
                                    >
                                        {loadingStates.discussion ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600"></div>
                                        ) : (
                                            <BiGroup className="text-sky-600" size={20} />
                                        )}
                                    </button>
                                    <span className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Add Discussion
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                    <button
                        onClick={() => setOpen(!open)}
                        className="w-16 h-16 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg flex items-center justify-center transition duration-300 text-3xl"
                        title="Open/Close Actions"
                    >
                        {open ? '×' : '+'}
                    </button>
                </div>

                {showAddModal && (
                    <ModalWrapper onClose={() => setShowAddModal(false)}>
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
                                    disabled={loadingStates.discussion}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-sky-600 text-white rounded-md flex items-center justify-center min-w-20"
                                    disabled={loadingStates.discussion}
                                >
                                    {loadingStates.discussion ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        'Create'
                                    )}
                                </button>
                            </div>
                        </form>
                    </ModalWrapper>
                )}

                {/* Assignment Modal */}
                {showAssignmentModal && (
                    <ModalWrapper onClose={() => setShowAssignmentModal(false)}>
                        <h2 className="text-2xl mb-4">Create Assignment</h2>
                        <form onSubmit={handleCreateAssignment}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={assignmentData.title}
                                    onChange={e => setAssignmentData({ ...assignmentData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={assignmentData.description}
                                    onChange={e => setAssignmentData({ ...assignmentData, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                <input
                                    type="datetime-local"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={assignmentData.due_date}
                                    onChange={e => setAssignmentData({ ...assignmentData, due_date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">File</label>
                                <input
                                    type="file"
                                    className="w-full"
                                    onChange={e => setAssignmentData({ ...assignmentData, file: e.target.files[0] })}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAssignmentModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md"
                                    disabled={loadingStates.assignment}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-sky-600 text-white rounded-md flex items-center justify-center min-w-20"
                                    disabled={loadingStates.assignment}
                                >
                                    {loadingStates.assignment ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        'Create'
                                    )}
                                </button>
                            </div>
                        </form>
                    </ModalWrapper>
                )}

                {/* Announcement Modal */}
                {showAnnouncementModal && (
                    <ModalWrapper onClose={() => setShowAnnouncementModal(false)}>
                        <h2 className="text-2xl mb-4">Create Announcement</h2>
                        <form onSubmit={handleCreateAnnouncement}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={announcementData.title}
                                    onChange={e => setAnnouncementData({ ...announcementData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={announcementData.content}
                                    onChange={e => setAnnouncementData({ ...announcementData, content: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAnnouncementModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md"
                                    disabled={loadingStates.announcement}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-sky-600 text-white rounded-md flex items-center justify-center min-w-20"
                                    disabled={loadingStates.announcement}
                                >
                                    {loadingStates.announcement ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        'Create'
                                    )}
                                </button>
                            </div>
                        </form>
                    </ModalWrapper>
                )}

                {/* Resource Modal */}
                {showResourcesModal && (
                    <ModalWrapper onClose={() => setShowResourcesModal(false)}>
                        <h2 className="text-2xl mb-4">Upload Resource</h2>
                        <form onSubmit={handleCreateResource}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={resourceData.title}
                                    onChange={e => setResourceData({ ...resourceData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">File</label>
                                <input
                                    type="file"
                                    className="w-full"
                                    onChange={e => setResourceData({ ...resourceData, file: e.target.files[0] })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowResourcesModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md"
                                    disabled={loadingStates.resource}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-sky-600 text-white rounded-md flex items-center justify-center min-w-20"
                                    disabled={loadingStates.resource}
                                >
                                    {loadingStates.resource ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Uploading...
                                        </>
                                    ) : (
                                        'Upload'
                                    )}
                                </button>
                            </div>
                        </form>
                    </ModalWrapper>
                )}

                {/* Join/Participants Modal */}
                {showJoinModal && selectedDiscussion && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">{selectedDiscussion.meeting_name}</h2>
                            <div className="flex flex-col gap-3">
                                {(() => {
                                    const now = new Date();
                                    const start = new Date(selectedDiscussion.start_time);
                                    const fiveMinutesBefore = new Date(start.getTime() - 5 * 60 * 1000);
                                    const oneDayAfter = new Date(start.getTime() + 24 * 60 * 60 * 1000);
                                    const canJoin = now >= fiveMinutesBefore && now <= oneDayAfter;
                                    return (
                                        <>
                                            <button
                                                onClick={handleJoinMeeting}
                                                className={`px-4 py-2 rounded-md font-semibold ${
                                                    canJoin
                                                        ? "bg-sky-600 text-white"
                                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                }`}
                                                disabled={!canJoin}
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
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Participants Modal */}
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
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
                            </div>
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

            <Toaster position="top-right" />
        </>
    );
}

// Modal wrapper for consistent modal style
function ModalWrapper({ children, onClose }) {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                    aria-label="Close"
                >
                    &times;
                </button>
                {children}
            </div>
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
