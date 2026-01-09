"use client";

import { useState } from "react";
import { Copy, Check, Link2, Calendar, Clock, Lock, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { toast } from "sonner";

interface CreateLinkDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateLinkDialog({ open, onClose }: CreateLinkDialogProps) {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [requirePassword, setRequirePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [waitingRoom, setWaitingRoom] = useState(true);
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMeetingLink = () => {
//   const meetingId = Math.random().toString(36).substring(2, 12).toUpperCase();
  // Use the current domain dynamically
  const origin = typeof window !== "undefined" ? window.location.origin : "https://example.com";
  const link = `${origin}`;
  setGeneratedLink(link);
  toast.success("Meeting link created successfully!");
};


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Join my meeting: ${meetingTitle || 'Untitled Meeting'}`);
    const body = encodeURIComponent(
      `You're invited to join my meeting!\n\nMeeting: ${meetingTitle || 'Untitled Meeting'}\nLink: ${generatedLink}\n${requirePassword ? `Password: ${password}` : ''}\n\nSee you there!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-2 border-purple-200 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-900 flex items-center gap-2">
            <Link2 className="size-6 text-purple-600" />
            Create Meeting Link
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Generate a custom meeting link to share with participants
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!generatedLink ? (
            <>
              {/* Meeting Title */}
              <div className="space-y-2">
                <Label className="text-purple-900">Meeting Title</Label>
                <Input
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="e.g., Weekly Team Sync"
                  className="border-purple-200 focus:border-sky-400"
                />
              </div>

              {/* Meeting Options */}
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-900">Meeting Options</h4>
                
                <div className="flex items-center justify-between p-3 bg-sky-50 rounded-lg border border-sky-200">
                  <div className="flex items-center gap-3">
                    <Lock className="size-5 text-sky-600" />
                    <div>
                      <Label className="text-purple-900">Require Password</Label>
                      <p className="text-xs text-gray-600">Add security to your meeting</p>
                    </div>
                  </div>
                  <Switch
                    checked={requirePassword}
                    onCheckedChange={setRequirePassword}
                  />
                </div>

                {requirePassword && (
                  <div className="ml-8 space-y-2">
                    <Label className="text-purple-900">Password</Label>
                    <Input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="border-purple-200 focus:border-sky-400"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-purple-600" />
                    <div>
                      <Label className="text-purple-900">Waiting Room</Label>
                      <p className="text-xs text-gray-600">Admit participants manually</p>
                    </div>
                  </div>
                  <Switch
                    checked={waitingRoom}
                    onCheckedChange={setWaitingRoom}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-sky-50 rounded-lg border border-sky-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="size-5 text-sky-600" />
                    <div>
                      <Label className="text-purple-900">Auto-Recording</Label>
                      <p className="text-xs text-gray-600">Start recording on join</p>
                    </div>
                  </div>
                  <Switch
                    checked={recordingEnabled}
                    onCheckedChange={setRecordingEnabled}
                  />
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateMeetingLink}
                className="w-full bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
              >
                <Link2 className="size-4 mr-2" />
                Generate Meeting Link
              </Button>
            </>
          ) : (
            <>
              {/* Generated Link Display */}
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg border-2 border-purple-200">
                  <Label className="text-purple-900 mb-2 block">Your Meeting Link</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={generatedLink}
                      readOnly
                      className="flex-1 font-mono text-sm border-purple-200"
                    />
                    <Button
                      onClick={copyToClipboard}
                      className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
                    >
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>

                {/* Meeting Details Summary */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                  <h4 className="font-semibold text-purple-900 mb-3">Meeting Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title:</span>
                      <span className="font-medium">{meetingTitle || 'Untitled Meeting'}</span>
                    </div>
                    {requirePassword && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Password:</span>
                        <span className="font-medium">{password}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Waiting Room:</span>
                      <span className="font-medium">{waitingRoom ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Auto-Recording:</span>
                      <span className="font-medium">{recordingEnabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={shareViaEmail}
                    variant="outline"
                    className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Globe className="size-4 mr-2" />
                    Share via Email
                  </Button>
                  <Button
                    onClick={() => {
                      setGeneratedLink("");
                      setMeetingTitle("");
                      setPassword("");
                    }}
                    variant="outline"
                    className="w-full border-sky-300 text-sky-700 hover:bg-sky-50"
                  >
                    Create Another Link
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
