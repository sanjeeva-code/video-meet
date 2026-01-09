"use client";

import { useMemo } from "react";
import { MeetingRoom } from "../components/meeting-room";

export default function MeetingRoomClient({
  meetingCode,
}: {
  meetingCode: string;
}) {
  // ✅ Generate a VALID Agora UID ONCE
  const userId = useMemo(() => {
    return `user_${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  // Optional safety (never undefined)
  if (!meetingCode || !userId) {
    return null;
  }

  return (
    <MeetingRoom
      meetingCode={meetingCode}
      userId={userId}   // ✅ PASS USER ID
    />
  );
}
