import { JitsiMeeting } from "@jitsi/react-sdk";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Correct import
import { StudentAuthenticatedUserUrl } from "../config/urlFetcher";


export default function JoinStudentMeeting() {
  const location = useLocation();
  const { meeting_name } = location.state || {};
  const { id } = location.state || {};
  const [username, setUsername] = useState(null);
  

  useEffect(()=>{
    const getUsername = async () => {
      try {
        const response = await StudentAuthenticatedUserUrl.get("/user");
        setUsername(response.data.fullname);
      } catch (error) {
        alert("Failed to get username");
        console.log(error);
      }
    }
      getUsername()
    }, [])

  const roomName = meeting_name; //custom room name
  const domain = "srv820256.hstgr.cloud"; // the host and port
  // const displayName = String(username);
  // const roomID = id; // the room ID, if you have one

  if(!username){
    return(
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  return(
    <div >
      <JitsiMeeting
    domain = {domain}
    roomName = {roomName}
    // displayName = "Display name"
    displayName = {username}
    configOverwrite = {{
      disableProfile: true,
      enableWelcomePage: false,
      startWithAudioMuted: true,
      startWithVideoMuted: true,
      enableClosePage: true,
      enableNoisyMicDetection: true,
      disableAudioLevels: true,
      disableInviteFunctions: true,
      // disableJoinLeaveNotifications: true,
      defaultLanguage: 'en',
      channelLastN: 8,
      desktopSharingFrameRate: { min: 5, max: 60 }
    }}
    interfaceConfigOverwrite={{
      SHOW_JITSI_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
      HIDE_INVITE_MORE_HEADER: true,
      DEFAULT_REMOTE_DISPLAY_NAME: "Participant",
      DEFAULT_BACKGROUND:"#0c4a6e",
      TOOLBAR_ALWAYS_VISIBLE: true,
      DISPLAY_WELCOME_PAGE_CONTENT: false,
      SHOW_POWERED_BY: false,
      LANG_DETECTION: true,
    }}
    getIFrameRef = { (iframeRef) => { iframeRef.style.height = `${window.innerHeight}px`; } }
    userInfo={{ displayName: username }}
    onApiReady={(externalApi) => {
      externalApi.on('videoConferenceJoined', async (participant) => {
        console.log(`Participant joined: ${participant.displayName}`);
        // Post to your endpoint here
        try {
          await StudentAuthenticatedUserUrl.post(`/classes/discussion/${id}/attend`);
          console.log("Posted join event to backend");
        } catch (error) {
          console.error("Failed to post join event:", error);
        }
      });
      externalApi.on('readyToClose', () => {
        window.location.href = '/student/discussions';
      });
    }}
    
/>
    </div>
  );
}