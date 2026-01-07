// "use client"; 

// import { useState } from "react";
// import { LandingPage } from "../components/landing-page";
// import { AuthPage } from "../components/auth-page";
// import { Dashboard } from "../components/dashboard";
// import { PreJoinScreen } from "../components/pre-join-screen";
// import { MeetingRoom } from "../components/meeting-room";
// import { ScheduleMeetingDialog } from "../components/schedule-meeting-dialog";
// import { ProfileDialog } from "../components/profile-dialog";
// import { Toaster } from "sonner";

// type AppScreen = 'landing' | 'auth' | 'dashboard' | 'pre-join' | 'meeting';

// interface UserData {
//   name: string;
//   email: string;
//   phone?: string;
// }

// export default function App() {
//   const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [meetingCode, setMeetingCode] = useState("");
//   const [isHost, setIsHost] = useState(false);
//   const [showScheduleDialog, setShowScheduleDialog] = useState(false);
//   const [showProfileDialog, setShowProfileDialog] = useState(false);
//   const [scheduledMeetings, setScheduledMeetings] = useState<any[]>([]);

//   // Navigation handlers
//   const handleGetStarted = () => {
//     setCurrentScreen('auth');
//   };

//   const handleLogin = (email: string, name: string) => {
//     setUserData({
//       name,
//       email,
//       phone: '+1 (555) 123-4567',
//     });
//     setCurrentScreen('dashboard');
//   };

//   const handleLogout = () => {
//     setUserData(null);
//     setCurrentScreen('landing');
//   };

//   const handleBackToHome = () => {
//     setCurrentScreen('landing');
//   };

//   // Meeting handlers
//   const handleCreateMeeting = () => {
//     // Generate instant meeting code
//     const code = Math.random().toString(36).substring(2, 5) + '-' +
//                  Math.random().toString(36).substring(2, 6) + '-' +
//                  Math.random().toString(36).substring(2, 5);
//     setMeetingCode(code);
//     setIsHost(true);
//     setCurrentScreen('pre-join');
//   };

//   const handleJoinMeeting = (code: string) => {
//     setMeetingCode(code);
//     setIsHost(false);
//     setCurrentScreen('pre-join');
//   };

//   const handleScheduleMeeting = () => {
//     setShowScheduleDialog(true);
//   };

//   const handleScheduleMeetingComplete = (meeting: any) => {
//     setScheduledMeetings([...scheduledMeetings, meeting]);
//     setShowScheduleDialog(false);
//   };

//   const handleOpenProfile = () => {
//     setShowProfileDialog(true);
//   };

//   const handleUpdateProfile = (name: string, email: string, phone: string) => {
//     setUserData({
//       name,
//       email,
//       phone,
//     });
//   };

//   // Pre-join handlers
//   const handleJoinFromPreJoin = (userName: string, audioEnabled: boolean, videoEnabled: boolean) => {
//     if (userData) {
//       setUserData({ ...userData, name: userName });
//     }
//     setCurrentScreen('meeting');
//   };

//   const handleCancelPreJoin = () => {
//     setCurrentScreen('dashboard');
//     setMeetingCode("");
//   };

//   // Meeting room handlers
//   const handleLeaveMeeting = () => {
//     setCurrentScreen('dashboard');
//     setMeetingCode("");
//     setIsHost(false);
//   };

//   return (
//     <div className="size-full">
//       <Toaster position="top-center" richColors />

//       {/* Landing Page */}
//       {currentScreen === 'landing' && (
//         <LandingPage onGetStarted={handleGetStarted} />
//       )}

//       {/* Authentication */}
//       {currentScreen === 'auth' && (
//         <AuthPage onLogin={handleLogin} onBack={handleBackToHome} />
//       )}

//       {/* Dashboard */}
//       {currentScreen === 'dashboard' && userData && (
//         <>
//           <Dashboard
//             userName={userData.name}
//             userEmail={userData.email}
//             onCreateMeeting={handleCreateMeeting}
//             onJoinMeeting={handleJoinMeeting}
//             onScheduleMeeting={handleScheduleMeeting}
//             onOpenProfile={handleOpenProfile}
//             onLogout={handleLogout}
//           />
          
//           <ScheduleMeetingDialog
//             open={showScheduleDialog}
//             onClose={() => setShowScheduleDialog(false)}
//             onSchedule={handleScheduleMeetingComplete}
//           />

//           <ProfileDialog
//             open={showProfileDialog}
//             onClose={() => setShowProfileDialog(false)}
//             userName={userData.name}
//             userEmail={userData.email}
//             onUpdateProfile={handleUpdateProfile}
//           />
//         </>
//       )}

//       {/* Pre-Join Screen */}
//       {currentScreen === 'pre-join' && userData && (
//         <PreJoinScreen
//           meetingCode={meetingCode}
//           onJoinMeeting={handleJoinFromPreJoin}
//           onCancel={handleCancelPreJoin}
//           defaultUserName={userData.name}
//         />
//       )}

//       {/* Meeting Room */}
//       {currentScreen === 'meeting' && userData && (
//         <MeetingRoom
//           meetingCode={meetingCode}
//           currentUserName={userData.name}
//           isHost={isHost}
//           onLeaveMeeting={handleLeaveMeeting}
//         />
//       )}
//     </div>
//   );
// }


// "use client";

// import { useAgora } from "@/hooks/useAgora";
// import VideoTile from "@/components/VideoTile";
// import { useState } from "react";

// export default function MeetingPage() {
//   const {
//     join,
//     leave,
//     muteMic,
//     unmuteMic,
//     cameraOn,
//     cameraOff,
//     localVideoTrack,
//     remoteUsers
//   } = useAgora();

//   const [joined, setJoined] = useState(false);

//   const channel = "testRoom";
//   const uid = Math.floor(Math.random() * 100000);

//   return (
//     <div className="h-screen flex flex-col bg-gray-100">
//       {/* Video Area */}
//       <div className="flex-1 grid grid-cols-2 gap-4 p-4">
//         {/* Local */}
//         {localVideoTrack && <VideoTile track={localVideoTrack} />}

//         {/* Remote */}
//         {remoteUsers.map(user => (
//           <VideoTile key={user.uid} track={user.videoTrack} />
//         ))}
//       </div>

//       {/* Controls */}
//       <div className="p-4 bg-white border-t flex justify-center gap-4">
//         {!joined ? (
//           <button
//             onClick={async () => {
//               await join(channel, uid);
//               setJoined(true);
//             }}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg"
//           >
//             Join
//           </button>
//         ) : (
//           <>
//             <button
//               onClick={muteMic}
//               className="px-4 py-2 bg-gray-200 rounded-lg"
//             >
//               Mute
//             </button>

//             <button
//               onClick={unmuteMic}
//               className="px-4 py-2 bg-gray-200 rounded-lg"
//             >
//               Unmute
//             </button>

//             <button
//               onClick={cameraOff}
//               className="px-4 py-2 bg-gray-200 rounded-lg"
//             >
//               Cam Off
//             </button>

//             <button
//               onClick={cameraOn}
//               className="px-4 py-2 bg-gray-200 rounded-lg"
//             >
//               Cam On
//             </button>

//             <button
//               onClick={async () => {
//                 await leave();
//                 setJoined(false);
//               }}
//               className="px-6 py-2 bg-red-600 text-white rounded-lg"
//             >
//               Leave
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { LandingPage } from "@/components/landing-page";
import { AuthPage } from "@/components/auth-page";
import { Dashboard } from "@/components/dashboard";
import { PreJoinScreen } from "@/components/pre-join-screen";
import { MeetingRoom } from "@/components/meeting-room";
import { ScheduleMeetingDialog } from "@/components/schedule-meeting-dialog";
import { ProfileDialog } from "@/components/profile-dialog";
import { Toaster } from "sonner";

type AppScreen = "landing" | "auth" | "dashboard" | "pre-join" | "meeting";

interface UserData {
  name: string;
  email: string;
  phone?: string;
}

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("landing");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [meetingCode, setMeetingCode] = useState("");
  const [isHost, setIsHost] = useState(false);

  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [scheduledMeetings, setScheduledMeetings] = useState<any[]>([]);

  /* ---------------- Navigation ---------------- */

  const handleGetStarted = () => setCurrentScreen("auth");

  const handleLogin = (email: string, name: string) => {
    setUserData({
      name,
      email,
      phone: "+1 (555) 123-4567",
    });
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentScreen("landing");
  };

  /* ---------------- Meeting ---------------- */

  const handleCreateMeeting = () => {
    const code =
      Math.random().toString(36).substring(2, 5) +
      "-" +
      Math.random().toString(36).substring(2, 6) +
      "-" +
      Math.random().toString(36).substring(2, 5);

    setMeetingCode(code);
    setIsHost(true);
    setCurrentScreen("pre-join");
  };

  const handleJoinMeeting = (code: string) => {
    setMeetingCode(code);
    setIsHost(false);
    setCurrentScreen("pre-join");
  };

  const handleJoinFromPreJoin = (
    userName: string,
    _audio: boolean,
    _video: boolean
  ) => {
    if (userData) {
      setUserData({ ...userData, name: userName });
    }
    setCurrentScreen("meeting");
  };

  const handleLeaveMeeting = () => {
    setMeetingCode("");
    setIsHost(false);
    setCurrentScreen("dashboard");
  };

  /* ---------------- Schedule / Profile ---------------- */

  const handleScheduleMeeting = () => setShowScheduleDialog(true);

  const handleScheduleMeetingComplete = (meeting: any) => {
    setScheduledMeetings([...scheduledMeetings, meeting]);
    setShowScheduleDialog(false);
  };

  const handleOpenProfile = () => setShowProfileDialog(true);

  const handleUpdateProfile = (name: string, email: string, phone: string) => {
    setUserData({ name, email, phone });
  };

  /* ---------------- Render ---------------- */

  return (
    <div className="size-full">
      <Toaster position="top-center" richColors />

      {currentScreen === "landing" && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {currentScreen === "auth" && (
        <AuthPage onLogin={handleLogin} onBack={() => setCurrentScreen("landing")} />
      )}

      {currentScreen === "dashboard" && userData && (
        <>
          <Dashboard
            userName={userData.name}
            userEmail={userData.email}
            onCreateMeeting={handleCreateMeeting}
            onJoinMeeting={handleJoinMeeting}
            onScheduleMeeting={handleScheduleMeeting}
            onOpenProfile={handleOpenProfile}
            onLogout={handleLogout}
          />

          <ScheduleMeetingDialog
            open={showScheduleDialog}
            onClose={() => setShowScheduleDialog(false)}
            onSchedule={handleScheduleMeetingComplete}
          />

          <ProfileDialog
            open={showProfileDialog}
            onClose={() => setShowProfileDialog(false)}
            userName={userData.name}
            userEmail={userData.email}
            onUpdateProfile={handleUpdateProfile}
          />
        </>
      )}

      {currentScreen === "pre-join" && userData && (
        <PreJoinScreen
          meetingCode={meetingCode}
          defaultUserName={userData.name}
          onJoinMeeting={handleJoinFromPreJoin}
          onCancel={() => setCurrentScreen("dashboard")}
        />
      )}

      {currentScreen === "meeting" && userData && (
        <MeetingRoom
          meetingCode={meetingCode}
          currentUserName={userData.name}
          isHost={isHost}
          onLeaveMeeting={handleLeaveMeeting}
        />
      )}
    </div>
  );
}
