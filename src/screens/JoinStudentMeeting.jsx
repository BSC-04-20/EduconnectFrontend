import { JitsiMeeting } from "@jitsi/react-sdk";


export default function JoinStudentMeeting() {
  const roomName = "Rom";
  const domain = "meet.jit.si";

  return(
    <div >
      <JitsiMeeting
    domain = {domain}
    roomName = {roomName}
    displayName = "Display name"
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
    userInfo={{ displayName: "Tiko", email: "Email" }}
    
/>
    </div>
  );
}