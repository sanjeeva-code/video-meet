"use client";

import { Video, Users, Shield, Clock, MessageSquare, MonitorUp } from "lucide-react";
import { Button } from "./ui/button";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-purple-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 flex items-center justify-center">
              <Video className="size-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-purple-700 bg-clip-text text-transparent">
              MeetFlow
            </h1>
          </div>
          <Button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-purple-900 mb-6">
            Premium Video Meetings.
            <br />
            <span className="bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-transparent">
              Now Free for Everyone.
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect, collaborate, and create with crystal-clear video meetings.
            Built for teams of all sizes with enterprise-grade security.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white text-lg px-8 py-6"
            >
              <Video className="size-5 mr-2" />
              Start a Meeting
            </Button>
            <Button
              onClick={onGetStarted}
              size="lg"
              variant="outline"
              className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 text-lg px-8 py-6"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-sky-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="size-16 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center mb-4">
              <Users className="size-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-3">Host Up to 100 Participants</h3>
            <p className="text-gray-600">
              Bring your entire team together with support for large meetings and seamless collaboration.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="size-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-4">
              <Shield className="size-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-3">Enterprise Security</h3>
            <p className="text-gray-600">
              End-to-end encryption and advanced security features keep your meetings private and secure.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-sky-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="size-16 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center mb-4">
              <Clock className="size-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-3">Schedule & Organize</h3>
            <p className="text-gray-600">
              Schedule meetings in advance, set recurring sessions, and manage your calendar efficiently.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="size-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-4">
              <MonitorUp className="size-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-3">Screen Sharing</h3>
            <p className="text-gray-600">
              Share your entire screen, a window, or a browser tab with crystal-clear quality.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-sky-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="size-16 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center mb-4">
              <MessageSquare className="size-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-3">Real-time Chat</h3>
            <p className="text-gray-600">
              Keep the conversation going with in-meeting chat and collaborative notes.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="size-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-4">
              <Video className="size-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-3">HD Video & Audio</h3>
            <p className="text-gray-600">
              Experience crystal-clear video quality and studio-grade audio for professional meetings.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t-2 border-purple-200 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2026 MeetFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
