"use client";

import { useState } from "react";
import { Camera, Mic, Monitor, Volume2, Settings as SettingsIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const [selectedCamera, setSelectedCamera] = useState("default");
  const [selectedMicrophone, setSelectedMicrophone] = useState("default");
  const [selectedSpeaker, setSelectedSpeaker] = useState("default");
  const [micVolume, setMicVolume] = useState([80]);
  const [speakerVolume, setSpeakerVolume] = useState([75]);
  const [enableHD, setEnableHD] = useState(true);
  const [enableNoiseCancellation, setEnableNoiseCancellation] = useState(true);
  const [enableVirtualBackground, setEnableVirtualBackground] = useState(false);
  const [mirrorVideo, setMirrorVideo] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-2 border-purple-200 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-900 flex items-center gap-2">
            <SettingsIcon className="size-6 text-purple-600" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="audio" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-purple-50">
            <TabsTrigger value="audio" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Audio
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Video
            </TabsTrigger>
            <TabsTrigger value="general" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              General
            </TabsTrigger>
          </TabsList>

          {/* Audio Settings */}
          <TabsContent value="audio" className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-purple-900 flex items-center gap-2">
                <Mic className="size-4 text-sky-500" />
                Microphone
              </Label>
              <Select value={selectedMicrophone} onValueChange={setSelectedMicrophone}>
                <SelectTrigger className="border-purple-200 focus:border-sky-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default - Built-in Microphone</SelectItem>
                  <SelectItem value="external">External USB Microphone</SelectItem>
                  <SelectItem value="headset">Bluetooth Headset</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-purple-900">Microphone Volume</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={micVolume}
                  onValueChange={setMicVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 min-w-12">{micVolume}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-purple-600 transition-all"
                  style={{ width: `${micVolume}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-purple-900 flex items-center gap-2">
                <Volume2 className="size-4 text-sky-500" />
                Speaker
              </Label>
              <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                <SelectTrigger className="border-purple-200 focus:border-sky-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default - Built-in Speakers</SelectItem>
                  <SelectItem value="headphones">Headphones</SelectItem>
                  <SelectItem value="external">External Speakers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-purple-900">Speaker Volume</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={speakerVolume}
                  onValueChange={setSpeakerVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 min-w-12">{speakerVolume}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-sky-50 rounded-lg border border-sky-200">
              <div>
                <Label className="text-purple-900">Noise Cancellation</Label>
                <p className="text-sm text-gray-600">Reduce background noise</p>
              </div>
              <Switch
                checked={enableNoiseCancellation}
                onCheckedChange={setEnableNoiseCancellation}
              />
            </div>
          </TabsContent>

          {/* Video Settings */}
          <TabsContent value="video" className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-purple-900 flex items-center gap-2">
                <Camera className="size-4 text-sky-500" />
                Camera
              </Label>
              <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                <SelectTrigger className="border-purple-200 focus:border-sky-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default - Built-in Camera</SelectItem>
                  <SelectItem value="external">External Webcam</SelectItem>
                  <SelectItem value="virtual">Virtual Camera</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-sky-900 to-purple-900 rounded-lg flex items-center justify-center border-2 border-purple-200">
                <div className="size-32 rounded-full bg-purple-500 flex items-center justify-center text-white text-4xl font-semibold">
                  YO
                </div>
              </div>
              <p className="text-sm text-center text-gray-600">Camera Preview</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <Label className="text-purple-900">HD Video (720p)</Label>
                <p className="text-sm text-gray-600">Higher quality, uses more bandwidth</p>
              </div>
              <Switch checked={enableHD} onCheckedChange={setEnableHD} />
            </div>

            <div className="flex items-center justify-between p-4 bg-sky-50 rounded-lg border border-sky-200">
              <div>
                <Label className="text-purple-900">Mirror Video</Label>
                <p className="text-sm text-gray-600">Flip your camera horizontally</p>
              </div>
              <Switch checked={mirrorVideo} onCheckedChange={setMirrorVideo} />
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <Label className="text-purple-900">Virtual Background</Label>
                <p className="text-sm text-gray-600">Apply background effects</p>
              </div>
              <Switch
                checked={enableVirtualBackground}
                onCheckedChange={setEnableVirtualBackground}
              />
            </div>
          </TabsContent>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 py-4">
            <div className="space-y-3">
              <Label className="text-purple-900">Display Name</Label>
              <input
                type="text"
                defaultValue="You"
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-purple-900">Bandwidth Usage</Label>
              <Select defaultValue="auto">
                <SelectTrigger className="border-purple-200 focus:border-sky-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (Recommended)</SelectItem>
                  <SelectItem value="high">High Quality</SelectItem>
                  <SelectItem value="medium">Medium Quality</SelectItem>
                  <SelectItem value="low">Low Quality (Save Data)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 p-4 bg-sky-50 rounded-lg border border-sky-200">
              <h4 className="font-semibold text-purple-900">Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Someone joins/leaves</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Chat messages</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Raised hands</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
