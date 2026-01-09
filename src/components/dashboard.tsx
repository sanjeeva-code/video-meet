"use client";

import { useState, useEffect } from "react";
import { Video, Plus, LogIn, Calendar, Clock, Users, Settings, LogOut, History } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { toast } from "sonner";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: number;
  isRecurring: boolean;
  meetingCode: string;
}

interface DashboardProps {
  userName: string;
  userEmail: string;
  onCreateMeeting: () => void;
  onJoinMeeting: (meetingCode: string) => void;
  onScheduleMeeting: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
}

const MOCK_UPCOMING_MEETINGS: Meeting[] = [
  { id: '1', title: 'Weekly Team Sync', date: '2026-01-08', time: '10:00 AM', participants: 12, isRecurring: true, meetingCode: 'abc-defg-hij' },
  { id: '2', title: 'Client Presentation', date: '2026-01-09', time: '2:30 PM', participants: 8, isRecurring: false, meetingCode: 'xyz-wxyz-abc' },
  { id: '3', title: 'Project Review', date: '2026-01-10', time: '11:00 AM', participants: 15, isRecurring: false, meetingCode: 'lmn-opqr-stu' },
];

const MOCK_RECENT_MEETINGS: Meeting[] = [
  { id: '4', title: 'Design Sprint Planning', date: '2026-01-06', time: '3:00 PM', participants: 10, isRecurring: false, meetingCode: 'def-ghij-klm' },
  { id: '5', title: 'Quarterly Review', date: '2026-01-05', time: '9:00 AM', participants: 25, isRecurring: false, meetingCode: 'nop-qrst-uvw' },
];

export function Dashboard({
  userName,
  userEmail,
  onCreateMeeting,
  onJoinMeeting,
  onScheduleMeeting,
  onOpenProfile,
  onLogout,
}: DashboardProps) {
  const [meetingCode, setMeetingCode] = useState("");
  const [upcomingMeetings] = useState<Meeting[]>(MOCK_UPCOMING_MEETINGS);
  const [recentMeetings] = useState<Meeting[]>(MOCK_RECENT_MEETINGS);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  // Format dates nicely
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Generate a meeting link and update URL
  const generateMeetingLink = (meetingCode: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://example.com";
    const link = `${origin}/${meetingCode}`;

    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `/${meetingCode}`);
    }

    setGeneratedLink(link);
    setTimeout(() => setGeneratedLink(null), 10000); // hide after 10s
    return link;
  };

  // Join meeting from input
  const handleJoinWithCode = () => {
    if (!meetingCode.trim()) {
      toast.error("Please enter a meeting code");
      return;
    }
    generateMeetingLink(meetingCode);
    onJoinMeeting(meetingCode);
    toast.success(`Joining meeting: ${meetingCode}`);
  };

  // Join directly from card
  const handleJoinNow = (meetingCode: string) => {
    const link = generateMeetingLink(meetingCode);
    toast.success(`Joining meeting: ${link}`);
    onJoinMeeting(meetingCode);
  };

  // Auto-join if URL contains meeting code
  useEffect(() => {
    if (typeof window !== "undefined") {
      const codeFromURL = window.location.pathname.slice(1);
      if (codeFromURL) {
        toast.info(`Joining meeting from URL: ${codeFromURL}`);
        generateMeetingLink(codeFromURL);
        onJoinMeeting(codeFromURL);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-white relative">
      {/* Popup for generated meeting link */}
      {generatedLink && (
        <div className="fixed top-6 right-6 z-50 bg-white border border-purple-300 shadow-lg rounded-lg p-4 flex flex-col items-start gap-2 animate-fade-in">
          <p className="text-sm text-purple-900 font-medium">Meeting link:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="px-2 py-1 border border-gray-300 rounded text-sm w-64"
            />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(generatedLink);
                toast.success("Link copied to clipboard!");
              }}
              className="px-2 py-1 text-white bg-purple-600 hover:bg-purple-700 rounded text-sm"
            >
              Copy
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-purple-200 px-6 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 flex items-center justify-center">
              <Video className="size-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-purple-700 bg-clip-text text-transparent">
              MeetFlow
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={onOpenProfile} variant="ghost" className="flex items-center gap-3 hover:bg-purple-50">
              <div className="size-10 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-purple-900">{userName}</p>
                <p className="text-xs text-gray-600">{userEmail}</p>
              </div>
            </Button>
            <Button onClick={onLogout} variant="ghost" className="text-red-600 hover:bg-red-50">
              <LogOut className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* New Meeting */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <Button
              onClick={onCreateMeeting}
              className="w-full h-full bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white flex flex-col items-center justify-center gap-4 py-8"
            >
              <div className="size-16 rounded-full bg-white/20 flex items-center justify-center">
                <Plus className="size-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">New Meeting</h3>
                <p className="text-sm opacity-90">Start an instant meeting</p>
              </div>
            </Button>
          </Card>

          {/* Join Meeting */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-sky-200 p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center">
                  <LogIn className="size-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-900">Join Meeting</h3>
                  <p className="text-sm text-gray-600">Enter a code or link</p>
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <Input
                  value={meetingCode}
                  onChange={(e) => setMeetingCode(e.target.value)}
                  placeholder="abc-defg-hij"
                  className="border-2 border-sky-200 focus:border-sky-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinWithCode()}
                />
                <Button
                  onClick={handleJoinWithCode}
                  className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-purple-700 text-white"
                >
                  Join
                </Button>
              </div>
            </div>
          </Card>

          {/* Schedule Meeting */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <Button
              onClick={onScheduleMeeting}
              variant="outline"
              className="w-full h-full border-2 border-purple-300 hover:bg-purple-50 flex flex-col items-center justify-center gap-4 py-8"
            >
              <div className="size-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <Calendar className="size-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-900">Schedule</h3>
                <p className="text-sm text-gray-600">Plan a meeting</p>
              </div>
            </Button>
          </Card>
        </div>

        {/* Upcoming Meetings */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-purple-900 flex items-center gap-3">
              <Calendar className="size-7 text-purple-600" />
              Upcoming Meetings
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingMeetings.map((meeting) => (
              <Card
                key={meeting.id}
                className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">{meeting.title}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="size-4 text-sky-500" />
                        {formatDate(meeting.date)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="size-4 text-purple-500" />
                        {meeting.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="size-4 text-sky-500" />
                        {meeting.participants} participants
                      </div>
                    </div>
                  </div>
                  {meeting.isRecurring && (
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      Recurring
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => handleJoinNow(meeting.meetingCode)}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
                  >
                    Join & Generate Link
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Settings className="size-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Meetings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-purple-900 flex items-center gap-3">
              <History className="size-7 text-sky-600" />
              Recent Meetings
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentMeetings.map((meeting) => (
              <Card
                key={meeting.id}
                className="bg-white/90 backdrop-blur-sm border-2 border-sky-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">{meeting.title}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="size-4 text-sky-500" />
                        {formatDate(meeting.date)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="size-4 text-purple-500" />
                        {meeting.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="size-4 text-sky-500" />
                        {meeting.participants} participants
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => handleJoinNow(meeting.meetingCode)}
                    variant="outline"
                    className="flex-1 border-2 border-sky-300 text-sky-700 hover:bg-sky-50"
                  >
                    Rejoin
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
