"use client";

import { useState } from "react";
import { X, Edit2, Mail, Phone, User, Camera, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  onUpdateProfile: (name: string, email: string, phone: string) => void;
}

export function ProfileDialog({ open, onClose, userName, userEmail, onUpdateProfile }: ProfileDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState("+1 (555) 123-4567");

  const handleSave = () => {
    if (!name || !email) {
      toast.error("Name and email are required");
      return;
    }
    onUpdateProfile(name, email, phone);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-2 border-purple-200 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-900 flex items-center gap-2">
            <User className="size-6 text-purple-600" />
            My Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="size-32 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 flex items-center justify-center text-white text-4xl font-semibold shadow-lg">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 size-10 rounded-full bg-white border-2 border-purple-300 flex items-center justify-center shadow-md hover:bg-purple-50 transition-colors">
                <Camera className="size-4 text-purple-600" />
              </button>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-purple-900">{name}</h2>
            <p className="text-sm text-gray-600 mt-1">{email}</p>
          </div>

          {/* Profile Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-purple-900">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="pl-10 border-2 border-purple-200 focus:border-sky-400 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-purple-900">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className="pl-10 border-2 border-purple-200 focus:border-sky-400 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-purple-900">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                  className="pl-10 border-2 border-purple-200 focus:border-sky-400 disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="p-4 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg border-2 border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">Account Statistics</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-sky-600">247</p>
                <p className="text-xs text-gray-600">Meetings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">89h</p>
                <p className="text-xs text-gray-600">Total Time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-600">45</p>
                <p className="text-xs text-gray-600">Hosted</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setName(userName);
                    setEmail(userEmail);
                  }}
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
                >
                  <Save className="size-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
              >
                <Edit2 className="size-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
