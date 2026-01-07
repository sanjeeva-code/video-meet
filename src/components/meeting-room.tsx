"use client";

import { useEffect, useState } from "react";
import { useAgora } from "@/hooks/useAgora";
import VideoTile from "./video-tile";
import { MeetingControls } from "./meeting-controls";
import { toast } from "sonner";

export function MeetingRoom({ meetingCode }: { meetingCode: string }) {
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

  useEffect(() => {
    join(meetingCode, Math.floor(Math.random() * 100000));
    return () => leave();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        {localVideoTrack && <VideoTile track={localVideoTrack} />}
        {remoteUsers.map((u) => (
          <VideoTile key={u.uid} track={u.videoTrack} />
        ))}
      </div>

      <MeetingControls
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        isRecording={isRecording}
        onToggleMute={() => {
          isMuted ? unmuteMic() : muteMic();
          setIsMuted(!isMuted);
        }}
        onToggleVideo={() => {
          isVideoOff ? cameraOn() : cameraOff();
          setIsVideoOff(!isVideoOff);
        }}
        onScreenShare={() => {
          isScreenSharing ? stopScreenShare() : startScreenShare();
        }}
        onToggleRecording={() => {
          setIsRecording(!isRecording);
          toast.info("Recording requires backend");
        }}
        onEndCall={leave}
      />
    </div>
  );
}
