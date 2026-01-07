"use client";

import { useState } from "react";
import { MeetingControls } from "./meeting-controls";
import { ScreenShareDialog } from "./screen-share-dialog";
import { PermissionDialog } from "./permission-dialog";
import { ChatPanel } from "./chat-panel";
import { NotesPanel } from "./notes-panel";
import { VideoGrid } from "./video-grid";
import { SettingsDialog } from "./settings-dialog";
import { ProfilePanel } from "./profile-panel";
import { ParticipantsPanel } from "./participants-panel";
import { CreateLinkDialog } from "./create-link-dialog";
import { toast } from "sonner";

interface MeetingRoomProps {
  meetingCode: string;
  currentUserName: string;
  isHost: boolean;
  onLeaveMeeting: () => void;
}

// Generate participants
const generateParticipants = (userName: string, isHost: boolean) => {
  const colors = ['#8B5CF6', '#0EA5E9', '#EC4899', '#F59E0B', '#10B981', '#EF4444', '#6366F1', '#14B8A6'];
  const firstNames = ['John', 'Sarah', 'Mike', 'Emily', 'David', 'Lisa', 'James', 'Emma', 'Robert', 'Anna'];
  const lastNames = ['Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez'];

  const participants = [
    {
      id: '1',
      name: userName,
      email: 'you@example.com',
      isMuted: false,
      isVideoOff: false,
      avatarColor: colors[0],
      isHost: isHost,
      handRaised: false,
    }
  ];

  // Generate more participants
  for (let i = 2; i <= 60; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    participants.push({
      id: i.toString(),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      isMuted: Math.random() > 0.5,
      isVideoOff: Math.random() > 0.7,
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
      isHost: false,
      handRaised: Math.random() > 0.9,
    });
  }

  return participants;
};

export function MeetingRoom({ meetingCode, currentUserName, isHost, onLeaveMeeting }: MeetingRoomProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showScreenShareDialog, setShowScreenShareDialog] = useState(false);
  const [showCreateLinkDialog, setShowCreateLinkDialog] = useState(false);
  const [permissionDialog, setPermissionDialog] = useState<{
    open: boolean;
    type: 'microphone' | 'camera' | 'recording' | 'screen' | null;
    onAllow: () => void;
  }>({
    open: false,
    type: null,
    onAllow: () => {},
  });

  const [participants, setParticipants] = useState(generateParticipants(currentUserName, isHost));
  const currentUserId = '1';

  const handleToggleMute = () => {
    if (isMuted) {
      setPermissionDialog({
        open: true,
        type: 'microphone',
        onAllow: () => {
          setIsMuted(false);
          updateCurrentUserParticipant({ isMuted: false });
          toast.success('Microphone enabled');
          setPermissionDialog({ open: false, type: null, onAllow: () => {} });
        },
      });
    } else {
      setIsMuted(true);
      updateCurrentUserParticipant({ isMuted: true });
      toast.info('Microphone muted');
    }
  };

  const handleToggleVideo = () => {
    if (isVideoOff) {
      setPermissionDialog({
        open: true,
        type: 'camera',
        onAllow: () => {
          setIsVideoOff(false);
          updateCurrentUserParticipant({ isVideoOff: false });
          toast.success('Camera enabled');
          setPermissionDialog({ open: false, type: null, onAllow: () => {} });
        },
      });
    } else {
      setIsVideoOff(true);
      updateCurrentUserParticipant({ isVideoOff: true });
      toast.info('Camera turned off');
    }
  };

  const handleScreenShare = () => {
    setShowScreenShareDialog(true);
  };

  const handleScreenShareOption = (option: 'screen' | 'window' | 'tab') => {
    const optionNames = {
      screen: 'entire screen',
      window: 'window',
      tab: 'Chrome tab',
    };

    setPermissionDialog({
      open: true,
      type: 'screen',
      onAllow: () => {
        toast.success(`Sharing ${optionNames[option]}`);
        setPermissionDialog({ open: false, type: null, onAllow: () => {} });
      },
    });
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setPermissionDialog({
        open: true,
        type: 'recording',
        onAllow: () => {
          setIsRecording(true);
          toast.success('Recording started - All participants have been notified');
          setPermissionDialog({ open: false, type: null, onAllow: () => {} });
        },
      });
    } else {
      setIsRecording(false);
      toast.info('Recording stopped and saved');
    }
  };

  const handleToggleChat = () => {
    if (!showChat) {
      setShowNotes(false);
      setShowProfile(false);
      setShowParticipants(false);
    }
    setShowChat(!showChat);
  };

  const handleToggleNotes = () => {
    if (!showNotes) {
      setShowChat(false);
      setShowProfile(false);
      setShowParticipants(false);
    }
    setShowNotes(!showNotes);
  };

  const handleOpenProfile = () => {
    setShowChat(false);
    setShowNotes(false);
    setShowParticipants(false);
    setShowProfile(!showProfile);
  };

  const handleOpenParticipants = () => {
    setShowChat(false);
    setShowNotes(false);
    setShowProfile(false);
    setShowParticipants(!showParticipants);
  };

  const handleEndCall = () => {
    toast.info('Leaving meeting...');
    setTimeout(() => {
      onLeaveMeeting();
    }, 1000);
  };

  const updateCurrentUserParticipant = (updates: Partial<typeof participants[0]>) => {
    setParticipants(participants.map(p => 
      p.id === currentUserId ? { ...p, ...updates } : p
    ));
  };

  const handleMuteParticipant = (participantId: string) => {
    setParticipants(participants.map(p =>
      p.id === participantId ? { ...p, isMuted: true } : p
    ));
    const participant = participants.find(p => p.id === participantId);
    toast.success(`${participant?.name} has been muted`);
  };

  const handleRemoveParticipant = (participantId: string) => {
    const participant = participants.find(p => p.id === participantId);
    setParticipants(participants.filter(p => p.id !== participantId));
    toast.info(`${participant?.name} has been removed from the meeting`);
  };

  const handleMakeHost = (participantId: string) => {
    setParticipants(participants.map(p => ({
      ...p,
      isHost: p.id === participantId,
    })));
    const participant = participants.find(p => p.id === participantId);
    toast.success(`${participant?.name} is now the host`);
  };

  const currentUserIsHost = participants.find(p => p.id === currentUserId)?.isHost || false;

  return (
    <div className="size-full bg-gradient-to-br from-sky-100 via-purple-50 to-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b-2 border-purple-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="font-semibold text-xl text-purple-900">Meeting Room</h1>
              <p className="text-sm text-gray-600">
                Code: {meetingCode} • {participants.length} participants
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentUserIsHost && (
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 border border-purple-300 text-white">
                <span className="text-sm font-medium">Host</span>
              </div>
            )}
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-sky-100 to-purple-100 border border-purple-200">
              <span className="text-sm font-medium text-purple-900">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 overflow-y-auto">
          <VideoGrid participants={participants} currentUserId={currentUserId} />
        </div>

        {showChat && <ChatPanel onClose={() => setShowChat(false)} />}
        {showNotes && <NotesPanel onClose={() => setShowNotes(false)} />}
        {showProfile && (
          <ProfilePanel
            onClose={() => setShowProfile(false)}
            isHost={currentUserIsHost}
          />
        )}
        {showParticipants && (
          <ParticipantsPanel
            onClose={() => setShowParticipants(false)}
            participants={participants}
            currentUserId={currentUserId}
            isCurrentUserHost={currentUserIsHost}
            onMuteParticipant={handleMuteParticipant}
            onRemoveParticipant={handleRemoveParticipant}
            onMakeHost={handleMakeHost}
          />
        )}
      </div>

      {/* Meeting Controls */}
      <MeetingControls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isRecording={isRecording}
        onToggleMute={handleToggleMute}
        onToggleVideo={handleToggleVideo}
        onScreenShare={handleScreenShare}
        onToggleRecording={handleToggleRecording}
        onToggleChat={handleToggleChat}
        onToggleNotes={handleToggleNotes}
        onEndCall={handleEndCall}
        onOpenSettings={() => setShowSettings(true)}
        onOpenProfile={handleOpenProfile}
        onOpenParticipants={handleOpenParticipants}
        onOpenCreateLink={() => setShowCreateLinkDialog(true)}
      />

      {/* Dialogs */}
      <ScreenShareDialog
        open={showScreenShareDialog}
        onClose={() => setShowScreenShareDialog(false)}
        onSelectOption={handleScreenShareOption}
      />

      <PermissionDialog
        open={permissionDialog.open}
        type={permissionDialog.type}
        onClose={() => setPermissionDialog({ open: false, type: null, onAllow: () => {} })}
        onAllow={permissionDialog.onAllow}
        onDeny={() => {
          toast.error('Permission denied');
          setPermissionDialog({ open: false, type: null, onAllow: () => {} });
        }}
      />

      <SettingsDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <CreateLinkDialog
        open={showCreateLinkDialog}
        onClose={() => setShowCreateLinkDialog(false)}
      />
    </div>
  );
}
