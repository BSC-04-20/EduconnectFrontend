import { useEffect, useRef } from 'react';

const JitsiMeet = () => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    const domain = '2b02-105-234-164-6.ngrok-free.app'; // Change if using another server
    const options = {
      roomName: 'Ethics34',
      width: '100%',
      height: 500,
      parentNode: jitsiContainerRef.current,
      lang: 'en',
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    // // Allowed Participants List
    // const allowedUsers = ["Atikonda Katundu","Katundu"]; // Add names of allowed participants

    // // Function to check and remove unauthorized participants
    // const checkParticipants = () => {
    //   const participants = api.getParticipantsInfo(); // Get all participants
    //   console.log("Current Participants:", participants);

    //   participants.forEach((participant) => {
    //     if (!allowedUsers.includes(participant.displayName)) {
    //       console.warn(`Kicking out: ${participant.displayName}`);
    //       api.executeCommand('kickParticipant', participant.participantId);
    //     }
    //   });
    // };

    // // Listen for when a participant joins
    // api.on('participantJoined', checkParticipants);

    // // Also check every few seconds (in case display names take time to load)
    // const interval = setInterval(checkParticipants, 5000);

    return () => {
      // clearInterval(interval); // Clean up interval
      api.dispose();
    };
  }, []);

  return <div ref={jitsiContainerRef} style={{ height: '585px' }}></div>;
};

export default JitsiMeet;
