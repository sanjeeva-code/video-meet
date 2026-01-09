"use client";

import { useEffect, useRef, useState } from "react";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
}

async function fetchRtmToken(userId: string, roomId: string) {
  try {
    const res = await fetch(`/api/agora/rtm-token?userId=${userId}&roomId=${roomId}`);
    if (!res.ok) throw new Error("Failed to fetch token");
    const data = await res.json();
    return data.token as string;
  } catch (err) {
    console.error("Failed to fetch RTM token:", err);
    return "";
  }
}

export function useAgoraChat(roomId?: string, userId?: string) {
  const clientRef = useRef<any>(null);
  const channelRef = useRef<any>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!roomId || !userId) return;
    if (typeof window === "undefined") return;

    let mounted = true;

    (async () => {
      try {
        const AgoraRTM = (await import("agora-rtm-sdk")).default;
        const client = AgoraRTM.createInstance(APP_ID);
        clientRef.current = client;

        const token = await fetchRtmToken(userId, roomId);
        if (!token) throw new Error("Token fetch failed");

        await client.login({ uid: userId, token });

        const channel = client.createChannel(roomId);
        channelRef.current = channel;

        channel.on("ChannelMessage", (message: any) => {
          if (!mounted) return;
          try {
            const parsed = JSON.parse(message.text);
            setMessages((prev) => [...prev, parsed]);
          } catch (err) {
            console.error("Failed to parse message:", err);
          }
        });

        await channel.join();
        setIsReady(true);
        console.log("✅ Agora RTM ready");
      } catch (err) {
        console.error("❌ Agora RTM error:", err);
      }
    })();

    return () => {
      mounted = false;
      channelRef.current?.leave();
      clientRef.current?.logout();
      clientRef.current = null;
    };
  }, [roomId, userId]);

  const sendMessage = async (text: string) => {
    if (!isReady || !text.trim() || !channelRef.current) return;

    const payload: ChatMessage = {
      id: Date.now().toString(),
      sender: userId!,
      message: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, payload]);

    try {
      await channelRef.current.sendMessage({ text: JSON.stringify(payload) });
    } catch (err) {
      console.error("Failed to send RTM message:", err);
    }
  };

  return { messages, sendMessage, isReady };
}
