import { JitsiMeeting } from "@jitsi/react-sdk";
import { useState, useEffect } from "react";
import { StudentAuthenticatedUserUrl } from "../config/urlFetcher";


export default function JoinStudentMeeting() {

  const [username, setUsername] = useState(null);
  

  useEffect(()=>{
    const getUsername = async () => {
      try {
        const response = await StudentAuthenticatedUserUrl.get("/user");
        // alert(response.data.fullname);
        setUsername(response.data.fullname);
        // alert(username + "2")
      } catch (error) {
        alert("Failed to get username");
      }
    }
      getUsername()
    }, [])

  const roomName = "Ethics"; //custom room name
  const domain = "localhost:8080"; // the host and port
  // const displayName = String(username);

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
      disableJoinLeaveNotifications: true,
      defaultLanguage: 'en',
      channelLastN: 8,
      desktopSharingFrameRate: { min: 5, max: 60 }
    }}
    interfaceConfigOverwrite={{
      SHOW_JITSI_WATERMARK: false,
      SHOW_WATERMARK_FOR_GUESTS: false,
      HIDE_INVITE_MORE_HEADER: true,
      DEFAULT_REMOTE_DISPLAY_NAME: 'Participant',
      DEFAULT_BACKGROUND:"#0c4a6e",
      TOOLBAR_ALWAYS_VISIBLE: true,
      DISPLAY_WELCOME_PAGE_CONTENT: false,
      SHOW_POWERED_BY: false,
      LANG_DETECTION: true,
    }}
    getIFrameRef = { (iframeRef) => { iframeRef.style.height = '585px'; } }
    userInfo={{ displayName: username }}
    onApiReady={(externalApi) => {
      externalApi.addEventListener('readyToClose', () => {
        // Replace '/thankyou' with your route
        window.location.href = '/student/discussions';
      });
    }}
    
/>
    </div>
  );
}