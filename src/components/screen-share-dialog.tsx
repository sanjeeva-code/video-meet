"use client";

import { Monitor, AppWindow, Chrome } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";

interface ScreenShareDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectOption: (option: 'screen' | 'window' | 'tab') => void;
}

export function ScreenShareDialog({ open, onClose, onSelectOption }: ScreenShareDialogProps) {
  const handleSelect = (option: 'screen' | 'window' | 'tab') => {
    onSelectOption(option);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-2 border-purple-200">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-900">Share Your Screen</DialogTitle>
          <DialogDescription className="text-gray-600">
            Choose what you'd like to share with others in the meeting
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <button
            onClick={() => handleSelect('screen')}
            className="flex items-center gap-4 p-6 rounded-xl border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50 transition-all group"
          >
            <div className="p-4 rounded-lg bg-sky-100 group-hover:bg-sky-200 transition-colors">
              <Monitor className="size-8 text-sky-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg text-gray-900">Entire Screen</h3>
              <p className="text-sm text-gray-600">Share everything on your screen</p>
            </div>
          </button>

          <button
            onClick={() => handleSelect('window')}
            className="flex items-center gap-4 p-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all group"
          >
            <div className="p-4 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
              <AppWindow className="size-8 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg text-gray-900">Window</h3>
              <p className="text-sm text-gray-600">Share a specific application window</p>
            </div>
          </button>

          <button
            onClick={() => handleSelect('tab')}
            className="flex items-center gap-4 p-6 rounded-xl border-2 border-sky-200 hover:border-sky-400 hover:bg-sky-50 transition-all group"
          >
            <div className="p-4 rounded-lg bg-sky-100 group-hover:bg-sky-200 transition-colors">
              <Chrome className="size-8 text-sky-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg text-gray-900">Chrome Tab</h3>
              <p className="text-sm text-gray-600">Share a specific browser tab</p>
            </div>
          </button>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
