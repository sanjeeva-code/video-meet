"use client";

import { useEffect, useRef, useState } from "react";
import { AGORA_APP_ID, AGORA_TOKEN } from "@/lib/agora";

export function useAgora() {
  const clientRef = useRef<any>(null);
  const localAudioTrack = useRef<any>(null);
  const localVideoTrack = useRef<any>(null);
  const screenTrackRef = useRef<any>(null);

  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
      if (!mounted) return;

      clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

      clientRef.current.on("user-published", async (user, mediaType) => {
        await clientRef.current.subscribe(user, mediaType);
        setRemoteUsers((prev) => [...prev.filter(u => u.uid !== user.uid), user]);
      });

      clientRef.current.on("user-unpublished", (user) => {
        setRemoteUsers((prev) => prev.filter(u => u.uid !== user.uid));
      });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const join = async (channel: string, uid: number) => {
    const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

    await clientRef.current.join(
      AGORA_APP_ID,
      channel,
      AGORA_TOKEN,
      uid
    );

    localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack();
    localVideoTrack.current = await AgoraRTC.createCameraVideoTrack();

    await clientRef.current.publish([
      localAudioTrack.current,
      localVideoTrack.current,
    ]);
  };

  const leave = async () => {
    localAudioTrack.current?.stop();
    localVideoTrack.current?.stop();
    screenTrackRef.current?.stop();

    localAudioTrack.current?.close();
    localVideoTrack.current?.close();
    screenTrackRef.current?.close();

    await clientRef.current.leave();
    setRemoteUsers([]);
  };

  const muteMic = () => localAudioTrack.current?.setEnabled(false);
  const unmuteMic = () => localAudioTrack.current?.setEnabled(true);
  const cameraOff = () => localVideoTrack.current?.setEnabled(false);
  const cameraOn = () => localVideoTrack.current?.setEnabled(true);

  const startScreenShare = async () => {
    const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

    screenTrackRef.current = await AgoraRTC.createScreenVideoTrack(
      { encoderConfig: "1080p_1" },
      "auto"
    );

    await clientRef.current.unpublish(localVideoTrack.current);
    await clientRef.current.publish(screenTrackRef.current);
    setIsScreenSharing(true);
  };

  const stopScreenShare = async () => {
    await clientRef.current.unpublish(screenTrackRef.current);
    await clientRef.current.publish(localVideoTrack.current);

    screenTrackRef.current.stop();
    screenTrackRef.current.close();
    screenTrackRef.current = null;
    setIsScreenSharing(false);
  };

  return {
    join,
    leave,
    muteMic,
    unmuteMic,
    cameraOff,
    cameraOn,
    startScreenShare,
    stopScreenShare,
    isScreenSharing,
    localVideoTrack: localVideoTrack.current,
    remoteUsers,
  };
}
