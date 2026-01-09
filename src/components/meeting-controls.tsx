import { Mic, MicOff, Video, VideoOff, MonitorUp, Circle, MessageSquare, FileText, Phone, Settings, Users, User, Link2, PenTool } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface MeetingControlsProps {
  isMuted: boolean;
  isVideoOff: boolean;
  isRecording: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onScreenShare: () => void;
  onToggleRecording: () => void;
  onToggleChat: () => void;
  onToggleNotes: () => void;
  onToggleWhiteboard: () => void;
  onEndCall: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onOpenParticipants: () => void;
  onOpenCreateLink: () => void;
}

export function MeetingControls({
  isMuted,
  isVideoOff,
  isRecording,
  onToggleMute,
  onToggleVideo,
  onScreenShare,
  onToggleRecording,
  onToggleChat,
  onToggleNotes,
  onToggleWhiteboard,
  onEndCall,
  onOpenSettings,
  onOpenProfile,
  onOpenParticipants,
  onOpenCreateLink,
}: MeetingControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left section - Meeting info */}
        <div className="flex items-center gap-3">
          {isRecording && (
            <div className="flex items-center gap-2 bg-red-500/90 text-white px-3 py-1.5 rounded-full">
              <Circle className="size-3 fill-current animate-pulse" />
              <span className="text-sm font-medium">Recording</span>
            </div>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onOpenCreateLink}
                  size="icon"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <Link2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create meeting link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Center section - Main controls */}
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onToggleMute}
                  size="lg"
                  className={`rounded-full size-14 ${
                    isMuted
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                  }`}
                >
                  {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMuted ? 'Unmute' : 'Mute'}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onToggleVideo}
                  size="lg"
                  className={`rounded-full size-14 ${
                    isVideoOff
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                  }`}
                >
                  {isVideoOff ? <VideoOff className="size-5" /> : <Video className="size-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isVideoOff ? 'Turn on camera' : 'Turn off camera'}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onScreenShare}
                  size="lg"
                  className="rounded-full size-14 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <MonitorUp className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share screen</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onToggleRecording}
                  size="lg"
                  className={`rounded-full size-14 ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                  }`}
                >
                  <Circle className={`size-5 ${isRecording ? 'fill-current' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isRecording ? 'Stop recording' : 'Start recording'}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onToggleChat}
                  size="lg"
                  className="rounded-full size-14 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <MessageSquare className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle chat</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onToggleNotes}
                  size="lg"
                  className="rounded-full size-14 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <FileText className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle notes</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onToggleWhiteboard}
                  size="lg"
                  className="rounded-full size-14 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <PenTool className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Whiteboard</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onEndCall}
                  size="lg"
                  className="rounded-full size-14 bg-red-500 hover:bg-red-600 text-white ml-4"
                >
                  <Phone className="size-5 rotate-[135deg]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>End call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Right section - Additional controls */}
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onOpenParticipants}
                  size="icon"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <Users className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Participants</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onOpenProfile}
                  size="icon"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <User className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onOpenSettings}
                  size="icon"
                  className="rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <Settings className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}