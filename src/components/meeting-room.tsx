"use client";

import { useEffect, useState } from "react";
import { useAgora } from "@/hooks/useAgora";
import VideoTile from "./VideoTile";
import { MeetingControls } from "./meeting-controls";
import { toast } from "sonner";

interface MeetingRoomProps {
  meetingCode: string;
  currentUserName: string;
  isHost: boolean;
  onLeaveMeeting: () => void;
}

export function MeetingRoom({
  meetingCode,
  currentUserName,
  isHost,
  onLeaveMeeting,
}: MeetingRoomProps) {
  const {
    join,
    leave,
    localVideoTrack,
    remoteUsers,
    mute,
    unmute,
    cameraOff,
    cameraOn,
  } = useAgora();

  const [joined, setJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const uid = Math.floor(Math.random() * 100000);

  useEffect(() => {
    join(meetingCode, uid)
      .then(() => {
        setJoined(true);
        toast.success("Joined meeting");
      })
      .catch(() => toast.error("Failed to join"));

    return () => {
      leave();
    };
  }, []);

  const handleToggleMute = () => {
    if (isMuted) {
      unmute();
      toast.success("Microphone enabled");
    } else {
      mute();
      toast.info("Microphone muted");
    }
    setIsMuted(!isMuted);
  };

  const handleToggleVideo = () => {
    if (isVideoOff) {
      cameraOn();
      toast.success("Camera enabled");
    } else {
      cameraOff();
      toast.info("Camera turned off");
    }
    setIsVideoOff(!isVideoOff);
  };

  const handleEndCall = async () => {
    toast.info("Leaving meeting...");
    await leave();
    onLeaveMeeting();
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-sky-100 via-purple-50 to-white">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-purple-200">
        <h1 className="text-xl font-semibold text-purple-900">
          Meeting Room • {meetingCode}
        </h1>
      </div>

      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        {/* Local Video */}
        {localVideoTrack && (
          <VideoTile track={localVideoTrack} />
        )}

        {/* Remote Videos */}
        {remoteUsers.map(user => (
          <VideoTile key={user.uid} track={user.videoTrack} />
        ))}
      </div>

      {/* Controls */}
      <MeetingControls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isRecording={false}
        onToggleMute={handleToggleMute}
        onToggleVideo={handleToggleVideo}
        onScreenShare={() => toast.info("Screen share coming soon")}
        onToggleRecording={() => {}}
        onToggleChat={() => {}}
        onToggleNotes={() => {}}
        onEndCall={handleEndCall}
        onOpenSettings={() => {}}
        onOpenProfile={() => {}}
        onOpenParticipants={() => {}}
        onOpenCreateLink={() => {}}
      />
    </div>
  );
}
