"use client";

import { useEffect, useRef } from "react";

export default function VideoTile({ track }: { track: any }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (track && ref.current) {
      track.play(ref.current);
    }

    return () => {
      track?.stop();
    };
  }, [track]);

  return (
    <div
      ref={ref}
      className="w-full h-full bg-black rounded-lg overflow-hidden"
    />
  );
}
