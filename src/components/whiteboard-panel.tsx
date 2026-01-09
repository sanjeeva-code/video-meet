"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { X, Eraser, Trash2 } from "lucide-react";

interface WhiteboardPanelProps {
  onClose: () => void;
}

export function WhiteboardPanel({ onClose }: WhiteboardPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);
  const [eraser, setEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  const startDraw = (e: React.MouseEvent) => {
    ctxRef.current!.beginPath();
    ctxRef.current!.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawing) return;

    ctxRef.current!.strokeStyle = eraser ? "#ffffff" : color;
    ctxRef.current!.lineWidth = size;
    ctxRef.current!.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current!.stroke();
  };

  const stopDraw = () => {
    ctxRef.current!.closePath();
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current!;
    ctxRef.current!.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-semibold">Whiteboard</h3>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X />
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 p-3 border-b">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <Slider
          value={[size]}
          min={1}
          max={20}
          step={1}
          onValueChange={(v) => setSize(v[0])}
          className="w-32"
        />

        <Button
          variant={eraser ? "default" : "outline"}
          onClick={() => setEraser(!eraser)}
        >
          <Eraser className="size-4 mr-1" />
          Eraser
        </Button>

        <Button variant="outline" onClick={clearCanvas}>
          <Trash2 className="size-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
        />
      </div>
    </div>
  );
}
