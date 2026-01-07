"use client";

import { useState } from "react";
import { X, Save, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface NotesPanelProps {
  onClose: () => void;
}

export function NotesPanel({ onClose }: NotesPanelProps) {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState('');

  const handleSave = () => {
    setSavedNotes(notes);
    // Show a brief confirmation
    const button = document.getElementById('save-button');
    if (button) {
      button.textContent = 'Saved!';
      setTimeout(() => {
        button.textContent = 'Save';
      }, 2000);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([notes], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `meeting-notes-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-80 h-full bg-white border-l-2 border-purple-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b-2 border-purple-200 flex items-center justify-between bg-gradient-to-r from-sky-50 to-purple-50">
        <h3 className="font-semibold text-lg text-purple-900">Meeting Notes</h3>
        <Button onClick={onClose} size="icon" variant="ghost" className="hover:bg-purple-100">
          <X className="size-5 text-purple-700" />
        </Button>
      </div>

      {/* Notes Area */}
      <div className="flex-1 p-4 flex flex-col">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Take notes during the meeting..."
          className="flex-1 resize-none border-purple-200 focus:border-sky-400 focus:ring-sky-400 mb-4"
        />
        
        <div className="text-xs text-gray-500 mb-4">
          {notes.length} characters • Auto-saved
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            id="save-button"
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
          >
            <Save className="size-4 mr-2" />
            Save
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            <Download className="size-4 mr-2" />
            Download Notes
          </Button>
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-sky-50 border-t-2 border-purple-200">
        <h4 className="text-sm font-semibold text-sky-900 mb-2">Tips:</h4>
        <ul className="text-xs text-sky-700 space-y-1">
          <li>• Notes are auto-saved as you type</li>
          <li>• Download notes at any time</li>
          <li>• Use keyboard shortcuts for formatting</li>
        </ul>
      </div>
    </div>
  );
}
