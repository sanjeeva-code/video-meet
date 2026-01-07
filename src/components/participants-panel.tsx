"use client";

import { useState } from "react";
import { X, Search, Mic, MicOff, Video, VideoOff, MoreVertical, UserMinus, Crown, Hand } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
  avatarColor: string;
  email?: string;
  isHost?: boolean;
  handRaised?: boolean;
}

interface ParticipantsPanelProps {
  onClose: () => void;
  participants: Participant[];
  currentUserId: string;
  isCurrentUserHost: boolean;
  onMuteParticipant?: (participantId: string) => void;
  onRemoveParticipant?: (participantId: string) => void;
  onMakeHost?: (participantId: string) => void;
}

export function ParticipantsPanel({
  onClose,
  participants,
  currentUserId,
  isCurrentUserHost,
  onMuteParticipant,
  onRemoveParticipant,
  onMakeHost,
}: ParticipantsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-96 h-full bg-white border-l-2 border-purple-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b-2 border-purple-200 bg-gradient-to-r from-sky-50 to-purple-50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg text-purple-900">
            Participants ({participants.length})
          </h3>
          <Button onClick={onClose} size="icon" variant="ghost" className="hover:bg-purple-100">
            <X className="size-5 text-purple-700" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search participants..."
            className="pl-10 border-purple-200 focus:border-sky-400"
          />
        </div>
        
      </div>
      <div className="p-4 border-t-2 border-purple-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-sky-600">{participants.length}</p>
            <p className="text-xs text-gray-600">Total</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-600">
              {participants.filter(p => !p.isMuted).length}
            </p>
            <p className="text-xs text-gray-600">Unmuted</p>
          </div>
          <div>
            <p className="text-lg font-bold text-purple-600">
              {participants.filter(p => p.handRaised).length}
            </p>
            <p className="text-xs text-gray-600">Hands</p>
          </div>
        </div>
      </div>

      {/* Host Controls */}
      {isCurrentUserHost && (
        <div className="p-4 bg-purple-50 border-b-2 border-purple-200">
          <h4 className="text-sm font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <Crown className="size-4 text-purple-600" />
            Host Controls
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-100"
              onClick={() => {
                // Mute all participants
                participants.forEach(p => {
                  if (p.id !== currentUserId && !p.isMuted) {
                    onMuteParticipant?.(p.id);
                  }
                });
              }}
            >
              <MicOff className="size-3 mr-1" />
              Mute All
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-sky-300 text-sky-700 hover:bg-sky-100"
            >
              <Video className="size-3 mr-1" />
              Ask to Unmute
            </Button>
          </div>
        </div>
      )}

      {/* Participants List */}
      <div className="h-[450px]">
      <ScrollArea className="flex-1 h-full">
        <div className="p-4 space-y-2">
          {filteredParticipants.map((participant) => (
            <div
              key={participant.id}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                participant.id === currentUserId
                  ? 'bg-gradient-to-r from-sky-50 to-purple-50 border-purple-300'
                  : 'bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-50/30'
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <div
                  className="size-12 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
                  style={{ backgroundColor: participant.avatarColor }}
                >
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </div>
                {participant.handRaised && (
                  <div className="absolute -top-1 -right-1 size-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
                    <Hand className="size-3 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 truncate">
                    {participant.name}
                    {participant.id === currentUserId && ' (You)'}
                  </p>
                  {participant.isHost && (
                    <Crown className="size-4 text-purple-600" />
                  )}
                </div>
                {participant.email && (
                  <p className="text-xs text-gray-600 truncate">{participant.email}</p>
                )}
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-2">
                {participant.isMuted ? (
                  <div className="p-1.5 bg-red-100 rounded-full">
                    <MicOff className="size-3 text-red-600" />
                  </div>
                ) : (
                  <div className="p-1.5 bg-green-100 rounded-full">
                    <Mic className="size-3 text-green-600" />
                  </div>
                )}
                {participant.isVideoOff && (
                  <div className="p-1.5 bg-gray-100 rounded-full">
                    <VideoOff className="size-3 text-gray-600" />
                  </div>
                )}
              </div>

              {/* More Options (for host) */}
              {isCurrentUserHost && participant.id !== currentUserId && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="size-8 hover:bg-purple-100">
                      <MoreVertical className="size-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border-purple-200">
                    <DropdownMenuItem
                      onClick={() => onMuteParticipant?.(participant.id)}
                      className="cursor-pointer hover:bg-sky-50"
                    >
                      <MicOff className="size-4 mr-2 text-sky-600" />
                      Mute
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onMakeHost?.(participant.id)}
                      className="cursor-pointer hover:bg-purple-50"
                    >
                      <Crown className="size-4 mr-2 text-purple-600" />
                      Make Host
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRemoveParticipant?.(participant.id)}
                      className="cursor-pointer hover:bg-red-50 text-red-600"
                    >
                      <UserMinus className="size-4 mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}

          {filteredParticipants.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No participants found</p>
            </div>
          )}
        </div>
      </ScrollArea>
      </div>

      {/* Footer Stats */}
      {/* <div className="p-4 border-t-2 border-purple-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-sky-600">{participants.length}</p>
            <p className="text-xs text-gray-600">Total</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-600">
              {participants.filter(p => !p.isMuted).length}
            </p>
            <p className="text-xs text-gray-600">Unmuted</p>
          </div>
          <div>
            <p className="text-lg font-bold text-purple-600">
              {participants.filter(p => p.handRaised).length}
            </p>
            <p className="text-xs text-gray-600">Hands</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
