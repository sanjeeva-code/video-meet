"use client";

import { useState } from "react";
import { Send, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useAgoraChat } from "@/hooks/useAgoraChat";

interface ChatPanelProps {
  meetingCode: string;
  userId: string;
  onClose: () => void;
}

export function ChatPanel({ meetingCode, userId, onClose }: ChatPanelProps) {
  const { messages, sendMessage, isReady } = useAgoraChat(meetingCode, userId);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(newMessage);
    setNewMessage("");
  };

  if (!meetingCode || !userId) {
    return (
      <div className="w-80 h-full flex items-center justify-center">
        <p className="text-sm text-gray-500">Initializing chat…</p>
      </div>
    );
  }

  return (
    <div className="w-80 h-full bg-white border-l flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold text-lg">
          Meeting Chat {!isReady && "(Connecting...)"}
        </h3>
        <Button onClick={onClose} size="icon" variant="ghost">
          <X className="size-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {messages.map((msg) => {
            const isMe = msg.sender === userId;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-[85%] ${
                    isMe ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {!isMe && <p className="text-xs font-semibold mb-1">{msg.sender}</p>}
                  <p className="text-sm">{msg.message}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <Button onClick={handleSend}>
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
