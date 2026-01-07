"use client";

import { useState } from "react";
import { Send, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isCurrentUser: boolean;
}

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Sarah Johnson',
      message: 'Hey everyone! Ready to start the meeting?',
      time: '10:30 AM',
      isCurrentUser: false,
    },
    {
      id: '2',
      sender: 'You',
      message: 'Yes, ready to go!',
      time: '10:31 AM',
      isCurrentUser: true,
    },
    {
      id: '3',
      sender: 'Mike Chen',
      message: 'Let me share my screen for the presentation',
      time: '10:32 AM',
      isCurrentUser: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-80 h-full bg-white border-l-2 border-purple-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b-2 border-purple-200 flex items-center justify-between bg-gradient-to-r from-sky-50 to-purple-50">
        <h3 className="font-semibold text-lg text-purple-900">Meeting Chat</h3>
        <Button onClick={onClose} size="icon" variant="ghost" className="hover:bg-purple-100">
          <X className="size-5 text-purple-700" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                  msg.isCurrentUser
                    ? 'bg-gradient-to-r from-sky-500 to-purple-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                }`}
              >
                {!msg.isCurrentUser && (
                  <p className="text-xs font-semibold mb-1 text-purple-700">{msg.sender}</p>
                )}
                <p className="text-sm">{msg.message}</p>
              </div>
              <span className="text-xs text-gray-500 mt-1 px-2">{msg.time}</span>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t-2 border-purple-200 bg-gray-50">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 border-purple-200 focus:border-sky-400 focus:ring-sky-400"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
