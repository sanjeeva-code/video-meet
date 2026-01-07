"use client";

import { Mic, MicOff, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
  avatarColor: string;
}

interface VideoGridProps {
  participants: Participant[];
  currentUserId: string;
}

export function VideoGrid({ participants, currentUserId }: VideoGridProps) {
  const PARTICIPANTS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(0);
  
  const totalPages = Math.ceil(participants.length / PARTICIPANTS_PER_PAGE);
  const startIndex = currentPage * PARTICIPANTS_PER_PAGE;
  const endIndex = startIndex + PARTICIPANTS_PER_PAGE;
  const currentParticipants = participants.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Navigation Controls */}
      {totalPages > 1 && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border-2 border-purple-200">
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            size="icon"
            className="size-8 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white disabled:opacity-50"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm font-medium text-purple-900 min-w-20 text-center">
            {currentPage + 1} / {totalPages}
          </span>
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            size="icon"
            className="size-8 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white disabled:opacity-50"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {currentParticipants.map((participant) => (
          <div
            key={participant.id}
            className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-purple-200 shadow-lg"
          >
            {participant.isVideoOff ? (
              <div className="size-full flex items-center justify-center">
                <div
                  className="size-24 rounded-full flex items-center justify-center text-white text-2xl font-semibold"
                  style={{ backgroundColor: participant.avatarColor }}
                >
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            ) : (
              <div className="size-full bg-gradient-to-br from-sky-900 to-purple-900 flex items-center justify-center">
                <div
                  className="size-32 rounded-full flex items-center justify-center text-white text-3xl font-semibold"
                  style={{ backgroundColor: participant.avatarColor }}
                >
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            )}
            
            {/* Participant Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">
                    {participant.name}
                    {participant.id === currentUserId && ' (You)'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {participant.isMuted ? (
                    <div className="bg-red-500 p-1.5 rounded-full">
                      <MicOff className="size-3 text-white" />
                    </div>
                  ) : (
                    <div className="bg-green-500 p-1.5 rounded-full">
                      <Mic className="size-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Speaking Indicator */}
            {!participant.isMuted && (
              <div className="absolute top-3 left-3">
                <div className="flex items-center gap-1">
                  <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="size-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="size-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Page Indicator Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pb-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`size-2 rounded-full transition-all ${
                index === currentPage
                  ? 'bg-gradient-to-r from-sky-500 to-purple-600 w-8'
                  : 'bg-purple-300 hover:bg-purple-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}