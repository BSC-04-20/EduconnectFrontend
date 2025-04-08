import { JitsiMeeting } from "@jitsi/react-sdk";

export default function JitsiComponent() {
  const roomName = `conference`;
  const domain = "meet.jit.si";

  // 🔥 Random name generator function
  const generateRandomName = () => {
    const adjectives = ["Cool", "Happy", "Neon", "Swift", "Brave", "Gentle", "Funky"];
    const animals = ["Tiger", "Falcon", "Panther", "Koala", "Eagle", "Otter", "Panda"];
    const number = Math.floor(Math.random() * 100);

    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];

    return `${adj}${animal}${number}`;
  };

  const displayName = generateRandomName();

  return (
    <div>
      <JitsiMeeting
        roomName={roomName}
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
          displayName: displayName,
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "700px";
        }}
      />
    </div>
  );
}
