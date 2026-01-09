"use client";

import { useEffect, useState } from "react";
import { useAgora } from "@/hooks/useAgora";
import VideoTile from "./video-tile";
import { MeetingControls } from "./meeting-controls";
import { NotesPanel } from "./notes-panel";
import { ChatPanel } from "./chat-panel";
import { ProfilePanel } from "./profile-panel";
import { ParticipantsPanel } from "./participants-panel";
import { SettingsDialog } from "./settings-dialog";
import { CreateLinkDialog } from "./create-link-dialog";
import { toast } from "sonner";
import { WhiteboardPanel } from "./whiteboard-panel";


type ActivePanel =
  | "chat"
  | "notes"
  | "profile"
  | "participants"
  | "settings"
  | "createLink"
  | "whiteboard"
  | null;

const PANEL_WIDTH = 320;
const HEADER_HEIGHT = 72;
const CONTROLS_HEIGHT = 80;

interface MeetingRoomProps {
  meetingCode: string;
  userId: string; // ✅ REQUIRED
}

export function MeetingRoom({ meetingCode, userId }: MeetingRoomProps) {
  const {
    join,
    leave,
    localVideoTrack,
    remoteUsers,
    muteMic,
    unmuteMic,
    cameraOff,
    cameraOn,
    startScreenShare,
    stopScreenShare,
    isScreenSharing,
  } = useAgora();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  const participants = [
    { uid: userId, videoTrack: localVideoTrack },
    ...remoteUsers,
  ];

  // ✅ JOIN WITH SAME USER ID (RTC + RTM SAFE)
  useEffect(() => {
    join(meetingCode, userId);

    return () => {
      leave();
    };
  }, [meetingCode, userId]);

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const isPanelOpen = Boolean(activePanel);

  return (
    <div className="h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-white overflow-hidden">
      {/* ================= HEADER ================= */}
      <header
        className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur border-b border-purple-200 px-6"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="h-full flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-purple-900">
              Meeting Room
            </h1>
            <p className="text-sm text-gray-600">
              Code: {meetingCode} • {participants.length} participants
            </p>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <div
        className="relative flex"
        style={{
          paddingTop: HEADER_HEIGHT,
          paddingBottom: CONTROLS_HEIGHT,
          height: "100vh",
        }}
      >
        {/* ===== VIDEO GRID ===== */}
        <div
          className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-auto transition-all duration-300"
          style={{
            marginRight: isPanelOpen ? PANEL_WIDTH : 0,
          }}
        >
          {localVideoTrack && <VideoTile track={localVideoTrack} />}
          {remoteUsers.map((u) => (
            <VideoTile key={u.uid} track={u.videoTrack} />
          ))}
        </div>

        {/* ===== SIDE PANEL ===== */}
        <aside
          className={`
            fixed right-0 z-40 bg-white border-l border-purple-200
            transition-transform duration-300 ease-in-out
            ${isPanelOpen ? "translate-x-0" : "translate-x-full"}
          `}
          style={{
            width: PANEL_WIDTH,
            top: HEADER_HEIGHT,
            bottom: CONTROLS_HEIGHT,
          }}
        >
          {activePanel === "chat" && (
            <ChatPanel
              meetingCode={meetingCode}
              userId={userId} // ✅ SAME ID
              onClose={() => setActivePanel(null)}
            />
          )}

          {activePanel === "notes" && (
            <NotesPanel onClose={() => setActivePanel(null)} />
          )}

          {activePanel === "profile" && (
            <ProfilePanel onClose={() => setActivePanel(null)} />
          )}

          {activePanel === "participants" && (
            <ParticipantsPanel
              participants={participants}
              onClose={() => setActivePanel(null)}
            />
          )}

          {activePanel === "whiteboard" && (
            <WhiteboardPanel onClose={() => setActivePanel(null)} />
          )}
        </aside>
      </div>

      {/* ================= CONTROLS ================= */}
      <div
        className="fixed bottom-0 left-0 z-50 bg-white border-t border-purple-200 transition-all duration-300"
        style={{
          height: CONTROLS_HEIGHT,
          width: isPanelOpen
            ? `calc(100% - ${PANEL_WIDTH}px)`
            : "100%",
        }}
      >
        <MeetingControls
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          isRecording={isRecording}
          onToggleMute={() => {
            isMuted ? unmuteMic() : muteMic();
            setIsMuted(!isMuted);
            toast.info(isMuted ? "Mic unmuted" : "Mic muted");
          }}
          onToggleVideo={() => {
            isVideoOff ? cameraOn() : cameraOff();
            setIsVideoOff(!isVideoOff);
            toast.info(isVideoOff ? "Camera on" : "Camera off");
          }}
          onScreenShare={() => {
            isScreenSharing ? stopScreenShare() : startScreenShare();
          }}
          onToggleRecording={() => {
            setIsRecording(!isRecording);
            toast.info("Recording requires backend support");
          }}
          onToggleChat={() => togglePanel("chat")}
          onToggleNotes={() => togglePanel("notes")}
          onOpenProfile={() => togglePanel("profile")}
          onOpenParticipants={() => togglePanel("participants")}
          onOpenSettings={() => togglePanel("settings")}
          onOpenCreateLink={() => togglePanel("createLink")}
          onToggleWhiteboard={() => togglePanel("whiteboard")}
          onEndCall={leave}
        />
      </div>

      {/* ================= MODALS ================= */}
      <SettingsDialog
        open={activePanel === "settings"}
        onClose={() => setActivePanel(null)}
      />
      <CreateLinkDialog
        open={activePanel === "createLink"}
        onClose={() => setActivePanel(null)}
      />
    </div>
  );
}
