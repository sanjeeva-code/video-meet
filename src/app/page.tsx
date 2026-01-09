"use client";

// import MeetingRoomClient from "./meeting-room-client";

// export default function Page() {
//   return <MeetingRoomClient meetingCode="ABC-123" />;
// }


import { useState } from "react";
import { LandingPage } from "../components/landing-page";
import { AuthPage } from "../components/auth-page";
import { Dashboard } from "../components/dashboard";
import { PreJoinScreen } from "../components/pre-join-screen";
import  MeetingRoomClient  from "./meeting-room-client";
import { ScheduleMeetingDialog } from "../components/schedule-meeting-dialog";
import { ProfileDialog } from "../components/profile-dialog";
import { Toaster } from "sonner";

type AppScreen = 'landing' | 'auth' | 'dashboard' | 'pre-join' | 'meeting';

interface UserData {
  name: string;
  email: string;
  phone?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [meetingCode, setMeetingCode] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [scheduledMeetings, setScheduledMeetings] = useState<any[]>([]);

  // Navigation handlers
  const handleGetStarted = () => {
    setCurrentScreen('auth');
  };

  const handleLogin = (email: string, name: string) => {
    setUserData({
      name,
      email,
      phone: '+1 (555) 123-4567',
    });
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentScreen('landing');
  };

  const handleBackToHome = () => {
    setCurrentScreen('landing');
  };

  // Meeting handlers
  const handleCreateMeeting = () => {
    // Generate instant meeting code
    const code = Math.random().toString(36).substring(2, 5) + '-' +
                 Math.random().toString(36).substring(2, 6) + '-' +
                 Math.random().toString(36).substring(2, 5);
    setMeetingCode(code);
    setIsHost(true);
    setCurrentScreen('pre-join');
  };

  const handleJoinMeeting = (code: string) => {
    setMeetingCode(code);
    setIsHost(false);
    setCurrentScreen('pre-join');
  };

  const handleScheduleMeeting = () => {
    setShowScheduleDialog(true);
  };

  const handleScheduleMeetingComplete = (meeting: any) => {
    setScheduledMeetings([...scheduledMeetings, meeting]);
    setShowScheduleDialog(false);
  };

  const handleOpenProfile = () => {
    setShowProfileDialog(true);
  };

  const handleUpdateProfile = (name: string, email: string, phone: string) => {
    setUserData({
      name,
      email,
      phone,
    });
  };

  // Pre-join handlers
  const handleJoinFromPreJoin = (userName: string, audioEnabled: boolean, videoEnabled: boolean) => {
    if (userData) {
      setUserData({ ...userData, name: userName });
    }
    setCurrentScreen('meeting');
  };

  const handleCancelPreJoin = () => {
    setCurrentScreen('dashboard');
    setMeetingCode("");
  };

  // Meeting room handlers
  const handleLeaveMeeting = () => {
    setCurrentScreen('dashboard');
    setMeetingCode("");
    setIsHost(false);
  };

  return (
    <div className="size-full">
      <Toaster position="top-center" richColors />

      {/* Landing Page */}
      {currentScreen === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {/* Authentication */}
      {currentScreen === 'auth' && (
        <AuthPage onLogin={handleLogin} onBack={handleBackToHome} />
      )}

      {/* Dashboard */}
      {currentScreen === 'dashboard' && userData && (
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

      {/* Pre-Join Screen */}
      {currentScreen === 'pre-join' && userData && (
        <PreJoinScreen
          meetingCode={meetingCode}
          onJoinMeeting={handleJoinFromPreJoin}
          onCancel={handleCancelPreJoin}
          defaultUserName={userData.name}
        />
      )}

      {/* Meeting Room */}
      {currentScreen === 'meeting' && userData && (
        <MeetingRoomClient
          meetingCode={meetingCode}
          currentUserName={userData.name}
          isHost={isHost}
          onLeaveMeeting={handleLeaveMeeting}
        />
      )}
    </div>
  );
}
