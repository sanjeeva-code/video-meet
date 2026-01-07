"use client";

import { X, Mail, Phone, Calendar, Award, Edit2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface ProfilePanelProps {
  onClose: () => void;
  isHost: boolean;
}

export function ProfilePanel({ onClose, isHost }: ProfilePanelProps) {
  return (
    <div className="w-96 h-semi bg-white border-l-2 border-purple-200 flex flex-col">
      {/* Header */}
      <div className="p-1 border-b-2 border-purple-200 flex items-center justify-between bg-gradient-to-r from-sky-50 to-purple-50">
        <h3 className="font-semibold text-lg text-purple-900">My Profile</h3>
        <Button onClick={onClose} size="icon" variant="ghost" className="hover:bg-purple-100">
          <X className="size-5 text-purple-700" />
        </Button>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Avatar Section */}
        <div className="p-6 bg-gradient-to-br from-sky-100 to-purple-100 border-b-2 border-purple-200">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="size-16 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 text-white text-4xl font-semibold shadow-lg">
                YO
              </div>
              <button className="absolute bottom-0 right-0 size-10 rounded-full bg-white border-2 border-purple-300 flex flex-col items-center justify-center shadow-md hover:bg-purple-50 transition-colors">
                <Edit2 className="size-4 text-purple-600" />
              </button>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-purple-900">Your Name</h2>
            <p className="text-sm text-gray-600 mt-1">you@example.com</p>
            {isHost && (
              <Badge className="mt-3 bg-gradient-to-r from-sky-500 to-purple-600 text-white border-0">
                <Award className="size-3 mr-1" />
                Host
              </Badge>
            )}
          </div>
        </div>

        {/* Info Section */}
        <ScrollArea className="h-[40vh]">
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-purple-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg border border-sky-200">
                <Mail className="size-5 text-sky-600" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm font-medium text-gray-900">you@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <Phone className="size-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="text-sm font-medium text-gray-900">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-purple-900 mb-4">Meeting Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gradient-to-br from-sky-50 to-sky-100 rounded-lg border border-sky-200">
                <p className="text-2xl font-bold text-sky-600">247</p>
                <p className="text-xs text-gray-600 mt-1">Meetings Joined</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <p className="text-2xl font-bold text-purple-600">89h</p>
                <p className="text-xs text-gray-600 mt-1">Total Time</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-sky-50 to-sky-100 rounded-lg border border-sky-200">
                <p className="text-2xl font-bold text-sky-600">45</p>
                <p className="text-xs text-gray-600 mt-1">Hosted</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <p className="text-2xl font-bold text-purple-600">98%</p>
                <p className="text-xs text-gray-600 mt-1">Attendance</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-purple-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="size-4 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Weekly Team Sync</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="size-4 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Project Review</p>
                  <p className="text-xs text-gray-600">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="size-4 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Client Presentation</p>
                  <p className="text-xs text-gray-600">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </ScrollArea>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t-2 border-purple-200 bg-gray-50 space-y-2">
        <Button className="w-full bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white">
          <Edit2 className="size-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
