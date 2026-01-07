"use client";

import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, Settings, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PreJoinScreenProps {
  meetingCode: string;
  onJoinMeeting: (userName: string, audioEnabled: boolean, videoEnabled: boolean) => void;
  onCancel: () => void;
  defaultUserName?: string;
}

export function PreJoinScreen({ meetingCode, onJoinMeeting, onCancel, defaultUserName = "Guest" }: PreJoinScreenProps) {
  const [userName, setUserName] = useState(defaultUserName);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState("default");
  const [selectedMicrophone, setSelectedMicrophone] = useState("default");

  const handleJoin = () => {
    if (!userName.trim()) {
      return;
    }
    onJoinMeeting(userName, audioEnabled, videoEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Preview */}
          <div className="space-y-6">
            <div className="aspect-video bg-gradient-to-br from-sky-900 to-purple-900 rounded-2xl border-2 border-purple-200 shadow-xl overflow-hidden relative">
              {videoEnabled ? (
                <div className="size-full flex items-center justify-center">
                  <div className="size-40 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 flex items-center justify-center text-white text-5xl font-semibold">
                    {userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'G'}
                  </div>
                </div>
              ) : (
                <div className="size-full flex items-center justify-center">
                  <div className="text-center">
                    <VideoOff className="size-16 text-white/60 mx-auto mb-4" />
                    <p className="text-white/80 text-lg">Camera is off</p>
                  </div>
                </div>
              )}

              {/* Audio/Video Status */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                <Button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  size="lg"
                  className={`rounded-full size-14 ${
                    audioEnabled
                      ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {audioEnabled ? <Mic className="size-5" /> : <MicOff className="size-5" />}
                </Button>
                <Button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  size="lg"
                  className={`rounded-full size-14 ${
                    videoEnabled
                      ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {videoEnabled ? <Video className="size-5" /> : <VideoOff className="size-5" />}
                </Button>
              </div>
            </div>

            {/* Device Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-900">Camera</label>
                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                  <SelectTrigger className="border-2 border-purple-200 focus:border-sky-400 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Built-in Camera</SelectItem>
                    <SelectItem value="external">External Webcam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-900">Microphone</label>
                <Select value={selectedMicrophone} onValueChange={setSelectedMicrophone}>
                  <SelectTrigger className="border-2 border-purple-200 focus:border-sky-400 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Built-in Microphone</SelectItem>
                    <SelectItem value="external">External Microphone</SelectItem>
                    <SelectItem value="headset">Bluetooth Headset</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Join Details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-purple-200 p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-purple-900 mb-2">Ready to join?</h2>
                <p className="text-gray-600 mb-6">
                  Meeting Code: <span className="font-mono font-semibold text-purple-700">{meetingCode}</span>
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-900">Your Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-sky-400 focus:outline-none bg-white"
                    />
                  </div>

                  <div className="p-4 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 text-sm">Before you join:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${audioEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        Microphone: {audioEnabled ? 'On' : 'Off'}
                      </li>
                      <li className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${videoEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        Camera: {videoEnabled ? 'On' : 'Off'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-sky-200 p-6 shadow-xl">
                <h3 className="font-semibold text-purple-900 mb-3">Meeting Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold">•</span>
                    Please mute when not speaking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    Use chat for questions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold">•</span>
                    Enable video for better engagement
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-6"
              >
                Cancel
              </Button>
              <Button
                onClick={handleJoin}
                disabled={!userName.trim()}
                className="flex-1 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white py-6 text-lg"
              >
                Join Now
                <ArrowRight className="size-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
