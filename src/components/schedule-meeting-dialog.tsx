"use client";

import { useState } from "react";
import { X, Calendar, Clock, Users, Repeat, Lock, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";

interface ScheduleMeetingDialogProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (meeting: any) => void;
}

export function ScheduleMeetingDialog({ open, onClose, onSchedule }: ScheduleMeetingDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("weekly");
  const [requirePassword, setRequirePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("100");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMeetingCode = () => {
    const code = Math.random().toString(36).substring(2, 5) + '-' +
                 Math.random().toString(36).substring(2, 6) + '-' +
                 Math.random().toString(36).substring(2, 5);
    return code;
  };

  const handleSchedule = () => {
    if (!title || !date || !time) {
      toast.error("Please fill in all required fields");
      return;
    }

    const meetingCode = generateMeetingCode();
    setGeneratedCode(meetingCode);

    const meeting = {
      id: Date.now().toString(),
      title,
      description,
      date,
      time,
      duration: parseInt(duration),
      isRecurring,
      frequency: isRecurring ? frequency : null,
      requirePassword,
      password: requirePassword ? password : null,
      maxParticipants: parseInt(maxParticipants),
      meetingCode,
      participants: 0,
    };

    onSchedule(meeting);
    toast.success("Meeting scheduled successfully!");
  };

  const copyMeetingCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      toast.success("Meeting code copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy code");
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setDuration("60");
    setIsRecurring(false);
    setRequirePassword(false);
    setPassword("");
    setGeneratedCode("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleReset}>
      <DialogContent className="bg-white border-2 border-purple-200 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-900 flex items-center gap-2">
            <Calendar className="size-6 text-purple-600" />
            Schedule Meeting
          </DialogTitle>
        </DialogHeader>

        {!generatedCode ? (
          <div className="space-y-6 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label className="text-purple-900">Meeting Title *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Weekly Team Sync"
                className="border-2 border-purple-200 focus:border-sky-400"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-purple-900">Description (Optional)</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add meeting agenda or notes..."
                className="border-2 border-purple-200 focus:border-sky-400 min-h-24"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-purple-900">Date *</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-2 border-purple-200 focus:border-sky-400"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-purple-900">Time *</Label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border-2 border-purple-200 focus:border-sky-400"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label className="text-purple-900">Duration (minutes)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="border-2 border-purple-200 focus:border-sky-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="180">3 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Recurring */}
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="flex items-center gap-3">
                <Repeat className="size-5 text-purple-600" />
                <div>
                  <Label className="text-purple-900">Recurring Meeting</Label>
                  <p className="text-xs text-gray-600">Repeat this meeting</p>
                </div>
              </div>
              <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
            </div>

            {isRecurring && (
              <div className="ml-8 space-y-2">
                <Label className="text-purple-900">Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="border-2 border-purple-200 focus:border-sky-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Password Protection */}
            <div className="flex items-center justify-between p-4 bg-sky-50 rounded-lg border-2 border-sky-200">
              <div className="flex items-center gap-3">
                <Lock className="size-5 text-sky-600" />
                <div>
                  <Label className="text-purple-900">Password Protection</Label>
                  <p className="text-xs text-gray-600">Require password to join</p>
                </div>
              </div>
              <Switch checked={requirePassword} onCheckedChange={setRequirePassword} />
            </div>

            {requirePassword && (
              <div className="ml-8 space-y-2">
                <Label className="text-purple-900">Password</Label>
                <Input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="border-2 border-purple-200 focus:border-sky-400"
                />
              </div>
            )}

            {/* Max Participants */}
            <div className="space-y-2">
              <Label className="text-purple-900">Maximum Participants</Label>
              <Select value={maxParticipants} onValueChange={setMaxParticipants}>
                <SelectTrigger className="border-2 border-purple-200 focus:border-sky-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 participants</SelectItem>
                  <SelectItem value="25">25 participants</SelectItem>
                  <SelectItem value="50">50 participants</SelectItem>
                  <SelectItem value="100">100 participants</SelectItem>
                  <SelectItem value="250">250 participants</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSchedule}
                className="flex-1 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
              >
                <Calendar className="size-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Success Message */}
            <div className="text-center p-6 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg border-2 border-purple-200">
              <div className="size-16 rounded-full bg-gradient-to-r from-sky-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <Check className="size-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Meeting Scheduled!</h3>
              <p className="text-gray-600">Your meeting has been created successfully</p>
            </div>

            {/* Meeting Details */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
              <h4 className="font-semibold text-purple-900 mb-3">Meeting Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Title:</span>
                  <span className="font-medium">{title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{duration} minutes</span>
                </div>
                {isRecurring && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium capitalize">{frequency}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Meeting Code */}
            <div className="p-4 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg border-2 border-purple-200">
              <Label className="text-purple-900 mb-2 block">Meeting Code</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={generatedCode}
                  readOnly
                  className="flex-1 font-mono text-lg border-2 border-purple-200"
                />
                <Button
                  onClick={copyMeetingCode}
                  className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </Button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Share this code with participants to join the meeting
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleReset}
                className="flex-1 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
