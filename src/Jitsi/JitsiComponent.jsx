import { JitsiMeeting } from "@jitsi/react-sdk";
import { useEffect, useState } from "react";
import { StudentAuthenticatedUserUrl } from "../config/urlFetcher";
import { useLocation, useNavigate } from "react-router-dom";

export default function JitsiComponent() {
  const [username, setUsername] = useState(null);
  const [discussion, setDiscussion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const domain = "meet.jit.si";

  const getUserName = async () => {
    try {
      const response = await StudentAuthenticatedUserUrl.get("/user");
      setUsername(response.data.fullname);
    } catch (error) {
      console.log(error);
      setShowModal(true);
    }
  };

  const getDiscussion = async () => {
    try {
      const response = await StudentAuthenticatedUserUrl.get(`/classes/discussion/${id}`);
      const fetchedDiscussion = response.data.discussion;
      if (!fetchedDiscussion) {
        setShowModal(true);
      } else {
        setDiscussion(fetchedDiscussion);
      }
    } catch (error) {
      console.log(error);
      setShowModal(true);
    }
  };

  useEffect(() => {
    getUserName();
    if (id) {
      getDiscussion();
    } else {
      setShowModal(true);
    }
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    navigate(-1); // Redirect to previous page
  };

  if (showModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">No Classroom Found</h2>
          <p className="text-gray-700 mb-6">
            Sorry, we couldn't find any classroom (discussion) for you to join.
          </p>
          <button
            onClick={handleModalClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!username || !discussion) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <JitsiMeeting
        roomName={discussion.meeting_name}
        domain={domain}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableWelcomeScreen: false,
          prejoinPageEnabled: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: username,
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "700px";
        }}
      />
    </div>
  );
}
