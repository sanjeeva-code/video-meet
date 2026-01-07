"use client";

import { useEffect, useRef } from "react";

export default function VideoTile({ track }: { track: any }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (track && ref.current) {
      track.play(ref.current);
    }
    return () => track?.stop();
  }, [track]);

  return (
    <div className="rounded-xl overflow-hidden bg-black aspect-video">
      <div ref={ref} className="w-full h-full" />
    </div>
  );
}
