"use client";

import { AlertCircle, Mic, Video, Circle, MonitorUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

interface PermissionDialogProps {
  open: boolean;
  type: 'microphone' | 'camera' | 'recording' | 'screen' | null;
  onClose: () => void;
  onAllow: () => void;
  onDeny: () => void;
}

export function PermissionDialog({ open, type, onClose, onAllow, onDeny }: PermissionDialogProps) {
  const getDialogContent = () => {
    switch (type) {
      case 'microphone':
        return {
          icon: <Mic className="size-12 text-sky-500" />,
          title: 'Microphone Access Required',
          description: 'This meeting app needs access to your microphone to enable audio communication with other participants.',
        };
      case 'camera':
        return {
          icon: <Video className="size-12 text-purple-500" />,
          title: 'Camera Access Required',
          description: 'This meeting app needs access to your camera to enable video communication with other participants.',
        };
      case 'recording':
        return {
          icon: <Circle className="size-12 text-red-500" />,
          title: 'Recording Permission',
          description: 'You are about to start recording this meeting. All participants will be notified that the meeting is being recorded.',
        };
      case 'screen':
        return {
          icon: <MonitorUp className="size-12 text-sky-500" />,
          title: 'Screen Sharing Permission',
          description: 'You are about to share your screen with other participants in the meeting.',
        };
      default:
        return {
          icon: <AlertCircle className="size-12 text-gray-500" />,
          title: 'Permission Required',
          description: 'This action requires your permission to proceed.',
        };
    }
  };

  const content = getDialogContent();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-2 border-purple-200">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-sky-100 to-purple-100">
              {content.icon}
            </div>
          </div>
          <DialogTitle className="text-2xl text-center text-purple-900">
            {content.title}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 pt-2">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 sm:gap-3 mt-6">
          <Button
            onClick={onDeny}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Deny
          </Button>
          <Button
            onClick={onAllow}
            className="flex-1 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
          >
            Allow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
