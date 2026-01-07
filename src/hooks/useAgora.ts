"use client";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useRef, useState } from "react";

export function useAgora() {
  const client = useRef(
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  );

  const [localAudioTrack, setLocalAudioTrack] = useState<any>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<any>(null);
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);

  const join = async (channel: string, uid: number) => {
    const res = await fetch(`/api/agora/token?channel=${channel}&uid=${uid}`);
    const { token } = await res.json();

    await client.current.join(
      process.env.NEXT_PUBLIC_AGORA_APP_ID!,
      channel,
      token,
      uid
    );

    const mic = await AgoraRTC.createMicrophoneAudioTrack();
    const cam = await AgoraRTC.createCameraVideoTrack();

    setLocalAudioTrack(mic);
    setLocalVideoTrack(cam);

    await client.current.publish([mic, cam]);

    client.current.on("user-published", async (user, mediaType) => {
      await client.current.subscribe(user, mediaType);

      if (mediaType === "video") {
        setRemoteUsers(prev => [...prev, user]);
      }
      if (mediaType === "audio") {
        user.audioTrack?.play();
      }
    });

    client.current.on("user-left", user => {
      setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
    });
  };

  const leave = async () => {
    localAudioTrack?.stop();
    localAudioTrack?.close();
    localVideoTrack?.stop();
    localVideoTrack?.close();
    setRemoteUsers([]);
    await client.current.leave();
  };

  return {
    join,
    leave,
    localVideoTrack,
    remoteUsers,
    mute: () => localAudioTrack?.setEnabled(false),
    unmute: () => localAudioTrack?.setEnabled(true),
    cameraOff: () => localVideoTrack?.setEnabled(false),
    cameraOn: () => localVideoTrack?.setEnabled(true),
  };
}
