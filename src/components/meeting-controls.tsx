"use client";

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  PhoneOff,
  CircleDot,
} from "lucide-react";

export function MeetingControls({
  isMuted,
  isVideoOff,
  isRecording,
  onToggleMute,
  onToggleVideo,
  onScreenShare,
  onToggleRecording,
  onEndCall,
}: any) {
  return (
    <div className="p-4 flex justify-center gap-4 bg-white border-t">
      <button onClick={onToggleMute}>
        {isMuted ? <MicOff /> : <Mic />}
      </button>

      <button onClick={onToggleVideo}>
        {isVideoOff ? <VideoOff /> : <Video />}
      </button>

      <button onClick={onScreenShare}>
        <ScreenShare />
      </button>

      <button onClick={onToggleRecording}>
        <CircleDot className={isRecording ? "text-red-600" : ""} />
      </button>

      <button onClick={onEndCall} className="text-red-600">
        <PhoneOff />
      </button>
    </div>
  );
}
